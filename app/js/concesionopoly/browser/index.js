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

    this.dices.set(this.engine.getDices())
    this.engine.on('dices:change', this.dices.set)

    this.chip.set(this.engine.getPosition())
    this.engine.on('position:change', this.chip.set)

    this.enableTurn()

    this.modals.show('welcome')
  }

  enableTurn() {
    this.events.on('click', '[data-dices]', this.doTurn)
  }

  doTurn () {
    this.events.off('click', '[data-dices]', this.doTurn)

    let turn = this.engine.doTurn()

    if (turn.type === 'property') {
      this.renderTurnProperty(turn)
    }

    if (!turn.last) this.enableTurn()
  }

  renderTurnProperty (turn) {
    let modal = this.modals.show('concession', turn.tile)
    let events = new Delegate(modal)

    events.on('click', '[data-price-option]', (e, button) => {
      let selectedPrice = button.getAttribute('data-price-option')
      turn.selectOption(parseInt(selectedPrice, 10))
      this.modals.hide()
    })
  }
}
