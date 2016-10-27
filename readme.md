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

## validate(post)

Returns a promise that resolves with `undefined` if everything is cool, and with a truthy error object if there is anything wrong with the post.

If the promise is rejected, then something is wrong with the universe, which is a distinct possibility when you're interacting with physical disks and internets and whatnot.

# Example

```js
validate('my-newest-post.md').then(err => {
	if (err) {
		console.log('your post sucks!', err)
	}
})
```

# License

[WTFPL](http://wtfpl2.com)
