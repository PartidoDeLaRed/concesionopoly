import { Record } from 'immutable'
import Emitter from 'emitter'
import Dice from './dice'

class State extends Record({
  status: 'idle', // idle <-> waiting -> ended
  position: 0,
  response: null
}) { }

export default class Engine extends Emitter {
  constructor (state = {}) {
    super()
    this.setState(state)
  }

  setState (state) {
    if (!this._state) this._state = new State
    if (this._state.isSuperset(state)) return
    this._state.concat(state)
  }

  getState () {
    return this._state.toJS()
  }

  doTurn () {
    if (this._state.status === 'ended') return
  }
}
