import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hexagon, Play } from 'lucide-react'

const SplashScreen = ({ onStart }) => {
    const [name, setName] = useState('')

    const handleStart = (e) => {
        e.preventDefault()
        if (name.trim()) {
            onStart(name)
        }
    }

    return (
        <motion.div
            className="splash-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="splash-card">
                <Hexagon className="splash-logo" size={64} />
                <h2>JWT Generator PRO</h2>
                <p>A ferramenta de segurança definitiva para desenvolvedores.</p>

                <form onSubmit={handleStart} className="splash-form">
                    <input
                        type="text"
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        aria-label="Insira seu nome para começar"
                    />
                    <button type="submit" disabled={!name.trim()}>
                        Começar <Play size={18} />
                    </button>
                </form>

                <div className="splash-footer">
                    <p>Instruções: Insira seu payload JSON, defina um segredo e gere seu token instantaneamente.</p>
                </div>
            </div>
        </motion.div>
    )
}

export default SplashScreen
