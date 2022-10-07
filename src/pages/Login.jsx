import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { history } = this.props;
    const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(tokenEndpoint);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    history.push('/game');
  };

  render() {
    const { email, name } = this.state;
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
        </div>
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