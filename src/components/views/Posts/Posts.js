import React from 'react';
import PropTypes from 'prop-types';
import {Post} from '../Post/Post';
import clsx from 'clsx';
import { connect } from 'react-redux';


import styles from './Posts.module.scss';

const Component = ({
  className,
  children,
  title,
  description,
  author,
  created,
  updated,
  
}) => {
  return(
    <div className={clsx(className, styles.root)}>
      <h3>component posts</h3>
      <h3 className={`${styles.postTitle} align-self-start`}>{title}</h3>
      <p className={`${styles.postDescription}`}>{description}</p>
      <p className={`align-self-end`}>by: {author}</p>
      <p>Posted: {created.split('T')[0]}</p>
      {updated ? <p>Last Edited: {updated.split('T')[0]} by: {author}</p> : null}
     
      {children}
    </div>
  );
};


Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.node,
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