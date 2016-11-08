const test = require('tape')
const Butler = require('noddity-butler')
const levelmem = require('level-mem')
const Retrieval = require('noddity-fs-retrieval')
const Linkifier = require('noddity-linkifier')

const Validator = require('./')

require('ractive').DEBUG = false

function createTestValidator(data = {}, template) {
	const db = levelmem('wat')
	const retrieval = new Retrieval('./test-fixtures/')
	const butler = new Butler(retrieval, db)
	const linkifier = new Linkifier('/whatever/')

	return Validator({
		butler,
		linkifier,
		data,
		template
	})
}

test('valid file', t => {
	const validate = createTestValidator()
	validate('totally-valid.md').then(({ error }) => {
		t.notOk(error)
		// t.equal(typeof html, 'string')
		t.end()
	}).catch(t.fail.bind(t))
})

test('invalid html', t => {
	const validate = createTestValidator()
	validate('invalid-html.md').then(({ error }) => {
		t.ok(error)
		t.end()
	}).catch(t.fail.bind(t))
})

test('invalid metadata', t => {
	const validate = createTestValidator({
		date: 'date',
		boolean: 'markdown'
	})

	validate('invalid-date.md').then(({ error }) => {
		t.ok(error)
		t.end()
	}).catch(t.fail.bind(t))
})

test('invalid html in an embedded template', t => {
	const validate = createTestValidator()
	validate({
		metadata: {
			date: new Date('2016-10-26T23:49:53.211Z')
		},
		content: `and then ::invalid-html.md::`,
		filename: 'dummy.md'
	}).then(({ error }) => {
		t.ok(error)

		t.end()
	}).catch(t.fail.bind(t))
})

test('invalid embedded template file name', t => {
	const validate = createTestValidator()
	validate({
		metadata: {
			date: new Date('2016-10-26T23:49:53.211Z')
		},
		content: `and then ::invalid-butts::`,
		filename: 'dummy.md'
	}).then(({ error }) => {
		t.equal(error.code, 'ENOENT')
		t.ok(error)
		t.end()
	}).catch(t.fail.bind(t))
})

// test('html output', t => {
// 	const validate = createTestValidator()
// 	validate({
// 		metadata: {
// 			date: new Date('2016-10-26T23:49:53.211Z')
// 		},
// 		content: `# tell me about the time

// - when you wrote that thing
// - that totally worked
// `,
// 		filename: 'dummy.md'
// 	}).then(({ error, html }) => {
// 		t.notOk(error)
// 		t.equal(html, `<p><h1>tell me about the time</h1>
// <ul>
// <li>when you wrote that thing</li>
// <li>that totally worked</li>
// </ul>
// </p>`)
// 		t.end()
// 	})
// })

// test('Passing in your own root template', t => {
// 	const validate = createTestValidator({}, {
// 		metadata: {
// 			date: new Date('2016-10-26T23:49:53.211Z')
// 		},
// 		content: `<p>Your content here:</p>{{>current}}`,
// 		filename: 'dummy.md'
// 	})

// 	validate({
// 		metadata: {
// 			date: new Date('2016-10-26T23:49:53.211Z')
// 		},
// 		content: `sup`,
// 		filename: 'dummy.md'
// 	}).then(({ error, html }) => {
// 		t.notOk(error)
// 		t.equal(html, `<p>Your content here:</p><p>sup</p>\n`)
// 		t.end()
// 	})
// })
