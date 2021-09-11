import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleExpenseForm } from '../../actions';

const DescriptionInput = (props) => {
  const { description, handleExpenseFormInputs } = props;
  return (
    <label htmlFor="description">
      Descrição:
      <input
        type="text"
        id="description"
        name="description"
        value={ description }
        data-testid="description-input"
        onChange={ handleExpenseFormInputs }
      />
    </label>
  );
};

const mapStateToProps = (state) => ({
  description: state.form.description,
});

const mapDispatchToProps = (dispatch) => ({
  handleExpenseFormInputs: ({ target }) => dispatch(handleExpenseForm(target)),
});

DescriptionInput.propTypes = {
  handleExpenseFormInputs: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionInput);
