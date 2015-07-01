
export default class PropertiesList {
  constructor (options = {}) {
    this.el = options.el
    this.templates = options.templates
    this.engine = options.engine

    this.items = {}
    this.size = 0

    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
  }

  add (property) {
    if (this.items[property.id]) throw new Error('Insanity: doing the same thing over and over again and expecting different results.')
    let item = this.templates.render('properties-list-item', property)
    this.items[property.id] = item
    this.size++
    if (this.size) this.el.classList.remove('empty')
    this.el.appendChild(item)
  }

  remove (property) {
    this.el.removeChild(this.items[property.id])
    this.size--
    if (this.size) this.el.classList.add('empty')
  }
}
