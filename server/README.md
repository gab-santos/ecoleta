# ECOLETA - Back-end

## Sobre o projeto

O back-end do projeto **Ecoleta** foi desenvolvido utilizando NodeJS com Typescript.
Para criar os testes automatizados foi utilizado o Jest com a técnica de desenvolvimento TDD (Test Driven Development).

### Feito Com

Abaixo segue o que foi utilizado na criação do back-end:

- [Typescript](https://github.com/microsoft/TypeScript) - É uma ferramenta que adiciona tipagem ao Javascript, permitindo uma maior inteligência por parte da IDE.
- [TS Dev Node](https://github.com/whitecolor/ts-node-dev#readme) - Utilizado no ambiente de desenvolvimento com TS para compilar o código e restartar o servidor sempre que um arquivo é modificado.
- [Cors](https://github.com/expressjs/cors) - É uma ferramenta que permite controlar o acesso de terceiros a recursos do servidor.
- [Express](https://github.com/expressjs/express) - É um framework para aplicativos NodeJS que fornece um conjunto robusto de recursos para aplicativos web e mobile.
- [Multer](https://github.com/expressjs/multer#readme) - É um middleware utilizado para upload de arquivos.
- [Knex](https://github.com/knex/knex) - É um construtor de consultas SQL para Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle e Amazon Redshift, projetado para ser flexível e portátil.
- [SQLite3](https://github.com/mapbox/node-sqlite3) - É um driver para utilização do SQLite no NodeJS.
- [Celebrate](https://github.com/arb/celebrate) - É um middleware que utiliza o [Joi](https://github.com/sideway/joi) para validação de requisições.

## Como executar

Para conseguir executar e utilizar o back-end siga os passos abaixo.

### Pré-requisitos

Para executar o back-end é necessário que você tenha o NodeJS e o NPM instalados na sua máquina, acesse o [site oficial no NodeJS](https://nodejs.org/en/download/) para saber como instalá-los.

### Instalação do projeto

1. Copie ou clone os arquivos deste repositório para uma pasta local.

2. Acesse a pasta `server` através da sua IDE, renomeie o arquivo `.env.exemple` para `.env` e insira nele o IP da sua máquina local, esse IP será usado para o acesso das imagens pelo front-end e mobile.

3. Acesse a pasta `server` local do projeto através de um terminal e faça a instalação das dependências usando o comando:

```sh
npm install
```

3. Inicie o banco de dados executando as migrations usando o comando:

```sh
npm run knex:migrate
```

4. Prepare o banco de dados executando as seeds usando o comando:

```sh
npm run knex:seed
```

5. Com o banco de dados pronto, inicie o servidor usando o comando:

```sh
npm run dev
```

A API fica localizada em `http://localhost:3333/` ou `http://<seuIP>:3333/`, faça uma requisição através do navegador para essa rota e caso a resposta da requisição for o JSON abaixo a API foi iniciada corretamente e está pronta para uso.

```json
{
  "success": "Hello World :)"
}
```

## Rotas

Esta API contem as seguintes rotas:

- `GET /items`: rota responsável por listar todos os materiais recicláveis
- `POST /points`: rota responsável por cadastrar um ponto de coleta
- `GET /points`: rota responsável por listar todos os pontos filtrados por city, uf e items
- `GET /points/:id`: rota responsável por listar um único ponto de coleta

## Exemplos

<details>
<summary><b>GET /items</b></summary>
<br>
Requisição:

```json
// GET /items
```

Resposta:

```json
// Status: 200 OK
[
  {
    "id": 1,
    "image": "lampadas.svg",
    "title": "Lâmpadas",
    "imageUrl": "http://<seuIP>:3333/uploads/lampadas.svg"
  },
  {
    "id": 2,
    "image": "baterias.svg",
    "title": "Pilhas e Baterias",
    "imageUrl": "http://<seuIP>:3333/uploads/baterias.svg"
  },
  {
    "id": 3,
    "image": "papeis-papelao.svg",
    "title": "Papéis e Papelão",
    "imageUrl": "http://<seuIP>:3333/uploads/papeis-papelao.svg"
  },
  {
    "id": 4,
    "image": "eletronicos.svg",
    "title": "Resíduos Eletrônicos",
    "imageUrl": "http://<seuIP>:3333/uploads/eletronicos.svg"
  },
  {
    "id": 5,
    "image": "organicos.svg",
    "title": "Resíduos Orgânicos",
    "imageUrl": "http://<seuIP>:3333/uploads/organicos.svg"
  },
  {
    "id": 6,
    "image": "oleo.svg",
    "title": "Óleo de Cozinha",
    "imageUrl": "http://<seuIP>:3333/uploads/oleo.svg"
  }
]
```

</details>

<br>
<details>
<summary><b>POST /points</b></summary>
<br>
Requisição:

```json
// POST /points
// Content-Type: multipart/form-data
{
  "image": "/image.jpg", // selecionado a imagem que será enviada
  "name": "Supermercado",
  "email": "contato@supermercado.com",
  "whatsapp": "16991221122",
  // a latitude e longitude serão selecionadas no mapa
  // no frontend web e serão enviadas nesse formato
  "latitude": -21.5159353,
  "longitude": -48.3930071,
  "uf": "SP",
  "city": "Dobrada",
  "items": "1,2,6"
}
```

Resposta:

```json
// Status: 201 Created
{
  "id": 1,
  "image": "98d43b82886c-image.jpg", // nome gerado para a imagem enviada
  // imageUrl: retorna a url da imagem enviada para que a mesma seja
  // acessada pelo frontend web e mobile
  "imageUrl": "http://<seuIP>:3333/uploads/98d43b82886c-image.jpg",
  "name": "Supermercado",
  "email": "contato@supermercado.com",
  "whatsapp": "16991221122",
  "latitude": -21.5159353,
  "longitude": -48.3930071,
  "uf": "SP",
  "city": "Dobrada"
}
```

</details>

<br>
<details>
<summary><b>GET /points</b></summary>
<br>
Requisição:

```json
// GET /items?uf=SP&city=Dobrada&items=1,2
```

Resposta:

```json
// Status: 200 OK
[
  {
    "id": 1,
    "image": "98d43b82886c-image.jpg",
    "imageUrl": "http://<seuIP>:3333/uploads/98d43b82886c-image.jpg",
    "name": "Supermercado",
    "email": "contato@supermercado.com",
    "whatsapp": "16991221122",
    "latitude": -21.5159353,
    "longitude": -48.3930071,
    "uf": "SP",
    "city": "Dobrada"
  }
]
```

</details>

<br>
<details>
<summary><b>GET /points/:id</b></summary>
<br>
Requisição:

```json
// GET /points/1
```

Resposta:

```json
// Status: 200 OK
{
  "point": {
    "id": 1,
    "image": "98d43b82886c-image.jpg",
    "imageUrl": "http://<seuIP>:3333/uploads/98d43b82886c-image.jpg",
    "name": "Supermercado",
    "email": "contato@supermercado.com",
    "whatsapp": "16991221122",
    "latitude": -21.5159353,
    "longitude": -48.3930071,
    "uf": "SP",
    "city": "Dobrada"
  },
  "items": [
    {
      "title": "Lâmpadas"
    },
    {
      "title": "Pilhas e Baterias"
    },
    {
      "title": "Óleo de Cozinha"
    }
  ]
}
```

</details>

<p align="center">
💙
</p>
