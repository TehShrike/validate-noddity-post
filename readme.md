Validate noddity posts so that you can be guaranteed that their metadata is valid/parseable, and the contents can be rendered by the templating engine.

# API

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

Returns a promise that resolves with `undefined` if everything is cool, and with a truthy error object if there is anything wrong with the post.

If the promise is rejected, then something is wrong with the universe, which is a distinct possibility when you're interacting with physical disks and internets and whatnot.

# Example

```js
validate('my-newest-post.md').then({ error, html } => {
	if (error) {
		console.log('your post sucks!', error)
	} else {
		console.log('the post html is', html)
	}
})
```

# License

[WTFPL](http://wtfpl2.com)
