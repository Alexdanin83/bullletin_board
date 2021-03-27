import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';


import { connect } from 'react-redux';
import {addPostRequest, editPostRequest,getActivePost} from '../../../redux/postsRedux';
import styles from './PostForm.module.scss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class Component extends React.Component {
    
  constructor(props) {
    super(props);
    const { type } = this.props;
    console.log(`type constructor`, type);
    console.log(' state edit ',this.state);
    if (type === `Add`) {
      this.state = {title: '', description: '', created: new Date(), status: 'draft'};
    } else {
      this.state = {
        id: this.props.activePost._id,
        title: this.props.activePost.title,
        description: this.props.activePost.description,
        author: this.props.activePost.author,
        created: this.props.activePost.created,
        status: this.props.activePost.status,
        updated: new Date(),
      
      };
    }
  }

  handleSubmit(e) {
    console.log('this.state ',this.state);
    const { addNewPost, type, updatePost  } = this.props;
    if (!this.state.title || !this.state.description || ( type === `Add` ? !this.state.email : null)) {
      alert('Please fill all fields' );
      e.preventDefault();
    } else if (this.state.title.length < 10) {
      alert('Title is too short. Minimum 10 characters.' );
      e.preventDefault();
    } else if (this.state.title.length > 20) {
      alert('Title is too long. Maximum 20 characters.' );
      e.preventDefault();
    }else if (this.state.description.length < 20) {
      alert('Description is too short. Minimum 20 characters.' );
      e.preventDefault();
    } else if (this.state.description.length > 1000) {
      alert('Description is too long. Maximum 1000 characters.' );
      e.preventDefault();
    } else{
      if (type === `Add`) {
        this.setState({created: new Date()});
        if (this.state.status === 'draft') {
          addNewPost(this.state);
          alert('Your post has benn added, but you have to publish it. Edit it right now' );
          //document.getElementsByName('addPost')[0].reset();
          this.clearData();
          e.preventDefault();
        } else {
          addNewPost(this.state);
          //document.getElementsByName('addPost')[0].reset();
          this.clearData();
          e.preventDefault();
        }
      } 
      else if (type === `Edit`) {
        console.log(`edit`);
        e.preventDefault();
        //updatePost(this.state);
        updatePost(this.state);
        // TODO when status of post is not selected again-> status is undefined
        //this.setState({redirectToPost: true});
      }
    }
  }

  clearData() {
    this.setState({
      title: '',
      description: '',
      email: '',
      user: '',
      status: 'draft',
    });
  }



  handleChange(e){
    const { loggedUser, type, activePost } = this.props;
    const target = e.target;
    console.log('e target', target);
    const value = target.value;
    console.log('e value', value);
    const name = target.name;
    console.log('e vname', name);
    this.setState({[name]: value});
    if(!this.state.status){
      this.setState({status: activePost.status});
    }
    
  
    // console.log(activePost);
  }

  render(){
    const {className, children, type, postId} = this.props;
    console.log(`type`, type);
    console.log(`postId`, postId);
    console.log('edit ',this.state);
    return (
      <div className={clsx(className, styles.root)}>
           <Card className={styles.widthCard}>
        <form name="addPost" onSubmit={(e) => this.handleSubmit(e)} onChange={(e) => this.handleChange(e)}>
          <div className={`${styles.postAdd} d-flex flex-column align-items-center justify-content-between`}>
           <p> <input className={`${styles.postAddTitle} align-self-start`} defaultValue={this.state.title} type="text" name='title' placeholder="Title"/></p>
           <p><textarea rows="6" name='description' placeholder="Description" defaultValue={this.state.description}/></p>
            <div className={`row d-flex align-items-center justify-content-between`}>
           {type === `Add` ?  <p> <input type="email" name='email' placeholder="email" /> </p>  : <p>{this.state.author}</p>}
            <p>  <select name="status" defaultValue={this.state.status}>
            <option value="draft">Draft</option>
            <option value="published" >Publish</option>
            </select></p>
              </div>
            <input type="submit" value="Send" />
          </div>
          
        </form>
        {children}
        </Card>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  addNewPost: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
  updatePost: PropTypes.func,
  postId: PropTypes.string,
  activePost: PropTypes.object,
};

const mapStateToProps = state => ({
    activePost: getActivePost(state),
 }
);

const mapDispatchToProps = dispatch => ({
  addNewPost: (payload) => dispatch(addPostRequest(payload)),
  updatePost: (payload) => dispatch(editPostRequest(payload)),

});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostForm,
  Container as PostForm,
  Component as PostFormComponent,
};
