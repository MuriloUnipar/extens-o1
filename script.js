const btGerarSenha = document.querySelector(".gerarSenha")
const btCopiarSenha = document.querySelector(".copy")
const placeholderSenha = document.querySelector(".passwordRes")

btGerarSenha.addEventListener("click", () => {
  placeholderSenha.innerText = gerarSenha() 
})

btCopiarSenha.addEventListener("click", (e) => {
  navigator.clipboard.writeText(placeholderSenha.innerText)
  e.target.className += " copied"
  e.target.innerText = "Copiado! 📋"
})

const inputTesteSenha = document.querySelector(".testar")

inputTesteSenha.addEventListener("input", (event) => {
  const senhaParaTestar = event.target.value
  const statusSenha = analisarSenha(senhaParaTestar)
  gerarStatus(statusSenha)
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
  let status = ""
  if (senha.search(listaRegex[0]) !== -1) status = "bad" 
  if (senha.search(listaRegex[1]) !== -1) status = "normal"
  if (senha.search(listaRegex[2]) !== -1) status = "good"
  if (senha.search(listaRegex[3]) !== -1) status = "best"
  return status
}

function gerarStatus(status) {
  const possibleStatus = ["bad", "normal", "good", "best"]
  const barraStatus = document.querySelector(".secStatus")
  const statusList = barraStatus.classList 
  if (possibleStatus.some(item => statusList.contains(item))) {
    statusList.replace(statusList.item(statusList.length - 1), status)
    return
  }
  statusList.add(status)
}
