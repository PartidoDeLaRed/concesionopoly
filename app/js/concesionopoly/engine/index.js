import Emitter from 'emitter'
import Dices from './dices'
import tiles from './tiles'

export default class Engine extends Emitter {
  constructor () {
    super()

    this.dices = new Dices(2)

    this.state = {
      position: 0,
      square: null,
      dices: this.dices.flip(),
      ownedProperties: []
    }
  }

  addProperty (property) {
    this.state.ownedProperties.push(property)
    this.emit('property:add', property)
    return property
  }

  removeLastProperty () {
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
    let newPosition = this.state.position + amount
    if (newPosition >= tiles.length) newPosition = tiles.length - 1
    this.state.position = newPosition
    this.emit('position:change', newPosition)
    return newPosition
  }

  doTurn () {
    if (this.position >= tiles.length - 1) {
      return Promise.reject(() => new Error('GAME_ENDED'))
    }

    let dices = this.flipDices()
    let newPosition = this.move(dices.total)
    let newSquare = tiles[newPosition]

    this.state.square = newSquare

    if (newSquare.type == 'luck') {
      return {
        type: 'luck',
        addedProperty: this.addProperty(newSquare.property)
      }
    } else if (newSquare.type == 'extraordinary-tax') {
      return {
        type: 'extraordinary-tax',
        removedProperty: this.removeLastProperty()
      }
    } else if (newSquare.type == 'property') {
      return {
        type: 'property',
        priceOptions: newSquare.priceOptions,
        accept: () => this.addProperty(newSquare.property)
      }
    }
  }
}
