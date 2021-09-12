import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestExpense, setDefaultFormValues } from '../../actions';

const AddExpenseBtn = (props) => {
  const { form, requestExpenseInfo, setDefaultEntries } = props;
  return (
    <button
      type="button"
      className="add-expense-btn"
      onClick={ () => {
        requestExpenseInfo(form);
        setDefaultEntries();
      } }
    >
      Adicionar despesa
    </button>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
});

const mapDispatchToProps = (dispatch) => ({
  requestExpenseInfo: (expenseEntries) => dispatch(requestExpense(expenseEntries)),
  setDefaultEntries: () => dispatch(setDefaultFormValues()),
});

AddExpenseBtn.propTypes = {
  requestExpenseInfo: PropTypes.func.isRequired,
  setDefaultEntries: PropTypes.func.isRequired,
  form: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseBtn);
