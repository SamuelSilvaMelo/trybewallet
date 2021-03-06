// Coloque aqui suas actions
import requestApi from '../../service/requestApi';

export const LOGIN_USER = 'LOGIN-USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const HANDLE_EXPENSE_FORM_INPUTS = 'HANDLE_EXPENSE_FORM_INPUTS';
export const DEFAULT_EXPENSE_FORMS = 'DEFAULT_EXPENSE_FORMS';
export const REQUESTING_COINS = 'REQUESTING_COINS';
export const RECEIVE_COINS = 'RECEIVE_COINS';
export const RECEIVE_EXPENSE_DATA = 'RECEIVE_EXPENSE_DATA';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const INCREASE_ID = 'INCREASE_ID';
export const EDIT_EXPENSE_VALUE = 'EDIT_EXPENSE_VALUE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';

export const loginUser = (email) => {
  localStorage.setItem(
    'TrybeWalletLogin',
    JSON.stringify(
      {
        email,
        isLogged: true,
      },
    ),
  );

  return ({
    type: LOGIN_USER,
    email,
  });
};

export const logoutUser = () => {
  localStorage.removeItem('TrybeWalletLogin');

  return ({
    type: LOGOUT_USER,
  });
};

export const handleExpenseForm = (target) => {
  const { name, value } = target;
  return {
    type: HANDLE_EXPENSE_FORM_INPUTS,
    name,
    value,
  };
};

export const setDefaultFormValues = () => ({
  type: DEFAULT_EXPENSE_FORMS,
});

export const requestingData = () => ({
  type: REQUESTING_COINS,
});

export const receiveCoins = (coins) => ({
  type: RECEIVE_COINS,
  coins,
});

export const requestCoins = () => (dispatch) => {
  dispatch(requestingData());
  return (
    requestApi()
      .then((data) => {
        const coins = Object.keys(data).filter((curr) => curr !== 'USDT');
        dispatch(receiveCoins(coins));
      })
  );
};

export const receiveExpenseData = (expenseEntries, data) => ({
  type: RECEIVE_EXPENSE_DATA,
  payload: {
    expenseEntries,
    data,
  },
});

export const requestExpense = (expenseEntries) => (dispatch) => {
  dispatch(requestingData());
  return (
    requestApi()
      .then((data) => {
        dispatch(receiveExpenseData(expenseEntries, data));
        dispatch({ type: INCREASE_ID });
      })
  );
};

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE_VALUE,
  payload,
});

export const expenseUpdate = (update) => ({
  type: UPDATE_EXPENSE,
  update,
});
