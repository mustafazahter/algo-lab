import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { CornerDownRight, Play, SkipForward, RotateCcw, Layers } from 'lucide-react';

const Recursion = () => {
    const [moves, setMoves] = useState([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
    const [disks, setDisks] = useState({
        A: [3, 2, 1], // Diskler: 3 (En büyük), 2 (Orta), 1 (Küçük)
        B: [],
        C: []
    });

    // Call Stack görselleştirme için state
    const [callStack, setCallStack] = useState([]);
    const [activeCall, setActiveCall] = useState(null);

    // Ref ile animasyon kontrolü
    const stackRef = useRef([]);

    // Hanoi Çözücü (Generator mantığıyla veya ön hesaplamalı)
    // Stack trace'i kaydetmek için özelleştirilmiş recursive fonksiyon
    const solveHanoi = (n, from, to, aux, moveList, depth = 0) => {
        // Fonksiyon çağrısı (Call Stack Push)
        const callId = `hanoi(${n}, ${from}, ${to})`;
        moveList.push({ type: 'CALL', id: callId, n, from, to, depth });

        if (n === 1) {
            moveList.push({ type: 'MOVE', n, from, to, log: `Disk ${n}: ${from} -> ${to}` });
            moveList.push({ type: 'RETURN', id: callId, result: 'Done' });
            return;
        }

        solveHanoi(n - 1, from, aux, to, moveList, depth + 1);
        moveList.push({ type: 'MOVE', n, from, to, log: `Disk ${n}: ${from} -> ${to}` });
        solveHanoi(n - 1, aux, to, from, moveList, depth + 1);

        // Fonksiyon dönüşü (Call Stack Pop)
        moveList.push({ type: 'RETURN', id: callId, result: 'Done' });
    };

    const startSimulation = () => {
        const actionList = [];
        solveHanoi(3, 'A', 'C', 'B', actionList);
        setMoves(actionList);
        setCurrentMoveIndex(-1);
        setDisks({ A: [3, 2, 1], B: [], C: [] });
        setCallStack([]);
        setActiveCall(null);
    };

    const nextStep = () => {
        const nextIdx = currentMoveIndex + 1;
        if (nextIdx >= moves.length) return;

        const action = moves[nextIdx];
        setCurrentMoveIndex(nextIdx);

        if (action.type === 'CALL') {
            const newCall = { id: action.id, n: action.n, from: action.from, to: action.to, depth: action.depth };
            setCallStack(prev => [...prev, newCall]);
            setActiveCall(newCall);
        } else if (action.type === 'RETURN') {
            setCallStack(prev => prev.slice(0, -1));
            setActiveCall(callStack[callStack.length - 2] || null);
        } else if (action.type === 'MOVE') {
            setDisks(prev => {
                const newDisks = { ...prev };
                const diskToMove = newDisks[action.from].pop();
                newDisks[action.to].push(diskToMove);
                return newDisks;
            });
        }
    };

    const reset = () => {
        setMoves([]);
        setCurrentMoveIndex(-1);
        setDisks({ A: [3, 2, 1], B: [], C: [] });
        setCallStack([]);
        setActiveCall(null);
    };

    const renderTower = (towerId, diskArray) => (
        <div style={{ flex: 1, minWidth: 'clamp(80px, 25vw, 120px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: 'clamp(180px, 40vw, 200px)', borderBottom: '4px solid var(--border-medium)', position: 'relative' }}>
            {/* Direk */}
            <div style={{ position: 'absolute', bottom: 0, width: 'clamp(4px, 1.5vw, 6px)', height: 'clamp(160px, 35vw, 180px)', background: 'var(--border-light)', zIndex: 0, borderRadius: '4px 4px 0 0' }} />

            <div style={{ zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', marginBottom: '4px' }}>
                {diskArray.map((diskSize, i) => (
                    <div key={i} className="animate-fade-in" style={{
                        width: `clamp(${diskSize * 25 + 15}px, ${diskSize * 10 + 5}vw, ${diskSize * 40 + 20}px)`,
                        height: 'clamp(18px, 5vw, 24px)',
                        background: diskSize === 1 ? 'var(--primary)' : diskSize === 2 ? 'var(--accent)' : 'var(--success)',
                        borderRadius: '4px',
                        marginBottom: '2px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }} />
                ))}
            </div>
            <div style={{ fontWeight: '600', marginTop: '10px', color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)' }}>Kule {towerId}</div>
        </div>
    );

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700' }}>2.5 Özyineleme (Recursion)</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Bir problemin çözümünü, kendisinin daha küçük versiyonlarına indirgeyerek parça parça çözme yöntemi.</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)' }}>Temel İlke</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Fonksiyonun kendini çağırmasıdır. Her çağrı bellekteki <strong>Stack (Yığın)</strong> bölgesine eklenir.
                        Base Case (Durma Koşulu) sağlanana kadar yığın büyür, sonra sırayla çözülerek küçülür.
                    </p>
                </Card>
                <Card>
                    <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)' }}>Hanoi Kuleleri Kuralları</h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                        <li>Her seferinde sadece 1 disk taşınabilir.</li>
                        <li>Büyük disk, küçük diskin üzerine gelemez.</li>
                        <li>Tüm diskler A'dan C'ye taşınmalıdır.</li>
                    </ul>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-lg)' }}>

                {/* Sol: Hanoi Simülasyonu */}
                <Card style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                        <h2 className="text-subheading" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                            <Layers size={window.innerWidth <= 768 ? 20 : 24} color="var(--primary)" />
                            Hanoi Kuleleri (n=3)
                        </h2>
                        <div style={{ display: 'flex', gap: 'clamp(6px, 2vw, 8px)', flexWrap: 'wrap' }}>
                            <button onClick={startSimulation} disabled={moves.length > 0}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                <Play size={16} /> Başlat
                            </button>
                            <button onClick={nextStep} disabled={moves.length === 0 || currentMoveIndex >= moves.length - 1}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                <SkipForward size={16} /> İleri
                            </button>
                            <button onClick={reset}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: 'clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                <RotateCcw size={16} /> Sıfırla
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'clamp(12px, 4vw, 40px)', padding: '0 clamp(8px, 3vw, 40px)', minHeight: '250px', overflowX: 'auto' }}>
                        {renderTower('A', disks.A)}
                        {renderTower('B', disks.B)}
                        {renderTower('C', disks.C)}
                    </div>

                    {/* İşlem Logu */}
                    <div style={{ marginTop: 'var(--space-lg)', padding: 'clamp(12px, 3vw, 16px)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-primary)', minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                        {activeCall ? (
                            <span>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{activeCall.id}</span> çalışıyor...
                                {moves[currentMoveIndex].type === 'MOVE' && <span style={{ marginLeft: '10px', color: 'var(--success)' }}>➜ {moves[currentMoveIndex].log}</span>}
                            </span>
                        ) : moves.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: 'var(--space-sm)' }}>
                                <div style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontWeight: 'bold', color: 'var(--primary)' }}>
                                    🎯 Hanoi Kuleleri Simülasyonu
                                </div>
                                <div style={{ fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', color: 'var(--text-secondary)' }}>
                                    Tüm diskleri A kulesinden C kulesine taşıyın.
                                    <br />
                                    Başlamak için "Başlat" butonuna tıklayın.
                                </div>
                            </div>
                        ) : "Hazır"}
                    </div>
                </Card>

                {/* Sağ: Call Stack Görselleştirme */}
                <Card style={{ gridColumn: '1 / -1' }}>
                    <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--text-secondary)' }}>Call Stack (Bellek Yığını)</h3>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column-reverse', // Stack aşağıdan yukarı büyür
                        gap: '4px',
                        padding: 'var(--space-md)',
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-md)',
                        height: '200px',
                        overflowY: 'auto'
                    }}>
                        {callStack.length === 0 && <div style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>Yığın Boş</div>}

                        {callStack.map((call, idx) => (
                            <div key={idx} className="animate-fade-in" style={{
                                padding: '8px 12px',
                                background: idx === callStack.length - 1 ? 'var(--primary)' : 'var(--bg-card)',
                                color: idx === callStack.length - 1 ? 'white' : 'var(--text-secondary)',
                                border: '1px solid var(--border-light)',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <span style={{ fontFamily: 'monospace' }}>{call.id}</span>
                                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Line: {call.depth + 1}</span>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 'var(--space-sm)' }}>
                        * En üstteki fonksiyon şu an çalışan fonksiyondur (LIFO: Last In, First Out).
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default Recursion;
