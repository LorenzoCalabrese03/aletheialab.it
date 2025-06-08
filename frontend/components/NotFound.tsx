"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Home } from "lucide-react"
//import { Button } from "@/components/ui/button"

export default function NotFound() {
    const [isVisible, setIsVisible] = useState(false)
    const [isDisconnected, setIsDisconnected] = useState(false)
    const [showSpark, setShowSpark] = useState(false)

    useEffect(() => {
        setIsVisible(true)

        // Avvia la sequenza di animazione dopo un ritardo iniziale
        const disconnectTimeout = setTimeout(() => {
            // Mostra prima la scintilla
            setShowSpark(true)

            // Dopo un breve momento, stacca il cavo
            setTimeout(() => {
                setIsDisconnected(true)
                // Nascondi la scintilla dopo che il cavo si è staccato
                setTimeout(() => {
                    setShowSpark(false)
                }, 300)
            }, 500)
        }, 1500)

        return () => clearTimeout(disconnectTimeout)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4 overflow-hidden">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Numero 404 animato */}
                <h1
                    className={`text-9xl font-extrabold tracking-widest text-primary transition-all duration-1000 ease-in-out ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
                    }`}
                >
                    404
                </h1>

                {/* Illustrazione del cavo che si stacca */}
                <div className="relative h-64 w-full my-8">
                    {/* Server */}
                    <div className="absolute top-4 left-4 w-20 h-32 bg-slate-700 rounded-md flex flex-col items-center justify-center">
                        <div
                            className={`w-4 h-4 ${isDisconnected ? "bg-red-500" : "bg-green-400"} rounded-full mb-2 ${isDisconnected ? "" : "animate-pulse"}`}
                        ></div>
                        <div className="w-16 h-1 bg-slate-600 mb-1"></div>
                        <div className="w-16 h-1 bg-slate-600 mb-1"></div>
                    </div>

                    {/* Computer */}
                    <div className="absolute top-8 right-4 w-28 h-20 bg-slate-800 rounded-md">
                        <div
                            className={`w-28 h-16 ${isDisconnected ? "bg-slate-900" : "bg-blue-900"} rounded-t-md border-b-4 border-slate-700 transition-colors duration-500`}
                        ></div>
                        <div className="w-20 h-2 bg-slate-700 mx-auto mt-1"></div>
                    </div>

                    {/* Porta di connessione sul computer */}
                    <div className="absolute top-20 right-10 w-4 h-4 bg-slate-600 rounded-sm"></div>

                    {/* Cavo di rete - parte fissa collegata al server */}
                    <div className="absolute top-20 left-24 w-16 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full"></div>

                    {/* Cavo di rete - parte che si stacca */}
                    <div
                        className={`absolute top-20 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-in-out ${
                            isDisconnected ? "left-40 w-32 rotate-12 translate-y-24" : "left-40 right-14 rotate-0"
                        }`}
                        style={{
                            transformOrigin: "left center",
                            boxShadow: isDisconnected ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
                        }}
                    ></div>

                    {/* Connettore del cavo */}
                    <div
                        className={`absolute top-19 w-4 h-6 bg-gray-400 rounded-sm transition-all duration-1000 ease-in-out ${
                            isDisconnected ? "right-24 rotate-45 translate-y-24" : "right-10 rotate-0"
                        }`}
                        style={{
                            transformOrigin: "left center",
                        }}
                    ></div>

                    {/* Effetto scintilla quando il cavo si stacca */}
                    {showSpark && (
                        <div className="absolute top-18 right-10 w-6 h-6">
                            <div className="absolute inset-0 bg-yellow-300 rounded-full animate-ping opacity-70"></div>
                            <div className="absolute inset-1 bg-white rounded-full animate-pulse"></div>
                            <div className="absolute top-1 right-1 w-1 h-3 bg-yellow-300 rotate-45"></div>
                            <div className="absolute top-1 right-3 w-1 h-2 bg-yellow-300 -rotate-45"></div>
                        </div>
                    )}
                </div>

                {/* Messaggio animato */}
                <div
                    className={`space-y-2 transition-all duration-1000 delay-300 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">Coding in progress</h2>
                    <p className="text-muted-foreground">
                        {isDisconnected
                            ? "Ops! Stiamo lavorando al nostro sito"
                            : "Ci dispiace, la pagina che stai cercando non esiste o è stata spostata."}
                    </p>
                </div>

                {/* Pulsante animato */}
                <div
                    className={`mt-8 transition-all duration-1000 delay-500 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <Link href="/">
                        <button
                            className="group relative overflow-hidden rounded-full px-8 py-6 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"

                        >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="mr-1 h-5 w-5 transition-transform group-hover:rotate-12" />
                Torna alla Home
              </span>
                            <span className="absolute bottom-0 left-0 h-1 w-0 bg-background transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
