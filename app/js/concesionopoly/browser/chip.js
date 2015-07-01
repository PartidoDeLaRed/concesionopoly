export default class Chip {
  constructor (el) {
    this.el = el
    this.set = this.set.bind(this)
  }

  set (position) {
    this.el.setAttribute('data-position', position)
  }
}
