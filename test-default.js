import assert from 'node:assert/strict'
import test from 'node:test'
import {deprecate, equal, ok, unreachable} from 'devlop'

test('deprecate', async function (t) {
  await t.test('should not show a deprecation message', function () {
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
    assert.ok(!consoleErrorCalled)
  })
})

test('equal', async function (t) {
  await t.test('should not fail on a false assertion', function () {
    assert.doesNotThrow(function () {
      equal(true, false)
    })
  })
})

test('ok', async function (t) {
  await t.test('should not fail on a false assertion', function () {
    assert.doesNotThrow(function () {
      ok(false)
    })
  })
})

test('unreachable', async function (t) {
  await t.test('should not fail on `unreachable`', function () {
    assert.doesNotThrow(function () {
      unreachable()
    })
  })
})
