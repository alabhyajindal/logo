const input = document.querySelector('input')
const form = document.querySelector('form')

let turtle

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main()
  input.value = ''
})

function main() {
  const code = 'repeat 4 [fd 10 rt 90] rt 180 fd 10'
  // const code = 'repeat 36 [lt 10 pu fd 1 pd repeat 120 [fd 2 rt 3]]'

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
        for (let command of commands) {
          await new Promise((r) => setTimeout(r, 500))
          console.log(commandsMap[command.name])
          commandsMap[command.name](parseInt(command.arg))
        }
      }
    } else {
      commandsMap[name](arg)
    }
  }
}

main()
