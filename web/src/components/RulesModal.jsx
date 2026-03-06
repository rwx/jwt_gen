import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, X } from 'lucide-react'

const RulesModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="modal-card"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                    >
                        <div className="modal-header">
                            <h3><BookOpen size={20} /> Regras e Instruções</h3>
                            <button onClick={onClose} aria-label="Fechar modal"><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            <ul>
                                <li><strong>Payload:</strong> Deve ser um JSON válido. Ex: <code>{"{ \"user\": \"admin\" }"}</code>.</li>
                                <li><strong>Secret:</strong> É a chave privada usada para assinar o token. Nunca compartilhe esta chave.</li>
                                <li><strong>Expiração:</strong> Define por quanto tempo o token será válido (ex: 1h, 2d).</li>
                                <li><strong>Segurança:</strong> Toda geração ocorre localmente no seu navegador.</li>
                            </ul>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default RulesModal
