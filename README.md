# Microserviço de Pagamento

Este é um microserviço de pagamento com pix utilizando Node.js, TypeScript e MercadoPago. Ele é containerizado usando Docker.

## Pré-requisitos

- Docker
- Docker Compose
- Node

## Configuração

### 1. Usando o Docker

Crie um arquivo `.env` no diretório raiz do projeto e adicione sua chave de acesso do MercadoPago:

```
MERCADOPAGO_ACCESS_TOKEN=Access Token
```


crie um arquivo chamado  `docker-compose.yml` no diretório raiz do projeto com o seguinte conteúdo:

```
version: '3.8'

services:
  app:
    image: lima2803/ms-pixmp:latest
    ports:
      - "3000:3000"
    environment:
      MERCADOPAGO_ACCESS_TOKEN: ${MERCADOPAGO_ACCESS_TOKEN}
```

Agora bastar rodar o comando `docker-compose up`

## Testando o Endpoint

Você pode testar o endpoint de criação de pagamento usando uma ferramenta como Postman. Envie uma requisição POST para `http://localhost:3000/api/create_payment` com o seguinte corpo JSON:

```
{
  "transaction_amount": 0,
  "description": "",
  "email": "",
  "first_name": "",
  "last_name": "",
  "cpf": ""
}
```




