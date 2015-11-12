'use strict'

import React, { Component } from 'react'

export default class Folder extends Component {
  render () {
    return <div data-webid={this.props.webid}>{this.props.name}</div>
  }
}