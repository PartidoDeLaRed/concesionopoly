import { List } from 'immutable'
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
      ownedProperties: new List
    }
  }

  addProperty (property) {
    this.state.ownedProperties = this.state.ownedProperties.push(property)
    this.emit('property:add', property)
    return property
  }

  removeLastProperty () {
    let property = this.state.ownedProperties.last()
    this.state.ownedProperties = this.state.ownedProperties.pop()
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
    if (newPosition >= tiles.size - 1) newPosition = tiles.size - 1
    this.state.position = newPosition
    this.emit('position:change', newPosition)
    return newPosition
  }

  doTurn () {
    if (this.position >= tiles.size - 1) {
      return Promise.reject(() => new Error('GAME_ENDED'))
    }

    let dices = this.flipDices()
    let newPosition = this.move(dices.total)
    let newSquare = tiles.get(newPosition)

    this.state.square = newSquare

    if (newSquare.get('type') == 'luck') {
      return {
        type: 'luck',
        addedProperty: this.addProperty(newSquare.get('property'))
      }
    } else if (newSquare.get('type') == 'extraordinary-tax') {
      return {
        type: 'extraordinary-tax',
        removedProperty: this.removeLastProperty()
      }
    } else if (newSquare.get('type') == 'property') {
      return {
        type: 'property',
        priceOptions: newSquare.get('priceOptions'),
        accept: () => this.addProperty(newSquare.get('property'))
      }
    }
  }
}
