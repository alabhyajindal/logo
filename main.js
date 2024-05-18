const input = document.querySelector('input')
const form = document.querySelector('form')

const turtleCenter = window.innerWidth > 768 ? 200 : 150

let turtle = new Turtle(turtleCenter, turtleCenter, 0)
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
const commandsMap = {
  fd: (steps) => turtle.fd(steps),
  bk: (steps) => turtle.fd(-steps),
  rt: (degree) => turtle.rt(degree),
  lt: (degree) => turtle.rt(-degree),
  pd: () => (turtle.pen = true),
  pu: () => (turtle.pen = false),
  ct: () => turtle.ct(),
  cs: () => turtle.init(),
  ht: () => turtle.ht(),
  st: () => turtle.st(),
}
