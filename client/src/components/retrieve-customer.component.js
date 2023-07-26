import React, { Component } from 'react';
import axios from 'axios';

export default class RegisterCustomer extends Component{
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            gotName: '',
            gotEmail: '',
            gotReport: [],
            isSubmitted: false
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
            email: this.state.email
        }

        axios.post('http://localhost:8080/users/get-client/', customer,
        {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(res => {
                this.setState({gotName: res.data.name})
                this.setState({gotEmail: res.data.email})
                this.setState({gotReport: res.data.reports})
            })

        this.setState({isSubmitted: true});
    }

    render() {
        const isSubmitted = this.state.isSubmitted;
        if (!isSubmitted) return (
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
                        <input type="submit" value="Retrieve Customer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
        else return (
            <div className='container' style={{display: 'flex', justifyContent:'space-evenly', alignItems: 'center', height: '90vh', flexDirection: 'column'}}>
                <h1>Name: {this.state.gotName}</h1>
                <h1>Email: {this.state.gotEmail}</h1>
                <h1>Reports: {this.state.gotReport}</h1>
            </div>
        )
    }
}