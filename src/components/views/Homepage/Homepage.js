import React from 'react';
import PropTypes from 'prop-types';
import {PostBoard} from '../../features/PostBoard/PostBoard';
import clsx from 'clsx';
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import styles from './Homepage.module.scss';

class Component extends React.Component {

  render(){
    const {className, children} = this.props;
    return (
      <div className={clsx(className, styles.root)}>
        <h2>Bulletin Board</h2>
        <PostBoard />
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};


export {
  Component as Homepage,
  // Container as Homepage,
  Component as HomepageComponent,
};