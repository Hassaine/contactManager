import React, { Component } from 'react';
import { Consumer } from '../../Context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';
class EditContact extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      error: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async (action, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === '') {
      this.setState({ error: { name: 'error in the name' } });
      e.preventDefault();
      return;
    }
    if (email === '') {
      this.setState({ error: { email: 'error in the email' } });
      e.preventDefault();
      return;
    }
    if (phone === '') {
      this.setState({ error: { phone: 'error in the phone' } });
      e.preventDefault();
      return;
    }
    //call the acction for adding contact
    const newContact = {
      name,
      email,
      phone
    };
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${
        this.props.match.params.id
      }`,
      newContact
    );
    action({ type: 'UPDATE_CONTACT', payload: res.data });

    // action({
    //   type: 'ADD_CONTACT',
    //   payload: {
    //     id: uuid(),
    //     name: this.state.name,
    //     email: this.state.email,
    //     phone: this.state.phone
    //   }
    // });

    //set the state to the default position
    this.setState({
      name: '',
      email: '',
      phone: '',
      error: {}
    });
    this.props.history.push('/');
  };
  async componentDidMount() {
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    );

    this.setState(result.data);
  }
  render() {
    const { name, email, phone, error } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Content</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    type="text"
                    placeholder="Enter name..."
                    onChange={this.onChange}
                    value={name}
                    label="name"
                    error={error.name}
                  />
                  <TextInputGroup
                    name="email"
                    type="email"
                    placeholder="Enter email..."
                    onChange={this.onChange}
                    value={email}
                    label="email"
                    error={error.email}
                  />
                  <TextInputGroup
                    name="phone"
                    type="text"
                    placeholder="Enter phone..."
                    onChange={this.onChange}
                    value={phone}
                    label="phone"
                    error={error.phone}
                  />

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Update Contact"
                      className="btn btn-light btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
