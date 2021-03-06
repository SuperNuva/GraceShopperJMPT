import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewTrip } from '../store/trips';

class AddNewTrip extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name : '',
            location : '',
            imageURL : '',
            price : '',
            description : ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {

        e.preventDefault();
        const newTrip = {
            name: this.state.name,
            location: this.state.location,
            imageURL: this.state.imageURL,
            price: +this.state.price,
            description: this.state.description
        }
        this.props.createNewTrip(newTrip, this.props.history)
        this.setState({
            name: '',
            location: '',
            imageURL: '',
            price: '',
            description: ''
        })
        console.log("Form is submitted!!", newTrip)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <h2>Add a New Trip</h2>
                    <label>Name</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                        placeholder="Enter trip name"
                    />
                    <label>location</label>
                    <input
                        type="text"
                        value={this.state.location}
                        onChange={this.handleChange}
                        name="location"
                        placeholder="Enter location"
                    />
                    <label>imageURL</label>
                    <input
                        type="text"
                        value={this.state.imageURL}
                        onChange={this.handleChange}
                        name="imageURL"
                        placeholder="Enter image URL"
                    />
                    <label>Price</label>
                    <input
                        type="number"
                        value={this.state.price}
                        onChange={this.handleChange}
                        name="price"
                        placeholder="Enter trip price"
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={this.state.description}
                        onChange={this.handleChange}
                        name="description"
                        placeholder="Enter trip description"
                    />
                </div>
                <div>
                    <button className='create-trip-btn' type="submit">Create Trip</button>
                </div>
            </form>
        );
    }
}

export default connect(null, {createNewTrip})(AddNewTrip);
