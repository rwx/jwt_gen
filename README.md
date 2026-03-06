# Gerador de Tokens JWT

## 📝 Propósito
Este é um utilitário simples em Node.js para geração de JSON Web Tokens (JWT) seguindo padrões de segurança e logging estruturado.

## 📖 Manual de Uso
### Requisitos
- Node.js 20+
- NPM

### Instalação
1. `npm install`
2. Configure as variáveis de ambiente baseando-se no `.env.example`.

### Geração de Token (CLI)
Para gerar um token com o payload padrão:
```bash
node index.js
```

Para gerar um token com um payload customizado:
```bash
node index.js '{"id": 123, "email": "teste@exemplo.com"}'
```

---

## 🌐 Interface Web
O projeto agora conta com uma interface web moderna e intuitiva para geração de tokens via navegador.

### Como Executar
1. `npm run web:dev`
2. Acesse o endereço informado no terminal (geralmente `http://localhost:5173`).

### Funcionalidades
- Input de payload JSON com feedback em tempo real.
- Campo de segredo (Secret) com máscara de senha.
- Configuração de expiração.
- Botão "Copiar" para exportação rápida do token.

## 🚀 Procedimentos de Implantação

### Docker
```bash
docker build -t jwt_gen .
docker run -e JWT_SECRET=seu_segredo jwt_gen '{"user": "docker-test"}'
```

## 🛠 Configuração e Ajustes
Todas as configurações de expiração e segredo são realizadas via variáveis de ambiente (`.env`).

## 📂 Dicionário de Arquivos
- `index.js`: Lógica core de geração.
- `logger.js`: Utilitário de logging estruturado (JSON).
- `Dockerfile`: Configuração para containerização.
- `app.log`: Arquivo onde os logs são persistidos.

## 📜 Licença
GNU GPLv3
