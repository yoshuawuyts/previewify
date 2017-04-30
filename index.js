var sheetify = require('sheetify')
var html = require('choo/html')
var assert = require('assert')
var choo = require('choo')

sheetify('tachyons')

module.exports = Previewify

function Previewify () {
  if (!(this instanceof Previewify)) return new Previewify()
  this.app = choo()
}

Previewify.prototype.component = function (name) {
  assert.equal(typeof name, 'string', 'previewify.component: name should be type string')

  return new PreviewifyComponent(save, emit)

  function save (actName, actComponent) {
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
  this.app.route('/', this.componentView)
  return this.app.start()
}

Previewify.prototype.mount = function (selector) {
  this.app.route('/', this.componentView)
  this.app.mount(selector)
}

Previewify.prototype.componentView = function (state, emit) {
  console.log('called')
  return html`
    <body class="flex pa3 bg-black vh-100">
      <aside class="flex flex-column justify-between content-center pa3 mw5 w-100 bg-black white">
        <span class="ttl b f2 sans-serif">
          Previewify
        </span>
       <p class="b">
         Sponsored by
         <a class="link white" href="https://datproject.org">
           Dat
         </a>
        </p>
      </aside>
      <main class="bg-white pa5 mw8 w-100">
        <section>
          This is the canvas
        </section>
        <section>
          This is where we log output
        </section>
      </main>
    </body>
  `
}

Previewify.prototype._emit = function () {
  var len = arguments.length
  var arr = new Array(len)
  for (var i = 0; i < len; i++) arr.push(arguments[i])
  console.log.apply(console, arguments)
}

function PreviewifyComponent (save, emit) {
  this.save = save
  this.emit = emit
}

PreviewifyComponent.prototype.add = function (name, cb) {
  assert.equal(typeof name, 'string', 'component.add: name should be type string')
  assert.equal(typeof cb, 'function', 'component.add: cb should be type function')
}
