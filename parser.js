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
    this.index = 0
    this.tokens = []
  }

  tokenize() {
    if (this.text.length == 0) return this.tokens

    const word = this.text[this.index]

    if (word == 'repeat') {
      console.log(word)
    }

    if (dynamic.includes(word)) {
      this.tokens.push({ name: word, arg: parseInt(this.text[this.index + 1]) })
    } else if (fixed.includes(word)) {
      this.tokens.push({ name: word })
    }

    this.index++
    this.text.shift()
    return this.tokenize()

    // for (let i = 0; i < words.length; i++) {
    //   const word = words[i]

    //   // if (word == 'repeat') {
    //   //   const token = {name: word, arg: parseInt(words[i + 1]), commands: []}
    //   //   const startIndex = words.findIndex(w => w.includes('['))
    //   //   const endIndex = words.findIndex(w => w.includes(']'))
    //   //   const nested = words.slice(startIndex, endIndex + 1)
    //   //   for (let i = 0; i < nested.length; i ++) {
    //   //     let word = nested[i]
    //   //     word = word.replace('[', '')
    //   //     word = word.replace(']', '')
    //   //     console.log(word)
    //   //   }
    //   //   tokens.push(token)
    //   // }
  }
}
