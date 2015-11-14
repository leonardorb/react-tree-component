'use strict'

import React, { Component } from 'react'

export default class Folder extends Component {
  generateLink () {
    return '#' + this.props.folder.webid
  }
  generateIcon () {
    return this.props.opened ? 'fa fa-folder-open-o' : 'fa fa-folder-o'
  }
  render () {
    return (
      <div className="folder">
        <i className={this.generateIcon()}></i>
        <a href={this.generateLink()} data-id={this.props.folder.webid} onClick={this.props.onFolderClick}>
          {this.props.folder.name}
        </a>
      </div>
    )
  }
}