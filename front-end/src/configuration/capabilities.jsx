import React from 'react'
import i18n from 'utils/i18n'

export default class Capabilities extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      capabilities: props.capabilities
    }
    this.updateCapability = this.updateCapability.bind(this)
    this.toLi = this.toLi.bind(this)
  }

  updateCapability (cap) {
    return function (ev) {
      const capabilities = this.state.capabilities
      capabilities[cap] = ev.target.checked
      this.setState({ capabilities: capabilities })
      this.props.update(this.state.capabilities)
    }.bind(this)
  }

  toLi (label) {
    return (
      <div className='col-6 col-md-3 form-check'>
        <label className='form-check-label'>
          <input
            className='form-check-input'
            type='checkbox'
            id={'update-' + label}
            onChange={this.updateCapability(label)}
            checked={!!this.state.capabilities[label]}
          />
          {i18n.t(`capabilities:${label}`)}
        </label>
      </div>
    )
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          {this.toLi('equipment')}
          {this.toLi('timers')}
          {this.toLi('lighting')}
          {this.toLi('ato')}
          {this.toLi('temperature')}
          {this.toLi('camera')}
          {this.toLi('doser')}
          {this.toLi('ph')}
          {this.toLi('journal')}
          {this.toLi('autotester')}
          {this.toLi('macro')}
          {this.toLi('health_check')}
          {this.toLi('dashboard')}
          {this.toLi('dev_mode')}
        </div>
      </div>
    )
  }
}
