import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleExpenseForm } from '../../actions';

const ValueInput = (props) => {
  const { value, handleExpenseFormInputs } = props;
  return (
    <label htmlFor="value">
      Valor:
      <input
        type="number"
        id="value"
        name="value"
        value={ value }
        data-testid="value-input"
        onChange={ handleExpenseFormInputs }
      />
    </label>
  );
};

const mapStateToProps = (state) => ({
  value: state.form.value,
});

const mapDispatchToProps = (dispatch) => ({
  handleExpenseFormInputs: ({ target }) => dispatch(handleExpenseForm(target)),
});

ValueInput.propTypes = {
  handleExpenseFormInputs: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ValueInput);
