# 🎉 Event Planner

Aplicação fullstack para criação e gerenciamento de eventos, permitindo compartilhar convites por link e coletar confirmações de presença sem exigir cadastro dos convidados.

## ✨ Funcionalidades

### 🔐 Autenticação

* Registro e login de usuários
* Gerenciado com Neon Auth

### 📅 Eventos

* Criação de eventos
* Geração de link único para compartilhamento
* Acesso público ao evento sem necessidade de conta

### 📩 Confirmação de presença (RSVP)

* Convidados informam:

  * Nome
  * Email
  * Status:

    * Vai
    * Talvez
    * Não vai

### 📊 Dashboard

* Listagem de eventos criados
* Contagem de respostas:

  * Confirmados
  * Talvez
  * Recusados
* Visualização detalhada dos participantes:

  * Nome
  * Email
  * Status

## 🛠️ Tecnologias

### Frontend

* Next.js
* React
* TailwindCSS
* shadcn/ui
* Radix UI

### Backend

* Next.js (Server Actions / API)
* Prisma ORM
* PostgreSQL (Neon)

### Outros

* Neon Auth
* TypeScript

## 📦 Instalação

```bash
git clone git@github.com:Rafhael-Augusto/event-planner.git
cd event-planner
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="database-url"

NEON_AUTH_BASE_URL="neon-auth-url"
NEON_AUTH_COOKIE_SECRET="cookie-secret"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🧱 Banco de dados

```bash
npx prisma generate
npx prisma migrate dev
```

## 🚀 Rodando o projeto

```bash
npm run dev
```

Acesse:
http://localhost:3000

## Deploy

```bash
https://event-planner-omega-liard.vercel.app/
```
