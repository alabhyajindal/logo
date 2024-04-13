'use strict'

// The goal is to create a nested structure from this string.

// type token {
//   name: string
//   arg: number
//   commands: token[]
// }

const dynamic = ['fd', 'bk', 'rt', 'lt', 'pc']
const fixed = ['cs', 'ct', 'pd', 'pu']

class Parser {
  constructor(text) {
    this.text = text.split(' ')
    this.tokens = []
    this.index = -1
    this.trunk = true
  }

  tokenize() {
    if (this.text.length == 0) return this.tokens
    // console.log('this.text', this.text)

    let word = this.text[0]
    word = word.replace('[', '')
    word = word.replace(']', '')

    const parent = this.trunk ? this.tokens : this.tokens[this.index].commands

    if (word == 'repeat') {
      const start = this.text.findIndex((t) => t.includes('['))
      parent.push({
        name: word,
        arg: parseInt(this.text[1]),
        commands: [],
      })

      this.index++
      this.trunk = false
    }

    if (dynamic.includes(word)) {
      parent.push({ name: word, arg: parseInt(this.text[1]) })
    } else if (fixed.includes(word)) {
      parent.push({ name: word })
    }

    this.text.shift()
    return this.tokenize()
  }
}
