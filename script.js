const btGerarSenha = document.querySelector(".gerarSenha")
const btCopiarSenha = document.querySelector(".copy")
const placeholderSenha = document.querySelector(".passwordRes")

btGerarSenha.addEventListener("click", () => {
  let genPass;
  do {
    genPass = gerarSenha()
  } while (analisarSenha(genPass).score <= 3)

  placeholderSenha.innerText = genPass 
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
  atualizarStatus(statusSenha.score)
})


function gerarSenha(tamanho = 12, counter = null) {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*:;?'

  let senha = ''
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length)
    senha += caracteres[indiceAleatorio]
  }

  console.log(`Running for ${counter}`)
  console.log(senha)
  return senha;
}

function analisarSenha(senha) {
  const listaRegex = [
    /[a-z]/g,
    /[A-Z]/g,
    /\d/g,
    /[!@#$%^&*()_\+\-=\[\]{}:;,.?<]/g,
  ]
  let status = { score: 0, attr: "" }
  if (senha.search(listaRegex[0]) !== -1) {
    status.score++
    status.attr += "a"
  } 
  if (senha.search(listaRegex[1]) !== -1) {
    status.score++
    status.attr += "A"
  }
  if (senha.search(listaRegex[2]) !== -1) {
    status.score++
    status.attr += "1"
  }
  if (senha.search(listaRegex[3]) !== -1) {
    status.score++
    status.attr += "@"
  }
  if (senha.length >= 12) {
    status.attr += "2"
  }

  const listaStatus = document.querySelector(".statusList").children
  for (child of listaStatus) {
    const checker = child.children[0]
    const checkerID = checker.dataset.status
    checker.textContent = status.attr.includes(checkerID) 
      ? "✔️"
      : "❌" 
  }

  return status
}

function atualizarStatus(status) {
  const possibleStatus = ["bad", "normal", "good", "best"]
  const barraStatus = document.querySelector(".secStatus")
  const statusList = barraStatus.classList 
  if (possibleStatus.some(item => statusList.contains(item))) {
    statusList.replace(statusList.item(statusList.length - 1), possibleStatus[status-1])
    return
  }
  statusList.add(possibleStatus[status-1])
}
