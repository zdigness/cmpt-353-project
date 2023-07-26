import axios from 'axios';
import React, { Component } from 'react';

export default class RegisterCustomer extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeNewUsername = this.onChangeNewUsername.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            newUsername: '',
            newPassword: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeNewUsername(e) {
        this.setState({
            newUsername: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const staff = {
            username: this.state.username,
            newUsername: this.state.newUsername,
            newPassword: this.state.newPassword
        };

        axios.post('http://localhost:8080/users/update-staff', staff, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
            })
            .then((res) => {
                alert('Staff updated')
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
                        <label>New Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.newUsername}
                            onChange={this.onChangeNewUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.newPassword}
                            onChange={this.onChangeNewPassword}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Staff" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}