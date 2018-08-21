import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  const { title } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {title}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
                <i className="fas fa-home" />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className="nav-link">
                Add
                <i className="fas fa-plus" />
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/about" className="nav-link">
                About
                <i className="fas fa-question" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.defaultProps = {
  title: 'myApp'
};
Header.propTypes = {
  title: propTypes.string.isRequired
};
export default Header;
