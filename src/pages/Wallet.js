import React from 'react';
import './wallet.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/walletForm';
import { requestCoins } from '../actions';
import ExpenseTable from '../components/expenseTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestCoinsList } = this.props;
    requestCoinsList();
  }

  totalExpense() {
    const { expenses } = this.props;
    return expenses.reduce((acc, curr) => {
      const value = curr.exchangeRates[curr.currency].ask * curr.value;

      acc += value;

      return acc;
    }, 0);
  }

  render() {
    const { userEmail, currencyToExchange } = this.props;
    return (
      <>
        <header className="wallet-header">
          <img src="/Trybe_logo-baixa.png" alt="logo-trybe" />
          <section>
            <div className="email-field" data-testid="email-field">
              {`Email: ${userEmail}`}
            </div>
            <div className="total-field" data-testid="total-field">
              { `Despesa Total: R$: ${this.totalExpense().toFixed(2)}` }
            </div>
            <div data-testid="header-currency-field">
              { currencyToExchange }
            </div>
          </section>
        </header>
        <main>
          <WalletForm />
          <ExpenseTable />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  currencyToExchange: state.wallet.currencyToExchange,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoinsList: () => dispatch(requestCoins()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
  requestCoinsList: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
