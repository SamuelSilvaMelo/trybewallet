import {
  HANDLE_EXPENSE_FORM_INPUTS,
  INCREASE_ID,
  EDIT_EXPENSE_VALUE,
  DEFAULT_EXPENSE_FORMS,
} from '../actions';

const INITIAL_STATE = {
  prevId: null,
  id: 0,
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const form = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_EXPENSE_FORM_INPUTS:
    return {
      ...state,
      [action.name]: action.value,
    };
  case INCREASE_ID:
    return {
      ...state,
      id: state.id + 1,
    };
  case EDIT_EXPENSE_VALUE:
    return {
      ...state,
      prevId: state.id,
      id: action.payload.id,
      value: action.payload.value,
      description: action.payload.description,
      currency: action.payload.currency,
      method: action.payload.method,
      tag: action.payload.tag,
    };
  case DEFAULT_EXPENSE_FORMS:
    // Caso o prevId exista ele restaura o id com o valor do prevId para nao perder a contagem das despesas.
    if (state.prevId) {
      return {
        ...INITIAL_STATE,
        prevId: null,
        id: state.prevId,
      };
    }

    // Quando o prevId nao existe continua a incrementar o id normalmente.
    return {
      ...INITIAL_STATE,
      prevId: state.prevId,
      id: state.id,
    };
  default:
    return state;
  }
};

export default form;
