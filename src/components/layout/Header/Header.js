import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Header</h2>
    <nav className={ styles.component }>
            <Button className={ styles.link } component={ NavLink } exact to={ `/` } activeClassName='active'>View posts</Button>
            <Button className={ styles.link } component={ NavLink } exact to={ `/post/add` } activeClassName='active'>Add Post</Button>
            <Button className={ styles.link } component={ NavLink } exact to={ `/` } activeClassName='active'>Log out</Button>
          </nav>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
