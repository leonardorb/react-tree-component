'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import Tree from './src/components/tree'

ReactDOM.render(
  <Tree url='folders.json' />, document.querySelector('#tree')
)