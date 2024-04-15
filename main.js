const input = document.querySelector('input')
const form = document.querySelector('form')

let turtle = new Turtle(200, 200, 0)
turtle.init()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main(input.value)
  input.value = ''
})

function main(text) {
  const words = getWords(text)
  const tokens = parse(words)
  execute(tokens)
}

function execute(tokens) {
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
