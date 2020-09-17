import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = uuidv4();
  numberInputId = uuidv4();

  handleSubmitForm = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuidv4(),
      name: name,
      number: number,
    };
    name === '' && number === ''
      ? alert('Please enter data.')
      : this.props.submit(contact, true);

    this.reset();
  };

  handleChange = event => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
  };

  reset = () => this.setState({ name: '', number: '' });

  render() {
    const { name, number } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmitForm}>
        <div className={styles.group}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            id={this.nameInputId}
            required
          />
          <span className={styles.bar}></span>
          <label htmlFor={this.nameInputId}>Name</label>
        </div>
        <div className={styles.group}>
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            id={this.numberInputId}
            required
          />
          <span className={styles.bar}></span>
          <label htmlFor={this.numberInputId}>Number</label>
        </div>

        <button className={styles.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  submit: PropTypes.func.isRequired,
};
