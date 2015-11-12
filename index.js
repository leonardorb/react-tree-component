'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import FolderTree from './src/components/folder-tree'

ReactDOM.render(
  <FolderTree url='folders.json' />, document.querySelector('#content')
)