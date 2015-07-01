class Dices {
  constructor (amount = 1) {
    this.amount = amount
  }

  flip () {
    let values = []

    let pending = this.amount
    while (pending--) values.push(Math.floor(Math.random() * 6 + 1))

    return {
      values: values,
      total: values.reduce((a, b) => a + b)
    }
  }
}

export default Dices
