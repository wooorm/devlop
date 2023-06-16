import {deprecate, ok} from 'devlop'

export const stringIncludes = deprecate(
  includes,
  'Since ES5, please use `String#includes` itself.'
)

/**
 * @deprecated
 *   Since ES5, please use `String#includes` itself.
 * @param {string} value
 *   Value to search in.
 * @param {string} search
 *   Value to search for.
 * @param {number | undefined} [position=0]
 *   Position to search from (default: `0`).
 * @returns {boolean}
 *   Whether the searched for value exists in the searched value after position.
 */
function includes(value, search, position) {
  ok(typeof value === 'string', 'expected string for `value`')
  ok(typeof search === 'string', 'expected string for `search`')
  ok(position === undefined || typeof position === 'number', 'expected number')
  ok(
    position === undefined ||
      (typeof position === 'number' &&
        !(/* #__PURE__ */ Number.isNaN(position))),
    'expected number'
  )
  // eslint-disable-next-line unicorn/prefer-includes
  return value.indexOf(search, position || 0) !== -1
}
