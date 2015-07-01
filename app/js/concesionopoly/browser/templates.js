import flyTemplate from 'fly-template'

export default class Templates {
  constructor (container) {
    this.templates = {}
    this.el = container
  }

  render (name, data) {
    let string = this.template(name)(data)
    let wrapper = document.createElement('div')
    wrapper.innerHTML = string
    return wrapper.firstChild
  }

  template (name) {
    if (this.templates[name]) return this.templates[name]
    let el = this.el.querySelector(`[data-template="${name}"]`)
    if (!el) throw new Error(`Template "${name}" not found.`)
    let template = flyTemplate(el.innerHTML)
    this.templates[name] = template
    return template
  }
}
