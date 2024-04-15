function getWords(text) {
  const temp = text.split(' ')
  let words = []

  for (let t of temp) {
    if (t.includes('[')) {
      const count = t.split('[').length - 1
      for (let i = 0; i < count; i++) {
        words.push('[')
      }
      words.push(t.replaceAll('[', ''))
    } else if (t.includes(']')) {
      words.push(t.replaceAll(']', ''))
      const count = t.split(']').length - 1
      for (let i = 0; i < count; i++) {
        words.push(']')
      }
    } else words.push(t)
  }

  return words
}

function parse(words) {
  const argCommands = ['fd', 'bk', 'rt', 'lt']
  const nonArgCommands = ['pu', 'pd']
  let index = -1

  return parseExpression(words)

  function remainingTokens() {
    return index < words.length
  }

  function getRepeat() {
    nextToken()
    nextToken()

    let bracketsFound = 1
    const nest = []

    while (bracketsFound > 0) {
      if (words[index] == '[') bracketsFound++
      if (words[index] == ']') bracketsFound--

      nest.push(words[index])
      nextToken()
    }
    return nest
  }

  function nextToken() {
    if (remainingTokens()) return words[++index]
  }

  function parseExpression() {
    let commands = []

    while (remainingTokens()) {
      let token = nextToken()

      if (argCommands.includes(token)) {
        let cmd = {
          name: token,
          arg: parseInt(nextToken()),
        }
        commands.push(cmd)
      } else if (nonArgCommands.includes(token)) {
        let cmd = {
          name: token,
        }
        commands.push(cmd)
      } else if (token == 'repeat') {
        let cmd = {
          name: token,
          arg: parseInt(nextToken()),
        }
        let toRepeat = getRepeat()
        cmd.commands = parse(toRepeat)
        commands.push(cmd)
      }
    }
    return commands
  }
}
