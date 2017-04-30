var previewify = require('./')
var html = require('bel')

var p = previewify()

var button = p.component('button')
button.add('with text', function (emit) {
  return html`
    <button onclick=${emit.bind(emit, 'clicked')}>
      Hello button
    </button>
  `
})
button.add('with emoji', function (emit) {
  return html`
    <button onclick=${emit.bind(emit, 'clicked')}>
      ✌️🙆🌿
    </button>
  `
})

p.mount('body')
