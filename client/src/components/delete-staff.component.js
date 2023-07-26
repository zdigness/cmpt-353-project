import axios from 'axios';
import React, { Component } from 'react';

export default class DeleteStaff extends Component{
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        axios.delete('http://localhost:8080/users/delete-staff', {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            },
            data: {
                username: this.state.username
            }
        })
            .then((res) => {
                alert('Staff Deleted')
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
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Delete Staff" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}