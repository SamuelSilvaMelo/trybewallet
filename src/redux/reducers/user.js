// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_USER, LOGOUT_USER } from '../actions';

const INITIAL_STATE = () => {
  const isLogged = localStorage.getItem('TrybeWalletLogin');

  if (isLogged) {
    return ({
      email: JSON.parse(isLogged).email,
      isLogged: JSON.parse(isLogged).isLogged,
    });
  }

  return ({
    email: '',
    isLogged: false,
  });
};

const user = (state = INITIAL_STATE(), action) => {
  switch (action.type) {
  case LOGIN_USER:
    return { ...state, email: action.email, isLogged: true };
  case LOGOUT_USER:
    return { ...state, email: '', isLogged: false };
  default:
    return state;
  }
};

export default user;
