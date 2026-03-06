# Manual Técnico - Gerador JWT

## Introdução
Este documento detalha o funcionamento técnico e operacional do Gerador de Tokens JWT.

## Funcionamento
O script utiliza a biblioteca `jsonwebtoken` para assinar payloads utilizando o algoritmo padrão (HS256).

### Passo a Passo para Integração
1. **Prepare o ambiente**: Garanta que o Node.js está instalado.
2. **Dependências**: Execute `npm install`.
3. **Segurança**: 
   - Defina um `JWT_SECRET` forte no seu `.env`.
   - Nunca compartilhe o seu segredo.
   - Use tempos de expiração curtos para tokens sensíveis.
4. **Execução**: Rode `node index.js` passando os dados desejados.

## Logging e Auditoria
O sistema gera logs em formato JSON no arquivo `app.log` para facilitar o rastreamento de tentativas de geração de tokens, capturando:
- Timestamps.
- Nível de log (INFO, WARN, ERROR).
- Dados contextuais (exceto segredos).

## Solução de Problemas
- **Erro "JWT_SECRET is not defined"**: Verifique se o arquivo `.env` existe e se a chave está corretamente nomeada.
- **Falha no Parse JSON**: Certifique-se de que o argumento passado na CLI está entre aspas simples e é um JSON válido.
