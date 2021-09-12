import React from 'react';
import '../style/pages/wallet.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { requestCoins } from '../redux/actions';
import logoImg from '../img/Trybe_logo-baixa.png';
import WalletForm from '../components/walletForm';
import ExpenseTable from '../components/expenseTable';

class Wallet extends React.Component {
  constructor() {
    super();

    const isLogged = localStorage.getItem('TrybeWalletLogin');

    if (isLogged) {
      this.state = {
        isLogged: true,
      };
    } else {
      this.state = {
        isLogged: false,
      };
    }
  }

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
    const { isLogged } = this.state;
    const { userEmail, currencyToExchange } = this.props;

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
