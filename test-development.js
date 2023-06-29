import assert from 'node:assert/strict'
import test from 'node:test'
import {deprecate, equal, ok, unreachable} from 'devlop'

test('equal', async function (t) {
  await t.test('should fail on a false assertion', function () {
    assert.throws(function () {
      equal(true, false)
    })
  })
})

test('deprecate', async function (t) {
  await t.test('should show a deprecation message', function () {
    const consoleError = console.error
    let deprecatedCalled = false
    let consoleErrorCalled = false
    const dep = deprecate(function () {
      deprecatedCalled = true
    }, 'deprecated!')

    console.error = () => {
      consoleErrorCalled = true
    }

    dep()

    console.error = consoleError

    assert.ok(deprecatedCalled)
    assert.ok(consoleErrorCalled)
  })

  await t.test('should support deprecating a class', function () {
    class A {
      constructor() {
        deprecatedCalled = true
      }
    }

    const consoleError = console.error
    let deprecatedCalled = false
    let consoleErrorCalled = false
    const Dep = deprecate(A, 'deprecated!')

    console.error = () => {
      consoleErrorCalled = true
    }

    // eslint-disable-next-line no-new
    new Dep()

    console.error = consoleError

    assert.ok(deprecatedCalled)
    assert.ok(consoleErrorCalled)
  })

  await t.test('should warn only once when a wrapper is called', function () {
    const consoleError = console.error
    let deprecatedCalls = 0
    let consoleErrorCalls = 0
    const dep = deprecate(function () {
      deprecatedCalls++
    }, '')

    console.error = () => {
      consoleErrorCalls++
    }

    dep()
    dep()
    dep()

    console.error = consoleError

    assert.equal(deprecatedCalls, 3)
    assert.equal(consoleErrorCalls, 1)
  })

  await t.test(
    'should warn only once based on a unique code if a wrapper is called',
    function () {
      const consoleError = console.error
      let deprecatedCalls = 0
      let consoleErrorCalls = 0
      const dep = deprecate(
        function () {
          deprecatedCalls++
        },
        '',
        'devlop:1'
      )
      const depOther = deprecate(
        function () {
          deprecatedCalls++
        },
        '',
        'devlop:1'
      )

      console.error = () => {
        consoleErrorCalls++
      }

      dep()
      dep()
      dep()
      depOther()
      depOther()
      depOther()

      console.error = consoleError

      assert.equal(deprecatedCalls, 6)
      assert.equal(consoleErrorCalls, 1)
    }
  )
})

test('ok', async function (t) {
  await t.test('should fail on a false assertion', function () {
    assert.throws(function () {
      ok(false)
    })
  })

  await t.test('should not fail on a true assertion', function () {
    assert.doesNotThrow(function () {
      ok(true)
    })
  })

  await t.test('should use a default message if not given', function () {
    try {
      ok(false)
      assert.fail()
    } catch (error) {
      const exception = /** @type {Error} */ (error)
      assert.equal(exception.message, 'Expected value to be truthy')
    }
  })

  await t.test('should use the given message (string)', function () {
    try {
      ok(false, 'xxx')
      assert.fail()
    } catch (error) {
      const exception = /** @type {Error} */ (error)
      assert.equal(exception.message, 'xxx')
    }
  })

  await t.test('should use the given message (error)', function () {
    try {
      const error = new Error('xxx')
      error.name = 'yyy'
      ok(false, error)
      assert.fail()
    } catch (error) {
      const exception = /** @type {Error} */ (error)
      assert.equal(exception.message, 'xxx')
      assert.equal(exception.name, 'yyy')
    }
  })

  await t.test(
    'should throw errors with `actual`, `code`, `expected`, `generated`, `name`, and `operator` fields',
    function () {
      try {
        ok(false)
        assert.fail()
      } catch (error) {
        const exception = /** @type {Error} */ (error)

        assert.ok('actual' in exception)
        assert.equal(exception.actual, false)

        assert.ok('code' in exception)
        assert.equal(exception.code, 'ERR_ASSERTION')

        assert.ok('expected' in exception)
        assert.equal(exception.expected, true)

        assert.ok('generated' in exception)
        assert.equal(exception.generated, true)

        assert.ok('name' in exception)
        assert.equal(exception.name, 'Assertion')

        assert.ok('operator' in exception)
        assert.equal(exception.operator, 'ok')
      }
    }
  )
})

test('unreachable', async function (t) {
  await t.test('should fail', function () {
    assert.throws(function () {
      unreachable()
    })
  })

  await t.test('should use a default message if not given', function () {
    try {
      unreachable()
      assert.fail()
    } catch (error) {
      const exception = /** @type {Error} */ (error)
      assert.equal(exception.message, 'Unreachable')
    }
  })

  await t.test('should use the given message (string)', function () {
    try {
      unreachable('xxx')
      assert.fail()
    } catch (error) {
      const exception = /** @type {Error} */ (error)
      assert.equal(exception.message, 'xxx')
    }
  })

  await t.test('should use the given message (error)', function () {
    try {
      const error = new Error('xxx')
      error.name = 'yyy'
      unreachable(error)
      assert.fail()
    } catch (error) {
      const exception = /** @type {Error} */ (error)
      assert.equal(exception.message, 'xxx')
      assert.equal(exception.name, 'yyy')
    }
  })

  await t.test(
    'should throw errors with `actual`, `code`, `expected`, `generated`, `name`, and `operator` fields',
    function () {
      try {
        unreachable()
        assert.fail()
      } catch (error) {
        const exception = /** @type {Error} */ (error)

        assert.ok('actual' in exception)
        assert.equal(exception.actual, false)

        assert.ok('code' in exception)
        assert.equal(exception.code, 'ERR_ASSERTION')

        assert.ok('expected' in exception)
        assert.equal(exception.expected, true)

        assert.ok('generated' in exception)
        assert.equal(exception.generated, true)

        assert.ok('name' in exception)
        assert.equal(exception.name, 'Assertion')

        assert.ok('operator' in exception)
        assert.equal(exception.operator, 'ok')
      }
    }
  )
})
