import React from 'react';
import { Card, Badge, PageHeader } from '../../components/ui/Common';
import { Puzzle, Clock, CheckCircle, AlertTriangle, Zap, Key, Lock } from 'lucide-react';

const PnpTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'grid', gap: 'var(--space-xl)' }}>

            {/* Header Section */}
            <PageHeader
                title="9. Karmaşıklık Teorisi (P vs NP)"
                subtitle="Bilgisayar bilimlerinin en büyük çözülememiş problemi: P = NP mi?"
            />

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>

                {/* 1. P Class */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '10px', color: '#4ade80' }}>
                            <Zap size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>P (Polynomial)</h2>
                            <span style={{ fontSize: '0.85rem', color: '#4ade80' }}>Kolay Çözülür</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px' }}>
                        Bugünkü bilgisayarların makul sürede (polinom zaman) çözebildiği problemlerdir. Çözümü bulmak hızlıdır.
                    </p>
                    <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <strong style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '8px', letterSpacing: '1px', fontWeight: 'bold' }}>ÖRNEKLER</strong>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <Badge variant="success">Sıralama (Sorting)</Badge>
                            <Badge variant="success">En Kısa Yol</Badge>
                            <Badge variant="success">Arama</Badge>
                        </div>
                    </div>
                </Card>

                {/* 2. NP Class */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '10px', color: '#818cf8' }}>
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>NP (Non-deterministic Polynomial)</h2>
                            <span style={{ fontSize: '0.85rem', color: '#818cf8' }}>Kolay Kontrol Edilir</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px' }}>
                        Çözümü bulmak zor olabilir, ama birisi size bir çözüm verirse doğruluğunu kontrol etmek çok kolaydır.
                    </p>
                    <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <strong style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '8px', letterSpacing: '1px', fontWeight: 'bold' }}>ÖRNEK</strong>
                        <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>Sudoku (Çözmek zor, kontrol etmek kolay)</span>
                    </div>
                </Card>

                {/* 3. NP-Complete */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', color: '#f87171' }}>
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>NP-Complete</h2>
                            <span style={{ fontSize: '0.85rem', color: '#f87171' }}>En Zor Problemler</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px' }}>
                        NP kümesindeki en zor problemlerdir. Bunlardan <strong>bir tanesini</strong> bile hızlı çözen bir algoritma bulunursa, dünyadaki tüm şifreleme sistemleri çöker.
                    </p>
                    <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <strong style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '8px', letterSpacing: '1px', fontWeight: 'bold' }}>ÖRNEKLER</strong>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <Badge variant="danger">TSP (Gezgin Satıcı)</Badge>
                            <Badge variant="danger">Knapsack</Badge>
                            <Badge variant="danger">3-SAT</Badge>
                        </div>
                    </div>
                </Card>

                {/* 4. NP-Hard */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px', color: '#a855f7' }}>
                            <Zap size={24} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-primary)' }}>NP-Hard</h2>
                            <span style={{ fontSize: '0.85rem', color: '#a855f7' }}>Hesaplamanın Sınırı</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '15px' }}>
                        NP'ye ait olması şart değildir ama en az NP'deki en zor problem kadar zordur. Çözümün kontrol edilmesi bile polinom zamanın üzerinde olabilir.
                    </p>
                    <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <strong style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '8px', letterSpacing: '1px', fontWeight: 'bold' }}>ÖRNEKLER</strong>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <Badge type="primary">Halting Problem</Badge>
                            <Badge type="primary">Optimization</Badge>
                            <Badge type="primary">Deep Games</Badge>
                        </div>
                    </div>
                </Card>

            </div>

            {/* Analogy Section */}
            <section style={{ marginTop: '20px' }}>
                <Card style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))', border: '1px solid var(--primary-glow)' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '25px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Key size={24} color="var(--primary)" />
                        Anahtar & Kilit Analojisi
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                        {/* P */}
                        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <Badge variant="success">P Sınıfı</Badge>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Anahtarı Cebinde Olan</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', flex: 1 }}>
                                Elinde bir kilit var ve anahtar tam cebinde. Çıkarıp anında açıyorsun.
                                <br /><br />
                                <strong>Özet:</strong> Çözümü bulmak çok hızlı.
                            </p>
                        </div>

                        {/* NP */}
                        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <Badge variant="primary">NP Sınıfı</Badge>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Milyonlarca Anahtar</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', flex: 1 }}>
                                Yerde duran milyonlarca anahtar arasından doğru olanı arıyorsun (Zor). Ama birisi sana doğruyu verirse, kilide uyup uymadığını kontrol etmek saniyeler sürer (Kolay).
                                <br /><br />
                                <strong>Özet:</strong> Kontrol etmek (doğrulamak) hızlı.
                            </p>
                        </div>

                        {/* NP-Complete */}
                        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <Badge variant="warning">NP-Complete</Badge>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Sihirli Maymuncuk</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', flex: 1 }}>
                                Bunlar NP dünyasındaki <strong>"Ustabaşı Kilitler"</strong>dir.
                                Eğer bu kapılardan birini bile hızlıca açacak bir yöntem (maymuncuk) bulursan, dünyadaki tüm NP kapılarını açabilirsin demektir!
                                <br /><br />
                                <strong>Özet:</strong> NP'nin en zorlu temsilcileri.
                            </p>
                        </div>

                        {/* NP-Hard */}
                        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                                <Badge variant="danger">NP-Hard</Badge>
                                <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '0.9rem' }}>Efsanevi Kasa</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', flex: 1 }}>
                                Bu kapı o kadar karmaşıktır ki, sadece açması değil, birisi size anahtarı getirse bile o anahtarın <strong>gerçekten doğru olup olmadığını</strong> kontrol etmek bile ömürler sürebilir (Verifikasyon bile zor olabilir).
                                <br /><br />
                                <strong>Özet:</strong> NP'den bile daha zor olabilir.
                            </p>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '25px',
                        padding: '15px',
                        background: 'rgba(245, 158, 11, 0.1)',
                        borderRadius: '12px',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        textAlign: 'center'
                    }}>
                        <p style={{ margin: 0, color: 'var(--warning)', fontWeight: 'bold' }}>
                            💡 Soru Şu: "Bütün o anahtarları tek tek denemeden, doğru olanı bulmanın sihirli ve hızlı bir yolu var mı?"
                        </p>
                    </div>
                </Card>
            </section>

            {/* Venn Diagram Visual */}
            <div style={{ marginTop: '20px' }}>
                <Card>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--text-primary)' }}>İlişki Diyagramı</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
                                Tüm <strong>P</strong> problemleri aynı zamanda <strong>NP</strong>'dir. Ancak tüm NP problemleri P midir? Bunu henüz kimse bilmiyor.
                                <br /><br />
                                <strong style={{ color: '#f87171' }}>NP-Hard</strong> ise en dıştaki, belki de çözümü imkansız sınırdır.
                            </p>
                            <div style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                                <strong style={{ color: '#818cf8' }}>Milenyum Problemi:</strong>
                                <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Eğer bir gün P = NP olduğu kanıtlanırsa, kanser tedavisinden yapay zekaya kadar her şey anında çözülebilir.
                                </p>
                            </div>
                        </div>

                        {/* Custom SVG Venn Diagram */}
                        <div style={{ position: 'relative', height: '300px', width: '300px' }}>
                            <svg viewBox="0 0 400 400" width="100%" height="100%">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <linearGradient id="gradP" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
                                    </linearGradient>
                                    <linearGradient id="gradNP" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
                                    </linearGradient>
                                    <linearGradient id="gradHard" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f87171" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                                    </linearGradient>
                                </defs>

                                {/* NP Circle (Outer) */}
                                <circle cx="200" cy="200" r="180" stroke="#6366f1" strokeWidth="2" fill="url(#gradNP)" filter="url(#glow)" />
                                <text x="200" y="80" textAnchor="middle" fill="var(--primary)" fontSize="24" fontWeight="bold">NP</text>

                                {/* P Circle (Inner Left) */}
                                <circle cx="140" cy="240" r="80" stroke="#4ade80" strokeWidth="2" fill="url(#gradP)" filter="url(#glow)" />
                                <text x="140" y="250" textAnchor="middle" fill="#22c55e" fontSize="24" fontWeight="bold">P</text>

                                {/* NP-Complete Circle (Inner Right Overlap) */}
                                <circle cx="260" cy="240" r="80" stroke="#f87171" strokeWidth="2" fill="url(#gradHard)" strokeDasharray="5,5" />
                                <text x="260" y="250" textAnchor="middle" fill="#ef4444" fontSize="18" fontWeight="bold">NP-Complete</text>
                            </svg>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PnpTheory;
