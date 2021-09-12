import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenseUpdate, setDefaultFormValues } from '../../actions';

const EditingExpensesBtn = (props) => {
  const { form, updateExpenseInfo, setDefaultEntries } = props;
  return (
    <button
      className="edit-expense-btn"
      type="button"
      onClick={ () => {
        updateExpenseInfo(form);
        setDefaultEntries();
      } }
    >
      Editar despesa
    </button>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
});

const mapDispatchToProps = (dispatch) => ({
  updateExpenseInfo: (update) => dispatch(expenseUpdate(update)),
  setDefaultEntries: () => dispatch(setDefaultFormValues()),
});

EditingExpensesBtn.propTypes = {
  updateExpenseInfo: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(EditingExpensesBtn);
