import React, {Component} from 'react'
import ReactDropdown from 'react-dropdown'
import axios from 'axios'

import options from '../options/options'
import './form.css'
import CurrencyList from "../list/currencyList"

class Form extends Component {

  constructor(props) {
    super(props)

    this.onSelectFrom = this.onSelectFrom.bind(this)
    this.onSelectTo = this.onSelectTo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      value: '',
      topOptions: [],
      from: '',
      to: ''
    }

  }

  onSelectFrom(currency) {
    this.state.from = currency.value

    axios.get(`http://localhost:3003/api/v1/conversion/rates?currencyFrom=${this.state.from}`)
      .then((res) => {
        let topOptions = []
        Object.keys(res.data.data).map(key =>
          topOptions.push({value: key, result: res.data.data[key].val, id: Math.random()}))
        this.setState(Object.assign(this.state, {topOptions: topOptions}))
      })
  }

  onSelectTo(currency) {
    this.state.to = currency.value
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`http://localhost:3003/api/v1/conversion?currencyFrom=${this.state.from}&currencyTo=${this.state.to}&value=${e.target.number.value}`)
      .then((res) => {
        this.setState({value: res.data.data})
      })
  }

  render() {
    return (
      <div>
        <div className={'list'}>
          <CurrencyList list={this.state.topOptions}/>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className={'dropdowns'}>
            <div className={'from'}>
              <ReactDropdown onChange={this.onSelectFrom} value={this.state.from} className={'dropdown'}
                             options={options} placeholder="Select a currency"/>
              <input type="number" name={'number'}/>
            </div>
            <div className={'to'}>
              <ReactDropdown onChange={this.onSelectTo} value={this.state.to} className={'dropdown'} options={options}
                             placeholder="Select a currency"/>
              <input className={'result'} disabled={true} value={this.state.value}
                     onChange={this.handleSubmit.bind(this)}/>
            </div>
          </div>
          <button type='submit' className={'button'}>convert</button>
        </form>
      </div>
    );
  }
}

export default Form
