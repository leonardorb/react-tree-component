'use strict'

import React, { Component } from 'react'
import Folder from './folder'

export default class Node extends Component {
  constructor (props) {
    super(props)
    this.state = { opened: false }
  }
  handleClick () {
    this.setState({ opened: !this.state.opened })
  }
  handleRightClick (e) {
    e.preventDefault()
    console.log('Handle Right-click.')
  }
  render () {
    return (
      <li>
        <Folder folder={this.props.node} opened={this.state.opened} onFolderClick={this.handleClick.bind(this)} onFolderRightClick={this.handleRightClick.bind(this)}/>
        <ul className={ this.state.opened ? 'opened' : 'closed' }>
          {this.props.node.nodes.map((child, key) => {
            return <Node key={key} node={child} />
          })}
        </ul>
      </li>
    )
  }
}