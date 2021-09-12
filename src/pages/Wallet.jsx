import React from 'react';
import '../style/pages/wallet.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { requestCoins, logoutUser } from '../redux/actions';
import logoImg from '../img/Trybe_logo-baixa.png';
import WalletForm from '../components/walletForm';
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
    const { userEmail, currencyToExchange, logout, isLogged } = this.props;

    if (!isLogged) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <header className="wallet-header">
          <img src={ logoImg } alt="logo-trybe" />
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
            <div>
              <button
                className="logout-btn"
                type="button"
                onClick={ () => logout() }
              >
                Logout
              </button>
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
  isLogged: state.user.isLogged,
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
  currencyToExchange: state.wallet.currencyToExchange,
});

const mapDispatchToProps = (dispatch) => ({
  requestCoinsList: () => dispatch(requestCoins()),
  logout: () => dispatch(logoutUser()),
});

Wallet.propTypes = {
  userEmail: PropTypes.string,
  requestCoinsList: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
