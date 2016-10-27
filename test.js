const test = require('tape')
const Butler = require('noddity-butler')
const levelmem = require('level-mem')
const Retrieval = require('noddity-fs-retrieval')
const Linkifier = require('noddity-linkifier')

const Validator = require('./')

function createTestValidator(data = {}) {
	const db = levelmem('wat')
	const retrieval = new Retrieval('./test-fixtures/')
	const butler = new Butler(retrieval, db)
	const linkifier = new Linkifier('/whatever/')

	return Validator({
		butler,
		linkifier,
		data
	})
}

test('valid file', t => {
	const validate = createTestValidator()
	validate('totally-valid.md').then(err => {
		t.notOk(err)
		t.end()
	})
})

test('invalid html', t => {
	const validate = createTestValidator()
	validate('invalid-html.md').then(err => {
		t.ok(err)
		t.end()
	})
})

test('invalid metadata', t => {
	const validate = createTestValidator({
		date: 'date',
		boolean: 'markdown'
	})

	validate('invalid-date.md').then(err => {
		t.ok(err)
		t.end()
	})
})

test('invalid html in an embedded template', t => {
	const validate = createTestValidator()
	validate({
		metadata: {
			date: new Date('2016-10-26T23:49:53.211Z')
		},
		content: `and then ::invalid-html.md::`,
		filename: 'dummy.md'
	}).then(err => {
		t.ok(err)
		t.end()
	})
})

test('invalid embedded template file name', t => {
	const validate = createTestValidator()
	validate({
		metadata: {
			date: new Date('2016-10-26T23:49:53.211Z')
		},
		content: `and then ::invalid-butts::`,
		filename: 'dummy.md'
	}).then(err => {
		t.equal(err.code, 'ENOENT')
		t.ok(err)
		t.end()
	})
})
