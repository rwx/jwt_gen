import React, { useState, useEffect } from 'react'
import * as jose from 'jose'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Pause as PauseIcon, Share2, FileDown, LogOut } from 'lucide-react'
import jsPDF from 'jspdf'
import confetti from 'canvas-confetti'
import SplashScreen from './components/SplashScreen'
import RulesModal from './components/RulesModal'
import PauseMenu from './components/PauseMenu'
import AudioController, { useAudio } from './components/AudioController'
import './App.css'

function App() {
    const [user, setUser] = useState(() => localStorage.getItem('jwt_user') || '')
    const [isStarted, setIsStarted] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isRulesOpen, setIsRulesOpen] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    const [payload, setPayload] = useState('{\n  "user": "visitante",\n  "role": "admin"\n}')
    const [secret, setSecret] = useState('')
    const [expiresIn, setExpiresIn] = useState('1h')
    const [token, setToken] = useState('')
    const [error, setError] = useState('')
    const [copied, setCopied] = useState(false)

    const { playSound } = useAudio()

    const handleStart = (userName) => {
        setUser(userName)
        localStorage.setItem('jwt_user', userName)
        setIsStarted(true)
    }

    const handleGenerate = async () => {
        try {
            setError('')
            const parsedPayload = JSON.parse(payload)
            if (!secret) throw new Error('O segredo (Secret) é obrigatório.')

            playSound('generate', isMuted)

            const secretKey = new TextEncoder().encode(secret)
            const generatedToken = await new jose.SignJWT(parsedPayload)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(expiresIn)
                .sign(secretKey)

            setToken(generatedToken)
            setCopied(false)

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#4f46e5', '#818cf8']
            })

            playSound('success', isMuted)
        } catch (err) {
            setError(err.message)
            setToken('')
        }
    }

    const copyToClipboard = () => {
        if (token) {
            navigator.clipboard.writeText(token)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const shareViaWhatsApp = () => {
        const text = `JWT Gerado por ${user}:\n\n${token}`
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')
    }

    const exportPDF = () => {
        const doc = new jsPDF()
        doc.setFontSize(22)
        doc.text('Certificado de Geração JWT', 20, 30)
        doc.setFontSize(12)
        doc.text(`Usuário: ${user}`, 20, 50)
        doc.text(`Data: ${new Date().toLocaleString()}`, 20, 60)
        doc.text('Token:', 20, 80)
        doc.setFontSize(8)
        const splitToken = doc.splitTextToSize(token, 170)
        doc.text(splitToken, 20, 90)
        doc.save('jwt-token.pdf')
    }

    return (
        <div className="app-root">
            <AnimatePresence>
                {!isStarted ? (
                    <SplashScreen onStart={handleStart} />
                ) : (
                    <motion.div
                        key="main"
                        className="main-app"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <nav className="top-nav">
                            <div className="nav-left">
                                <AudioController onMuteChange={setIsMuted} />
                                <button
                                    className="nav-btn"
                                    onClick={() => setIsRulesOpen(true)}
                                    aria-label="Ver regras"
                                    title="Ver regras"
                                >
                                    <BookOpen size={20} />
                                </button>
                            </div>
                            <div className="nav-right">
                                <button
                                    className="nav-btn"
                                    onClick={() => setIsPaused(true)}
                                    aria-label="Pausar"
                                    title="Pausar"
                                >
                                    <PauseIcon size={20} />
                                </button>
                            </div>
                        </nav>

                        <header className="header">
                            <h1>Gerador JWT</h1>
                            <p>Olá, {user}! Pronto para gerar tokens seguros?</p>
                        </header>

                        <div className="card input-section">
                            <div className="form-group">
                                <label>Payload (JSON)</label>
                                <textarea
                                    value={payload}
                                    onChange={(e) => setPayload(e.target.value)}
                                    placeholder='{"id": 123}'
                                    rows={4}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Secret</label>
                                    <input
                                        type="password"
                                        value={secret}
                                        onChange={(e) => setSecret(e.target.value)}
                                        placeholder="Segredo"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Expiração</label>
                                    <input
                                        type="text"
                                        value={expiresIn}
                                        onChange={(e) => setExpiresIn(e.target.value)}
                                        placeholder="1h..."
                                    />
                                </div>
                            </div>

                            <button className="btn-generate" onClick={handleGenerate}>
                                Gerar Token
                            </button>

                            {error && <div className="error-message">{error}</div>}
                        </div>

                        <AnimatePresence>
                            {token && (
                                <motion.div
                                    className="card result-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="token-actions">
                                        <button onClick={shareViaWhatsApp} title="Compartilhar no WhatsApp"><Share2 size={18} /></button>
                                        <button onClick={exportPDF} title="Download PDF"><FileDown size={18} /></button>
                                    </div>
                                    <div className="token-display">
                                        <code>{token}</code>
                                    </div>
                                    <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={copyToClipboard}>
                                        {copied ? 'Copiado!' : 'Copiar'}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <footer className="footer-bar">
                            <p>RWX Soluções Inteligentes</p>
                        </footer>
                    </motion.div>
                )}
            </AnimatePresence>

            <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
            <PauseMenu
                isOpen={isPaused}
                onResume={() => setIsPaused(false)}
                onRestart={() => window.location.reload()}
                onExit={() => setIsStarted(false)}
            />
        </div>
    )
}

export default App
