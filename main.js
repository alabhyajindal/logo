const input = document.querySelector('input')
const form = document.querySelector('form')

let turtle

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main()
  input.value = ''
})

function main() {
  const code = 'fd 10 rt 90 fd 10 rt 90'

  turtle = new Turtle(200, 200, 0)
  turtle.init()

  const parser = new Parser(code)
  const tokens = parser.tokenize()
  execute(tokens)
}

function execute(tokens) {
  for (let token of tokens) {
    const { name, arg } = token
    commandsMap[name](arg)
    console.log(turtle)
  }
  
}

main()
