import React, { Component } from 'react';
import axios from 'axios';

export default class RegisterCustomer extends Component{
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const customer = {
            name: this.state.name,
            email: this.state.email
        }
        
        axios.post('http://localhost:8080/users/create-client', customer, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
            })
            .then(() => {
                alert('Client Created')
            })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '90vh'}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Register Client" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}