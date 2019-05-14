import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const {fetching, dog, onRequestDog, error} = this.props;
    return (
      <div>
        <img src={dog || logo} alt="logo" />
        <h1>Welcome to Dog Saga</h1>
        {dog ? (
          <p>Click for new dogs</p>
        ) : (
          <p>Replace the React logo with a dog!</p>
        )}
        {fetching ? (
          <button disabled>fetching...</button>
        ) : (
          <button onClick={onRequestDog}>fetch a new dog</button>
        )}
        {error && <p>Uh-oh - something went wrong!</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    dog: state.dog,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestDog: () => dispatch({type: 'API_CALL_REQUEST'}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
