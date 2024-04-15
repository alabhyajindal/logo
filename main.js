const input = document.querySelector('input')
const form = document.querySelector('form')

let turtle

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main()
  input.value = ''
})

function main() {
  const code = 'repeat 36 [lt 10 repeat 12 [fd 24 rt 30] lt 120]'

  turtle = new Turtle(200, 200, 0)
  turtle.init()
  const parser = new Parser(code)
  const commands = parser.parse()
  execute(commands)
}

async function execute(tokens) {
  for (let token of tokens) {
    let { name, arg, commands } = token
    arg = parseInt(arg)

    if (name == 'repeat') {
      for (let i = 0; i < arg; i++) {
        execute(commands)
      }
    } else {
      commandsMap[name](arg)
    }
  }
}

main()
