import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { refreshCart } from '../store/cart'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="nav-panel">
    <div className="logo">
    <Link to="/"><img alt="logo" src="/images/compass.png" /></Link>
    </div>
    <nav>
      {isLoggedIn ? (
        <div className="container-1">
          {/* The navbar will show these links after you log in */}
          {isAdmin && <Link className='nav-btn' to="/add">Add Trip</Link>}
          <Link className='nav-btn' to="/trips">Quests</Link>
          <Link className='nav-btn' to="/cart"><img id="cart-img" alt="cart" src="/images/cart.png" /></Link>
          <a className='nav-btn' href="#" onClick={handleClick}>
            Logout
            </a>
        </div>
      ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <div className="container-1">
                <Link className='nav-btn' to="/trips">Quests</Link>
                <Link className='nav-btn' to="/login">Login</Link>
                <Link  className='nav-btn' to="/signup">Sign Up</Link>
                <Link className='nav-btn' to="/cart"><img id="cart-img" alt="cart" src="/images/cart.png" /></Link>
            </div>
          </div>
        )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(refreshCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
