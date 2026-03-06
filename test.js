const { generateToken } = require('./index');
const jwt = require('jsonwebtoken');

const testGeneration = () => {
    const secret = 'test-secret';
    const payload = { test: 'data' };
    const expiresIn = '1h';

    console.log('--- Iniciando Teste de Geração ---');
    try {
        const token = generateToken(payload, secret, expiresIn);
        const decoded = jwt.verify(token, secret);

        if (decoded.test === 'data') {
            console.log('Teste PASSOU: Token gerado e verificado com sucesso.');
        } else {
            console.log('Teste FALHOU: Payload decodificado incorreto.');
            process.exit(1);
        }
    } catch (e) {
        console.error('Teste FALHOU com erro:', e.message);
        process.exit(1);
    }
};

testGeneration();
