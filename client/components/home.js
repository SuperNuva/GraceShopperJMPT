import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllTrips } from '../store/trips'
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="home">
            <header className="home-welcome text-center">
                <div className="home-welcome-content">
                    <div className="no-gutters">
                        <h1 className="home-welcome-title">Quest</h1>
                        <h3 className="home-welcome-message">Welcome protagonists!</h3>
                        <h3 className="home-welcome-message">Choose your quest!</h3>
                        <h3 className="home-welcome-message">North or south,</h3>
                        <h3 className="home-welcome-message">east or west.</h3>
                        <h3 className="home-welcome-message">Go on an adventure.</h3>
                        <h3 className="home-welcome-message">Make new friends.</h3>
                        <h3 className="home-welcome-message">You'll wish this</h3>
                        <h3 className="home-welcome-message">journey never ends.</h3>
                    </div>
                </div>
            </header>
            <section className="featured-quests text-center">
                <h2 className="featured-quests-title">Featured Quests</h2>
                {props.trips.length &&
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                            <Link to={`/trips/${props.trips[0].id}`} className="trips">
                                <img className="trips-images" src={props.trips[0].imageUrl} />
                                <h5 className="featured-quest-location">Location: {props.trips[0].location}</h5>
                                <h6 className="featured-quest-price">Price: ${props.trips[0].price}</h6>
                            </Link>
                            </div>
                            <div className="col-sm-4">
                            <Link to={`/trips/${props.trips[1].id}`} className="trips">
                                <img className="trips-images" src={props.trips[1].imageUrl} />
                                <h5 className="featured-quest-location">Location: {props.trips[1].location}</h5>
                                <h6 className="featured-quest-price">Price: ${props.trips[1].price}</h6>
                            </Link>
                            </div>
                            <div className="col-sm-4">
                            <Link to={`/trips/${props.trips[5].id}`} className="trips">
                                <img className="trips-images" src={props.trips[5].imageUrl} />
                                <h5 className="featured-quest-location">Location: {props.trips[5].location}</h5>
                                <h6 className="featured-quest-price">Price: ${props.trips[5].price}</h6>
                            </Link>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </div>
    )
}

const mapState = state => {
    return {
      trips: state.trips
    }
}

  const mapDispatch = dispatch => {
   return {
     getAllTrips: () => {
       dispatch(fetchAllTrips());
     }
   }
}

export default connect(mapState, mapDispatch)(Home);
