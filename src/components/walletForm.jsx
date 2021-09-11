import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ValueInput from './formComponents/valueInput';
import DescriptionInput from './formComponents/descriptionInput';
import CurrencySelect from './formComponents/currencySelect';
import MathodSelect from './formComponents/methodSelect';
import TagSelect from './formComponents/tagSelect';
import AddExpenseBtn from './formComponents/addExpenseBtn';
import EditingExpensesBtn from './formComponents/editingExpensesBtn';

const WalletForm = (props) => {
  const { editor } = props;
  return (
    <form className="expense-form">
      <ValueInput />
      <DescriptionInput />
      <CurrencySelect />
      <MathodSelect />
      <TagSelect />
      { (editor)
        ? <EditingExpensesBtn />
        : <AddExpenseBtn /> }
    </form>
  );
};

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  editor: PropTypes.bool,
};

WalletForm.defaultProps = {
  editor: false,
};

export default connect(mapStateToProps)(WalletForm);
