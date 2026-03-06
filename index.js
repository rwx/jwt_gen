require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('./logger');

const generateToken = (payload, secret, expiresIn) => {
    try {
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }

        logger.info('Iniciando geração de token', { payload, expiresIn });

        const token = jwt.sign(payload, secret, { expiresIn });

        logger.info('Token gerado com sucesso');
        return token;
    } catch (error) {
        logger.error('Erro na geração de token', { error: error.message });
        throw error;
    }
};

const main = () => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    // Exemplo de payload a partir de argumentos da CLI ou default
    const args = process.argv.slice(2);
    let payload = { user: 'guest', role: 'admin' };

    if (args.length > 0) {
        try {
            payload = JSON.parse(args[0]);
        } catch (e) {
            logger.warn('Falha ao parsear payload JSON dos argumentos. Usando padrão.', { arg: args[0] });
        }
    }

    try {
        const token = generateToken(payload, secret, expiresIn);
        console.log('\n--- TOKEN GERADO ---\n');
        console.log(token);
        console.log('\n---------------------\n');
    } catch (error) {
        process.exit(1);
    }
};

if (require.main === module) {
    main();
}

module.exports = { generateToken, main };
