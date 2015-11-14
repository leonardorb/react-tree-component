'use strict'

import React, { Component } from 'react'
import _ from 'lodash'
import Node from './node'

export default class Tree extends Component {

  constructor (props) {
    super(props)
    this.state = { data: [] }
  }

  componentDidMount () {
    this.loadFolders()
  }

  loadFolders () {
    fetch(this.props.url)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data })
        this.normalizeFoldersData()
      })
      .catch(err => console.error(this.props.url, err.toString()))
  }

  normalizeFoldersData () {
    var tree = tree || []

    tree.push(this.getInboxTree())
    tree.push(this.getCabinetTree())
    tree.push(this.getTrashTree())

    this.setState({ tree: tree })
  }

  getAllFoldersWithin (webid) {
    var node = _.findWhere(this.state.data, { webid : webid })
    var children = _.filter(this.state.data, folder => folder.parent_id === webid)
    var nodeData = {}

    nodeData = { webid: node.webid, name: node.name, nodes: [] }
    if (children) {
      _.each(children, (child, key) => {
        var child = { webid: child.webid, name: child.name, nodes: [] }
        nodeData.nodes[key] = this.getAllFoldersWithin(child.webid)
      })
    }
    return nodeData;
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

  buildFolderTree () {
    return this.state.tree.map((node, key) => {
      return <Node key={key} node={node} />
    })
  }

  render () {
    return (
      <ul>
        { this.state.tree && this.state.tree.length ? this.buildFolderTree() : 'loading...'}
      </ul>
    )
  }

}