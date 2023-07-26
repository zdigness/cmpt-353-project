import axios from 'axios';
import React, { Component } from 'react';

export default class DeleteCustomer extends Component{
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

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:8080/users/delete-client', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            },
            data: {
                name: this.state.name,
                email: this.state.email
            }
        })
            .then((res) => {
                alert('User deleted')
            })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '90vh'}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name of customer: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email of customer: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Delete Customer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}