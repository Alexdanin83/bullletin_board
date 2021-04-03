import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import styles from './PostEdit.module.scss';
import {PostForm} from '../../common/PostForm/PostForm';

class Component extends React.Component {
   render(){
    const {className, children} = this.props;
      return(
      
        <div className={clsx(className, styles.root)}>
         <PostForm postId={this.props.match.params.id} type={'Edit'} />
         {children}
        </div>

    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state, props) => ({
  /*activePost: getActivePost(state),
  loggedUser: getActive(state),*/
});

// const mapDispatchToProps = (dispatch) => ({
//   updatePost: (payload) => dispatch(editPostRequest(payload)),
// });

const Container = connect(mapStateToProps, null)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};