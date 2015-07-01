export default class Dices {
  constructor (el) {
    this.dices = []
    this.el = el
    this.set = this.set.bind(this)
  }

  createDice () {
    let dice = document.createElement('div')
    dice.className = 'dice'

    ;[1, 2, 3, 4, 5, 6].forEach((v) => {
      let side = document.createElement('div')
      side.className = `side side-${v}`
      dice.appendChild(side)
    })

    this.dices.push(dice)
    this.el.appendChild(dice)
    return dice
  }

  set (dices) {
    dices.values.forEach((value, i) => {
      let dice = this.dices[i] || this.createDice()
      dice.setAttribute('data-dice-value', value)
    })
  }
}
