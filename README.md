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

### Docker (Local)
```bash
docker build -t jwt_gen .
docker run -p 8080:8080 jwt_gen
```

### Google Cloud Run
Para implantar no Google Cloud Run, execute:
1.  **Build & Push**: `gcloud builds submit --tag gcr.io/[PROJECT-ID]/jwt-gen`
2.  **Deploy**: `gcloud run deploy jwt-gen --image gcr.io/[PROJECT-ID]/jwt-gen --platform managed --allow-unauthenticated`

## 🛠 Configuração e Ajustes
Todas as configurações de expiração e segredo são realizadas via variáveis de ambiente (`.env`).

## 📂 Dicionário de Arquivos
- `index.js`: Lógica core de geração.
- `logger.js`: Utilitário de logging estruturado (JSON).
- `Dockerfile`: Configuração para containerização.
- `app.log`: Arquivo onde os logs são persistidos.

## 📜 Licença
GNU GPLv3
