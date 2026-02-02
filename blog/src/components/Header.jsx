"use client"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Header = () => {
    const [text, setText] = useState("PITCHSIDE")
    const [shake, setShake] = useState(false)
    const fullText = "PITCHSIDE"
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    useEffect(() => {
        const runScramble = () => {
            let iterations = 0
            const interval = setInterval(() => {
                setText(() =>
                    fullText
                        .split("")
                        .map((letter, i) => {
                            if (i < iterations) return fullText[i]
                            return chars[Math.floor(Math.random() * chars.length)]
                        })
                        .join("")
                )

                if (iterations >= fullText.length) {
                    clearInterval(interval)
                    // trigger shake at the end
                    setShake(true)
                    setTimeout(() => setShake(false), 400)
                }

                iterations += 0.5
            }, 50)
        }

        // run initially
        runScramble()

        // repeat every 5s
        const loop = setInterval(runScramble, 5000)

        return () => clearInterval(loop)
    }, [])

    return (
        <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center bg-white text-center overflow-hidden">
            {/* Scrambling + Shaking Logo */}
            <motion.h1
                className="text-5xl md:text-7xl font-extrabold text-black tracking-wider"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    x: shake ? [0, -5, 5, -3, 3, 0] : 0,
                }}
                transition={{ duration: shake ? 0.4 : 1, ease: "easeOut" }}
            >
                {text.slice(0, 5)}
                <span style={{ color: "#045e09" }}>{text.slice(5)}</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
                className="mt-3 text-base md:text-lg text-gray-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
            >
                Closer to the Action, Always Pitchside
            </motion.p>

            {/* Underline */}
            <motion.div
                className="mt-3 w-20 h-1 rounded-full"
                style={{ backgroundColor: "#045e09" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
            />

            {/* Glow Pulse */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl"
                style={{ backgroundColor: "#045e09" }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
        </section>
    )
}

export default Header