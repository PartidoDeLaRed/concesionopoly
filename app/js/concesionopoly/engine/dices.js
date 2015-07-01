class Dices {
  constructor (amount) {
    this.amount = amount || 1
  }

  flip () {
    let values = []

    let pending = this.amount + 1
    while (--pending) values.push(Math.floor(Math.random() * 6 + 1))

    return {
      values: values,
      total: values.reduce((a, b) => a + b)
    }
  }
}

export default Dices
