import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {getPostById , fetchSelected } from '../../../redux/postsRedux';
import styles from './Post.module.scss';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { useAuth0 } from "@auth0/auth0-react";

function Component(props) {
  const { user, isAuthenticated} = useAuth0();
  const {className, children, post} = props;
  const { fetchSelectedPostId } = props;
  useEffect( () => {
    const { id } = props.match.params;
    fetchSelectedPostId(id); //eslint-disable-line
  });

  return (
    <div className={clsx(className, styles.root)}>
      <Card className={styles.widthCard}>
        <p className={styles.fonttitle}>
        Title: {post.title}
        </p>
        {post.description}
        <p className={styles.subtitle}>By: {post.author}</p>
        <p className={styles.subtitle}>Posted: {post.created}</p>
        {post.updated ? <p className={styles.subtitle}>Last Edited: {post.updated.split('T')[0]} by: {post.author}</p> : null}
        <p className={styles.subtitle}>Status: {post.status}</p>
        {isAuthenticated && user.email===post.author ?(
        <Link key={post._id} to={`/post/${post._id}/edit`}>
          Edit Post
        </Link> ):null
        }
        {children}
      </Card>
    </div>
    );
}



/*class Component extends React.Component {
 
  componentDidMount() {
    const { fetchSelectedPostId } = this.props;
    fetchSelectedPostId(this.props.match.params.id); //eslint-disable-line
    console.log(this.props.match.params.id);
    //TODO component update after submit via EditPost and add post,

  }
render() {
  
  const {className, children, post} = this.props;

  
 
  return (
        <div className={clsx(className, styles.root)}>
        <Card className={styles.widthCard}>
        <h3>component post</h3>
        <Typography className={styles.fonttitle} color="textSecondary" gutterBottom>
        {post.title}
        </Typography>
        
              {post.description}
        <p className={`align-self-end`}>By: {post.author}</p>
        <p>Posted: {post.created}</p>
        {post.updated ? <p>Last Edited: {post.updated.split('T')[0]} by: {post.author}</p> : null}
        <p>{post.status}</p>
        {
     //     isAuthenticated&&user.name==post.author?(
     //     <Link key={post._id} to={`/post/${post._id}/edit`}>
     //         Edit Post
      //    </Link> ):null
          <Link key={post._id} to={`/post/${post._id}/edit`}>
          Edit Post
      </Link> 

         }
        {children}
        </Card>
      </div>
    );
  }
}*/

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.node,
  title: PropTypes.node,
  description: PropTypes.node,
  author: PropTypes.node,
  key:PropTypes.string,
  post: PropTypes.any,
  fetchSelected: PropTypes.func,
  fetchSelectedPostId: PropTypes.any,
  
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
 
});

const mapDispatchToProps = dispatch => ({
  fetchSelectedPostId: (id) => dispatch(fetchSelected(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};