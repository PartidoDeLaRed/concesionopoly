import { Repeat } from 'immutable'

class Dice {
  flip (amount) {
    return Repeat(null, amount).map(function(){
      return Math.floor(Math.random() * 6 + 1)
    })
  }
}

export default new Dice
