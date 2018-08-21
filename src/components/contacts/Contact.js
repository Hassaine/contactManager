import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Consumer } from '../../Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
class Contact extends Component {
  state = { showContactInfo: false };
  onDeleteClick = async (id, action) => {
    const result = await axios.delete(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const data = { type: 'DELETE_CONTACT', payload: id };
    action(data);
  };
  onShowClick = e => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
    if (e.target.classList.contains('fa-sort-down')) {
      e.target.classList.remove('fa-sort-down');
      e.target.classList.add('fa-sort-up');

      // console.log(e.target.classList);
    } else {
      e.target.classList.remove('fa-sort-up');
      e.target.classList.add('fa-sort-down');
    }
  };
  render() {
    const { contact } = this.props;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {contact.name}{' '}
                <i
                  className="fas fa-sort-down "
                  onClick={this.onShowClick}
                  style={{ cursor: 'pointer', color: 'green' }}
                />
                <i
                  className="fas fa-times "
                  onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}
                  style={{ cursor: 'pointer', color: 'red', float: 'right' }}
                />
                <Link to={`contact/edit/${contact.id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      color: 'black',
                      float: 'right',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">{contact.email}</li>
                  <li className="list-group-item">{contact.phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
Contact.propTypes = {
  contact: propTypes.object.isRequired
  // DeleteClickHandler: propTypes.func.isRequired
};
export default Contact;
