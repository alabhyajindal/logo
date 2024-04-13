'use strict'

const dynamic = ['fd', 'bk', 'rt', 'lt', 'pc']
const fixed = ['cs', 'ct', 'pd', 'pu']

// const foo = ['fd', 10, 'repeat', 4, '[', 'fd', 10, 'rt', 90, ']', 'fd', 10]
const foo = ['fd', 10, 'rt', 90, 'fd', 10]

// this function should be recursive. Parsing of the repeat function is the same as parsing the other strings so one function is sufficient - as long as we have a base case. And we can have that be constantly reducing the program array be unshifting as we add it to the results
function parse(program) {
  const result = []
  for (let [i, word] of program.entries()) {
    if (word == 'repeat') {
      const startIndex = program.indexOf('[')
      const endIndex = program.indexOf(']')
      console.log(program.slice(startIndex + 1, endIndex))
      result.push({ name: word, arg: program[i + 1], commands: [] })
      console.log(program)
      program = []
      console.log(program)
    } else if (dynamic.includes(word)) {
      result.push({ name: word, arg: program[i + 1] })
      console.log(program)
      program.shift()
      program.shift()
      console.log(program)
    }
  }
  console.log(program)
  if (program.length == 0) return result
  return parse(program)
}

console.log(parse(foo))
