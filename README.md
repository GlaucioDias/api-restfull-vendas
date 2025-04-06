## API Restful com Node.js, Express, Typescript, Redis, Typeorm, Postgres

### Rodando a aplicação no seu PC

Faça um clone deste repositório e instale no seu ambiente de desenvolvimento usando o seguinte comando no seu terminal:

```
git clone https://github.com/GlaucioDias/api-restfull-vendas.git

git checkout v2
```

Ou faça o download ZIP:

```
https://github.com/GlaucioDias/api-restfull-vendas/archive/refs/heads/v2.zip
```

Após clonar o conteúdo do repositório ou baixar o arquivo zip e descompactar, acesse o diretório criado e efetue
o comando para rodar o container:

```
cd api-restfull-vendas

yarn docker:up:build

# ou

npm run docker:up:build
```

O servidor estará em execução no endereço `http://localhost:3333`

Disponibilizei na pasta Docs um arquivo collection do insomnia

## Dependências necessárias:
- Docker
- docker compose >= 2.12.2
