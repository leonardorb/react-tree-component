'use strict'

import React, { Component } from 'react'
import Folder from './folder'

export default class FolderTree extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
  }
  loadFolders () {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => this.setState( { data: data }))
      .catch(err => console.error(this.props.url, err.toString()))
  }
  componentDidMount () {
    this.loadFolders()
  }
  buildFolderTree () {
    return this.state.data.map((folder, key) => {
      return (
        <Folder key={folder.webid} name={folder.name} webid={folder.webid}></Folder>
      )
    })
  }
  render () {
    return <div>{this.buildFolderTree()}</div>
  }
}