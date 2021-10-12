const { NotImplementedError } = require('../extensions/index.js');

// const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
module.exports = class Queue {

  constructor() {
    this.data = {}
  }

  getUnderlyingList() {
    return this.data
  }

  enqueue(value) {
    if (!this.data.value) {
      this.data = {
        value: value, 
        next: null
      }
      return
    }

    const func = (list, newElem) => {
      if (list.next) {
        return {
          value: list.value,
          next: func(list.next, newElem)
        }
      } else {
        return {
          value: list.value,
          next: {
            value: newElem,
            next: null
          }
        }
      }
    }

    this.data = func(this.data, value)
    return
  }

  dequeue() {
    const topElem = this.data.value ? this.data.value : 1
    this.data = !this.data.next ? {} : this.data.next
    return topElem
  }
}
