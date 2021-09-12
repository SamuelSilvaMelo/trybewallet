import React from 'react';
import '../style/pages/login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      enabledBtn: true,
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }

  checkUserData() {
    const { email, password } = this.state;
    const minPassword = 6;

    if (email.includes('@') && email.includes('.com') && password.length >= minPassword) {
      this.setState({
        enabledBtn: false,
      });
    }
  }

  handleUserInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    },
    () => this.checkUserData());
  }

  render() {
    const { isLogged, walletLogin } = this.props;
    const { email, enabledBtn } = this.state;

    return (
      <div className="login-form">
        { isLogged && <Redirect to="/carteira" /> }
        <form>
          <h1>TrybeWallet</h1>
          <fieldset>
            <input
              type="email"
              id="email-input"
              name="email"
              data-testid="email-input"
              placeholder="Digite seu e-mail"
              onChange={ this.handleUserInput }
            />
            <input
              type="password"
              id="password-input"
              name="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              onChange={ this.handleUserInput }
            />
            <button
              type="button"
              disabled={ enabledBtn }
              onClick={ () => walletLogin(email) }
            >
              Entrar
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.user.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  walletLogin: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  isLogged: PropTypes.bool,
  walletLogin: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);