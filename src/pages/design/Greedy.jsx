import React, { useState } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { calculateGreedyCoinChange } from '../../utils/algorithms';
import { CornerDownRight, Coins, ArrowRight, Zap, AlertTriangle } from 'lucide-react';

const COINS = [50, 20, 10, 5, 1];

const Greedy = () => {
    const [target, setTarget] = useState(67);
    const [result, setResult] = useState([]);
    const [currentStep, setCurrentStep] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculate = async () => {
        setIsCalculating(true);
        let remaining = target;
        const steps = [];
        setResult([]);

        for (let coin of COINS) {
            while (remaining >= coin) {
                steps.push({ coin, remainingBefore: remaining, remainingAfter: remaining - coin });
                remaining -= coin;
            }
        }

        // Animasyon
        for (let i = 0; i < steps.length; i++) {
            setCurrentStep(steps[i]);
            setResult(prev => [...prev, steps[i].coin]);
            await new Promise(r => setTimeout(r, 600));
        }
        setCurrentStep(null);
        setIsCalculating(false);
    };

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>2.4 Açgözlü Yaklaşım (Greedy)</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Her adımda, o an için en kazançlı görünen seçeneği tercih ederek sonuca ulaşma stratejisi.</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={20} /> Temel Felsefe
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Greedy algoritmalar "geleceği düşünmez". Sadece bulundukları adımda en büyük kazancı sağlayan hamleyi yaparlar.
                        Geriye dönüp düzeltme yapmazlar (Backtracking yoktur).
                    </p>
                </Card>
                <Card>
                    <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={20} /> Kritik Özellikler
                    </h3>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>✅ <strong>Hızlıdır:</strong> Hesaplama maliyeti düşüktür.</li>
                        <li>❌ <strong>Optimum Garanti Değil:</strong> Her problemde en iyi sonucu (Global Optimum) vermeyebilir.</li>
                        <li>📦 <strong>Örnekler:</strong> Kruskal, Prim, Huffman Kodlaması, Dijkstra.</li>
                    </ul>
                </Card>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-lg)' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Simülasyon: Para Üstü Verme</h2>
                <Badge type="success" icon={Coins}>Greedy Problems</Badge>
            </div>

            <Card>
                <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', marginBottom: 'var(--space-xl)', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Hedef Tutar:</div>
                    <input
                        type="number"
                        value={target}
                        onChange={e => setTarget(Number(e.target.value))}
                        disabled={isCalculating}
                        style={{
                            fontSize: '1.5rem', width: '120px',
                            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                            border: '1px solid var(--border-light)', padding: '8px', borderRadius: 'var(--radius-sm)'
                        }}
                    />
                    <button
                        onClick={calculate}
                        disabled={isCalculating}
                        style={{
                            padding: '12px 24px',
                            background: 'var(--success)', color: 'white',
                            borderRadius: 'var(--radius-md)', fontWeight: 'bold',
                            opacity: isCalculating ? 0.7 : 1,
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}
                    >
                        HESAPLA <ArrowRight size={18} />
                    </button>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-2xl)', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                    {/* Kasa */}
                    <div style={{ width: '200px' }}>
                        <div style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>Kasa (Birimler)</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {COINS.map(c => (
                                <div key={c} style={{
                                    padding: '10px',
                                    background: currentStep?.coin === c ? 'var(--warning)' : 'var(--bg-secondary)',
                                    borderRadius: '50%', width: '50px', height: '50px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
                                    border: currentStep?.coin === c ? '2px solid white' : '2px solid var(--border-light)',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                }}>
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sonuç Alanı */}
                    <div style={{ flex: 1, border: '2px dashed var(--border-light)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', minHeight: '200px', background: 'var(--bg-secondary)' }}>
                        <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Verilen Paralar</span>
                            <span>Toplam: {result.reduce((a, b) => a + b, 0)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                            {result.map((r, i) => (
                                <div key={i} className="animate-fade-in" style={{
                                    width: '60px', height: '60px', borderRadius: '50%',
                                    background: 'var(--success)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold', fontSize: '1.2rem',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                                    border: '2px solid white'
                                }}>
                                    {r}
                                </div>
                            ))}
                        </div>
                        {result.length === 0 && !isCalculating && (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                                Hesaplandığında paralar burada görünecek.
                            </div>
                        )}
                    </div>
                </div>

                {currentStep && (
                    <div className="animate-fade-in" style={{ marginTop: '20px', textAlign: 'center', fontSize: '1.2rem', padding: 'var(--space-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Kalan: {currentStep.remainingBefore}</span>
                        <span style={{ margin: '0 10px' }}>-</span>
                        <span style={{ color: 'var(--warning)', fontWeight: 'bold', fontSize: '1.4rem' }}>{currentStep.coin}</span>
                        <span style={{ margin: '0 10px' }}>=</span>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{currentStep.remainingAfter}</span>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Greedy;
