'use strict'

const dynamic = ['fd', 'bk', 'rt', 'lt', 'pc']
const fixed = ['cs', 'ct', 'pd', 'pu']

if (dynamic.includes(word)) {
  parent.push({ name: word, arg: parseInt(this.text[1]) })
} else if (fixed.includes(word)) {
  parent.push({ name: word })
}

function parseExpression(words, result) {
  for (let [i, word] of words.entries()) {
    if (word == 'repeat') {
      result.push({ name: word, arg: words[i + 1] })
    }
  }
  return result
}

function parse(program) {
  console.log(program)

  const words = program.split(' ')
  const result = parseExpression(words, [])
  console.log(result)
}

const program = 'repeat 4 [fd 10 rt 90] fd 10'
parse(program)
