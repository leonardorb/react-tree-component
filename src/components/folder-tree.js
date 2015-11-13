'use strict'

import React, { Component } from 'react'
import _ from 'lodash'
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
  getRootFolder () {
    return _.findWhere(this.state.data, { parent_id: null })
  }
  getInboxFolder () {
    return _.findWhere(this.state.data, { type: 'System Folder', name: 'Inbox' })
  }
  getInboxTree () {
    return this.getAllFoldersWithin(this.getInboxFolder().webid)
  }
  getCabinetFolder () {
    return _.findWhere(this.state.data, { type: 'Cabinet' })
  }
  getCabinetTree () {
    return this.getAllFoldersWithin(this.getCabinetFolder().webid)
  }
  getTrashFolder () {
    return _.findWhere(this.state.data, { type: 'System Folder', name: 'Trash' })
  }
  getTrashTree () {
    return this.getAllFoldersWithin(this.getTrashFolder().webid)
  }
  getAllFoldersWithin (webid) {

  }
  buildFolderTree () {
    return (
      <Folder key={ root.webid } folder={ root }></Folder>
    )
    // return this.state.data.map((folder, key) => {
    //   return (
    //     <Folder key={folder.webid} folder={folder}></Folder>
    //   )
    // })
  }
  render () {
    return <div>
      { this.state.data.length ? this.buildFolderTree() : 'loading...'}
    </div>
  }
}