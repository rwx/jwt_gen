import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pause, RotateCcw, Play, LogOut } from 'lucide-react'

const PauseMenu = ({ isOpen, onResume, onRestart, onExit }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay pause-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="pause-card"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        <h2>Pausa</h2>
                        <div className="pause-actions">
                            <button onClick={onResume} className="btn-action">
                                <Play size={20} /> Retomar
                            </button>
                            <button onClick={onRestart} className="btn-action">
                                <RotateCcw size={20} /> Reiniciar
                            </button>
                            <button onClick={onExit} className="btn-action btn-danger">
                                <LogOut size={20} /> Finalizar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PauseMenu
