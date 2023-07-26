import axios from 'axios';
import React, { Component } from 'react';

export default class RegisterCustomer extends Component{
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNewEmail = this.onChangeNewEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            newEmail: '',
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeNewEmail(e) {
        this.setState({
            newEmail: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const customer = {
            email: this.state.email,
            newEmail: this.state.newEmail
        };

        axios.post('http://localhost:8080/users/update-client', customer, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
            })
            .then((res) => {
                alert('Email Updated')
            })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '90vh'}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.newEmail}
                            onChange={this.onChangeNewEmail}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Customer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}