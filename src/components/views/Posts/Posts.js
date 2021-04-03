import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styles from './Posts.module.scss';

function Component ({
  className,
  children,
  title,
  key,
  description,
  author,
  created,
  updated,
 }) {

  
  return(
    <div className={clsx(className, styles.root)}>
      <h3 className={`${styles.postTitle} align-self-start`}>{title}</h3>
      {children}
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.node,
  key:PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  author: PropTypes.node,
  created: PropTypes.node,
  updated: PropTypes.node,
  status: PropTypes.node,
  
};

const mapStateToProps = (state, props) => ({
 
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(null)(Component);

export {
  // Component as Posts,
  Container as Posts,
  Component as PostsComponent,
};