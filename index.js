var sheetify = require('sheetify')
var html = require('choo/html')
var assert = require('assert')
var choo = require('choo')

sheetify('tachyons')

module.exports = Previewify

function Previewify (opts) {
  if (!(this instanceof Previewify)) return new Previewify(opts)
  opts = opts || {}
  this.name = opts.name || 'Previewify'
  this.url = opts.url || '/'
  this.components = []
  this.app = choo()
}

Previewify.prototype.component = function (name) {
  assert.equal(typeof name, 'string', 'previewify.component: name should be type string')

  var comp = {
    name: name,
    components: []
  }
  this.components.push(comp)
  return new PreviewifyComponent(save, emit)

  function save (actName, actComponent) {
    comp.components.push({
      name: actName,
      component: actComponent
    })
  }

  function emit () {
    var len = arguments.length
    var arr = new Array(len)
    for (var i = 0; i < len; i++) arr.push(arguments[i])
    this._emit.apply(this, arguments)
  }
}

Previewify.prototype.view = function () {
  throw new Error('previewify.view: to be implemented')
}

Previewify.prototype.start = function () {
  var self = this
  this.app.use(this._emit)
  this.components.forEach(function (comp, i) {
    if (i === 0) self.app.route('/', self.componentView.bind(self))
    self.app.route('#' + comp.name, self.componentView.bind(self))
  })
  return this.app.start()
}

Previewify.prototype.mount = function (selector) {
  var self = this
  this.app.use(this._emit)
  this.components.forEach(function (comp, i) {
    if (i === 0) self.app.route('/', self.componentView.bind(self))
    self.app.route('#' + comp.name, self.componentView.bind(self))
  })
  this.app.mount(selector)
}

Previewify.prototype.componentView = function (state, emit) {
  var self = this
  var components = null
  var location = window.location.hash.replace(/^#/, '')
  if (location) {
    components = this.components.reduce(function (prev, curr) {
      prev[curr.name] = curr
      return prev
    }, {})
    components = components[window.location.hash.replace(/^#/, '')]
  } else {
    components = this.components[0]
  }
  return html`
    <body class="flex pa3 bg-black vh-100">
      ${aside()}
      <main class="bg-white ph5 pv3 mw8 w-100">
        <section>
          ${preview(components)}
        </section>
      </main>
    </body>
  `

  function preview (components) {
    var els = components.components
    return els.map(function (component) {
      var name = component.name
      var el = component.component
      return html`
        <article class="pb5">
          <h2 class="f2 lh-title fw9 mb3 mt0 bb bw2 mb4">
            ${name}
          </h2>
          ${el}
        </article>
      `
    })
  }

  function aside () {
    return html`
      <aside class="flex flex-column justify-between content-center pa3 mw5 w-100 bg-black white">
       <section class="flex flex-column">
         <h1 class="ma0 ttl b f2 sans-serif pb5">
           <a class="link white" href=${self.url}>
            ${self.name}
           </a>
         </h1>
         ${list()}
       </section>
       <section class="b">
         <a class="link white" href="https://github.com/yoshuawuyts/previewify">
           Previewify
         </a>
         <span>
           by
         </span>
         <a class="link white" href="https://datproject.org">
           Dat Project
         </a>
        </section>
      </aside>
    `

    function list () {
      return self.components.map(function (component) {
        var name = component.name
        return html`
          <a class="f4 pt3 white link underline" href=${'#' + name}>
            ${name}
          </a>
        `
      })
    }
  }
}

Previewify.prototype._emit = function () {
  var len = arguments.length
  var arr = new Array(len)
  for (var i = 0; i < len; i++) arr.push(arguments[i])
}

function PreviewifyComponent (save, emit) {
  this.save = save
  this.emit = emit
}

PreviewifyComponent.prototype.add = function (name, cb) {
  assert.equal(typeof name, 'string', 'component.add: name should be type string')
  assert.equal(typeof cb, 'function', 'component.add: cb should be type function')

  var self = this
  var component = cb(emit)
  this.save(name, component)

  function emit () {
    var len = arguments.length
    var arr = new Array(len)
    for (var i = 0; i < len; i++) arr.push(arguments[i])
    self.emit.apply(self, arr)
  }
}
