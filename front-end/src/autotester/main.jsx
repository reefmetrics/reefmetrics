import React from 'react'
import { connect } from 'react-redux'
import { fetchAutotesterConfig } from 'redux/actions/autotester'
import i18n from 'utils/i18n'

class AutoTester extends React.Component {
  componentDidMount () {
    this.props.fetchConfig()
  }

  render () {
    const conf = this.props.config || {}
    return (
      <div>
        <h3>{i18n.t('capabilities:autotester')}</h3>
        <pre>{JSON.stringify(conf)}</pre>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  config: state.autotester_config
})

const mapDispatchToProps = dispatch => ({
  fetchConfig: () => dispatch(fetchAutotesterConfig())
})

export default connect(mapStateToProps, mapDispatchToProps)(AutoTester)
