# ECOLETA - Front-end

## Sobre o projeto

O front-end web do projeto **Ecoleta** foi desenvolvido utilizando ReactJS com Typescript. Esta aplicação tem como intuito disponibilizar uma plataforma para cadastro de locais que realizam coleta de materiais reciláveis.

### API IBGE
A aplicação utiliza a [API disponibilizada pelo IGBE](https://servicodados.ibge.gov.br/api/docs) para obter acesso aos estados do Brasil assim como as cidades de cada estado. 

### Feito Com

Abaixo segue o que foi utilizado na criação do front-end web:

- [Typescript](https://github.com/microsoft/TypeScript) - É uma ferramenta que adiciona tipagem ao Javascript, permitindo uma maior inteligência por parte da IDE.
- [Axios](https://github.com/axios/axios) - É um client HTTP baseado em promise que possibilita a realização de requests a partir do navegador e do Node.JS.
- [React-icons](https://react-icons.netlify.com/#/) - É uma biblioteca que permite a inclusão de ícones em projetos React.
- [React-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) - É responsável pela navegação entre componetes que vão funcionar como se fossem páginas.
- [Leaflet](https://github.com/Leaflet/Leaflet) - É a principal biblioteca JavaScript de código aberto para mapas interativos compatíveis com dispositivos móveis.
- [React-leaflet](https://github.com/PaulLeCam/react-leaflet) - Usa os métodos do ciclo de vida de React para chamar os manipuladores relevantes do Leaflet.
- [React-dropzone]() - Um dropzone que utiliza os hooks para React.

## Como executar

Para conseguir executar e utilizar o front-end web siga os passos abaixo.

### Pré-requisitos

Para executar o front-end web é necessário que você tenha o NodeJS e o NPM instalados na sua máquina, acesse o [site oficial no NodeJS](https://nodejs.org/en/download/) para saber como instalá-los.

### Instalação do projeto

1. Copie ou clone os arquivos deste repositório para uma pasta local.


2. Acesse a pasta `web` local do projeto através de um terminal e faça a instalação das dependências usando o comando:

```sh
npm install
```

3. Após a instalação das dependências, inicie a aplicação usando o comando:

```sh
npm run start
```

A front-end web fica localizada em `http://localhost:3000/`.

#### PARA PODER ACESSAR TODAS AS FUNCIONALIDADES DO FRONT-END WEB É NECESSÁRIO QUE O BACK-END E O APLICATIVO MOBILE ESTEJAM SENDO EXECUTADOS. PARA MAIS INFORMAÇÕES VEJA O README NA PASTA RAIZ OU O README ESPECÍFICO NAS PASTAS `server` e `mobile`.

## Screenshots
<p align="center">
  <img src="https://user-images.githubusercontent.com/48105879/89128491-57392080-d4cc-11ea-96a6-cc88d007e886.png" width="100%" alt="Ecoleta - Home"/>
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/48105879/89128493-5bfdd480-d4cc-11ea-82da-8c4f21dd4379.png" width="100%" alt="Ecoleta - Form"/>
</p>

<p align="center">
💙
</p>