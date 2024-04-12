'use strict'

// The goal is to create a nested structure from this string.

// type token {
//   name: string
//   arg: number
//   commands: token[]
// }

// const code = 'repeat 36 [lt 10 pu fd 1 pd repeat 120 [fd 2 rt 3]]'


class Parser {
  constructor(text) {
    this.text = text
  }

  tokenize() {
    const tokens = []
    const words = this.text.split(' ')
    const dynamic = ['fd', 'rt', 'pc']
    const fixed = ['cs', 'ct', 'pd', 'pu']

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (dynamic.includes(word)) {
        tokens.push({name: word, arg: parseInt(words[i + 1])})
      } else if (fixed.includes(word)) {
        tokens.push({name: word })
      }
    }
    return tokens
  }
}
