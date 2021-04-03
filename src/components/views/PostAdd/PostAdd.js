import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './PostAdd.module.scss';
import {PostForm} from '../../common/PostForm/PostForm';

class Component extends React.Component {
  render(){
    const {className, children} = this.props;
    return(
      <div className={`${clsx(className, styles.root)}`} id="addPostBoard">
        <PostForm type={'Add'} />
        {children}
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
 
};


export {
  // Component as PostAdd,
   Component as PostAdd,
};