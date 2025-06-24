# Secured Users

## Descrição
Em meio a tanto ataques cibernéticos, é crucial ter uma plataforma de cadastro e login segura, então, decidi criar a API Secured Users, cuja sua função é manter dados dos usuários devidamente protegidos em um sistema robusto e confiável.

## Tecnologias usadas
- **Linguagens:** Node.js (Javascript)
- **Banco de dados:** MongoDB, Redis
- **Frameworks:** Mongoose, Express, Argon2, Ioredis

## Como usar

### Passo 1
O formato do body deve ser a seguinte, por exemplo:
```json
{
    "nickname": "usuario",
    "password": "12345678"
}
```
**Observações:**
- *nickname* deve ser alfanumérico e precisa ter entre 5 a 20 caracteres.
- *password* precisa ter entre 8 a 20 caracteres.

### Passo 2
Existem duas rotas, no método POST:
- Para cadastrar -> /api/auth/signup
- Para acessar conta -> /api/auth/login
