# 🎓 Academic Tracker

Sistema acadêmico para gerenciar usuários (alunos e professores), turmas, grupos e atividades.  
Desenvolvido com React + TypeScript, o projeto implementa autenticação simples com rotas protegidas e telas estilizadas com CSS puro.

---

## 🚀 Funcionalidades

- ✅ Tela de **Login** com validação de credenciais e botão para mostrar senha
- ✅ Tela de **Cadastro** com seleção entre **Aluno** ou **Professor**
- ✅ Validação de senha e confirmação
- ✅ Redirecionamento após login
- ✅ Tela de **Dashboard** com navegação no topo
- ✅ Navegação entre páginas protegidas
- ✅ Estilização com CSS puro

---

## 🖼️ Telas do sistema

### 🔐 Login
- Campos de e-mail e senha
- Ícone de olho para visualizar senha
- Link para tela de cadastro

### 📝 Cadastro
- Campos: nome, matrícula, e-mail, senha, confirmação
- Botões de opção para tipo de usuário (aluno ou professor)
- Validação de senhas
- Mensagem dinâmica: **Cadastrar aluno** ou **Cadastrar professor**

### 📊 Dashboard
- Acesso apenas após login
- Header fixo com navegação: Turmas, Grupos, Acompanhamentos, Perfil
- Mensagem de boas-vindas

---

## 🛠️ Tecnologias utilizadas

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Vite (para build e dev server)
- CSS puro

---

## 📁 Estrutura de pastas

```
src/
├── assets/
├── contexts/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Dashboard.tsx
│   ├── Turmas.tsx
│   ├── Grupos.tsx
│   ├── Atividades.tsx
│   └── NotFound.tsx
├── routes/
│   └── PrivateRoute.tsx
├── styles/
│   ├── global.css
│   └── dashboard.css
└── App.tsx
```

---

## 🧪 Como testar o sistema

#### ✅ 1. Testar Login

- Acesse: [http://localhost:5173/](http://localhost:5173/)
- Use as credenciais de teste:
  ```
  Email: teste@email.com
  Senha: 123456
  ```
- Clique em **Entrar**
- Você será redirecionada para a **Dashboard**

#### ✅ 2. Testar Cadastro

- Na tela de login, clique em **"Quero me cadastrar"**
- Preencha os campos obrigatórios:
  - Nome
  - Matrícula
  - E-mail
  - Senha e confirmação de senha
  - Selecione o tipo de usuário: **Aluno** ou **Professor**
- Clique em **Cadastrar**
- Você verá uma mensagem de sucesso e será redirecionada para o login

#### ✅ 3. Testar Proteção de Rotas

- Tente acessar diretamente: [http://localhost:5173/dashboard](http://localhost:5173/dashboard) **sem estar logada**
- O sistema deve redirecionar automaticamente para a tela de **login**

---

## ▶️ Como rodar o projeto localmente

```bash
git clone https://github.com/seu-usuario/academic-tracker.git
cd academic-tracker
npm install
npm run dev
```

Acesse o sistema em: [http://localhost:5173/](http://localhost:5173/)

