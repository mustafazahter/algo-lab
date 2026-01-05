import React, { useState, useEffect } from 'react';
import { Card, PageHeader, Badge } from '../../components/ui/Common';
import { Play, Pause, RotateCcw } from 'lucide-react';

const LoopAnalysis = () => {
    // linear, quadratic, log, sqrt, dependent
    const [algo, setAlgo] = useState('linear');
    const [n, setN] = useState(5);
    const [variables, setVariables] = useState({ i: 0, j: 0 });
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [activeLine, setActiveLine] = useState(0);

    // data.md'den alınan tüm örnekler
    const codes = {
        linear: [
            "// O(n) - Lineer (Düz) Karmaşıklık",
            "void linearLoop(int n) {",
            "    int count = 0;",
            "    for (int i = 0; i < n; i++) {",
            "        count++; // Kitap sayfası çevirmek gibi tek tek",
            "    }",
            "}"
        ],
        quadratic: [
            "// O(n²) - Karesel (İç İçe) Karmaşıklık",
            "void quadraticLoop(int n) {",
            "    int count = 0;",
            "    for (int i = 0; i < n; i++) {",
            "        for (int j = 0; j < n; j++) {",
            "            count++; // Herkesin herkesle tokalaşması",
            "        }",
            "    }",
            "}"
        ],
        log: [
            "// O(log n) - Logaritmik (Bölmeli) Karmaşıklık",
            "void logarithmicLoop(int n) {",
            "    int count = 0;",
            "    // Rehberi ortadan ikiye bölmek gibi",
            "    for (int i = 1; i < n; i = i * 2) {",
            "        count++;",
            "    }",
            "}"
        ],
        sqrt: [
            "// O(√n) - Karekök Karmaşıklığı",
            "void sqrtLoop(int n) {",
            "    int count = 0;",
            "    // Karesi n olana kadar git",
            "    for (int i = 0; i * i < n; i++) {",
            "        count++;",
            "    }",
            "}"
        ],
        dependent: [
            "// O(n²) - Bağımlı (Üçgensel) Karmaşıklık",
            "void dependentLoop(int n) {",
            "    int count = 0;",
            "    for (int i = 0; i < n; i++) {",
            "        // j sadece i'ye kadar gider",
            "        for (int j = 0; j < i; j++) {",
            "            count++;",
            "        }",
            "    }",
            "}"
        ]
    };

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                step();
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isRunning, algo, variables, count, activeLine, n]);

    const reset = () => {
        setVariables({ i: algo === 'log' ? 1 : 0, j: 0 });
        setCount(0);
        setActiveLine(0);
        setIsRunning(false);
    };

    // Teorik hesaplama
    const getTheoretical = () => {
        if (algo === 'linear') return { formula: 'n', val: n, desc: 'Veri kadar işlem.' };
        if (algo === 'quadratic') return { formula: 'n²', val: n * n, desc: 'Verinin karesi kadar işlem.' };
        if (algo === 'log') return { formula: 'log₂n', val: Math.ceil(Math.log2(n)) || 0, desc: 'Adımlar çok hızlı azalır.' };
        if (algo === 'sqrt') return { formula: '√n', val: Math.ceil(Math.sqrt(n)), desc: 'Karekökü kadar işlem.' };
        if (algo === 'dependent') return { formula: 'n(n-1)/2', val: (n * (n - 1)) / 2, desc: 'Yarım kare (Üçgen) oluşturur.' };
        return { formula: '?', val: 0 };
    };

    const theory = getTheoretical();

    const step = () => {
        // Initialization Step
        if (activeLine === 0) {
            if (algo === 'linear') setActiveLine(3);
            else if (algo === 'quadratic') setActiveLine(3);
            else if (algo === 'log') setActiveLine(4);
            else if (algo === 'sqrt') setActiveLine(4);
            else if (algo === 'dependent') setActiveLine(3);
            return;
        }

        if (algo === 'linear') {
            const { i } = variables;
            if (activeLine === 3) {
                if (i < n) setActiveLine(4);
                else { setActiveLine(6); setIsRunning(false); }
            } else if (activeLine === 4) {
                setCount(prev => prev + 1);
                setVariables(prev => ({ ...prev, i: prev.i + 1 }));
                setActiveLine(3);
            }
        }
        else if (algo === 'quadratic') {
            const { i, j } = variables;
            if (activeLine === 3) {
                if (i < n) setActiveLine(4);
                else { setActiveLine(8); setIsRunning(false); }
            } else if (activeLine === 4) {
                if (j < n) setActiveLine(5);
                else {
                    setVariables(prev => ({ ...prev, i: prev.i + 1, j: 0 }));
                    setActiveLine(3);
                }
            } else if (activeLine === 5) {
                setCount(prev => prev + 1);
                setVariables(prev => ({ ...prev, j: prev.j + 1 }));
                setActiveLine(4);
            }
        }
        else if (algo === 'dependent') {
            const { i, j } = variables;
            if (activeLine === 3) {
                if (i < n) setActiveLine(5); // inner header (line 5 in updated code string)
                else { setActiveLine(9); setIsRunning(false); }
            } else if (activeLine === 5) {
                if (j < i) setActiveLine(6); // count++
                else {
                    setVariables(prev => ({ ...prev, i: prev.i + 1, j: 0 }));
                    setActiveLine(3);
                }
            } else if (activeLine === 6) {
                setCount(prev => prev + 1);
                setVariables(prev => ({ ...prev, j: prev.j + 1 }));
                setActiveLine(5);
            }
        }
        else if (algo === 'log') {
            const { i } = variables;
            if (activeLine === 4) {
                if (i < n) setActiveLine(5);
                else { setActiveLine(7); setIsRunning(false); }
            } else if (activeLine === 5) {
                setCount(prev => prev + 1);
                setVariables(prev => ({ ...prev, i: prev.i * 2 }));
                setActiveLine(4);
            }
        }
        else if (algo === 'sqrt') {
            const { i } = variables;
            if (activeLine === 4) {
                if (i * i < n) setActiveLine(5);
                else { setActiveLine(7); setIsRunning(false); }
            } else if (activeLine === 5) {
                setCount(prev => prev + 1);
                setVariables(prev => ({ ...prev, i: prev.i + 1 }));
                setActiveLine(4);
            }
        }
    };

    const handleAlgoChange = (newAlgo) => {
        setAlgo(newAlgo);
        setVariables({ i: newAlgo === 'log' ? 1 : 0, j: 0 });
        setCount(0);
        setActiveLine(0);
        setIsRunning(false);
    };

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="4. Kod Analizi ve Döngü Tipleri"
                subtitle="Farklı kod yapılarının işlem yükünü (Karmaşıklık) nasıl etkilediğini interaktif olarak keşfedin."
            />

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                {/* LINEAR */}
                <button onClick={() => handleAlgoChange('linear')} style={{ textAlign: 'left', width: '100%' }}>
                    <Card className="hover-scale" style={{ border: algo === 'linear' ? '2px solid var(--primary)' : '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ color: 'var(--primary)', margin: 0 }}>Lineer</h3>
                            <Badge type="primary">O(n)</Badge>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Tek döngü.</p>
                    </Card>
                </button>

                {/* LOG */}
                <button onClick={() => handleAlgoChange('log')} style={{ textAlign: 'left', width: '100%' }}>
                    <Card className="hover-scale" style={{ border: algo === 'log' ? '2px solid var(--success)' : '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ color: 'var(--success)', margin: 0 }}>Logaritmik</h3>
                            <Badge type="success">O(log n)</Badge>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Çarpılarak artar.</p>
                    </Card>
                </button>

                {/* SQRT */}
                <button onClick={() => handleAlgoChange('sqrt')} style={{ textAlign: 'left', width: '100%' }}>
                    <Card className="hover-scale" style={{ border: algo === 'sqrt' ? '2px solid var(--warning)' : '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ color: 'var(--warning)', margin: 0 }}>Karekök</h3>
                            <Badge type="warning">O(√n)</Badge>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>i * i &lt; n</p>
                    </Card>
                </button>

                {/* QUADRATIC */}
                <button onClick={() => handleAlgoChange('quadratic')} style={{ textAlign: 'left', width: '100%' }}>
                    <Card className="hover-scale" style={{ border: algo === 'quadratic' ? '2px solid var(--danger)' : '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ color: 'var(--danger)', margin: 0 }}>Karesel</h3>
                            <Badge type="danger">O(n²)</Badge>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>İç içe döngü.</p>
                    </Card>
                </button>

                {/* DEPENDENT */}
                <button onClick={() => handleAlgoChange('dependent')} style={{ textAlign: 'left', width: '100%' }}>
                    <Card className="hover-scale" style={{ border: algo === 'dependent' ? '2px solid #b91c1c' : '1px solid var(--border-light)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h3 style={{ color: '#b91c1c', margin: 0 }}>Bağımlı</h3>
                            <Badge type="danger">O(n²)</Badge>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>j &lt; i (Üçgen)</p>
                    </Card>
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: 'var(--space-lg)' }}>
                {/* Sol: Kod Görünümü */}
                <Card style={{ fontFamily: 'monospace', background: 'var(--bg-card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent)', letterSpacing: '1px' }}>KOD İZLEYİCİ</span>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: 'var(--bg-secondary)', padding: '5px 10px', borderRadius: '6px' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Girdi (n):</span>
                            <select
                                value={n}
                                onChange={(e) => {
                                    setN(Number(e.target.value));
                                    reset();
                                }}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-primary)',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="9">9</option>
                                <option value="16">16</option>
                            </select>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        overflowX: 'auto',
                        maxWidth: '100%'
                    }}>
                        {codes[algo].map((line, idx) => (
                            <div key={idx} style={{
                                padding: '6px 10px',
                                background: activeLine === idx ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                borderLeft: activeLine === idx ? '4px solid var(--primary)' : '4px solid transparent',
                                color: activeLine === idx ? 'var(--text-primary)' : line.trim().startsWith('//') ? 'var(--text-muted)' : 'var(--text-secondary)',
                                transition: 'all 0.2s',
                                borderRadius: '0 4px 4px 0',
                                whiteSpace: 'pre',
                                fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                                minWidth: 'fit-content'
                            }}>
                                {line}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Sağ: Değişkenler ve Kontrol */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-lg)' }}>
                        <h3>Durum Paneli</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                className="hover-scale"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 20px',
                                    background: isRunning ? 'var(--warning)' : 'var(--success)',
                                    color: 'white',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {isRunning ? <><Pause size={18} /> Duraklat</> : <><Play size={18} /> Başlat</>}
                            </button>
                            <button
                                onClick={reset}
                                className="hover-scale"
                                style={{
                                    padding: '10px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-light)',
                                    cursor: 'pointer'
                                }}
                            >
                                <RotateCcw size={18} />
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'minmax(120px, 1fr) 1fr', gap: 'var(--space-md)' }}>
                        {/* Teorik Hesaplama Kartı */}
                        <div style={{ gridColumn: 'span 2', background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid var(--border-medium)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Teorik Formül</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)' }}>T(n) = {theory.formula}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Beklenen Adım</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{Math.floor(theory.val)}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                                💡 {theory.desc}
                            </div>
                        </div>

                        {/* Değişkenler */}
                        <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center', gridColumn: window.innerWidth <= 768 ? 'span 1' : 'auto' }}>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Değişken i</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{variables.i}</div>
                        </div>

                        {(algo === 'quadratic' || algo === 'dependent') ? (
                            <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center', gridColumn: window.innerWidth <= 768 ? 'span 1' : 'auto' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Değişken j</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{variables.j}</div>
                            </div>
                        ) : (
                            <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', textAlign: 'center', opacity: 0.3, gridColumn: window.innerWidth <= 768 ? 'span 1' : 'auto' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '5px' }}>Değişken j</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>-</div>
                            </div>
                        )}

                        {/* Sonuç Alanı */}
                        <div style={{
                            gridColumn: 'span 2',
                            background: (() => {
                                if (count === Math.floor(theory.val)) return 'var(--success)';
                                if (count > theory.val) return 'var(--danger)';
                                return 'var(--primary)';
                            })(),
                            padding: '20px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            color: 'white',
                            marginTop: '10px',
                            transition: 'background 0.3s'
                        }}>
                            <div style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '5px' }}>Gerçekleşen İşlem (Sayacı)</div>
                            <div style={{ fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1 }}>{count}</div>
                            <div style={{ fontSize: '0.9rem', opacity: 1, marginTop: '8px', fontWeight: '500', minHeight: '1.5em' }}>
                                {count === Math.floor(theory.val) ? '✅ Tam ısabet!' : count > 0 ? 'Sayılıyor...' : 'Başlamaya Hazır'}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoopAnalysis;
