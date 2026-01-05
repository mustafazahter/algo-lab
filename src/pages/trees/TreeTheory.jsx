import React from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { Network, ArrowDown, GitMerge, ListOrdered } from 'lucide-react';

const TreeTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'grid', gap: 'var(--space-xl)' }}>

            {/* 8.1 Ağaç Gezinme */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', color: 'var(--success)' }}>
                        <Network size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>8.1. Ağaç Gezinme (Tree Traversal)</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
                                <ArrowDown size={20} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>1. Preorder (Önce Kök)</h3>
                        </div>
                        <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '12px', fontFamily: 'monospace', color: '#60a5fa', fontWeight: 'bold' }}>
                            Kök → Sol → Sağ
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                            Önce kökü işle, sonra sol alt ağacı gez, en son sağ alt ağacı gez. Dosya sistemi kopyalama işlemlerinde kullanılır.
                        </p>
                    </Card>

                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(192, 132, 252, 0.2)', color: '#c084fc' }}>
                                <ListOrdered size={20} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>2. Inorder (Ortada Kök)</h3>
                        </div>
                        <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '12px', fontFamily: 'monospace', color: '#c084fc', fontWeight: 'bold' }}>
                            Sol → Kök → Sağ
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                            Önce sol, sonra kök, sonra sağ. BST yapısında elemanları <strong style={{ color: 'var(--text-primary)' }}>küçükten büyüğe sıralı</strong> verir.
                        </p>
                    </Card>

                    <Card>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                            <div style={{ padding: '6px', borderRadius: '6px', background: 'rgba(251, 191, 36, 0.2)', color: '#fbbf24' }}>
                                <GitMerge size={20} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>3. Postorder (Sonda Kök)</h3>
                        </div>
                        <div style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', marginBottom: '12px', fontFamily: 'monospace', color: '#fbbf24', fontWeight: 'bold' }}>
                            Sol → Sağ → Kök
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                            Önce çocukları bitir, en son kökü işle. Klasör silme (önce içindekileri sil) işlemlerinde kullanılır.
                        </p>
                    </Card>

                </div>

                {/* Görsel Örnek - Improved SVG Diagram */}
                <div style={{ marginTop: '20px' }}>
                    <Card>
                        <h3 style={{ marginTop: 0, marginBottom: '20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Görsel Örnek (Trace Analizi)
                            <Badge>Önemli</Badge>
                        </h3>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
                            {/* Tree SVG */}
                            <div style={{ flex: '0 0 auto', background: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                                <svg width="240" height="180" viewBox="0 0 240 180" style={{ overflow: 'visible' }}>
                                    {/* Edges */}
                                    <line x1="120" y1="30" x2="70" y2="80" stroke="#475569" strokeWidth="2" />
                                    <line x1="120" y1="30" x2="170" y2="80" stroke="#475569" strokeWidth="2" />
                                    <line x1="70" y1="80" x2="40" y2="130" stroke="#475569" strokeWidth="2" />
                                    <line x1="70" y1="80" x2="100" y2="130" stroke="#475569" strokeWidth="2" />

                                    {/* Nodes */}
                                    <g><circle cx="120" cy="30" r="18" fill="#1e293b" stroke="#60a5fa" strokeWidth="2" /><text x="120" y="30" dy=".35em" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">A</text></g>
                                    <g><circle cx="70" cy="80" r="18" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" /><text x="70" y="80" dy=".35em" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">B</text></g>
                                    <g><circle cx="170" cy="80" r="18" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" /><text x="170" y="80" dy=".35em" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">C</text></g>
                                    <g><circle cx="40" cy="130" r="18" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" /><text x="40" y="130" dy=".35em" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">D</text></g>
                                    <g><circle cx="100" cy="130" r="18" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" /><text x="100" y="130" dy=".35em" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="bold">E</text></g>
                                </svg>
                            </div>

                            {/* Trace Steps */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #60a5fa' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Preorder (Kök-Sol-Sağ)</div>
                                    <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>A, B, D, E, C</div>
                                </div>
                                <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #c084fc' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Inorder (Sol-Kök-Sağ)</div>
                                    <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>D, B, E, A, C</div>
                                </div>
                                <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #fbbf24' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Postorder (Sol-Sağ-Kök)</div>
                                    <div style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 'bold' }}>D, E, B, C, A</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 8.2 Heap */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '8px', color: 'var(--accent-warning)' }}>
                        <ListOrdered size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>8.2. Heap (Yığın) & Dizi Temelli Ağaçlar</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Heap Özellikleri</h3>
                        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Max Heap:</strong> Kök en büyük, ebeveynler çocuklardan büyük.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Min Heap:</strong> Kök en küçük.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Complete Tree:</strong> Ağaç soldan sağa dolulur, arada boşluk olmaz.</li>
                            <li><strong style={{ color: 'var(--text-primary)' }}>Derinlik:</strong> ⌈log₂ N⌉</li>
                        </ul>
                    </Card>

                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Dizi İndis İlişkisi (Array Mapping)</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '15px' }}>
                            Heap hafızada verimli olmak için <strong>Dizi (Array)</strong> üzerinde tutulur. Köke <code>i=1</code> (veya 0) dersek:
                        </p>

                        <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-medium)' }}>
                            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', padding: '10px' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)' }}>Sol Çocuk:</span>
                                <span style={{ fontFamily: 'monospace', color: '#60a5fa', fontWeight: 'bold' }}>2 * i</span>
                            </div>
                            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-light)', padding: '10px' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)' }}>Sağ Çocuk:</span>
                                <span style={{ fontFamily: 'monospace', color: '#60a5fa', fontWeight: 'bold' }}>2 * i + 1</span>
                            </div>
                            <div style={{ display: 'flex', padding: '10px' }}>
                                <span style={{ width: '120px', color: 'var(--text-secondary)' }}>Ebeveyn:</span>
                                <span style={{ fontFamily: 'monospace', color: '#60a5fa', fontWeight: 'bold' }}>⌊ i / 2 ⌋</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* 8.3 Dengeli Ağaçlar */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--accent-primary)' }}>
                        <GitMerge size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>8.3. Dengeli Ağaçlar (Balanced Trees)</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Neden Önemli?</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Ağacın <strong>derinliği (height)</strong> performansı belirler. Eğer sağ ve sol alt ağaçların derinlik farkı çok açılırsa (örn: &gt;1), ağaç <strong>dengesizleşir</strong>.
                        </p>
                        <div style={{ marginTop: '15px', padding: '10px', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                            <strong style={{ display: 'block', color: '#ef4444', marginBottom: '5px' }}>Dengesiz Ağaç (Kötü)</strong>
                            <span style={{ color: 'var(--text-secondary)' }}>Sürekli tek tarafa ekleme yapılırsa "Linked List"e döner. Arama süresi <strong>O(N)</strong> olur.</span>
                        </div>
                    </Card>

                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Dengeli (Balanced) Durum</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Sağ ve sol derinlik farkı en fazla 1 ise ağaç dengelidir. Bu durumda arama işlemleri her zaman çok hızlıdır.
                        </p>
                        <div style={{ marginTop: '15px', padding: '10px', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                            <strong style={{ display: 'block', color: '#10b981', marginBottom: '5px' }}>Dengeli Ağaç (İyi)</strong>
                            <span style={{ color: 'var(--text-secondary)' }}>Her adımda veriyi yarıya böler. Arama süresi <strong>O(log N)</strong> olur. (Örn: AVL Ağaçları)</span>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default TreeTheory;
