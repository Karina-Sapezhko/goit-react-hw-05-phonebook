import React from 'react';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import fadeListStyles from '../../animationStyles/list.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => (
  <TransitionGroup component="ul">
    {contacts.map(({ id, name, number }) => (
      <CSSTransition key={id} classNames={fadeListStyles} timeout={250}>
        <li className={styles.item}>
          <p className={styles.itemText}>
            {name}: {number}
          </p>

          <button className={styles.button} onClick={() => onDeleteContact(id)}>
            Delete
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
);

ContactList.propType = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
