import React from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { BarChart2, ArrowRight, CornerDownRight } from 'lucide-react';

const SortTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)', width: '100%', maxWidth: '100%' }}>

            <section style={{ width: '100%', maxWidth: '100%' }}>
                {/* Alt Başlık Bölümü */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap', width: '100%' }}>
                    <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)', flexShrink: 0 }}>
                        <CornerDownRight size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 20 : 24} />
                    </div>
                    <div style={{ flex: 1, minWidth: '0' }}> {/* minWidth: 0 is critical for flex items to shrink */}
                        <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700', wordBreak: 'break-word', hyphens: 'auto' }}>6.1. Sıralama Karşılaştırma Tablosu</h2>
                        <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Algoritmaların zaman ve alan karmaşıklıkları ile çalışma mantıklarının özeti.</p>
                    </div>
                </div>
                <Card>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', maxWidth: '100%' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                            minWidth: '600px' // Tablo içeriğinin okunabilir kalması için
                        }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                                    <th style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Algoritma</th>
                                    <th style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>En İyi</th>
                                    <th style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Ortalama</th>
                                    <th style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>En Kötü</th>
                                    <th style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-primary)', minWidth: '150px' }}>Mantık</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', fontWeight: 'bold', color: 'var(--accent)', whiteSpace: 'nowrap' }}>Insertion</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>Ω(n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', whiteSpace: 'nowrap' }}>Θ(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--danger)', whiteSpace: 'nowrap' }}>O(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-secondary)' }}>Kart dizer gibi araya ekle.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', fontWeight: 'bold', color: 'var(--accent)', whiteSpace: 'nowrap' }}>Selection</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', whiteSpace: 'nowrap' }}>Ω(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', whiteSpace: 'nowrap' }}>Θ(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--danger)', whiteSpace: 'nowrap' }}>O(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-secondary)' }}>En küçüğü seç, başa koy.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', fontWeight: 'bold', color: 'var(--accent)', whiteSpace: 'nowrap' }}>Bubble</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>Ω(n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', whiteSpace: 'nowrap' }}>Θ(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--danger)', whiteSpace: 'nowrap' }}>O(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-secondary)' }}>Yan yana ikilileri takas et.</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', fontWeight: 'bold', color: 'var(--success)', whiteSpace: 'nowrap' }}>Merge</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>Ω(n log n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>Θ(n log n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>O(n log n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-secondary)' }}>Böl ve Yönet (Birleştir).</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', fontWeight: 'bold', color: 'var(--success)', whiteSpace: 'nowrap' }}>Quick</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>Ω(n log n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--success)', whiteSpace: 'nowrap' }}>Θ(n log n)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--danger)', whiteSpace: 'nowrap' }}>O(n²)</td>
                                    <td style={{ padding: 'clamp(8px, 2vw, 12px)', color: 'var(--text-secondary)' }}>Pivot seç, ayır.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </section>

            <section style={{ width: '100%', maxWidth: '100%' }}>
                {/* Alt Başlık Bölümü */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap', width: '100%' }}>
                    <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)', flexShrink: 0 }}>
                        <CornerDownRight size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 20 : 24} />
                    </div>
                    <div style={{ flex: 1, minWidth: '0' }}> {/* minWidth: 0 prevents flex item from overflowing */}
                        <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700', wordBreak: 'break-word', hyphens: 'auto' }}>6.2. Trace Örnekleri (Adım Adım İzleme)</h2>
                        <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Sınav odaklı adım adım algoritma işleyiş analizleri.</p>
                    </div>
                </div>
                <div className="grid-responsive" style={{ width: '100%' }}>
                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--primary)', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>Insertion Sort Trace</h3>
                        <div style={{
                            fontFamily: 'monospace',
                            background: 'var(--bg-primary)',
                            padding: 'clamp(12px, 3vw, 15px)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-medium)',
                            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                            overflowX: 'auto',
                            width: '100%',
                            whiteSpace: 'pre-wrap', // Satırların taşmasını engellemek için
                            wordBreak: 'break-word'
                        }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Örnek Dizi: [33, 44, 21, 83]</div>
                            <div style={{ color: 'var(--text-secondary)' }}>
                                1. [33, 44], 21... (33&lt;44, OK)<br />
                                2. [21, 33, 44], 83... (21 en başa gelir)<br />
                                3. [21, 33, 44, 83] (Sıralı)<br />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h3 style={{ marginTop: 0, color: 'var(--accent)', fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>Selection Sort Trace</h3>
                        <div style={{
                            fontFamily: 'monospace',
                            background: 'var(--bg-primary)',
                            padding: 'clamp(12px, 3vw, 15px)',
                            borderRadius: '8px',
                            border: '1px solid var(--border-medium)',
                            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
                            overflowX: 'auto',
                            width: '100%',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                        }}>
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
