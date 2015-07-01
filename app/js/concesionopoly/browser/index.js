import Delegate from 'dom-delegate'
import Engine from '../engine'
import Modals from './modals'
import Dices from './dices'
import Chip from './chip'

export default class Browser {
  constructor (options = {}) {
    this.el = options.el
    this.events = new Delegate(this.el)

    this.engine = new Engine()

    this.modals = new Modals({
      container: this.el,
      deactivateDelay: 500
    })

    this.dices = new Dices(this.el.querySelector('[data-dices]'))
    this.chip = new Chip(this.el.querySelector('[data-chip]'))

    this.doTurn = this.doTurn.bind(this)

    this.setState()

    this.events.on('click', '[data-dices]', this.doTurn)

    // this.modals.show('welcome')
  }

  setState () {
    this.dices.set(this.engine.state.dices)
    this.chip.set(this.engine.state.position)
  }

  doTurn () {
    this.events.off('click', '[data-dices]', this.doTurn)
  }
}
