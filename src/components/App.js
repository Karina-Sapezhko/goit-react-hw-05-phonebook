import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import Layout from './layout/Layout';
import styles from './App.module.css';
import { Notification } from './notification/Notification';
import fadeNotificationStyles from '../animationStyles/fadeNotification.module.css';
import fadeStartListStales from '../animationStyles/logo.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    showFilter: false,
    showError: false,
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
      if (parsedContacts.length > 1) {
        this.setState({ showFilter: true });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    if (contacts.length > 1) {
      return;
    }
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const findName = contacts.find(contact => contact.name === data.name);

    if (findName) {
      this.setState(
        prevState => ({ showError: !prevState.showError }),
        () =>
          setTimeout(() => {
            this.setState(prevState => ({
              showError: !prevState.showError,
            }));
          }, 2000),
      );
    } else {
      this.setState(prev => ({
        contacts: [data, ...prev.contacts],
      }));
    }
  };

  handleFilterChange = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = idContact => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== idContact),
    }));
  };

  render() {
    const { filter, showFilter, showError, contacts } = this.state;

    return (
      <Layout>
        <CSSTransition
          in={showError}
          classNames={fadeNotificationStyles}
          timeout={250}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>

        <div className={styles.box}>
          <ContactForm submit={this.formSubmitHandler} />
          <h2 className={styles.boxTitle}>Contacts</h2>
          {/* {contacts.length > 1 && ( */}
          <Filter
            filter={filter}
            handleFilterChange={this.handleFilterChange}
            showFilter={showFilter}
            contacts={contacts}
          />
          {/* )} */}

          <CSSTransition
            in={true}
            appear={true}
            classNames={fadeStartListStales}
            timeout={250}
            unmountOnExit
          >
            <ContactList
              contacts={this.filterContacts()}
              onDeleteContact={this.deleteContact}
            />
          </CSSTransition>
        </div>
      </Layout>
    );
  }
}
export default App;
