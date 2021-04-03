import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { useAuth0 } from "@auth0/auth0-react";
// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import styles from './Header.module.scss';

function Component({ className, children }) {
  const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0();
  return (

    <div className={clsx(className, styles.root)}>
      <nav className={styles.component}>
        <div className={styles.divMain}>
          <div className={styles.divLeft}>
            <Button className={styles.link} component={NavLink} exact to={``} activeClassName='active' onClick={() => loginWithRedirect()} >Login</Button>
            <Button className={styles.link} component={NavLink} exact to={`/`} activeClassName='active'>View posts</Button>
            {isAuthenticated ? (<Button className={styles.link} component={NavLink} exact to={`/post/add`} activeClassName='active'>Add Post</Button>): null }
            {isAuthenticated ? (<Button className={styles.link} component={NavLink} exact to={``} activeClassName='active'onClick={() => logout()}>Log out</Button>): null }
          </div>
          <div className={styles.divCenter}>
            {isAuthenticated ? (<h3 className={styles.textNowrap}>{user.name}</h3>): null }
          </div>
          <div className={styles.divRigth}>
            {isAuthenticated ? (<img src={user.picture} alt={user.name}/>): null }
           </div> 
        </div>
      </nav>
      {children}
    </div>
  );
}

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
