'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Player = {
    id: string
    name_ar: string
    number: number
    position: string
    photo: string
}

type Lineup = {
    id: string
    opponent_ar: string
    opponent: string
    match_date: string
    formation: string
    players: Player[]
}

export default function LineupSection() {
    const [lineup, setLineup] = useState<Lineup | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchLineup() {
            const { data, error } = await supabase
                .from('lineups')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)

            console.log('lineup data no filter:', data, error)


            const item = data?.[0]
            if (item) {
                const parsed = {
                    ...item,
                    players: typeof item.players === 'string'
                        ? JSON.parse(item.players)
                        : item.players
                }
                setLineup(parsed)
            }



            setLoading(false)
        }
        fetchLineup()
    }, [])


    if (loading || !lineup) return null

    const matchTime = new Date(lineup.match_date.replace(' ', 'T').replace('+00', '+00:00'))
        .toLocaleTimeString('ar-TN', { hour: '2-digit', minute: '2-digit' })



    const gk = lineup.players.filter(p => p.position === 'GK')
    const def = lineup.players.filter(p => p.position === 'DEF')
    const mid = lineup.players.filter(p => p.position === 'MID')
    const fwd = lineup.players.filter(p => p.position === 'FWD')

    const rows = [fwd, mid, def, gk]

    return (
        <section className="py-16 px-4 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-3xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-10">
                    <p className="text-[#F7C600] text-[11px] font-bold tracking-[0.4em] uppercase mb-2">
                        مباراة اليوم
                    </p>
                    <h2 className="text-white font-black text-2xl sm:text-3xl mb-1">
                        الاتحاد الرياضي ببنقردان
                    </h2>
                    <div className="flex items-center justify-center gap-3 mt-2">
                        <span className="text-gray-400 text-sm">ضد</span>
                        <span className="text-[#F7C600] font-black text-xl">{lineup.opponent_ar}</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <span className="text-gray-500 text-xs bg-[#111] border border-[#2a2a2a] px-3 py-1 rounded-full">
                            ⏰ {matchTime}
                        </span>
                        <span className="text-gray-500 text-xs bg-[#111] border border-[#2a2a2a] px-3 py-1 rounded-full">
                            {lineup.formation}
                        </span>
                    </div>
                </div>

                {/* Football Pitch */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #1a3a1a 0%, #1e4a1e 25%, #1a3a1a 50%, #1e4a1e 75%, #1a3a1a 100%)',
                        border: '2px solid rgba(255,255,255,0.06)',
                    }}
                >
                    {/* Pitch lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 600" preserveAspectRatio="none">
                        {/* Outer border */}
                        <rect x="20" y="20" width="360" height="560" fill="none" stroke="white" strokeWidth="2" />
                        {/* Center line */}
                        <line x1="20" y1="300" x2="380" y2="300" stroke="white" strokeWidth="2" />
                        {/* Center circle */}
                        <circle cx="200" cy="300" r="60" fill="none" stroke="white" strokeWidth="2" />
                        <circle cx="200" cy="300" r="4" fill="white" />
                        {/* Top penalty box */}
                        <rect x="110" y="20" width="180" height="90" fill="none" stroke="white" strokeWidth="2" />
                        <rect x="155" y="20" width="90" height="40" fill="none" stroke="white" strokeWidth="2" />
                        {/* Bottom penalty box */}
                        <rect x="110" y="490" width="180" height="90" fill="none" stroke="white" strokeWidth="2" />
                        <rect x="155" y="540" width="90" height="40" fill="none" stroke="white" strokeWidth="2" />
                        {/* Top penalty spot */}
                        <circle cx="200" cy="140" r="3" fill="white" />
                        {/* Bottom penalty spot */}
                        <circle cx="200" cy="460" r="3" fill="white" />
                    </svg>

                    {/* Players on pitch */}
                    <div className="relative z-10 py-8 px-4 space-y-6">
                        {rows.map((rowPlayers, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center gap-4 flex-wrap">
                                {rowPlayers.map(player => (
                                    <div key={player.id} className="flex flex-col items-center gap-1 w-16">
                                        {/* Player avatar */}
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#F7C600] bg-[#1a1a1a] shadow-[0_0_15px_rgba(247,198,0,0.3)]">
                                            {player.photo ? (
                                                <img
                                                    src={player.photo}
                                                    alt={player.name_ar}
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-[#F7C600] text-xs font-black">
                                                        {player.number || '?'}
                                                    </span>
                                                </div>
                                            )}
                                            {/* Number badge */}
                                            {player.number && (
                                                <span className="absolute -bottom-1 -right-1 bg-[#F7C600] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                                    {player.number}
                                                </span>
                                            )}
                                        </div>
                                        {/* Player name */}
                                        <p className="text-white text-[10px] font-bold text-center leading-tight line-clamp-2">
                                            {player.name_ar.split(' ')[0]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* USBG label bottom */}
                    <div className="relative z-10 text-center pb-4">
                        <span className="text-white/20 text-xs font-black tracking-widest">USBG</span>
                    </div>
                </div>

                {/* VS bar below pitch */}
                <div className="flex items-center justify-between mt-6 bg-[#111] border border-[#1e1e1e] rounded-2xl px-6 py-4">
                    <div className="text-center">
                        <p className="text-[#F7C600] font-black text-sm">الاتحاد ببنقردان</p>
                        <p className="text-gray-600 text-[10px] mt-0.5">USBG</p>
                    </div>
                    <div className="text-center">
                        <span className="text-white/20 font-black text-2xl">VS</span>
                        <p className="text-[#F7C600] text-xs font-bold mt-0.5">{matchTime}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[#F7C600] font-black text-sm">{lineup.opponent_ar}</p>
                        <p className="text-gray-600 text-[10px] mt-0.5">{lineup.opponent}</p>
                    </div>
                </div>

            </div>
        </section>
    )
}
