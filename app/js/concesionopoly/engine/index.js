import Emitter from 'emitter'
import Dices from './dices'
import tiles from './tiles'

export default class Engine extends Emitter {
  constructor () {
    super()

    this.dices = new Dices(2)

    this.state = {
      waiting: false,
      ended: false,
      position: 0,
      tile: null,
      dices: this.dices.flip(),
      ownedProperties: []
    }
  }

  getTile (i) {
    return tiles.get(i)
  }

  getPosition() {
    return this.state.position
  }

  getDices() {
    return this.state.dices
  }

  addProperty (property) {
    if (!property) return null
    this.state.ownedProperties.push(property)
    this.emit('property:add', property)
    return property
  }

  removeLastProperty () {
    if (!this.state.ownedProperties.length) return null
    let property = this.state.ownedProperties.pop()
    this.emit('property:remove', property)
    return property
  }

  flipDices () {
    let dices = this.dices.flip()
    this.state.dices = dices
    this.emit('dices:change', dices)
    return dices
  }

  move (amount) {
    let position = this.state.position + amount
    if (position >= tiles.size - 1) {
      position = tiles.size - 1
      this.state.ended = true
    }
    this.state.position = position
    this.emit('position:change', position)
    return position
  }

  doTurn () {
    if (this.state.waiting) throw new Error('ansdjknaskdjnask.')
    if (this.state.ended) throw new Error('wut?')

    let dices = this.flipDices()
    let position = this.move(dices.total)
    let tile = tiles.get(position)

    this.state.tile = tile

    let turn
    if (tile.type === 'luck') {
      turn = {
        type: 'luck',
        tile: tile,
        last: this.state.ended,
        addedProperty: this.addProperty(tile.property)
      }
    } else if (tile.type === 'extraordinary-tax') {
      turn = {
        type: 'extraordinary-tax',
        tile: tile,
        last: this.state.ended,
        removedProperty: this.removeLastProperty()
      }
    } else if (tile.type === 'property') {
      let selectOption = (price) => {
        if (!this.state.waiting) return false
        this.state.waiting = false
        if (tile.property.price === price) {
          this.addProperty(tile.property)
          return true
        }
        return false
      }

      this.state.waiting = true

      turn = {
        type: 'property',
        tile: tile,
        last: this.state.ended,
        priceOptions: tile.priceOptions,
        selectOption: selectOption
      }
    }

    return turn
  }
}
