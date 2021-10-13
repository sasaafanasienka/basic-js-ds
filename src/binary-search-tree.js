const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.rootNode = null
  }

  root() {
    return this.rootNode
  }

  add(value) {

    const addValue = (node,v) => {

        if (!node) {
            return {
                data: v,
                left: null,
                right: null,
            }
        }

        const newLeft = v > node.data ? node.left : addValue(node.left, v)
        const newRight = v < node.data ? node.right : addValue(node.right, v)

        return {
            data: node.data,
            left: newLeft,
            right: newRight
        }
    }

    this.rootNode = addValue(this.rootNode, value)
  }

  has(value) {
    const check = (node, v) => {
        if (!node) { return false }
        if (node.data === v) { return true }
        if (v < node.data) {
          return node.left ? check(node.left, v) : false
        }
        if (v > node.data) {
          return node.right ? check(node.right, v) : false
        } 
      }
      return check(this.rootNode, value)
    }
    
    find(value) {
      const check = (node, v) => {
      if (!node) { return null }
      if (node.data === v) { return node }
      if (v < node.data) {
        return node.left ? check(node.left, v) : null
      }
      if (v > node.data) {
        return node.right ? check(node.right, v) : null
      } 
    }
    return check(this.rootNode, value)
  }

  leftPlusRight(source, item) {
    if (!source) { return item }
    if (!item) { return source }
    if (source.right) {
        return {
            data: source.data,
            left: source.left,
            right: this.leftPlusRight(source.right, item) 
        }
    } else {
        return {
            data: source.data,
            left: source.left,
            right: item
        }
    }
  }

  remove(value) {
    const removeNode = ( node, v ) => {
        console.log(node)
        console.log(!node)
        if (!node) {
            return null
        }
        if (node.data === v) {
            return this.leftPlusRight(node.left, node.right)
        }
        if ( v < node.data) {
            return {
                data: node.data,
                left: removeNode(node.left, v),
                right: node.right
            }
        }
        if ( v > node.data) {
            return {
                data: node.data,
                left: node.left,
                right: removeNode(node.right, v)
            }
        }
    }
    this.rootNode = removeNode(this.rootNode, value)
  }

  min() {
    const checkMin = (node) => {
      if (!node) { return null }
      if (!node.left) { return node.data }
      return checkMin(node.left)
    }
    return checkMin(this.rootNode)
  }
  
  max() {
    const checkMax = (node) => {
      if (!node) { return null }
      if (!node.right) { return node.data }
      return checkMax(node.right)
    }
    return checkMax(this.rootNode)
  }

}