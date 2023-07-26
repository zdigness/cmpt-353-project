import axios from 'axios';
import React, { Component } from 'react';

export default class AllCustomer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            customers: [{
                name: '',
                email: '',
                reports: []
            }]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users/get-all-client', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                this.setState({customers: res.data})
            })
    }

    render() {
        return (
            <div className='container' style={{display: 'flex', justifyContent:'space-evenly', alignItems: 'center', height: '90vh', flexDirection: 'column'}}>
                {this.state.customers.map((user) => {
                    return (
                    <div>
                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>Reports: {user.reports + ","}</h1>
                    </div>
                    )
                })}
            </div>
        )
    }
}