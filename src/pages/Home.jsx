import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Common';
import {
    BookOpen,
    Layers,
    Activity,
    Code,
    Search,
    ListOrdered,
    Share2,
    TreePine,
    Puzzle,
    ChevronRight
} from 'lucide-react';

const Home = () => {
    const modules = [
        {
            title: 'Temel Bilgiler',
            desc: 'Algoritma kavramı, akış diyagramları ve sözde kod giriş.',
            path: '/basics',
            icon: <BookOpen size={24} />,
            color: '#60a5fa'
        },
        {
            title: 'Karmaşıklık Analizi',
            desc: 'Asimptotik notasyonlar (Big O), zaman ve alan karmaşıklığı.',
            path: '/complexity',
            icon: <Activity size={24} />,
            color: '#f87171'
        },
        {
            title: 'Kod Analizi',
            desc: 'Döngü ve özyineleme analizi, adım sayma teknikleri.',
            path: '/code-analysis',
            icon: <Code size={24} />,
            color: '#34d399'
        },
        {
            title: 'Tasarım Yöntemleri',
            desc: 'Brute Force, Greedy, Dinamik Programlama, Böl ve Yönet.',
            path: '/design',
            icon: <Layers size={24} />,
            color: '#fbbf24'
        },
        {
            title: 'Arama Algoritmaları',
            desc: 'Doğrusal ve İkili Arama yöntemleri ve görselleştirmesi.',
            path: '/search',
            icon: <Search size={24} />,
            color: '#a78bfa'
        },
        {
            title: 'Sıralama Algoritmaları',
            desc: 'Kabarcık, Hızlı, Birleştirme ve Ekleme sıralama analizleri.',
            path: '/sorting',
            icon: <ListOrdered size={24} />,
            color: '#f472b6'
        },
        {
            title: 'Graf Teorisi',
            desc: 'Düğümler, kenarlar ve en kısa yol (Dijkstra, MST) problemleri.',
            path: '/graphs',
            icon: <Share2 size={24} />,
            color: '#2dd4bf'
        },
        {
            title: 'Ağaç Yapıları',
            desc: 'İkili ağaçlar, AVL, Kırmızı-Siyah ağaçlar ve gezintiler.',
            path: '/trees',
            icon: <TreePine size={24} />,
            color: '#fb923c'
        },
        {
            title: 'P vs NP Teorisi',
            desc: 'Hesaplamanın sınırları ve bilgisayar biliminin en büyük gizemi.',
            path: '/pnp',
            icon: <Puzzle size={24} />,
            color: '#818cf8'
        }
    ];

    return (
        <div className="animate-fade-in section-padding" style={{ paddingBottom: 'var(--space-2xl)' }}>
            <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)', maxWidth: '800px' }}>
                <h1 className="text-display" style={{ marginBottom: 'var(--space-sm)', lineHeight: 1.1, fontWeight: '800' }}>
                    <span className="text-gradient">Algoritma Laboratuvarı</span>
                </h1>
                <p className="text-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
                    Geleceğin mühendisleri için interaktif bir keşif alanı.
                    Karmaşık yapıları görselleştirin, algoritmaları canlı simülasyonlarla deneyimleyin.
                </p>
                <div style={{ height: '2px', width: 'clamp(40px, 10vw, 60px)', background: 'var(--primary)', marginTop: 'var(--space-lg)' }} />
            </div>

            <div className="grid-responsive" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(16px, 3vw, 20px)' }}>
                {modules.map((module, idx) => (
                    <Link key={idx} to={module.path} style={{ textDecoration: 'none', display: 'block' }}>
                        <Card className="hover-card" style={{
                            height: '100%',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'clamp(12px, 3vw, 15px)',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-light)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            {/* Decorative Background Blur */}
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '100px',
                                height: '100px',
                                background: module.color,
                                filter: 'blur(50px)',
                                opacity: 0.1,
                                pointerEvents: 'none'
                            }} />

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '12px',
                                    background: `color-mix(in srgb, ${module.color}, transparent 85%)`,
                                    color: module.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {module.icon}
                                </div>
                                <ChevronRight size={18} color="var(--text-muted)" />
                            </div>

                            <div>
                                <h3 style={{ margin: '0 0 8px 0', color: 'var(--text-primary)', fontSize: '1.25rem' }}>{module.title}</h3>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                                    {module.desc}
                                </p>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;

