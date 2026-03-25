# Gerador de Tokens JWT v2.0.0

## 📝 Propósito
Este é um utilitário profissional para geração de JSON Web Tokens (JWT) seguindo padrões de segurança e logging estruturado. Consiste em uma interface Web moderna exposta na porta 8080.

---

## 📖 Manual do Usuário
O sistema permite gerar tokens JWT assinados via HS256.
A aplicação expõe sua **Interface Web** de forma nativa e direta (default) na porta 8080. O foco é garantir um ambiente amigável para testes rápidos e visualização de tokens (UI/UX premium).

### Requisitos
- Node.js 20+
- NPM
- Docker (opcional para containerização)

### Instalação
1. `npm install`
2. Configure o secret no arquivo `.env` (use `.env.example` como base).

---

## 🌐 Interface Web
Acesse a interface premium carregada pelo Express na porta `8080`:
- Basta executar: `npm start` e abrir no navegador: `http://localhost:8080`.
- Ocasionalmente em desenvolvimento do frontend use `npm run web:dev`.

---

## 🚀 Procedimentos de Implantação (RNF.01.03 / RNF.05.04)

### 🐳 Docker & Docker Compose
```bash
# Build
docker build -t jwt_gen .
# Run (Local)
docker run -p 8080:8080 jwt_gen
# Docker Compose
docker-compose up -d
```

### 📦 Podman
```bash
podman build -t jwt_gen .
podman run -p 8080:8080 jwt_gen
```

### ☸️ Kubernetes (k8s)
```bash
kubectl apply -f k8s.yaml
```

### ☁️ Google Cloud Run
```bash
# Opção 1: Deploy direto pelo código-fonte (Recomendado - não exige [PROJECT-ID] manual na URL)
gcloud run deploy jwt-gen --source . --platform managed --allow-unauthenticated

# Opção 2: Build manual via Artifact/Container Registry
gcloud builds submit --tag gcr.io/[PROJECT-ID]/jwt-gen .
gcloud run deploy jwt-gen --image gcr.io/[PROJECT-ID]/jwt-gen --platform managed --allow-unauthenticated
```

### ☁️ Google App Engine
Configure o `app.yaml`:
```yaml
runtime: nodejs20
instance_class: F1
env_variables:
  PORT: 8080
```
`gcloud app deploy`

### ⚡ AWS Lambda
Para execução em Lambda, utilize o adaptador `serverless-http` ou configure a imagem de container para expor o handler do Express em um Web Adapter (AWS Lambda Web Adapter).

---

## 🛠 Configuração, Ajustes e Customizações (RNF.05.06)
A aplicação é altamente customizável via variáveis de ambiente e arquivos de configuração:
- **JWT_SECRET**: Chave de assinatura (String).
- **JWT_EXPIRES_IN**: Tempo de vida do token (Ex: `1h`, `2d`, `365d`).
- **PORT**: Porta do servidor Web (Padrão 8080).
- **Customização de Campos**: No `App.jsx`, você pode alterar os campos padrão do payload JSON inicial.

---

## 📂 Dicionário de Arquivos (RNF.05.05)
- `server.js`: Servidor Express de produção e porta de entrada principal 8080.
- `index.js`: Lógica legado/rotinas internas.
- `logger.js`: Sistema de logs estruturados (JSON).
- `Dockerfile`: Configuração multi-estágio para containerização.
- `docker-compose.yml`: Orquestração local.
- `k8s.yaml`: Manifesto para clusters Kubernetes.
- `web/`: Diretório contendo o código-fonte da interface React/Vite.
- `app.log`: Arquivo de log gerado em tempo de execução.

---

## 📜 Changelog (RNF.05.10)
- **v2.0.0**: Migração para interface Web premium, suporte a Cloud Run, Docker multi-stage e exportação PDF.
- **v1.1.0**: Implementação de logging estruturado e suporte a CLI.
- **v1.0.0**: Lógica inicial de geração com `jsonwebtoken`.

---

## 🛡️ Segurança
- Não há credenciais ou chaves fixas no código (hardcoded).
- Validação rigorosa de inputs no frontend e backend.

---

## 👨‍💻 Desenvolvedor
Desenvolvido por **RWX Soluções Inteligentes**.

## 📜 Licença
GNU GPLv3
