import React, { useState, useEffect } from 'react'
import { Howl } from 'howler'
import { Volume2, VolumeX } from 'lucide-react'

const AudioController = ({ onMuteChange }) => {
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('jwt_muted') === 'true'
    })

    useEffect(() => {
        localStorage.setItem('jwt_muted', isMuted)
        if (onMuteChange) onMuteChange(isMuted)
    }, [isMuted])

    return (
        <button
            className="audio-toggle"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Ativar som" : "Desativar som"}
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    )
}

export const useAudio = () => {
    const [sounds, setSounds] = useState({})

    useEffect(() => {
        const sfx = {
            generate: new Howl({ src: ['/audio/generate.ogg'] }),
            success: new Howl({ src: ['/audio/success.ogg'] }),
            ambient: new Howl({ src: ['/audio/ambient.ogg'], loop: true, volume: 0.3 })
        }
        setSounds(sfx)
        return () => {
            Object.values(sfx).forEach(s => s.unload())
        }
    }, [])

    const playSound = (name, isMuted) => {
        if (!isMuted && sounds[name]) {
            sounds[name].play()
        }
    }

    return { sounds, playSound }
}

export default AudioController
