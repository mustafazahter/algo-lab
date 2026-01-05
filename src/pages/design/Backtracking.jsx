import React, { useState, useRef } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { CornerDownRight, Play, RotateCcw, AlertOctagon, CheckCircle2 } from 'lucide-react';

const N = 4;

const Backtracking = () => {
    const [board, setBoard] = useState(Array(N).fill(null).map(() => Array(N).fill(false)));
    const [solving, setSolving] = useState(false);
    const [status, setStatus] = useState({ state: 'idle', msg: "Başlamak için butona basın." });
    const [highlight, setHighlight] = useState({ row: -1, col: -1, type: null }); // type: 'check', 'placed', 'backtrack', 'conflict'

    // Animasyon durdurma bayrağı
    const stopRef = useRef(false);

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Tehdit kontrolü - Görselleştirme için conflict hücrelerini döndürür
    const getConflicts = (board, row, col) => {
        const conflicts = [];
        // Sütun
        for (let i = 0; i < row; i++) {
            if (board[i][col]) conflicts.push({ r: i, c: col });
        }
        // Sol üst
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j]) conflicts.push({ r: i, c: j });
        }
        // Sağ üst
        for (let i = row - 1, j = col + 1; i >= 0 && j < N; i--, j++) {
            if (board[i][j]) conflicts.push({ r: i, c: j });
        }
        return conflicts;
    };

    const solve = async () => {
        if (solving) {
            stopRef.current = true;
            return;
        }

        stopRef.current = false;
        setSolving(true);
        setStatus({ state: 'running', msg: "Algoritma çalışıyor..." });

        const newBoard = Array(N).fill(null).map(() => Array(N).fill(false));
        setBoard(newBoard);

        const solved = await solveRec(newBoard, 0);

        if (solved) {
            setStatus({ state: 'success', msg: "Çözüm Bulundu! Her satırda bir vezir ve hiçbiri tehdit altında değil." });
            setHighlight({ row: -1, col: -1, type: null });
        } else {
            setStatus({ state: 'error', msg: "Çözüm Yok." });
        }
        setSolving(false);
    };

    const solveRec = async (currentBoard, row) => {
        if (stopRef.current) return false;
        if (row >= N) return true;

        for (let col = 0; col < N; col++) {
            if (stopRef.current) return false;

            // 1. Yerleştirmeyi Dene
            setHighlight({ row, col, type: 'check' });
            setStatus({ state: 'running', msg: `Satır ${row}, Sütun ${col} kontrol ediliyor...` });
            await delay(400);

            const conflicts = getConflicts(currentBoard, row, col);

            if (conflicts.length === 0) {
                // GÜVENLİ
                currentBoard[row][col] = true;
                setBoard([...currentBoard.map(d => [...d])]);
                setHighlight({ row, col, type: 'placed' });
                setStatus({ state: 'running', msg: `Güvenli. Vezir yerleştirildi.` });
                await delay(400);

                // Recursive Adım
                if (await solveRec(currentBoard, row + 1)) return true;

                // BURAYA DÜŞERSE: İlerideki adımlar başarısız oldu, geri dön (Backtrack)
                currentBoard[row][col] = false;
                setBoard([...currentBoard.map(d => [...d])]);
                setHighlight({ row, col, type: 'backtrack' });
                setStatus({ state: 'warning', msg: `BACKTRACKING! İleride çözüm çıkmadı, geri alınıyor.` });
                await delay(800);

            } else {
                // ÇAKIŞMA
                setHighlight({ row, col, type: 'conflict', conflicts });
                setStatus({ state: 'error', msg: `Çatışma var! (${conflicts[0].r}, ${conflicts[0].c})` });
                await delay(400);
            }
        }
        return false;
    };

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700' }}>2.6 Geri İzleme (Backtracking)</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>" Çıkmaz sokağa girdiğinde, geldiğin yoldan geri dön ve başka bir sokağa sap."</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)' }}>Nasıl Çalışır?</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Bir çözüm ağacında derinlemesine arama (DFS) yapar. Bir dalın çözüme gitmediğini anladığı anda o dalı terk eder (Pruning) ve bir üst düğüme geri döner.
                    </p>
                </Card>
            </div>

            <h2 className="text-subheading" style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <CheckCircle2 size={window.innerWidth <= 768 ? 24 : 32} color="var(--success)" />
                4 Vezir Problemi Görselleştirme
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 1024 ? '1fr' : '1fr 300px', gap: 'clamp(16px, 3vw, 24px)' }}>
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${N}, clamp(50px, 15vw, 70px))`,
                        gridTemplateRows: `repeat(${N}, clamp(50px, 15vw, 70px))`,
                        border: '4px solid var(--border-medium)',
                        marginBottom: 'var(--space-xl)',
                        position: 'relative',
                        maxWidth: '100%',
                        margin: '0 auto var(--space-xl) auto'
                    }}>
                        {board.map((rowArr, rIdx) => (
                            rowArr.map((hasQueen, cIdx) => {
                                const isBlack = (rIdx + cIdx) % 2 === 1;
                                // Highlight durumları
                                const isChecking = highlight.row === rIdx && highlight.col === cIdx;
                                const isConflict = highlight.type === 'conflict' && isChecking;
                                const isPlaced = highlight.type === 'placed' && isChecking;
                                const isBacktracking = highlight.type === 'backtrack' && isChecking;

                                // Tehdit kaynağı mı?
                                const isThreat = highlight.type === 'conflict' && highlight.conflicts?.some(c => c.r === rIdx && c.c === cIdx);

                                let bgColor = isBlack ? 'var(--bg-secondary)' : 'var(--bg-card)';
                                if (isConflict) bgColor = 'rgba(239, 68, 68, 0.4)'; // Kırmızı
                                else if (isPlaced) bgColor = 'rgba(16, 185, 129, 0.4)'; // Yeşil
                                else if (isBacktracking) bgColor = 'rgba(245, 158, 11, 0.4)'; // Turuncu
                                else if (isThreat) bgColor = 'rgba(239, 68, 68, 0.2)'; // Hafif Kırmızı

                                return (
                                    <div key={`${rIdx}-${cIdx}`} style={{
                                        width: 'clamp(50px, 15vw, 70px)',
                                        height: 'clamp(50px, 15vw, 70px)',
                                        backgroundColor: bgColor,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 'clamp(1.5rem, 6vw, 2.5rem)',
                                        transition: 'background-color 0.3s',
                                        border: isChecking ? '2px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                                        color: hasQueen ? 'var(--text-primary)' : 'transparent'
                                    }}>
                                        ♛
                                    </div>
                                );
                            })
                        ))}
                    </div>

                    <button
                        onClick={solve}
                        style={{
                            padding: '12px 30px',
                            background: solving ? 'var(--danger)' : 'var(--primary)',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        {solving ? <><AlertOctagon size={20} /> Durdur</> : <><Play size={20} /> Çözümü Başlat</>}
                    </button>
                </Card>

                {/* Durum Paneli */}
                <Card style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--text-secondary)' }}>Algoritma Durumu</h3>

                    <div style={{
                        padding: 'var(--space-md)',
                        background:
                            status.state === 'success' ? 'rgba(16, 185, 129, 0.1)' :
                                status.state === 'error' ? 'rgba(239, 68, 68, 0.1)' :
                                    status.state === 'warning' ? 'rgba(245, 158, 11, 0.1)' :
                                        'var(--bg-secondary)',
                        border:
                            status.state === 'success' ? '1px solid var(--success)' :
                                status.state === 'error' ? '1px solid var(--danger)' :
                                    status.state === 'warning' ? '1px solid var(--warning)' :
                                        '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: '0.95rem'
                    }}>
                        {status.msg}
                    </div>

                    <div style={{ marginTop: 'var(--space-xl)' }}>
                        <h4 style={{ marginBottom: 'var(--space-sm)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Renk Kodları</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', background: 'rgba(16, 185, 129, 0.6)', borderRadius: '2px' }}></div>
                                <span>Başarılı Yerleşim</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', background: 'rgba(239, 68, 68, 0.6)', borderRadius: '2px' }}></div>
                                <span>Çatışma (Tehdit Altında)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', background: 'rgba(245, 158, 11, 0.6)', borderRadius: '2px' }}></div>
                                <span>Backtracking (Geri Dönüş)</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Backtracking;
