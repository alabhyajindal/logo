const code = 'repeat 36 [lt 10 pu fd 1 pd repeat 120 [fd 2 rt 3]]'

const container = document.querySelector('svg')

class Turtle {
  constructor(x, y, direction) {
    this.x = x
    this.y = y
    this.direction = direction
    this.pen = true
    this.color = '#000000'
    this.element = null
  }

  init() {
    container.innerHTML = ''
    const turtleElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    )
    turtleElement.innerHTML = `
      <path d="M 0 0 l 10 10 l -10 -25 l -10 25 z" fill="red" stroke="black"></path>
    `
    turtleElement.setAttribute('transform', `translate(${this.x}, ${this.y})`)
    container.appendChild(turtleElement)
    this.element = turtleElement
  }

  fd(steps) {
    const radians = (this.direction / 180) * Math.PI
    const x = steps * 10 * Math.sin(radians)
    const y = steps * -10 * Math.cos(radians)
    this.x += x
    this.y += y
    this.element.setAttribute(
      'transform',
      `translate(${this.x}, ${this.y}) rotate(${this.direction})`
    )
    if (this.pen) {
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      path.setAttribute('d', `M ${this.x - x} ${this.y - y} l ${x} ${y}`)
      path.setAttribute('stroke', this.color)
      path.setAttribute('fill', 'none')
      container.appendChild(path)
    }
  }
}

const turtle = new Turtle(200, 200, 0)
turtle.init()
