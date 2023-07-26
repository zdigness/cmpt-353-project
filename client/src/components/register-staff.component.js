import React, { Component } from 'react';
import axios from 'axios';

export default class RegisterCustomer extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const staff = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:8080/users/register-staff', staff, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
            })
            .then(() => {
                alert('Staff Created')
            })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '90vh'}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Register Staff Member" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}