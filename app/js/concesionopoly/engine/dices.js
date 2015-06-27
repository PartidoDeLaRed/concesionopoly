import { IndexedSeq, Repeat } from 'immutable'

class Dices {
  constructor (amount) {
    this.amount = amount || 1
  }

  flip () {
    let values = Repeat(null, this.amount).map(function(){
      return Math.floor(Math.random() * 6 + 1)
    })

    return {
      values: values,
      total: this.sum(values)
    }
  }

  arrange (value) {
    let values = Repeat(value, this.amount)

    return {
      values: values,
      total: this.sum(values)
    }
  }

  sum (values) {
    return values.reduce((a, b) => (a || 0) + b)
  }
}

export default Dices
