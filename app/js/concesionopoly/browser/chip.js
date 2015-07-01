export default class Chip {
  constructor (el) {
    this.el = el
  }

  set (position) {
    this.el.setAttribute('data-position', position)
  }
}
