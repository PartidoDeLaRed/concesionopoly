import Delegate from 'dom-delegate'
import PropertiesList from './properties-list'
import Templates from './templates'
import Engine from '../engine'
import Modals from './modals'
import Dices from './dices'
import Chip from './chip'

export default class Browser {
  constructor (options = {}) {
    this.el = options.el

    this.doTurn = this.doTurn.bind(this)

    this.events = new Delegate(this.el)
    this.engine = new Engine()
    this.templates = new Templates(this.el.querySelector('[data-templates]'))
    this.dices = new Dices(this.el.querySelector('[data-dices]'))
    this.chip = new Chip(this.el.querySelector('[data-chip]'))
    this.modals = new Modals({
      container: this.el,
      deactivateDelay: 500,
      templates: this.templates
    })
    this.propertiesList = new PropertiesList({
      el: this.el.querySelector('[data-properties-list]'),
      templates: this.templates
    })

    this.engine.on('property:add', this.propertiesList.add)
    this.engine.on('property:remove', this.propertiesList.remove)

    this.dices.set(this.engine.getDices())
    this.engine.on('dices:change', this.dices.set)

    this.chip.set(this.engine.getPosition())
    this.engine.on('position:change', this.chip.set)

    this.loadHelpModals()

    this.enableTurn()

    this.modals.show('welcome')
  }

  loadHelpModals () {
    this.events.on('click', '[data-tile]', (e, target) => {
      let index = target.getAttribute('data-tile')
      if (!index) return
      let tile = this.engine.getTile(index)

      if (tile.type === 'property') {
        this.modals.show('property-info', tile.property)
      }
    })
  }

  enableTurn (lastTurn) {
    if (lastTurn && lastTurn.last) {
      let owned = this.engine.state.ownedProperties
      let count = owned.length
      let cost = count === 0 ? 0
               : count === 1 ? owned[0].price
               : owned.reduce((a, b) => (a.price || a || 0) + b.price)
      this.modals.show('end', {
        count: count,
        countText: `concesion${count !== 1 ? 'es' : ''}`,
        cost: cost
      })
    } else {
      this.events.on('click', '[data-dices]', this.doTurn)
    }
  }

  disableTurn () {
    this.events.off('click', '[data-dices]')
  }

  doTurn () {
    this.disableTurn()

    let turn = this.engine.doTurn()

    if (turn.type === 'property') {
      return this.renderPropertyTurn(turn)
    }

    if (turn.type === 'extraordinary-tax') {
      if (turn.removedProperty) this.modals.show(turn.type, turn.tile)
    }

    if (turn.type === 'luck') {
      if (turn.addedProperty) this.modals.show(turn.type, turn.tile)
    }

    this.enableTurn(turn)
  }

  renderPropertyTurn (turn) {
    let modal = this.modals.show('concession', turn.tile)
    let events = new Delegate(modal)

    events.on('click', '[data-price-option]', (e, button) => {
      let selectedPrice = button.getAttribute('data-price-option')
      if (turn.selectOption(parseInt(selectedPrice, 10))) {
        this.modals.show('concession-correct', turn.tile, 5000)
      } else {
        this.modals.show('concession-incorrect', turn.tile, 5000)
      }
      this.enableTurn(turn)
    })
  }
}
