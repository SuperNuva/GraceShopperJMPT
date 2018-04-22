import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSingleTrip } from '../store/trips';
import { fetchAllFromCart, postNewItem } from '../store/cart';
import EditTrip from './editTrip';

class SingleTrip extends Component {
    constructor() {
      super();
      this.state = {
        quantity: '',
      }
      // this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount(){
        this.props.getSingleTrip(this.props.match.params.id);
        this.props.getAllFromCart(this.props.user.id);
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    // handleSubmit(e) {
    //   e.preventDefault();
    //   let trip = this.props.selectedTrip
    //   const addOrder = {
    //     quantity: +this.state.quantity,
    //     price: trip.price
    //   }
    //   this.postOrder(newOrder)
    //   this.setState({
    //     quantity: ''
    //   })
    // }

    render() {
      const newItem = {
        userId: +this.props.user.id,
        // orderId: this.props.cart.id,
        tripId: this.props.selectedTrip.id,
        quantity: +this.state.quantity,
        unitPrice: this.props.selectedTrip.price
      }
      {console.log("Single Trip user", this.props.user.id)}
      console.log("SINGLE TRIP PROPS!!", this.props )
        let trip = this.props.selectedTrip
        console.log("rendering single trip", trip)
        return (
          <div>
            <img src={trip.imageUrl} />
            <h1>{trip.name}</h1>
            <h2>Location: {trip.location}</h2>
            <h2>Price: {trip.price}</h2>
            <p>Description: {trip.description}</p>
            <form onSubmit={(evt) => {this.props.addToCart(newItem, evt)}}>
              <label>Quantity</label>
              <input type='number'
                    name='quantity'
                    value={this.state.quantity}
                    placeholder='0'
                    onChange={this.handleChange} />
                    {
                      (this.state.quantity && this.state.quantity < 0) && <div className='alert alert-warning' style={{color:'red'}}>Please enter a valid quantity!</div>
                    }
              <button className="add-to-cart-btn" type="submit">Add to Cart</button>
            </form>
            {this.props.isAdmin && <EditTrip history={this.props.history} />}
          </div>
        )
      }
    }

    const mapState = state => {
      return {
        selectedTrip: state.selectedTrip,
        isAdmin: state.user.isAdmin,
        cart: state.cart,
        user: state.user
      }
    }

    const mapDispatch = dispatch => {
     return {
       getSingleTrip: (id) => {
         dispatch(fetchSingleTrip(id));
       },
       getAllFromCart: (userId) => {
         dispatch(fetchAllFromCart(userId));
       },
       addToCart: (newItem, evt) => {
         evt.preventDefault()
         dispatch(postNewItem(newItem))
       }
     }
    }

    export default connect(mapState, mapDispatch)(SingleTrip)
