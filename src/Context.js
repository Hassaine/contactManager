import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();
const Reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id ? action.payload : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => Reducer(state, action))
  };
  deleteContact = id => {
    const { contacts } = this.state;

    const newContant = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: newContant });
  };
  async componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(data => {
    //     data.forEach(user => {
    //       const contact = {
    //         id: user.id,
    //         name: user.name,
    //         email: user.email,
    //         phone: user.phone
    //       };
    //       this.setState({
    //         ...this.state,
    //         contacts: [contact, ...this.state.contacts]
    //       });
    //     });
    //   });
    const result = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );
    //.then(res => this.setState({ contacts: res.data }));
    this.setState({ contacts: result.data });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
