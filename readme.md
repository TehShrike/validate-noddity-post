Validate noddity posts so that you can be guaranteed that their metadata is valid/parseable, and the contents can be rendered by the templating engine.

# API

[![Greenkeeper badge](https://badges.greenkeeper.io/TehShrike/validate-noddity-post.svg)](https://greenkeeper.io/)

```js
const Validator = require('validate-noddity-post')
const validate = Validator({
	butler,
	linkifier,
	data
})
```

`require` returns a constructor function:

## constructor({ butler, linkifier, data, [template] })

- butler: a [noddity-butler](https://github.com/TehShrike/noddity-butler)
- linkifier: [noddity-linkifier](https://github.com/TehShrike/noddity-linkifier)
- data: passed to [noddity-render-static](https://github.com/TehShrike/noddity-render-static)
- template: an optional post template

The constructor function returns a validator function:

## validator function(post)

Returns a promise that resolves with an object. If there is anything wrong with the post it will have an `error` property.

If the promise is rejected, then something is wrong with the universe, which is a distinct possibility when you're interacting with physical disks and internets and whatnot.

# Example

```js
validate('my-newest-post.md').then(({ error }) => {
	if (error) {
		console.log('your post sucks!', error)
	}
})
```

# License

[WTFPL](http://wtfpl2.com)
