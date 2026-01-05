import React from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { BarChart2, ArrowRight } from 'lucide-react';

const SortTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'grid', gap: 'var(--space-xl)' }}>

            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px', color: 'var(--primary)' }}>
                        <BarChart2 size={24} />
                    </div>
                    <h2 style={{ margin: 0 }}>6.1. Sıralama Karşılaştırma Tablosu</h2>
                </div>
                <Card>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                                    <th style={{ padding: '10px', color: 'var(--text-primary)' }}>Algoritma</th>
                                    <th style={{ padding: '10px', color: 'var(--text-primary)' }}>Best Case (En İyi)</th>
                                    <th style={{ padding: '10px', color: 'var(--text-primary)' }}>Average (Ortalama)</th>
                                    <th style={{ padding: '10px', color: 'var(--text-primary)' }}>Worst Case (En Kötü)</th>
                                    <th style={{ padding: '10px', color: 'var(--text-primary)' }}>Mantık</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--accent)' }}>Insertion</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>Ω(n)</td>
                                    <td style={{ padding: '10px' }}>Θ(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--danger)' }}>O(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Kart dizer gibi araya ekle.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--accent)' }}>Selection</td>
                                    <td style={{ padding: '10px' }}>Ω(n²)</td>
                                    <td style={{ padding: '10px' }}>Θ(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--danger)' }}>O(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>En küçüğü seç, başa koy.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--accent)' }}>Bubble</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>Ω(n)</td>
                                    <td style={{ padding: '10px' }}>Θ(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--danger)' }}>O(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Yan yana ikilileri takas et.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--success)' }}>Merge</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>Ω(n log n)</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>Θ(n log n)</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>O(n log n)</td>
                                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Böl ve Yönet (Birleştir).</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--success)' }}>Quick</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>Ω(n log n)</td>
                                    <td style={{ padding: '10px', color: 'var(--success)' }}>Θ(n log n)</td>
                                    <td style={{ padding: '10px', color: 'var(--danger)' }}>O(n²)</td>
                                    <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>Pivot seç, ayır.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <h2 style={{ margin: 0 }}>6.2. Trace Örnekleri (Adım Adım İzleme)</h2>
                    <Badge>Sınav Odaklı</Badge>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--primary)' }}>Insertion Sort Trace</h3>
                        <div style={{ fontFamily: 'monospace', background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Örnek Dizi: [33, 44, 21, 83]</div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                                1. [33, 44], 21... (33&lt;44, OK)<br />
                                2. [21, 33, 44], 83... (21 en başa gelir)<br />
                                3. [21, 33, 44, 83] (Sıralı)<br />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--accent)' }}>Selection Sort Trace</h3>
                        <div style={{ fontFamily: 'monospace', background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Örnek Dizi: [5, 7, 2, 9]</div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                                1. En küçük 2 &rarr; Swap(5, 2)<br />
                                &nbsp;&nbsp;[2 | 7, 5, 9]<br /><br />
                                2. En küçük 5 &rarr; Swap(7, 5)<br />
                                &nbsp;&nbsp;[2, 5 | 7, 9]<br /><br />
                                3. En küçük 7 &rarr; Swap(7, 7)<br />
                                &nbsp;&nbsp;[2, 5, 7 | 9]<br />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default SortTheory;
