import merge from 'object-merge'
import Templates from './templates'

function defaults () {
  return {
    wrapper: undefined,
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

    let wrapper = o.wrapper || document.body
    wrapper.insertBefore(this.el, wrapper.firstChild)

    let templates = o.templates || document.querySelector('[data-templates]')
    this.templates = new Templates(templates)

    this.showing = null
  }

  show (name, data) {
    if (this.showing) this.hide()
    let modal = this.showing = this.templates.render(name, data)
    this.el.appendChild(modal)
    this.el.classList.add(this.options.activeClass)
    modal.classList.add(this.options.activeClass)
  }

  hide () {
    if (!this.showing) return
    let modal = this.showing
    modal.classList.remove(this.options.activeClass)
    this.showing = null
    setTimeout(() => {
      this.el.removeChild(modal)
      if (this.showing) return
      this.el.classList.remove(this.options.activeClass)
    }, this.options.deactivateDelay)
  }
}
