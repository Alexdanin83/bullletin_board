import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAll,  getAllPublished, fetchPublished, selectPost } from '../../../redux/postsRedux';

import { Posts } from '../../views/Posts/Posts';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PostBoard.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Component extends React.Component {
  state = {
    addPostButtonClasses: styles.activeButton,
    addPostBoardClasses: '',
  }

  componentShouldUpdate() {
    debugger;
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
   
  }
  selectPost(payload){
    const { sendActivePost } = this.props;
    sendActivePost(payload);
  }
  render(){
    const {className, posts, publishedPosts }= this.props;
    
    console.log(posts);
    return (
      <div className={clsx(className, styles.root)}>
        <div className={`${styles.postsGrid} justify-content-center`}>

        {posts.length ? posts.map(post => { //eslint-disable-line
            return   <Card className={`${styles.widthCard}`} key={post._id}>
                      <CardContent>
                        <Link key={post._id} to={`/post/${post._id}`} onClick={(payload) => this.selectPost(post)}> 
                          <Posts {...post}  key={post._id}/>
                        </Link>
                      </CardContent>
                    </Card>
          }) : <p>There are no post. </p>}

       </div>
      </div>
    );
  }
}
Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  postsList: PropTypes.any,
  publishedPosts: PropTypes.any,
  posts: PropTypes.any,
  fetchPublishedPosts : PropTypes.any,
  sendActivePost: PropTypes.func,
};

const mapStateToProps = state => ({
  //posts: getAll(state),
 // publishedPosts: getAllPublished(state),
    posts :getAllPublished(state),

});

const mapDispatchToProps = dispatch => ({
  sendActivePost: payload => dispatch(selectPost(payload)),
  fetchPublishedPosts: () => dispatch(fetchPublished()),

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostBoard,
  Container as PostBoard,
  Component as PostBoardComponent,
};