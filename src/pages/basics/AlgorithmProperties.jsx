import React, { useState } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { Download, Upload, CheckCircle2, Zap, StopCircle, Search, Play, ArrowRight, CornerDownRight } from 'lucide-react';

const AlgorithmProperties = () => {
    // 5 Temel Özellik Verisi
    const properties = [
        {
            id: 1,
            title: 'Giriş (Input)',
            desc: 'Sıfır veya daha fazla değer dışarıdan girilmelidir.',
            detail: 'Algoritma çalışmak için dış dünyadan veri alabilir veya almayabilir.',
            icon: Download
        },
        {
            id: 2,
            title: 'Çıkış (Output)',
            desc: 'En az bir değer üretilmelidir.',
            detail: 'İşlem sonucunda kullanıcıya veya başka bir sisteme bir sonuç döndürülmelidir.',
            icon: Upload
        },
        {
            id: 3,
            title: 'Belirlilik (Definiteness)',
            desc: 'Her komut açık ve net olmalıdır.',
            detail: 'Hangi durumda ne yapılacağı kesin olmalı, yoruma açık olmamalıdır.',
            icon: CheckCircle2
        },
        {
            id: 4,
            title: 'Etkililik (Effectiveness)',
            desc: 'Komutlar basit ve çalıştırılabilir olmalıdır.',
            detail: 'Her adım, bir insan tarafından kağıt-kalemle yapılabilecek kadar temel olmalıdır.',
            icon: Zap
        },
        {
            id: 5,
            title: 'Sonluluk (Finiteness)',
            desc: 'Algoritma sonlu adımda bitmelidir.',
            detail: 'Sonsuz döngü bir algoritma değildir. Mutlaka bir bitiş noktası olmalıdır.',
            icon: StopCircle
        }
    ];

    // Dedektif Oyunu State
    const [scenarios] = useState([
        { id: 1, text: "Bir kek tarifi: 'Biraz un ekleyin ve karıştırın.'", valid: false, reason: "Belirlilik ihlali! 'Biraz' ne kadar? Net değil." },
        { id: 2, text: "Sonsuza kadar ekrana 'Merhaba' yazan program.", valid: false, reason: "Sonluluk ihlali! Asla durmuyor." },
        { id: 3, text: "İki sayıyı toplayıp sonucu gösteren program.", valid: true, reason: "Tüm şartları sağlıyor." },
        { id: 4, text: "Uzaylı diliyle yazılmış, kimsenin anlamadığı kod.", valid: false, reason: "Etkililik ihlali! Çalıştırılabilir değil." }
    ]);

    const [currentScenario, setCurrentScenario] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'

    const handleAnswer = (isAlgorithm) => {
        const isValid = scenarios[currentScenario].valid;
        if (isAlgorithm === isValid) {
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }
    };

    const nextScenario = () => {
        setFeedback(null);
        setCurrentScenario((prev) => (prev + 1) % scenarios.length);
    };

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700' }}>1.1. Algoritmanın Temel Özellikleri</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Bir prosedürün 'Algoritma' sayılabilmesi için gereken 5 altın kural.</p>
                </div>
            </div>

            {/* Özellik Kartları */}
            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                {properties.map((prop) => (
                    <Card key={prop.id} className="hover-scale">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                            <div style={{ padding: '8px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--primary)' }}>
                                <prop.icon size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{prop.id}. {prop.title}</h3>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)', fontWeight: '500' }}>
                            {prop.desc}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            {prop.detail}
                        </p>
                    </Card>
                ))}
            </div>

            {/* İnteraktif Simülasyon */}
            <h2 className="text-subheading" style={{ marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <Search size={window.innerWidth <= 768 ? 22 : 28} /> Algoritma Dedektifi
            </h2>

            <Card style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: 'clamp(1.25rem, 4vw, 2.5rem)' }}>
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                    <Badge type="primary">Senaryo {currentScenario + 1}/{scenarios.length}</Badge>
                </div>

                <h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', marginBottom: 'var(--space-xl)', minHeight: '3em', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 var(--space-sm)' }}>
                    "{scenarios[currentScenario].text}"
                </h3>

                {feedback === null ? (
                    <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 24px)', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                        <button
                            onClick={() => handleAnswer(true)}
                            className="hover-scale"
                            style={{
                                padding: 'clamp(12px, 3vw, 15px) clamp(30px, 8vw, 40px)',
                                background: 'var(--success)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                                fontWeight: 'bold',
                                flex: '1 1 auto',
                                minWidth: 'clamp(120px, 40vw, 180px)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Algoritmadır
                        </button>
                        <button
                            onClick={() => handleAnswer(false)}
                            className="hover-scale"
                            style={{
                                padding: 'clamp(12px, 3vw, 15px) clamp(30px, 8vw, 40px)',
                                background: 'var(--danger)',
                                color: 'white',
                                borderRadius: 'var(--radius-md)',
                                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                                fontWeight: 'bold',
                                flex: '1 1 auto',
                                minWidth: 'clamp(120px, 40vw, 180px)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Değildir
                        </button>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <div style={{
                            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                            fontWeight: 'bold',
                            color: feedback === 'correct' ? 'var(--success)' : 'var(--danger)',
                            marginBottom: 'var(--space-md)'
                        }}>
                            {feedback === 'correct' ? 'Doğru Bildiniz! 🎉' : 'Yanlış Cevap 😔'}
                        </div>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', padding: '0 var(--space-sm)' }}>
                            {scenarios[currentScenario].reason}
                        </p>
                        <button
                            onClick={nextScenario}
                            style={{ padding: '10px 30px', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                        >
                            Sonraki Soru <ArrowRight size={18} />
                        </button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AlgorithmProperties;
