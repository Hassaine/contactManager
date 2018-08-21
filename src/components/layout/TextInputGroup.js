import React, { Component } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
const TextInputGroup = ({
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
TextInputGroup.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  label: propTypes.string.isRequired
};
TextInputGroup.defaultProps = {
  type: 'text'
};
export default TextInputGroup;
