import React from 'react';
import { Card, Badge, PageHeader } from '../../components/ui/Common';
import { Network, Map, Navigation, ArrowRightLeft, Globe, Zap } from 'lucide-react';
import SimpleGraph from '../../components/ui/SimpleGraph';

const GraphTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'grid', gap: 'var(--space-xl)' }}>

            <PageHeader
                title="7. Graf Algoritmaları"
                subtitle="Şehirler ve Yollar: Karmaşık problemlerin en basit modeli."
            />

            {/* ANA AÇIKLAMA */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--primary)' }}>
                        <Map size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>7.1. Graf Nedir? </h2>
                </div>

                <Card>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '30px', alignItems: 'start' }}>
                        {/* Sol: Açıklama */}
                        <div>
                            <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>🗺️ Harita Analojisi</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1rem' }}>
                                Bir Türkiye haritası hayal et. Bu haritada:
                            </p>
                            <ul style={{ color: 'var(--text-secondary)', lineHeight: '2', paddingLeft: '20px' }}>
                                <li>
                                    <strong style={{ color: 'var(--primary)' }}>Şehirler</strong> yuvarlak noktalarla gösterilir.
                                    Bunlara <em>"Düğüm" (Vertex/Node)</em> diyoruz.
                                </li>
                                <li>
                                    <strong style={{ color: 'var(--accent)' }}>Otoyollar</strong> bu noktaları birbirine bağlayan çizgilerdir.
                                    Bunlara da <em>"Kenar" (Edge)</em> diyoruz.
                                </li>
                            </ul>
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))',
                                padding: '15px',
                                borderRadius: '12px',
                                border: '1px solid var(--border-medium)',
                                marginTop: '15px'
                            }}>
                                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)' }}>
                                    💡 Özet: Graf = Noktalar + Çizgiler
                                </p>
                                <p style={{ margin: '10px 0 0 0', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                                    G = (V, E) &nbsp;&nbsp;|&nbsp;&nbsp; V = Vertices, E = Edges
                                </p>
                            </div>
                        </div>

                        {/* Sağ: Görsel */}
                        <div>
                            <SimpleGraph
                                height={220}
                                title="📍 Örnek Graf: Basit Harita"
                                nodes={[
                                    { id: 'ist', x: 150, y: 40, label: 'İST', bg: 'var(--primary)', color: 'white' },
                                    { id: 'ank', x: 100, y: 120, label: 'ANK', bg: 'var(--accent)', color: 'white' },
                                    { id: 'izm', x: 200, y: 120, label: 'İZM', bg: 'var(--success)', color: 'white' },
                                    { id: 'ant', x: 150, y: 190, label: 'ANT', bg: 'var(--warning)', color: 'white' }
                                ]}
                                edges={[
                                    { from: 'ist', to: 'ank', label: '450' },
                                    { from: 'ist', to: 'izm', label: '350' },
                                    { from: 'ank', to: 'izm', label: '' },
                                    { from: 'ank', to: 'ant', label: '200' },
                                    { from: 'izm', to: 'ant', label: '300' }
                                ]}
                            />
                            <div style={{ marginTop: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                <span style={{ color: 'var(--primary)' }}>●</span> Düğümler: 4 şehir &nbsp;|&nbsp;
                                <span style={{ color: 'var(--text-secondary)' }}>─</span> Kenarlar: 5 yol
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* GERÇEK HAYAT ÖRNEKLERİ */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: 'var(--success)' }}>
                        <Globe size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>7.2. Nerede Kullanılır?</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                    <Card>
                        <h4 style={{ marginTop: 0, color: 'var(--success)' }}>🌐 Sosyal Ağlar</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                            "Arkadaş önerileri" graf üzerinde yol aramadır.
                        </p>
                        <SimpleGraph
                            height={150}
                            nodes={[
                                { id: 'sen', x: 150, y: 30, label: 'Sen', bg: 'var(--success)', color: 'white' },
                                { id: 'ali', x: 80, y: 80, label: 'Ali' },
                                { id: 'veli', x: 220, y: 80, label: 'Veli' },
                                { id: 'bur', x: 150, y: 130, label: 'Burak', bg: 'var(--bg-secondary)', borderColor: 'var(--text-secondary)' }
                            ]}
                            edges={[
                                { from: 'sen', to: 'ali' },
                                { from: 'sen', to: 'veli' },
                                { from: 'ali', to: 'bur' },
                                { from: 'veli', to: 'bur' }
                            ]}
                        />
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Burak senin ortak arkadaşın!</p>
                    </Card>

                    <Card>
                        <h4 style={{ marginTop: 0, color: 'var(--warning)' }}>📍 Navigasyon</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                            En kısa yol (Dijkstra) buradan hesaplanır.
                        </p>
                        <SimpleGraph
                            height={150}
                            nodes={[
                                { id: 'ev', x: 50, y: 50, label: 'Ev' },
                                { id: 'okul', x: 250, y: 50, label: 'Okul', bg: 'var(--warning)', color: 'white' },
                                { id: 'market', x: 150, y: 120, label: 'Market' }
                            ]}
                            edges={[
                                { from: 'ev', to: 'okul', label: '5dk' },
                                { from: 'ev', to: 'market', label: '10dk' },
                                { from: 'market', to: 'okul', label: '3dk' }
                            ]}
                        />
                    </Card>

                    <Card>
                        <h4 style={{ marginTop: 0, color: 'var(--accent)' }}>💡 Elektrik Ağı</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                            Minimum kablo ile her eve elektrik (MST).
                        </p>
                        <SimpleGraph
                            height={150}
                            nodes={[
                                { id: 's', x: 150, y: 30, label: 'Santral', bg: 'var(--accent)', color: 'white' },
                                { id: 'e1', x: 80, y: 100, label: 'Ev1' },
                                { id: 'e2', x: 220, y: 100, label: 'Ev2' },
                                { id: 'e3', x: 150, y: 140, label: 'Ev3' }
                            ]}
                            edges={[
                                { from: 's', to: 'e1' },
                                { from: 's', to: 'e2' },
                                { from: 'e1', to: 'e3' },
                                { from: 'e2', to: 'e3', dashed: true, color: 'var(--text-secondary)' }
                            ]}
                        />
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Kesikli çizgi gereksiz hat.</p>
                    </Card>
                </div>
            </section>

            {/* GRAF TÜRLERİ */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '8px', color: 'var(--accent)' }}>
                        <ArrowRightLeft size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>7.3. Graf Türleri</h2>
                    <Badge>Sınav İçin Kritik</Badge>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

                    {/* YÖNLÜ vs YÖNSÜZ */}
                    <Card>
                        <h4 style={{ marginTop: 0, color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px' }}>
                            1️⃣ Yön Durumu
                        </h4>

                        <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                            <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <strong style={{ color: 'var(--danger)' }}>Yönlü (Directed)</strong>
                                    <Badge type="danger">Tek Yön</Badge>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SimpleGraph
                                        height={80}
                                        nodes={[
                                            { id: 'a', x: 50, y: 40, label: 'A' },
                                            { id: 'b', x: 250, y: 40, label: 'B' }
                                        ]}
                                        edges={[{ from: 'a', to: 'b', type: 'directed', color: 'var(--danger)' }]}
                                    />
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    A &rarr; B gidilir ama B &rarr; A gidilemez.
                                </p>
                            </div>

                            <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <strong style={{ color: 'var(--success)' }}>Yönsüz (Undirected)</strong>
                                    <Badge type="success">Çift Yön</Badge>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SimpleGraph
                                        height={80}
                                        nodes={[
                                            { id: 'a', x: 50, y: 40, label: 'A' },
                                            { id: 'b', x: 250, y: 40, label: 'B' }
                                        ]}
                                        edges={[{ from: 'a', to: 'b', color: 'var(--success)' }]}
                                    />
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    A &harr; B karşılıklı gidilebilir.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* AĞIRLIKLI vs AĞIRLIKSIZ */}
                    <Card>
                        <h4 style={{ marginTop: 0, color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px' }}>
                            2️⃣ Ağırlık Durumu
                        </h4>

                        <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                            <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <strong style={{ color: 'var(--primary)' }}>Ağırlıklı (Weighted)</strong>
                                    <Badge type="primary">Maliyetli</Badge>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SimpleGraph
                                        height={80}
                                        nodes={[
                                            { id: 'a', x: 50, y: 40, label: 'A' },
                                            { id: 'b', x: 250, y: 40, label: 'B' }
                                        ]}
                                        edges={[{ from: 'a', to: 'b', label: '15km', color: 'var(--primary)' }]}
                                    />
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    Yolun süresi, uzunluğu veya ücreti vardır.
                                </p>
                            </div>

                            <div style={{ background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Ağırlıksız (Unweighted)</strong>
                                    <Badge>Basit</Badge>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SimpleGraph
                                        height={80}
                                        nodes={[
                                            { id: 'a', x: 50, y: 40, label: 'A' },
                                            { id: 'b', x: 250, y: 40, label: 'B' }
                                        ]}
                                        edges={[{ from: 'a', to: 'b', color: 'var(--text-secondary)' }]}
                                    />
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    Kenar var mı yok mu? O kadar. Mesafe önemli değil.
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* DÖNGÜSEL vs DÖNGÜSÜZ */}
                    <Card>
                        <h4 style={{ marginTop: 0, color: 'var(--text-primary)', borderBottom: '2px solid var(--border-light)', paddingBottom: '10px' }}>
                            3️⃣ Döngü Durumu
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <SimpleGraph
                                height={150}
                                nodes={[
                                    { id: 'a', x: 100, y: 40, label: 'A', bg: 'var(--warning)', color: 'white' },
                                    { id: 'b', x: 200, y: 40, label: 'B' },
                                    { id: 'c', x: 200, y: 120, label: 'C' },
                                    { id: 'd', x: 100, y: 120, label: 'D' }
                                ]}
                                edges={[
                                    { from: 'a', to: 'b' },
                                    { from: 'b', to: 'c' },
                                    { from: 'c', to: 'd' },
                                    { from: 'd', to: 'a', color: 'var(--warning)' }
                                ]}
                            />
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                            <strong>Döngüsel (Cyclic):</strong> Başladığın yere dönebilirsin (A &rarr; B &rarr; C &rarr; D &rarr; A).
                        </p>
                        <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-light)', marginTop: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                <SimpleGraph
                                    height={120}
                                    nodes={[
                                        { id: 'a', x: 150, y: 30, label: 'A' },
                                        { id: 'b', x: 80, y: 90, label: 'B' },
                                        { id: 'c', x: 220, y: 90, label: 'C' },
                                        { id: 'd', x: 50, y: 150, label: 'D' },
                                        { id: 'e', x: 110, y: 150, label: 'E' }
                                    ]}
                                    edges={[
                                        { from: 'a', to: 'b' },
                                        { from: 'a', to: 'c' },
                                        { from: 'b', to: 'd' },
                                        { from: 'b', to: 'e' }
                                    ]}
                                />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '0' }}>
                                <strong>Döngüsüz (Acyclic / Tree):</strong> Geri dönüş yok. Ağaç yapısı gibi.
                            </p>
                        </div>
                    </Card>
                </div>
            </section>


            {/* TEMEL TERİMLER */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', color: 'var(--warning)' }}>
                        <Zap size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>7.4. Temel Terimler Sözlüğü</h2>
                </div>

                <Card>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', color: 'var(--text-primary)' }}>Terim</th>
                                    <th style={{ padding: '12px', color: 'var(--text-primary)' }}>İngilizce</th>
                                    <th style={{ padding: '12px', color: 'var(--text-primary)' }}>Açıklama</th>
                                    <th style={{ padding: '12px', color: 'var(--text-primary)' }}>Örnek</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--primary)' }}>Düğüm</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Vertex / Node</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Noktalar, şehirler, kişiler</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>İstanbul, Ankara</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--accent)' }}>Kenar</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Edge</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Çizgiler, yollar, ilişkiler</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>İstanbul-Ankara yolu</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--warning)' }}>Ağırlık</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Weight</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Kenarın maliyeti</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>450 km, 5 saat</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--success)' }}>Derece</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Degree</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Bir düğüme bağlı kenar sayısı</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Ankara'nın 5 yolu var → Derece=5</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: 'bold', color: 'var(--danger)' }}>Yol</td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace' }}>Path</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>Düğümler arası kenar dizisi</td>
                                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>İst &rarr; Ank &rarr; İzm</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

        </div>
    );
};

export default GraphTheory;
