'use strict'

const rule = require('../rules/no-en')
const RuleTester = require('eslint').RuleTester

const error = 'English text in string literals is not allowed'

const ruleTester = new RuleTester()
ruleTester.run('no-en', rule, {
  valid: [
    'invariant(1 == 1, "Assertion message")',
    'console.debug("Debugging message")',
    'console.log("Informational message")',
    'console.warn("Warning message")',
    'console.error("Error message")',
    'throw new Error("Error message")',
    'var e = new Error("Error message")',
    'var x = {"Object key": 42}',
    'var x = {test: "Object value"}',
    'x = 42',
    'x = "42"',
    'var x',
    'var x = 42',
    'var x = "42"',
    'function x() { return }',
    'function x() { return 42 }',
    'function x() { return "42" }',
    'document.addEventListener("click", function(){})'
  ],
  invalid: [
    {
      code: 'el.textContent = "Some message text"',
      errors: [{message: error, type: 'AssignmentExpression'}]
    },
    {
      code: 'var message = "Some message text"',
      errors: [{message: error, type: 'VariableDeclarator'}]
    },
    {
      code: 'message = "Some message text"',
      errors: [{message: error, type: 'AssignmentExpression'}]
    },
    {
      code: 'function x() { return "Some message text" }',
      errors: [{message: error, type: 'ReturnStatement'}]
    },
    {
      code: 'displayMessage("Some message text")',
      errors: [{message: error, type: 'CallExpression'}]
    },
    {
      code: 'list.push("Some message text")',
      errors: [{message: error, type: 'CallExpression'}]
    }
  ]
})