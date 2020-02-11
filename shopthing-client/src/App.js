import React, { Component } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MedianApi from './services/api-services';

class App extends Component {
  constructor() {
    super();

    this.state = {
      formFields: { upperLimit: '' },
      result: [],
      showResult: false,
      hasError: false,
      errorMsg: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ showResult: true, hasError: false });
    MedianApi.postNumber(this.state.formFields.upperLimit)
      .then(res =>
        !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
      )
      .then(json =>
        this.setState({
          result: json
        })
      )
      .catch(
        error =>
          error.errors &&
          this.setState({
            errorMsg: error.errors[0].msg,
            hasError: true,
            showResult: false
          })
      );
  };

  handleChange = e => {
    this.setState({ showResult: false });
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
  };

  render() {
    return (
      <div className='App'>
        <Container
          maxWidth='sm'
          style={{ border: '1px solid black', marginTop: '5rem' }}
        >
          <h1 className='app-name'>Median Prime Finder</h1>
          <h5>
            The app is designed to display the median values of prime numbers
            derived from the upper value of a given set. Please set an upper
            limit:
          </h5>
          <p className='warning'>
            Note: The number must be an integer between 0 and 1,000,000
          </p>
          <form className='input-form' onSubmit={this.handleSubmit}>
            <TextField
              required
              id='outlined-basic'
              label='Enter positive integer'
              variant='outlined'
              style={{ marginRight: '10px' }}
              color='secondary'
              name='upperLimit'
              onChange={this.handleChange}
            />
            <Button
              variant='contained'
              color='secondary'
              style={{ height: '55px', width: '100px' }}
              type='submit'
            >
              Calculate
            </Button>
          </form>
          <div>
            {this.state.hasError && (
              <p className='error'>
                *{this.state.errorMsg}: Please check your input again
              </p>
            )}
            <h2 className='results'>Results</h2>
            {this.state.showResult && !this.state.error ? (
              <p>
                The resulting median prime numbers for the upper limit of
                <span className='input-digit'>
                  &nbsp;{this.state.formFields.upperLimit}
                </span>
                :
                <span className='results-digits'>
                  &nbsp;[
                  {this.state.result.map((item, index) => {
                    return (
                      <span key={index}>{(index ? ', ' : '') + item}</span>
                    );
                  })}
                  ]
                </span>
              </p>
            ) : null}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
