const input = document.querySelector('input')
const form = document.querySelector('form')

let turtle

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main()
  input.value = ''
})

function main() {
  const code = 'repeat 4 [fd 10 rt 90]'
  // const code = 'fd 10 rt 90 fd 10'

  turtle = new Turtle(200, 200, 0)
  turtle.init()

  const parser = new Parser(code)
  const tokens = parser.tokenize()
  execute(tokens)
}

function execute(tokens) {
  for (let token of tokens) {
    const { name, arg, commands } = token
    if (name == 'repeat') {
      console.log(name, arg, commands)

      for (let i = 0; i < arg; i++) {
        commands.forEach((c) => commandsMap[c.name](c.arg))
      }
    } else {
      commandsMap[name](arg)
    }
  }
}

main()
