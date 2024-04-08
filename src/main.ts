const svg = document.querySelector('#svg')!
const input = document.querySelector('input')!
const button = document.querySelector('button')!
const form = document.querySelector('form')!
const errorElement = document.querySelector('#error')!

function isValidCommand(cmd: string) {
  const validCommands = ['rt']
  if (validCommands.includes(cmd)) return true
  return false
}

function showError(message: string) {
  errorElement.classList.remove('invisible')
  errorElement.classList.add('visible')
  errorElement.innerHTML = message
  throw new Error(message)
}

function drawCursor(x: number, y: number) {
  const originPoint = `${x},${y}`
  const leftPoint = `${x - 10},${y + 10}`
  const tipPoint = `${x},${y - 15}`
  const rightPoint = `${x + 10},${y + 10}`

  const cursor = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  cursor.setAttribute(
    'd',
    `M${originPoint} L${leftPoint} L${tipPoint} L${rightPoint} L${originPoint}`
  )
  cursor.setAttribute('stroke', 'black')
  cursor.setAttribute('fill', 'red')
  cursor.setAttribute('transform', `rotate(0)`)
  cursor.id = 'cursor'
  svg.appendChild(cursor)
}

function cursorMidpoint() {
  const cursor = document.querySelector('#cursor')!
  const d = cursor.getAttribute('d')!.split(' ')

  const numbers = d
    .join(' ')
    .match(/-?\d+/g)
    ?.map((n) => Number(n))

  if (!numbers) throw new Error('Something went wrong')

  const leftSum = numbers[2] + numbers[3]
  const rightSum = numbers[6] + numbers[7]

  const x = leftSum / 2
  const y = rightSum / 2
  return `${x} ${y}`
}

function rotateCursor(deg: number) {
  const cursor = document.querySelector('#cursor')!
  const rotation = cursor.getAttribute('transform')?.match(/-?\d+/g)
  if (!rotation) return
  const currentDeg = Number(rotation[0])
  cursor.setAttribute(
    'transform',
    `rotate(${currentDeg + deg} ${cursorMidpoint()})`
  )
}

function execute(cmd: string, deg: number) {
  switch (cmd) {
    case 'rt':
      rotateCursor(deg)
      break
  }
}

function handleGo(e: SubmitEvent) {
  e.preventDefault()

  const cmd = input.value.split(' ')[0]
  const arg = Number(input.value.split(' ')[1])
  if (!isValidCommand(cmd)) showError(`Invalid command: ${cmd}`)
  if (!arg) showError(`Invalid argument: ${arg}`)

  execute(cmd, arg)
  input.value = ''
}

drawCursor(200, 200)
rotateCursor(0)

form.addEventListener('submit', handleGo)
