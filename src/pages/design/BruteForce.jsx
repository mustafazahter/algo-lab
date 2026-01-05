import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { CornerDownRight, Lock, Unlock, Zap, BrainCircuit, Activity, RotateCcw } from 'lucide-react';

const BruteForce = () => {
    const [password, setPassword] = useState('123');
    const [isCracking, setIsCracking] = useState(false);
    const [currentAttempt, setCurrentAttempt] = useState('000');
    const [found, setFound] = useState(false);
    const [stats, setStats] = useState({ attempts: 0, time: 0 });

    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);

    const startCracking = () => {
        if (password.length > 4 || isNaN(password)) {
            alert("Lütfen en fazla 4 haneli sayısal bir şifre girin (Performans için)");
            return;
        }

        setIsCracking(true);
        setFound(false);
        setStats({ attempts: 0, time: 0 });
        startTimeRef.current = Date.now();

        let attempt = 0;
        const max = Math.pow(10, password.length);

        intervalRef.current = setInterval(() => {
            const batchSize = 17;

            for (let i = 0; i < batchSize; i++) {
                if (attempt >= max) {
                    clearInterval(intervalRef.current);
                    setIsCracking(false);
                    break;
                }

                const currentStr = attempt.toString().padStart(password.length, '0');
                setCurrentAttempt(currentStr);

                if (currentStr === password) {
                    const endTime = Date.now();
                    setFound(true);
                    setIsCracking(false);
                    setStats({
                        attempts: attempt + 1,
                        time: ((endTime - startTimeRef.current) / 1000).toFixed(2)
                    });
                    clearInterval(intervalRef.current);
                    return;
                }
                attempt++;
            }
        }, 16);
    };

    const stopCracking = () => {
        clearInterval(intervalRef.current);
        setIsCracking(false);
    };

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>2.1 Kaba Kuvvet (Brute Force)</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Zeka veya strateji kullanmadan, olası tüm çözüm adaylarını tek tek deneyerek sonuca ulaşma yöntemidir.</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={20} /> Çalışma Mantığı
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)', lineHeight: 1.6 }}>
                        Bu yaklaşım, problemin çözüm uzayındaki her bir elemanı sistematik olarak kontrol eder.
                        Karmaşık bir algoritma tasarlamak yerine, bilgisayarın işlem gücüne (kas gücüne) güvenir.
                    </p>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><strong>Basittir:</strong> Uygulaması en kolay yöntemdir.</li>
                        <li><strong>Garantidir:</strong> Çözüm varsa mutlaka bulur.</li>
                        <li><strong>Maliyetlidir:</strong> Genellikle O(n!), O(2ⁿ) gibi çok yüksek karmaşıklığa sahiptir.</li>
                    </ul>
                </Card>

                <Card>
                    <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <BrainCircuit size={20} /> Gerçek Dünya Örnekleri
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        <div style={{ padding: 'var(--space-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                            <strong>Şifre Kırma:</strong> 4 haneli PIN için 0000'dan 9999'a kadar hepsini denemek.
                        </div>
                        <div style={{ padding: 'var(--space-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent)' }}>
                            <strong>Gezgin Satıcı (TSP):</strong> Tüm şehirlerin permutasyonlarını hesaplayıp en kısasını seçmek.
                        </div>
                        <div style={{ padding: 'var(--space-sm)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--success)' }}>
                            <strong>String Arama:</strong> Bir metin içinde kelime ararken her harf pozisyonunu kontrol etmek.
                        </div>
                    </div>
                </Card>
            </div>

            {/* SİMÜLASYON */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-lg)' }}>
                <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Simülasyon: PIN Kırıcı</h2>
                <Badge type="warning" icon={Zap}>CPU Yoğun İşlem</Badge>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: 'var(--space-lg)' }}>
                {/* Kontrol Paneli */}
                <Card>
                    <h4 style={{ marginBottom: 'var(--space-md)', color: 'var(--text-secondary)' }}>1. Hedef Şifreyi Belirleyin</h4>
                    <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                        <input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isCracking}
                            maxLength={4}
                            placeholder="1234"
                            style={{
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border-medium)',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-primary)',
                                fontSize: '1.5rem',
                                letterSpacing: '5px',
                                width: '100%',
                                textAlign: 'center',
                                fontFamily: 'monospace'
                            }}
                        />
                    </div>

                    <button
                        onClick={isCracking ? stopCracking : startCracking}
                        style={{
                            width: '100%',
                            backgroundColor: isCracking ? 'var(--danger)' : 'var(--primary)',
                            color: 'white',
                            padding: '14px',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            fontSize: '1.1rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        {isCracking ? <><RotateCcw size={20} /> Durdur</> : <><Unlock size={20} /> Kırmaya Başla</>}
                    </button>

                    <p style={{ marginTop: 'var(--space-md)', fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                        4 hane = 10,000 olasılık<br />
                        Ortalama 5,000 denemede bulunur.
                    </p>
                </Card>

                {/* Görselleştirme */}
                <Card style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-secondary)',
                    border: found ? '2px solid var(--success)' : '1px solid var(--border-light)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        {found ? <Unlock size={32} color="var(--success)" /> : <Lock size={32} color="var(--text-muted)" />}
                    </div>

                    <div style={{
                        fontSize: '5rem',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: found ? 'var(--success)' : isCracking ? 'var(--text-primary)' : 'var(--text-muted)',
                        marginBottom: 'var(--space-lg)',
                        letterSpacing: '8px'
                    }}>
                        {currentAttempt}
                    </div>

                    {found && (
                        <div className="animate-fade-in" style={{ width: '100%', textAlign: 'center' }}>
                            <Badge type="success">ŞİFRE BULUNDU</Badge>
                            <div style={{
                                marginTop: 'var(--space-lg)',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 'var(--space-md)',
                                paddingTop: 'var(--space-lg)',
                                borderTop: '1px solid var(--border-light)'
                            }}>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Deneme</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.attempts}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Süre</div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stats.time}s</div>
                                </div>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default BruteForce;
