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
  getAllFoldersWithin (webid, tree) {
    var tree = tree || []
    var node = _.findWhere(this.state.data, { webid : webid })
    tree.push(<Folder key={webid} folder={node}></Folder>)
    var children = _.filter(this.state.data, folder => folder.parent_id === webid)
    if (children) {
      _.each(children, (child, key) => {
        this.getAllFoldersWithin(child.webid, tree)
      })
    }
    return tree
  }
  buildFolderTree () {
    var root = this.getRootFolder()
    var folderTree = this.getAllFoldersWithin(root.webid)
    return (folderTree)
  }
  render () {
    return <div>
      { this.state.data.length ? this.buildFolderTree() : 'loading...'}
    </div>
  }
}