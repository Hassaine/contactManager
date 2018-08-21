import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../Context';
class Contacts extends Component {
  render() {
    return (
      <div>
        <Consumer>
          {value => {
            const { contacts } = value;
            return (
              <React.Fragment>
                <h1>
                  <span className="text-danger mb-3">Contacts</span> List
                </h1>
                {contacts.map(contact => (
                  <Contact key={contact.id} contact={contact} />
                ))}
              </React.Fragment>
            );
          }}
        </Consumer>
      </div>
    );
  }
}
export default Contacts;
