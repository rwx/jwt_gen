import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
const { generateToken, main } = require('./index');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

describe('JWT Generator', () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        process.env = { ...originalEnv, JWT_SECRET: 'test-secret' };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it('should generate a valid token with correct payload', () => {
        const secret = 'test-secret';
        const payload = { user: 'test-user', role: 'editor' };
        const expiresIn = '2h';

        const token = generateToken(payload, secret, expiresIn);
        expect(token).toBeDefined();

        const decoded = jwt.verify(token, secret);
        expect(decoded.user).toBe('test-user');
        expect(decoded.role).toBe('editor');
    });

    it('should throw error if secret is missing', () => {
        const payload = { test: 'data' };
        expect(() => generateToken(payload, null, '1h')).toThrow('JWT_SECRET is not defined');
    });

    it('should handle complex payloads', () => {
        const secret = 'another-secret';
        const payload = { id: 123, nested: { key: 'value' }, tags: ['a', 'b'] };

        const token = generateToken(payload, secret, '1h');
        const decoded = jwt.verify(token, secret);

        expect(decoded.id).toBe(123);
        expect(decoded.nested.key).toBe('value');
        expect(decoded.tags).toContain('a');
    });

    describe('Main Function & CLI', () => {
        it('should execute main without errors using default values', () => {
            const spy = vi.spyOn(console, 'log').mockImplementation(() => { });
            main();
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        });

        it('should handle valid JSON arguments in main', () => {
            const originalArgv = process.argv;
            process.argv = ['node', 'index.js', '{"cid": 456}'];
            const spy = vi.spyOn(console, 'log').mockImplementation(() => { });

            main();

            expect(spy).toHaveBeenCalledWith(expect.stringContaining('--- TOKEN GERADO ---'));

            process.argv = originalArgv;
            spy.mockRestore();
        });

        it('should warn and use default payload on invalid JSON argument', () => {
            const originalArgv = process.argv;
            process.argv = ['node', 'index.js', 'invalid-json'];
            const loggerWarnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => { });
            const spy = vi.spyOn(console, 'log').mockImplementation(() => { });

            main();

            expect(loggerWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Falha ao parsear payload'), expect.anything());

            process.argv = originalArgv;
            loggerWarnSpy.mockRestore();
            spy.mockRestore();
        });

        it('should exit with 1 on generation error in main', () => {
            delete process.env.JWT_SECRET;

            const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });

            expect(() => main()).toThrow('exit');
            expect(exitSpy).toHaveBeenCalledWith(1);

            exitSpy.mockRestore();
        });
    });

    describe('Logger', () => {
        it('should record info, warn and error logs', () => {
            const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { });

            logger.info('test info');
            logger.warn('test warn');
            logger.error('test error');

            expect(logSpy).toHaveBeenCalledTimes(3);
            logSpy.mockRestore();
        });
    });
});
