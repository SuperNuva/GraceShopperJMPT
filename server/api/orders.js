const router = require('express').Router()
const {Trip, Order, Cart, User } = require('../db/models')
module.exports = router

//Need to add authentication. This route should only be accessible to admins.
router.get('/', (req, res, next) => {
  Order.findAll({
    include: [{
      model: Trip
    }]
  })
    .then(orders => res.send(orders))
    .catch(next);
});

//Middleware for routes to /api/orders/user/:userId
router.use('/user/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.getCarts())
    .then(carts => {
      const returned = carts.filter(cart => (cart.status === 'pending'))
      if (returned.length !== 0) {
        next();
      } else {
        Cart.create({userId: req.params.userId})
        next();
      }
    })
})

//get a user's cart
router.get('/user/:userId', (req, res, next) => {
  Cart.findOne({
    where: {
      userId: req.params.userId,
      status: 'pending'
    }
  })
  .then(cart => {
    return cart.getOrders({include: [{model: Trip}]});
  })
  .then(orders => {
    const send = orders.map(order => {
        return {
          subTotal: order.subTotal,
          quantity: order.quantity,
          id: order.id,
          unitPrice: order.unitPrice,
          tripId: order.tripId,
          cartId: order.cartId,
          trip: order.trip.name
        }
      });
    res.send(send);
    })
  .catch(next);
});

//post a new line item to a user's cart
router.post('/user/:userId', (req, res, next) => {
    User.findById(req.params.userId)
    .then(user => user.getCarts())
    .then(carts => {
      const returned = carts.filter(cart => (cart.status === 'pending'))
      return returned
    })
    .then(cart => {
      return Order.create({ quantity: req.body.quantity, unitPrice: req.body.unitPrice, tripId: req.body.tripId, cartId: cart[0].dataValues.id})
    })
    .then(order => {
      res.send(order);
      })
    .catch(next);
});
