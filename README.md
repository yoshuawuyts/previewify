# previewify [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Preview an application.

When building applications you usually create a set of stateful components. For
example a button can be clicked, disabled, have different types of text on it
and more. If you're not testing all states, it can be easy for regressions to
pop back up. That's where preview tools become useful: they allow you to view
all the states of your components and pages, so making sure all different
states work as expected.

## Usage
```js
var previewify = require('previewify')
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
```

## API
### `p = previewify()`
Create a new instance of Previewify

### `DOMElement = p.start()`
Start the instance, returns a DOM tree that can be mounted on the DOM.

### `p.mount(node)`
Start and mount the instance on the DOM. Node can either be a DOM node or a
string. Replaces the selected Node.

### `component = p.component(name)`
Create a new component with a name.

### `component.add(name, callback)`
Add a new state of the component.

### `component = p.page(name)`
Create a new page with a name. (To be implemented)

### `page.add(name, callback)`
Add a new state of the page. (To be implemented)

## See Also
- https://storybooks.js.org
- https://calibreapp.com/
- http://sizzy.co/
- https://developers.google.com/web/tools/lighthouse/

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/previewify.svg?style=flat-square
[3]: https://npmjs.org/package/previewify
[4]: https://img.shields.io/travis/yoshuawuyts/previewify/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/previewify
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/previewify/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/previewify
[8]: http://img.shields.io/npm/dm/previewify.svg?style=flat-square
[9]: https://npmjs.org/package/previewify
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
