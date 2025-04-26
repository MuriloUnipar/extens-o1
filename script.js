const placeholderSenha = document.querySelector(".passwordRes")
const btGerarSenha = document.querySelector(".gerarSenha")

btGerarSenha.addEventListener("click", () => {
  placeholderSenha.innerText = gerarSenha() 
})

const inputTesteSenha = document.querySelector(".testar")

inputTesteSenha.addEventListener("input", (event) => {
  const senhaParaTestar = event.target.value
  const statusSenha = analisarSenha(senhaParaTestar)
  const barraStatus = document.querySelector(".secStatus")
  barraStatus.innerText = statusSenha
})


function gerarSenha(tamanho = 12) {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}:;,.?<'

  let senha = ''
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    senha += caracteres[indiceAleatorio]
  }

  return senha;
}

function analisarSenha(senha) {
  const listaRegex = [
    /[a-z]/g,
    /[A-Z]/g,
    /\d/g,
    /[!@#$%^&*()_\+\-=\[\]{}:;,.?<]/g,
  ]
  let status = 0
  if (senha.search(listaRegex[0]) !== -1) status += 1
  if (senha.search(listaRegex[1]) !== -1) status += 1
  if (senha.search(listaRegex[2]) !== -1) status += 1
  if (senha.search(listaRegex[3]) !== -1) status += 1
  return status
}
