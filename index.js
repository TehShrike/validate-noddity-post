const staticRenderer = require(`noddity-render-static`)

const defaultTemplatePost = Object.freeze({
	metadata: {},
	content: `{{>current}}`,
})

module.exports = ({ butler, linkifier, data, template = defaultTemplatePost }) => {
	const renderOptions = {
		butler,
		linkifier,
		data,
	}

	return function validate(post) {
		return validateDateOnPostAsStringOrObject(butler, post).then(error => {
			if (error) {
				return { error }
			}

			return postRenders(template, post, renderOptions)
		})
	}
}

function postRenders(template, post, renderOptions) {
	return new Promise((resolve, reject) => {
		staticRenderer(template, post, renderOptions, error => {
			if (error) {
				return resolve({ error })
			}

			return resolve({})
		})
	})
}



function validateDateOnPostAsStringOrObject(butler, post) {
	return new Promise((resolve, reject) => {
		if (typeof post === `string`) {
			butler.getPost(post, (error, post) => {
				if (error) {
					resolve(error)
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
			resolve(new Error(`Invalid date`))
		} else {
			resolve()
		}
	})
}

function dateIsValid(date) {
	return date instanceof Date && isFinite(date)
}
