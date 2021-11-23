import React from 'react';
import Modal from 'react-modal';
import '../style/components/loginAlert.css';

Modal.setAppElement('#root');

class LoginAlert extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true,
    };

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen } = this.state;

    return (
      <div>
        <Modal
          isOpen={ modalIsOpen }
          onRequestClose={ this.closeModal }
          className="Modal"
        >
          <h1>Seja muito bem vindo ao TrybeWallet!</h1>
          <p>
            Essa é apenas uma aplicação front-end, portanto, o sistema de login não
            executa uma validação de back-end. Para acessar a carteira, basta digitar
            um endereço de e-mail válido (ex.:
            <i> teste@email.com</i>
            ) e uma senha com mais de 6 dígitos (ex.:
            <i> 123456</i>
            ).
          </p>
          <button
            type="button"
            onClick={ () => this.closeModal() }
          >
            Fechar
          </button>
        </Modal>
      </div>
    );
  }
}

export default LoginAlert;
