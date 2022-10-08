import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    isDisabled: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    // const { history } = this.props;
    const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(tokenEndpoint);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    // history.push('/game');
    this.setState({
      isDisabled: true,
    });
  };

  render() {
    const { email, name, isDisabled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1>Login</h1>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !email.length > 0 || !name.length > 0 }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
          >
            Configurações
          </button>
        </div>
        { isDisabled && <Redirect to="/game" /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({ ...state.token });

export default connect(mapStateToProps)(Login);
