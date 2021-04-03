import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllPublished, fetchPublished, selectPost } from '../../../redux/postsRedux';
import { Posts } from '../../views/Posts/Posts';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './PostBoard.module.scss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



class Component extends React.Component {
  componentDidMount() {
     const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
  }
  selectPost(payload){
    const { sendActivePost } = this.props;
    sendActivePost(payload);
  }
  render(){
    const {className, posts}= this.props;
    
   
    return (
      <div className={clsx(className, styles.root)}>
        <div className={`${styles.postsGrid}`}>

        {posts.length ? posts.map(post => { //eslint-disable-line
            return   <Card className={`${styles.widthCard}`} key={post._id}>
                      <CardContent>
                        <Link className={`${styles.links}`} key={post._id} to={`/post/${post._id}`} onClick={(payload) => this.selectPost(post)}> 
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