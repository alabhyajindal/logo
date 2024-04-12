const input = document.querySelector('input')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  main()
  input.value = ''
})

function main() {
  console.log(input.value)
  const parser = new Parser()
  console.log(parser)
}

main()
