# Questify — estrutura local do Squad 1

```text
frontend/              telas, CSS e JavaScript do navegador
backend/               servidor Node e rotas de cadastro/login
backend/java-legacy/   rascunho Spring original, preservado como referência
database/              criação automática da tabela PostgreSQL
```

## Forma recomendada: tudo automático com Docker

É necessário instalar apenas o **Docker Desktop**. Não é preciso instalar PostgreSQL, pgAdmin ou Node na máquina. Na raiz do projeto, execute:

```powershell
docker compose up --build
```

O comando baixa as imagens, cria o PostgreSQL, cria automaticamente a tabela `users`, inicia o Node e publica o site em [http://localhost:3000](http://localhost:3000). O cadastro grava no banco e o login valida o usuário cadastrado.

Para parar: `docker compose down`. Os dados permanecem no volume Docker. Para apagar inclusive os dados e iniciar um banco vazio: `docker compose down -v`.

## Alternativa sem Docker

Com PostgreSQL e Node já instalados: crie o banco `questify`, copie `.env.example` para `.env`, ajuste a senha e execute `npm.cmd install` seguido de `npm.cmd run dev`. Na inicialização, o backend executa `database/init.sql` automaticamente.

## Limite técnico

Nenhum código consegue executar PostgreSQL em qualquer computador que não tenha um servidor, binary ou contêiner para isso. O Docker é o componente que fornece esse servidor de maneira reproduzível e automatizada para todos do grupo.
