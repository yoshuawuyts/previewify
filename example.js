var previewify = require('./')
var html = require('bel')

var p = previewify()

var button = p.component('button')
button.add('with text', function (emit) {
  return html`
    <button class="bn no-underline br1 white bg-blue grow b inline-flex items-center pv2 ph3 pointer"
      onclick=${emit.bind(emit, 'clicked')}>
      Hello button
    </button>
  `
})
button.add('with emoji', function (emit) {
  return html`
    <button class="bn no-underline br1 white bg-blue grow b inline-flex items-center pv2 ph3 pointer"
      onclick=${emit.bind(emit, 'clicked')}>
      ✌️🙆🌿
    </button>
  `
})

p.mount('body')
