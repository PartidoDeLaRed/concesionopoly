import { List } from 'immutable'
import Emitter from 'emitter'
import Dices from './dices'
import squares from './squares'

const dices = new Dices(2)

export default class Engine extends Emitter {
  constructor () {
    super()

    this.state = {
      position: 0,
      square: null,
      dices: dices.flip(),
      ownedProperties: new List
    }
  }

  getSquares () {
    return squares
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

  doTurn () {
    if (this.position >= squares.size - 1) {
      return Promise.reject(() => new Error('GAME_ENDED'))
    }

    let dice = dices.flip()
    let newPosition = this.state.position + dice.total
    if (newPosition >= squares.size - 1) newPosition = squares.size - 1
    let newSquare = this.squares(newPosition)

    this.state.position = newPosition
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
        accept: () => this.addProperty(newSquare.property)
      }
    }
  }
}
