import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import fadeFilterStyles from '../../animationStyles/Filter.module.css';
import StylesInput from '../contactForm/ContactForm.module.css';

export const Filter = ({
  contacts,
  filter,
  handleFilterChange,
  showFilter,
}) => (
  <CSSTransition
    in={showFilter || contacts.length > 1}
    appear={showFilter}
    timeout={500}
    classNames={fadeFilterStyles}
    unmountOnExit
  >
    <div className={StylesInput.group}>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        required
      />
      <span className={StylesInput.bar}></span>
      <label>Find contacts by name</label>
    </div>
  </CSSTransition>
);

Filter.propType = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  showFilter: PropTypes.bool.isRequired,
};
