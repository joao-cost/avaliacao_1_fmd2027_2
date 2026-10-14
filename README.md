# PetShop

Avaliação 2 – FACET-SNP-310 – Frameworks Modernos para Desenvolvimento de Sistemas (2026.2)

## Integrantes
- João Vitor de Souza Costa - @joao-cost
- Fellipe Melhoranca B. Tomasella - @Fellipe-Tomasella
- Inglid Pablina de A. Sandeski - @inglid-sandeski

### Observação sobre os commits

Todos os commits estão na conta do João Vitor, mas o trabalho foi feito pelo grupo:

- **Fellipe** desenvolveu a base do sistema antes de viajar e enviou o projeto em zip
  para o João Vitor e a Inglid. Por causa da viagem, ele não estará presente na aula de 14/10/2026.
- **João Vitor** subiu o projeto para o GitHub e fez os ajustes seguintes.
- **Inglid** testou e validou o funcionamento do sistema.

## Tema

Pet shop. Sistema para cadastrar os pets atendidos, com nome do pet, tutor, espécie,
idade, data da última vacina, se é castrado e o endereço (CEP, cidade e UF) do tutor.

## Funcionalidades
- CRUD de pets (cadastrar, listar, editar e excluir) com validação usando vee-validate
- Confirmação antes de excluir e mensagens de sucesso/erro com snackbar
- Página de consulta com busca geral e filtros por espécie, faixa de idade e castrado
- Os dados ficam salvos no localStorage
- API consumida: ViaCEP (com axios), preenche a cidade e a UF a partir do CEP

## Tecnologias
- Vue 3 + Vite
- Vuetify
- Vue Router
- vee-validate
- Axios

## Como executar
```bash
npm install
npm run dev
```

Depois é só abrir http://localhost:3000
