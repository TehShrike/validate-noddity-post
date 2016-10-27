const staticRenderer = require('noddity-render-static')

const templatePost = Object.freeze({
	metadata: {},
	content: '{{>current}}'
})

module.exports = function({ butler, linkifier, data }) {
	const renderOptions = {
		butler,
		linkifier,
		data
	}

	return function validate(post) {
		return validateDateOnPostAsStringOrObject(butler, post).then(error => {
			return error || postRenders(butler, post, renderOptions)
		})
	}
}

function validateDateOnPostAsStringOrObject(butler, post) {
	return new Promise((resolve, reject) => {
		if (typeof post === 'string') {
			butler.getPost(post, (err, post) => {
				if (err) {
					resolve(err)
				} else {
					resolve(validateMetadata(post))
				}
			})
		} else {
			resolve(validateMetadata(post))
		}
	})
}

function validateMetadata(post) {
	return new Promise((resolve, reject) => {
		if (!post.metadata.date || !dateIsValid(post.metadata.date)) {
			resolve(new Error(`Invalid date in ${post.filename}`))
		} else {
			resolve()
		}
	})
}

function postRenders(butler, post, renderOptions) {
	return new Promise((resolve, reject) => {
		staticRenderer(templatePost, post, renderOptions, (err, html) => {
			if (err) {
				return resolve(err)
			}

			return resolve()
		})
	})
}

function dateIsValid(date) {
	return date instanceof Date && isFinite(date) && dateIsInValidRange(date)
}

function dateIsInValidRange(date) {
	const earliestDate = new Date('1975-01-01')
	const latestDate = new Date('2020-01-01')
	return date > earliestDate && date < latestDate
}
