let turtle
let currentDirection = 0
let degrees = 0
let steps = 0
let centerX = 200
let centerY = 200
let currentX = centerX
let currentY = centerY
let pencolour = 'black'
let drawing = true

const inputField = document.querySelector('input')

init()

function init() {
  const container = document.getElementById('container')
  const turtleElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'g'
  )
  turtleElement.innerHTML = `
    <path d="M 0 0 l 10 10 l -10 -25 l -10 25 z" fill="red" stroke="#3b4449"></path>
  `
  turtleElement.setAttribute('transform', `translate(${centerX}, ${centerY})`)
  container.appendChild(turtleElement)
  turtle = turtleElement
}

function analyse() {
  let cmd = inputField.value.trim().toLowerCase()
  inputField.value = cmd

  const number_of_repeats = cmd.split('repeat').length - 1
  if (number_of_repeats > 1) {
    showError('Syntax Error: Only one repeat allowed per command')
  } else if (number_of_repeats === 0) {
    breakdown(cmd)
  } else {
    const startofrepeat = cmd.indexOf('repeat')
    const endofnumber = cmd.indexOf('[')
    const repeatCount = parseInt(cmd.substring(startofrepeat + 6, endofnumber))

    let temp = cmd
    cmd = temp.substring(0, startofrepeat)
    for (let i = 1; i <= repeatCount; i++) {
      cmd += temp.substring(temp.indexOf('[') + 1, temp.indexOf(']')) + ' '
    }
    cmd += temp.substring(temp.indexOf(']') + 1, temp.length)
    breakdown(cmd)
  }
}

function breakdown(cmd) {
  const number_of_spaces = cmd.split(' ').length - 1
  const number_of_commands = number_of_spaces + 1

  for (let i = 1; i <= number_of_commands; i++) {
    if (
      cmd.startsWith('ct') ||
      cmd.startsWith('cs') ||
      cmd.startsWith('pu') ||
      cmd.startsWith('pd')
    ) {
      command(cmd.substring(0, 2))
      cmd = cmd.substring(3).trim()
    } else {
      let firstSpace = cmd.indexOf(' ')
      let temp = cmd.substring(firstSpace + 1)
      let secondSpace = temp.indexOf(' ') + cmd.length - temp.length
      if (secondSpace < 3) {
        secondSpace = cmd.length
      }
      command(cmd.substring(0, secondSpace))
      cmd = cmd.substring(secondSpace).trim()
    }
  }
}

function command(cmd) {
  if (!cmd) return

  hideError()

  if ((cmd.startsWith('rt') || cmd.startsWith('lt')) && cmd[2] === ' ') {
    degrees = parseInt(cmd.substring(3))
    if (cmd.startsWith('lt')) {
      degrees *= -1
    }
    rt(degrees)
  } else if ((cmd.startsWith('fd') || cmd.startsWith('bk')) && cmd[2] === ' ') {
    steps = parseInt(cmd.substring(3))
    if (cmd.startsWith('bk')) {
      steps *= -1
    }
    fd(steps)
  } else if (cmd.startsWith('pc') && cmd[2] === ' ') {
    const pencolournumber = parseInt(cmd.substring(3))
    pc(pencolournumber)
  } else if (cmd === 'ct') {
    ct()
  } else if (cmd === 'cs') {
    cs()
  } else if (cmd === 'pu') {
    drawing = false
  } else if (cmd === 'pd') {
    drawing = true
  } else {
    showError(`Invalid command: ${cmd}`)
  }
  document.querySelector('input').value = ''
  document.querySelector('input').focus()
}

function rt(degrees) {
  currentDirection += degrees
  turtle.setAttribute(
    'transform',
    `translate(${currentX}, ${currentY}) rotate(${currentDirection})`
  )
}

function fd(steps) {
  const radians = (currentDirection / 180) * Math.PI
  const x = steps * 10 * Math.sin(radians)
  const y = steps * -10 * Math.cos(radians)
  currentX += x
  currentY += y
  turtle.setAttribute(
    'transform',
    `translate(${currentX}, ${currentY}) rotate(${currentDirection})`
  )
  if (drawing) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', `M ${currentX - x} ${currentY - y} l ${x} ${y}`)
    path.setAttribute('stroke', pencolour)
    path.setAttribute('fill', 'none')
    document.getElementById('container').appendChild(path)
  }
}

function ct() {
  const Xmove = centerX - currentX
  const Ymove = centerY - currentY
  turtle.setAttribute(
    'transform',
    `translate(${centerX}, ${centerY}) rotate(0)`
  )
  currentX = centerX
  currentY = centerY
  currentDirection = 0
}

function cs() {
  const container = document.getElementById('container')
  container.innerHTML = ''
  init()
}

function pc(pencolournumber) {
  pencolour = getColourFromNumber(pencolournumber)
}

function getColourFromNumber(pencolournumber) {
  const colours = [
    'black',
    'blue',
    'red',
    'green',
    'yellow',
    'purple',
    'lime',
    'silver',
    'orange',
    'brown',
    'navy',
    'maroon',
    'aqua',
    'fuchsia',
    'teal',
    'white'
  ]
  return colours[pencolournumber % 16]
}

function showError(message) {
  const errorElement = document.getElementById('error')
  errorElement.textContent = message
  errorElement.classList.remove('hidden')
}

function hideError(message) {
  const errorElement = document.getElementById('error')
  errorElement.classList.add('hidden')
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  analyse()
})
