// funções para salvar e carregar os pets no localStorage
// usado pela página de cadastro e pela página de consulta

const CHAVE = 'pets'

export function carregarPets () {
  const dados = localStorage.getItem(CHAVE)
  if (dados) {
    return JSON.parse(dados)
  }
  return []
}

export function salvarPets (pets: any[]) {
  localStorage.setItem(CHAVE, JSON.stringify(pets))
}
