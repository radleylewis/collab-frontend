import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ProposeOperation.css';

class ProposeOperation extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: null,
      amount: null,
      target_publicAddress: null
    };
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    const data = {
      publicKey : this.props.wallet.publickey,
      message: this.state.message,
      amount: this.state.amount,
      target_publicAdress: this.state.target_publicAddress
    };
    this.resetInputs();
    this.props.proposeOperation(data);
  }

  resetInputs = () => {
    this.setState({
      message: null,
      amount: null,
      target_publicAddress: null,
    });
  }

  captureInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render () {
    return (
      <div className="ProposeOperation">
        <form className="ProposeOperation_form" onSubmit={this.handleOnSubmit}>
          <div className='ProposeOperation-form-message-amount'>
            <label htmlFor="Description" id='first-element'>

              <input
                name="message"
                type="text"
                placeholder="Description"
                size="50"
                onChange={this.captureInput}
                required
              />
            </label>
            <label htmlFor="Amount of BTC to send" >
              <input
                name="amount"
                type="number"
                min="0"
                max={this.props.wallet.balance/100000000}
                step="any"
                placeholder="Amount"
                onChange={this.captureInput}
                required
              />
            </label>
          </div>

          {/* This doesn't work yet for some reason */}
          {/* <label htmlFor="Receiver from this wallet">
            <select
              onChange={this.captureInput}>
              {this.props.wallet && this.props.wallet.users.map(user => {
                return <option
                  key={user.publicAddress}
                  value={user.publicAddress}
                  name="target_publicAddress"
                >{user.username}</option>;
              })}
            </select>
          </label> */}

          <div className='ProposeOperation-form-address-input'>
            <label htmlFor="Receiver by public address" id='first-element'>
              <input
                name="target_publicAddress"
                type="text"
                placeholder="Receiver by public address"
                onChange={this.captureInput}
              />
            </label>
            <input type="submit" id='submit-button' />
          </div>
        </form>
      </div>
    );
  }
}

ProposeOperation.propTypes = {
  wallet: PropTypes.object.isRequired,
  proposeOperation: PropTypes.func.isRequired
};

export default ProposeOperation;
