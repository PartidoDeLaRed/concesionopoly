import Engine from '../engine'

export default class Browser {
  constructor (el) {
    this.board = el
    this.engine = new Engine()
  }
}
