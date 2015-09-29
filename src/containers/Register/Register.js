import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    registering: state.auth.registering,
    registerError: state.auth.registerError
  }),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Register extends Component {
  static propTypes = {
    user: PropTypes.object,
    register: PropTypes.func,
    registering: PropTypes.bool,
    registerError: PropTypes.string,
    logout: PropTypes.func
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    this.props.register({
      username, email, password
    });
  }

  render() {
    const {user, logout, registering, registerError} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="React Redux Example: Register"/>
        <h1>Register</h1>
        {!user &&
        <div>
          <form className="register-form" onSubmit={::this.handleSubmit}>
            <input type="text" ref="username" placeholder="Enter a username"/> <br />
            <input type="email" ref="email" placeholder="Enter an email"/> <br />
            <input type="password" ref="password" placeholder="Enter a password"/> <br />
            <button className="btn btn-success" onClick={::this.handleSubmit}>
              <i className="fa fa-sign-in"/>{' '}Register
            </button>
            {registering && <h2>Registering</h2>}
            {registerError && <h2>{ registerError }</h2>}
          </form>
          <p>This will "register" a user on stormpath for this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
