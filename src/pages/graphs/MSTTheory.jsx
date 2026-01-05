import React from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { CornerDownRight, Anchor, Share2, Zap, ArrowRight, Truck, Database, GitBranch, Network } from 'lucide-react';
import SimpleGraph from '../../components/ui/SimpleGraph';

const MSTTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', width: '100%', maxWidth: '100%' }}>

            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px', flexWrap: 'wrap', width: '100%' }}>
                <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)', flexShrink: 0 }}>
                    <CornerDownRight size={24} />
                </div>
                <div style={{ flex: 1, minWidth: '0' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700', wordBreak: 'break-word' }}>7.2 Minimum Spanning Tree (MST)</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Adalar ve Köprüler: Tüm düğümleri en az maliyetle bağlama sanatı.</p>
                </div>
            </div>

            {/* MST HİKAYESİ */}
            <section style={{ width: '100%', maxWidth: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--primary)', flexShrink: 0 }}>
                        <Anchor size={24} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', wordBreak: 'break-word' }}>Hikaye: Adalar Ülkesi 🏝️</h2>
                </div>

                <Card>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                        {/* Sol: Hikaye */}
                        <div style={{ width: '100%' }}>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1rem' }}>
                                Bir <strong style={{ color: 'var(--primary)' }}>belediye başkanı</strong> olduğunuzu düşünün.
                                Ülkenizde <strong>5 ada</strong> var ve bu adaları köprülerle birbirine bağlamanız gerekiyor.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1rem' }}>
                                Ama bir sorun var: <strong style={{ color: 'var(--danger)' }}>Bütçe çok kısıtlı!</strong>
                                İnşaat maliyetini minimumda tutmanız şart.
                            </p>

                            <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
                                <div style={{
                                    padding: '12px 15px',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: 'var(--success)',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(16, 185, 129, 0.2)'
                                }}>
                                    ✅ HEDEF: Tüm adalara ulaşılabilsin
                                </div>
                                <div style={{
                                    padding: '12px 15px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: 'var(--danger)',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}>
                                    💰 KISIT: Maliyet minimum olmalı
                                </div>
                            </div>
                        </div>

                        {/* Sağ: Görsel */}
                        <div style={{ width: '100%', overflow: 'hidden' }}>
                            <SimpleGraph
                                height={250}
                                title="🗺️ Proje Taslağı: 5 Ada"
                                nodes={[
                                    { id: 'a', x: 150, y: 30, label: 'Ada A', bg: 'var(--primary)', color: 'white' },
                                    { id: 'b', x: 80, y: 90, label: 'B' },
                                    { id: 'c', x: 220, y: 90, label: 'C' },
                                    { id: 'd', x: 100, y: 170, label: 'D' },
                                    { id: 'e', x: 200, y: 170, label: 'E' }
                                ]}
                                edges={[
                                    { from: 'a', to: 'b', label: '10' },
                                    { from: 'a', to: 'c', label: '50', color: 'var(--danger)', dashed: true },
                                    { from: 'b', to: 'd', label: '3' },
                                    { from: 'a', to: 'a', label: '', color: 'transparent' }, // Dummy spacing
                                    { from: 'c', to: 'e', label: '8' },
                                    { from: 'b', to: 'e', label: '5' },
                                    { from: 'd', to: 'e', label: '2' }
                                ]}
                            />
                            <div style={{
                                marginTop: '15px',
                                padding: '10px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '8px',
                                textAlign: 'center',
                                fontSize: '0.85rem',
                                color: 'var(--danger)'
                            }}>
                                ⚠️ A-C yolu (50M₺) çok pahalı! <br />
                                A &rarr; B &rarr; E &rarr; ... daha ucuz yollar var.
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* MST KURALI */}
            <section style={{ width: '100%', maxWidth: '100%' }}>
                <Card style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        <div style={{ padding: '15px', background: 'var(--primary)', borderRadius: '12px', color: 'white', flexShrink: 0 }}>
                            <GitBranch size={28} />
                        </div>
                        <div style={{ flex: 1, minWidth: '0' }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>MST'nin Altın Kuralı</h3>
                            <p style={{ margin: '5px 0 0 0', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                                N düğümü bağlamak için tam olarak <strong style={{ color: 'var(--primary)', fontSize: '1.3rem' }}>N-1</strong> kenar yeterlidir.
                                Daha fazlası <strong style={{ color: 'var(--danger)' }}>döngü</strong> yaratır!
                            </p>
                            <div style={{ marginTop: '15px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '200px', overflow: 'hidden' }}>
                                    <SimpleGraph
                                        height={100}
                                        title="Döngü Var (Kötü)"
                                        nodes={[
                                            { id: '1', x: 50, y: 50, label: '1' },
                                            { id: '2', x: 150, y: 20, label: '2' },
                                            { id: '3', x: 250, y: 50, label: '3' }
                                        ]}
                                        edges={[
                                            { from: '1', to: '2' },
                                            { from: '2', to: '3' },
                                            { from: '3', to: '1', color: 'var(--danger)' }
                                        ]}
                                    />
                                </div>
                                <div style={{ flex: 1, minWidth: '200px', overflow: 'hidden' }}>
                                    <SimpleGraph
                                        height={100}
                                        title="MST (Mükemmel)"
                                        nodes={[
                                            { id: '1', x: 50, y: 50, label: '1' },
                                            { id: '2', x: 150, y: 20, label: '2' },
                                            { id: '3', x: 250, y: 50, label: '3' }
                                        ]}
                                        edges={[
                                            { from: '1', to: '2' },
                                            { from: '2', to: '3' }
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* PRIM & KRUSKAL */}
            <section style={{ width: '100%', maxWidth: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', wordBreak: 'break-word' }}>MST Algoritmaları</h2>
                    <Badge>Sınav İçin Kritik</Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '20px', width: '100%' }}>

                    {/* PRIM */}
                    <Card style={{ borderTop: '4px solid #3b82f6', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                            <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', color: '#3b82f6', flexShrink: 0 }}>
                                <Share2 size={24} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#3b82f6' }}>Prim Algoritması</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Düğüm Odaklı | Garantici Mühendis</p>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(59, 130, 246, 0.05)',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            marginBottom: '15px'
                        }}>
                            <p style={{ margin: 0, fontStyle: 'italic', color: '#3b82f6' }}>
                                "Ben adım adım, garanti ilerlerim. Önce bir adaya yerleşirim, sonra en yakın komşuyu fethetmeye giderim."
                            </p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>📋 Adımlar:</h4>
                            <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '2' }}>
                                <li>Rastgele bir düğüm seç (başlangıç noktası).</li>
                                <li>Bu düğümden dışarı çıkan EN KISA kenarı bul.</li>
                                <li>O kenarı MST'ye ekle, yeni düğümü "fethedilmiş" say.</li>
                                <li>Tüm "fethedilmiş" düğümlerden dışarı çıkan en kısa kenarı bul.</li>
                                <li>Tüm düğümler bağlanana kadar 4'ü tekrarla.</li>
                            </ol>
                        </div>

                        <div style={{ fontFamily: 'monospace', background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-medium)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#3b82f6' }}> Trace Örneği (A'dan Başla):</div>
                            <pre style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {`Başlangıç Set: {A}

Adım 1: A'dan en kısa? → A-B (2) ✓
         Set: {A, B}

Adım 2: {A,B}'den en kısa? → B-E (3) ✓
         Set: {A, B, E}

Adım 3: {A,B,E}'den en kısa? → E-D (2) ✓
         Set: {A, B, E, D}

Adım 4: {A,B,E,D}'den en kısa? → D-C (1) ✓
         Set: {A, B, E, D, C}

──────────────────────────────
Seçilen Kenarlar: A-B, B-E, E-D, D-C
Toplam Maliyet: 2+3+2+1 = 8`}
                            </pre>
                        </div>
                    </Card>

                    {/* KRUSKAL */}
                    <Card style={{ borderTop: '4px solid #a855f7', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                            <div style={{ padding: '10px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '8px', color: '#a855f7', flexShrink: 0 }}>
                                <Zap size={24} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, color: '#a855f7' }}>Kruskal Algoritması</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Kenar Odaklı | Pazarlıkçı</p>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(168, 85, 247, 0.05)',
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid rgba(168, 85, 247, 0.2)',
                            marginBottom: '15px'
                        }}>
                            <p style={{ margin: 0, fontStyle: 'italic', color: '#a855f7' }}>
                                "Fiyat listemde en ucuz neresiyse oradan başlarım. Döngü yapmıyorsa alırım, yapıyorsa pas geçerim."
                            </p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>📋 Adımlar:</h4>
                            <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '2' }}>
                                <li>Tüm kenarları ağırlıklarına göre sırala (küçükten büyüğe).</li>
                                <li>En küçük kenarı al.</li>
                                <li>Bu kenar döngü oluşturmuyor mu? Kontrol et (Union-Find).</li>
                                <li>Döngü yoksa MST'ye ekle, varsa at.</li>
                                <li>N-1 kenar seçilene kadar tekrarla.</li>
                            </ol>
                        </div>

                        <div style={{ fontFamily: 'monospace', background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-medium)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#a855f7' }}>📊 Trace Örneği (Sıralı Kenarlar):</div>
                            <pre style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.8', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {`Sıralı Liste: D-C(1), A-B(2), E-D(2), B-E(3), A-C(4)

Adım 1: D-C (1) → Döngü yok ✓ SEÇ
Adım 2: A-B (2) → Döngü yok ✓ SEÇ
Adım 3: E-D (2) → Döngü yok ✓ SEÇ
Adım 4: B-E (3) → Döngü yok ✓ SEÇ (4 kenar, bitti!)
Adım 5: A-C (4) → DÖNGÜ VAR ✗ REDDET

──────────────────────────────
Seçilen Kenarlar: D-C, A-B, E-D, B-E
Toplam Maliyet: 1+2+2+3 = 8`}
                            </pre>
                        </div>
                    </Card>
                </div>
            </section>

            {/* KARŞILAŞTIRMA TABLOSU */}
            <section style={{ width: '100%', maxWidth: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', wordBreak: 'break-word' }}>Prim vs Kruskal Karşılaştırması</h2>
                </div>

                <Card>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', maxWidth: '100%' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.95rem',
                            minWidth: '500px'
                        }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Özellik</th>
                                    <th style={{ padding: '12px', color: '#3b82f6', whiteSpace: 'nowrap' }}>Prim</th>
                                    <th style={{ padding: '12px', color: '#a855f7', whiteSpace: 'nowrap' }}>Kruskal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Yaklaşım</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Düğüm odaklı (genişle)</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Kenar odaklı (sırala-seç)</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Veri Yapısı</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Priority Queue (Heap)</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Union-Find (DSU)</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Karmaşıklık</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--success)' }}>O(E log V)</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--success)' }}>O(E log E)</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Ne Zaman Tercih?</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Yoğun graflarda (E ≈ V²)</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Seyrek graflarda (E &lt;&lt; V²)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            {/* DİĞER ALGORİTMALAR */}
            <section style={{ width: '100%', maxWidth: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <div style={{ padding: '10px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', color: 'var(--accent)', flexShrink: 0 }}>
                        <ArrowRight size={24} />
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', wordBreak: 'break-word' }}>7.3. Diğer Efsanevi Algoritmalar</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%' }}>

                    {/* BORUVKA */}
                    <Card style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                    <h3 style={{ margin: 0, color: 'var(--warning)' }}>1. Boruvka Algoritması</h3>
                                    <Badge type="warning">Paralel MST</Badge>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                    <strong>Mantık:</strong> Kruskal ve Prim sıralı çalışır (tek işlemci). Boruvka ise
                                    <em>"Böl ve Yönet"</em> taktiğini kullanır. Başlangıçta her düğüm bir "krallık"tır.
                                    Her krallık AYNI ANDA en yakın komşusuna yol yaparak birleşir.
                                </p>
                                <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Nerede Kullanılır?</strong>
                                    <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                                        <li>Çok çekirdekli süper bilgisayarlarda.</li>
                                        <li>Devasa veri setlerinde (Big Data).</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={{ width: '100%', overflow: 'hidden' }}>
                                <SimpleGraph
                                    height={200}
                                    title="Çoklu İşlem (Aynı anda birleşme)"
                                    nodes={[
                                        { id: 'a', x: 60, y: 50, label: 'Krallık A', bg: 'var(--warning)', color: 'white' },
                                        { id: 'b', x: 60, y: 150, label: 'Krallık B', bg: 'var(--warning)', color: 'white' },
                                        { id: 'c', x: 240, y: 50, label: 'Krallık C', bg: 'var(--accent)', color: 'white' },
                                        { id: 'd', x: 240, y: 150, label: 'Krallık D', bg: 'var(--accent)', color: 'white' }
                                    ]}
                                    edges={[
                                        { from: 'a', to: 'b', label: '2 br', color: 'var(--warning)', type: 'bidirectional' },
                                        { from: 'c', to: 'd', label: '3 br', color: 'var(--accent)', type: 'bidirectional' },
                                        { from: 'a', to: 'c', label: 'Birleş!', dashed: true, color: 'var(--success)' },
                                        { from: 'b', to: 'd', label: 'Birleş!', dashed: true, color: 'var(--success)' }
                                    ]}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* DIJKSTRA */}
                    <Card style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                    <h3 style={{ margin: 0, color: 'var(--accent)' }}>2. Dijkstra Algoritması</h3>
                                    <Badge type="primary">En Kısa Yol</Badge>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                    <strong>Mantık:</strong> Google Maps'in atasıdır! Bir noktadan başlar ve dalga dalga yayılarak
                                    diğer TÜM noktalara olan en kısa mesafeyi hesaplar.
                                    <em>"Açgözlü" (Greedy)</em> yaklaşımı kullanır: Her zaman en ucuz yola sapar.
                                </p>
                                <div style={{ marginTop: '15px', padding: '10px', borderLeft: '4px solid var(--danger)', background: 'var(--bg-secondary)' }}>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        <strong>Dikkat:</strong> Eksi (-) ağırlıklı yollarda çalışmaz!
                                        Mesela "bu yoldan gidersen 5 dakika kazanırsın" mantığını anlayamaz.
                                    </p>
                                </div>
                            </div>
                            <div style={{ width: '100%', overflow: 'hidden' }}>
                                <SimpleGraph
                                    height={200}
                                    title="Navigasyon Rotası (A'dan C'ye)"
                                    nodes={[
                                        { id: 'a', x: 60, y: 120, label: 'Ev (A)', bg: 'var(--accent)', color: 'white' },
                                        { id: 'b', x: 150, y: 50, label: 'B Köprüsü' },
                                        { id: 'c', x: 240, y: 120, label: 'Okul (C)', borderColor: 'var(--success)' }
                                    ]}
                                    edges={[
                                        { from: 'a', to: 'b', label: '3 dk', color: 'var(--accent)' },
                                        { from: 'b', to: 'c', label: '1 dk', color: 'var(--accent)' },
                                        { from: 'a', to: 'c', label: '10 dk (Trafik!)', dashed: true, color: 'var(--text-secondary)' }
                                    ]}
                                />
                                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--success)', marginTop: '5px' }}>
                                    Seçilen Rota: A &rarr; B &rarr; C (Toplam 4 dk) vs Direkt (10 dk)
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* BELLMAN-FORD */}
                    <Card style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                    <h3 style={{ margin: 0, color: 'var(--danger)' }}>3. Bellman-Ford Algoritması</h3>
                                    <Badge type="danger">Negatif Dedektifi</Badge>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                    <strong>Mantık:</strong> Dijkstra'nın abisidir. Biraz daha yavaş çalışır ama çok daha zekidir.
                                    Negatif ağırlıklı kenarları (örneğin finansal piyasalardaki arbitraj fırsatlarını) işleyebilir.
                                </p>
                                <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
                                    <strong style={{ color: 'var(--danger)' }}>Negatif Döngü Tespiti</strong>
                                    <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                        Eğer bir döngüde maliyet sürekli azalıyorsa (sonsuz kazanç), Bellman-Ford bunu yakalar ve "Hata!" verir.
                                    </p>
                                </div>
                            </div>
                            <div style={{ width: '100%', overflow: 'hidden' }}>
                                <SimpleGraph
                                    height={200}
                                    title="Zaman Kazandıran Negatif Yol"
                                    nodes={[
                                        { id: 'a', x: 60, y: 120, label: 'A', bg: 'var(--danger)', color: 'white' },
                                        { id: 'b', x: 150, y: 50, label: 'B' },
                                        { id: 'c', x: 240, y: 120, label: 'C' }
                                    ]}
                                    edges={[
                                        { from: 'a', to: 'b', label: '5₺ harca' },
                                        { from: 'b', to: 'c', label: '2₺ KAZAN (-2)', color: 'var(--danger)', type: 'directed' },
                                        { from: 'a', to: 'c', label: '10₺ harca', dashed: true }
                                    ]}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* EDMONDS-KARP */}
                    <Card style={{ width: '100%' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '30px', alignItems: 'start', width: '100%' }}>
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                                    <h3 style={{ margin: 0, color: 'var(--primary)' }}>4. Edmonds-Karp (Max Flow)</h3>
                                    <Badge type="primary">Maksimum Akış</Badge>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                    <strong>Mantık:</strong> "Bir boru hattından en fazla ne kadar su geçirebilirim?" sorusunun cevabıdır.
                                    Kaynak (Source) ve Hedef (Sink) arasında darboğaz oluşturmayacak şekilde rotalar bulur.
                                    BFS (Genişlik Öncelikli Arama) kullanarak "artık kapasite" yollarını keşfeder.
                                </p>
                                <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Örnekler</strong>
                                    <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                                        <li>İnternet trafiği yönlendirme.</li>
                                        <li>Kargo dağıtım lojistiği.</li>
                                        <li>Petrol boru hatları.</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={{ width: '100%', overflow: 'hidden' }}>
                                <SimpleGraph
                                    height={200}
                                    title="Su Borusu Kapasitesi"
                                    nodes={[
                                        { id: 's', x: 60, y: 100, label: 'Kaynak', bg: 'var(--primary)', color: 'white' },
                                        { id: '1', x: 150, y: 50, label: 'Boru 1' },
                                        { id: '2', x: 150, y: 150, label: 'Boru 2' },
                                        { id: 't', x: 240, y: 100, label: 'Musluk', bg: 'var(--primary)', color: 'white' }
                                    ]}
                                    edges={[
                                        { from: 's', to: '1', label: '10L', color: 'var(--primary)', type: 'directed' },
                                        { from: '1', to: 't', label: '5L (Dar!)', color: 'var(--danger)', type: 'directed' },
                                        { from: 's', to: '2', label: '8L', color: 'var(--primary)', type: 'directed' },
                                        { from: '2', to: 't', label: '8L', color: 'var(--primary)', type: 'directed' }
                                    ]}
                                />
                                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                                    Üst boruda tıkanıklık (Darboğaz) var! Toplam Akış: 5 + 8 = 13L
                                </p>
                            </div>
                        </div>
                    </Card>

                </div>
            </section>

        </div>
    );
};

export default MSTTheory;
