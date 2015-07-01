import merge from 'deepmerge'
import Templates from './templates'
import Delegate from 'dom-delegate'

function defaults () {
  return {
    container: undefined,
    templates: undefined,
    className: 'modals',
    activeClass: 'active',
    overlayClass: 'overlay',
    deactivateDelay: 0
  }
}

export default class Modals {
  constructor (options = {}) {
    let o = this.options = merge(defaults(), options)

    this.el = document.createElement('div')
    this.el.className = o.className

    let overlay = document.createElement('div')
    overlay.className = o.overlayClass
    this.el.appendChild(overlay)

    let templates = o.templates || document.querySelector('[data-templates]')
    this.templates = new Templates(templates)

    this.container = o.container || document.body

    this.events = new Delegate(this.el)

    this.hide = this.hide.bind(this)
    this.show = this.show.bind(this)

    this.showing = null
    this.inserted = false
  }

  insert () {
    if (this.inserted) return this
    this.inserted = true
    this.container.insertBefore(this.el, this.container.firstChild)

    this.events.on('click', '[data-modal-hide]', this.hide.bind(this))
    this.events.on('click', `[class*="${this.options.overlayClass}"]`, this.hide.bind(this))
  }

  remove () {
    if (!this.inserted) return this
    this.events.off()

    this.container.removeChild(this.el)
    this.inserted = false
  }

  show (name, data) {
    this.insert()
    this.hide()

    let modal = this.showing = this.templates.render(name, data)
    this.el.appendChild(modal)
    setTimeout(() => {
      this.el.classList.add(this.options.activeClass)
    }, 0)
    return this
  }

  hide () {
    if (!this.showing) return this
    let modal = this.showing
    this.showing = null
    this.el.classList.remove(this.options.activeClass)
    setTimeout(() => {
      this.el.removeChild(modal)
      if (this.showing) return
      this.remove()
    }, this.options.deactivateDelay)
    return this
  }
}
