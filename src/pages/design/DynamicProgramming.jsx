import React, { useState } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { CornerDownRight, TrendingUp, Repeat, Database, PlayCircle } from 'lucide-react';

const DynamicProgramming = () => {
    const [n, setN] = useState(6);
    const [isRunning, setIsRunning] = useState(false);

    // Recursion State
    const [recLogs, setRecLogs] = useState([]);
    const [recCount, setRecCount] = useState(0);

    // DP State
    const [dpTable, setDpTable] = useState({});
    const [dpCount, setDpCount] = useState(0);

    const startRace = async () => {
        setIsRunning(true);
        setRecLogs([]);
        setRecCount(0);
        setDpTable({});
        setDpCount(0);

        await Promise.all([runRecursion(n), runDP(n)]);

        setIsRunning(false);
    };

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    // Naive Recursion Simulation
    const runRecursion = async (val) => {
        if (val <= 1) return val;
        setRecLogs(prev => [`fib(${val})`, ...prev].slice(0, 7));
        setRecCount(c => c + 1);
        await delay(200);

        const a = await runRecursion(val - 1);
        const b = await runRecursion(val - 2);
        return a + b;
    };

    // DP Simulation
    const runDP = async (val) => {
        const table = { 0: 0, 1: 1 };
        setDpTable({ 0: 0, 1: 1 });

        for (let i = 2; i <= val; i++) {
            setDpCount(c => c + 1);
            await delay(200);
            table[i] = table[i - 1] + table[i - 2];
            setDpTable({ ...table });
        }
        return table[val];
    };

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>2.3 Dinamik Programlama (DP)</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Karmaşık problemleri alt parçalara bölüp, bu parçaların sonuçlarını saklayarak performansı optimize etme yöntemidir.</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrendingUp size={20} /> Performans Farkı
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Recursive algoritmalar genellikle aynı alt problemleri defalarca çözer. Dinamik Programlama ise "hafıza" (tablo) kullanarak bunu önler.
                        Bu sayede Üssel (Exponential) karmaşıklıktan Polinom (Polynomial) karmaşıklığa düşülür.
                    </p>
                </Card>
                <Card>
                    <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Database size={20} /> Memoization
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                            <Badge type="danger" icon={Repeat}>Naive</Badge>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tekrarlı işlem. Unutkan. (Çok Yavaş)</span>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                            <Badge type="success" icon={Database}>DP</Badge>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Tabloya yazma. Hafızalı. (Çok Hızlı)</span>
                        </div>
                    </div>
                </Card>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-lg)' }}>Maliyet Analizi: Fibonacci({n})</h2>

            <div style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-secondary)', padding: '5px 10px', borderRadius: 'var(--radius-md)' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>N Değeri:</label>
                    <input
                        type="number"
                        value={n}
                        onChange={(e) => setN(Number(e.target.value))}
                        min="3" max="10"
                        disabled={isRunning}
                        style={{ width: '60px', padding: '5px', borderRadius: '4px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', textAlign: 'center' }}
                    />
                </div>
                <button
                    onClick={startRace}
                    disabled={isRunning}
                    style={{ padding: '10px 24px', background: isRunning ? 'var(--bg-secondary)' : 'var(--primary)', color: isRunning ? 'var(--text-muted)' : 'white', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}
                >
                    <PlayCircle size={20} /> {isRunning ? 'Hesaplanıyor...' : 'Yarışı Başlat'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)' }}>
                {/* Sol: Recursion */}
                <Card style={{ borderTop: '4px solid var(--danger)', position: 'relative', overflow: 'hidden' }}>
                    <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Naive Recursion
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>O(2ⁿ)</span>
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: 'var(--space-md)' }}>
                        <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{recCount}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>işlem</span>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', height: '200px', overflowY: 'auto', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Canlı İşlem Logu</div>
                        {recLogs.map((log, i) => (
                            <div key={i} className="animate-fade-in" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '4px 0', borderBottom: '1px solid var(--border-light)' }}>{log}</div>
                        ))}
                    </div>
                </Card>

                {/* Sağ: DP */}
                <Card style={{ borderTop: '4px solid var(--success)' }}>
                    <h3 style={{ marginBottom: 'var(--space-md)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Dynamic Programming
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>O(n)</span>
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: 'var(--space-md)' }}>
                        <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{dpCount}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>işlem</span>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', height: '200px', overflowY: 'auto', border: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>Memoization Tablosu</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {Object.entries(dpTable).map(([key, val]) => (
                                <div key={key} className="animate-fade-in" style={{
                                    padding: '6px 10px',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--success)',
                                    borderRadius: '4px',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}>
                                    F({key}) = {val}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default DynamicProgramming;
