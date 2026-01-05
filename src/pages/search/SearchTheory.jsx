import React, { useState, useEffect, useRef } from 'react';
import { Card, Badge } from '../../components/ui/Common';
import { Share2, ArrowDown, ArrowRight, CornerDownRight, Compass, Search as SearchIcon } from 'lucide-react';

const TreeVisualization = () => {
    const [activeNode, setActiveNode] = useState(null);
    const [visited, setVisited] = useState([]);
    const [mode, setMode] = useState(null); // 'bfs' or 'dfs'
    const [isPlaying, setIsPlaying] = useState(false);

    // Timeouts ref for cleanup
    const timeoutsRef = useRef([]);

    //       0
    //     /   \
    //    1     2
    //   / \   / \
    //  3   4 5   6

    const bfsOrder = [0, 1, 2, 3, 4, 5, 6];
    const dfsOrder = [0, 1, 3, 4, 2, 5, 6];

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, []);

    const runSimulation = (selectedMode) => {
        if (isPlaying) return;
        setMode(selectedMode);
        setIsPlaying(true);
        setVisited([]);
        setActiveNode(null);

        // Clear previous
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        const order = selectedMode === 'bfs' ? bfsOrder : dfsOrder;

        order.forEach((nodeIndex, i) => {
            const timeout = setTimeout(() => {
                setActiveNode(nodeIndex);
                setVisited(prev => [...prev, nodeIndex]);
                if (i === order.length - 1) setIsPlaying(false);
            }, i * 800);
            timeoutsRef.current.push(timeout);
        });
    };

    return (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <h4 style={{ margin: 0 }}>Ağaç Üzerinde Arama (Tree Traversal)</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => runSimulation('bfs')}
                        disabled={isPlaying}
                        style={{ padding: '8px 15px', borderRadius: '6px', background: mode === 'bfs' ? 'var(--primary)' : 'var(--bg-card)', color: mode === 'bfs' ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-medium)', cursor: isPlaying ? 'not-allowed' : 'pointer', opacity: isPlaying && mode !== 'bfs' ? 0.5 : 1 }}
                    >
                        BFS (Sırayla)
                    </button>
                    <button
                        onClick={() => runSimulation('dfs')}
                        disabled={isPlaying}
                        style={{ padding: '8px 15px', borderRadius: '6px', background: mode === 'dfs' ? 'var(--danger)' : 'var(--bg-card)', color: mode === 'dfs' ? 'white' : 'var(--text-primary)', border: '1px solid var(--border-medium)', cursor: isPlaying ? 'not-allowed' : 'pointer', opacity: isPlaying && mode !== 'dfs' ? 0.5 : 1 }}
                    >
                        DFS (Derinlemesine)
                    </button>
                </div>
            </div>

            {/* Tree SVG */}
            <div style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto', padding: '10px' }}>
                <svg width="340" height="200" viewBox="0 0 340 200">
                    {/* Edges - Coordinates Updated for Spacing */}
                    <line x1="170" y1="30" x2="100" y2="90" stroke="var(--border-medium)" strokeWidth="2" />
                    <line x1="170" y1="30" x2="240" y2="90" stroke="var(--border-medium)" strokeWidth="2" />

                    <line x1="100" y1="90" x2="50" y2="160" stroke="var(--border-medium)" strokeWidth="2" />
                    <line x1="100" y1="90" x2="150" y2="160" stroke="var(--border-medium)" strokeWidth="2" />

                    <line x1="240" y1="90" x2="190" y2="160" stroke="var(--border-medium)" strokeWidth="2" />
                    <line x1="240" y1="90" x2="290" y2="160" stroke="var(--border-medium)" strokeWidth="2" />

                    {/* Nodes Helpers */}
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Nodes Render Functionality Inline for Clarity */}
                    {[
                        { id: 0, x: 170, y: 30, label: 'Root' },
                        { id: 1, x: 100, y: 90, label: 'L1' },
                        { id: 2, x: 240, y: 90, label: 'R1' },
                        { id: 3, x: 50, y: 160, label: 'L2' },
                        { id: 4, x: 150, y: 160, label: 'L2' }, // Spaced out
                        { id: 5, x: 190, y: 160, label: 'R2' }, // Spaced out
                        { id: 6, x: 290, y: 160, label: 'R2' }
                    ].map(node => {
                        const isActive = activeNode === node.id;
                        const isVisited = visited.includes(node.id);

                        return (
                            <g key={node.id}>
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={isActive ? 22 : 18}
                                    fill={isActive ? 'var(--accent)' : (isVisited ? 'var(--primary)' : 'var(--bg-primary)')}
                                    stroke={isActive ? 'white' : 'var(--border-medium)'}
                                    strokeWidth={isActive ? 3 : 2}
                                    style={{
                                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        filter: isActive ? 'url(#glow)' : 'none'
                                    }}
                                />
                                <text
                                    x={node.x}
                                    y={node.y + 4}
                                    textAnchor="middle"
                                    fill={isActive || isVisited ? 'white' : 'var(--text-secondary)'}
                                    fontSize="12"
                                    fontWeight="bold"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '15px' }}>
                {mode === 'bfs' && <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>BFS: Katman katman iner (Yatay tarama)</span>}
                {mode === 'dfs' && <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>DFS: Bir daldan sonuna kadar gider (Dikey tarama)</span>}
                {!mode && "Bir algoritma seçerek ağaç üzerindeki hareketini izle."}
            </div>
        </div>
    );
};

const SearchTheory = () => {
    return (
        <div className="animate-fade-in" style={{ display: 'grid', gap: 'var(--space-xl)' }}>

            {/* 1. Kategori: Bilgisiz (Uninformed) Algoritmalar */}
            <section>
                {/* Alt Başlık Bölümü */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                    <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                        <CornerDownRight size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>5.1. Bilgisiz (Kör) Arama - Uninformed</h2>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Veriye bakmadan, sistematik olarak tüm yolları tarayan algoritmalar.</p>
                    </div>
                </div>
                <Card>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                        Bu algoritmalar hedefin nerede olduğuna dair hiçbir ipucusuna (sezgiye) sahip değildir.
                        Sadece önlerindeki yolları sistematik olarak denerler.
                        Tıpkı <strong>AĞAÇ (Tree)</strong> yapısında olduğu gibi kökten başlayıp dallara ayrılırlar.
                    </p>

                    <TreeVisualization />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                        {/* BFS KART */}
                        <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '15px', background: 'var(--bg-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <Share2 size={20} color="var(--primary)" />
                                <h3 style={{ color: 'var(--primary)', margin: 0 }}>BFS (Genişlik Öncelikli)</h3>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Breadth-First Search</div>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li><strong>Veri Yapısı:</strong> Kuyruk (Queue) - <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>FIFO</span></li>
                                <li><strong>Mantık:</strong> Su dalgası gibi çevreye yayılır.</li>
                                <li><strong>İdeal:</strong> Hedef başlangıca yakınsa çok hızlıdır.</li>
                            </ul>
                        </div>

                        {/* DFS KART */}
                        <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '15px', background: 'var(--bg-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                <ArrowDown size={20} color="var(--danger)" />
                                <h3 style={{ color: 'var(--danger)', margin: 0 }}>DFS (Derinlik Öncelikli)</h3>
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>Depth-First Search</div>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li><strong>Veri Yapısı:</strong> Yığın (Stack) - <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>LIFO</span></li>
                                <li><strong>Mantık:</strong> Bir daldan sonuna kadar gider (Backtrack yapar).</li>
                                <li><strong>İdeal:</strong> Hedef derindeyse veya çözüm uzaktaysa.</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </section>

            {/* 2. Kategori: Bilgili (Informed) Algoritmalar */}
            <section>
                {/* Alt Başlık Bölümü */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                    <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                        <CornerDownRight size={24} />
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>5.2. Bilgili (Sezgisel) Arama - Informed</h2>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Hedefin konumunu tahmin eden sezgisel fonksiyonlar kullanarak performansı optimize eden algoritmalar.</p>
                    </div>
                </div>
                <Card>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                        Bu algoritmalar "akıllıdır". Hedefin yaklaşık nerede olduğunu tahmin eden bir <strong>Heuristic (Sezgisel) Fonksiyon h(n)</strong> kullanırlar.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {/* GREEDY KART */}
                        <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '15px', background: 'var(--bg-secondary)' }}>
                            <h3 style={{ color: 'var(--warning)', marginBottom: '10px' }}>Greedy Best-First</h3>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li><strong>Formül:</strong> f(n) = h(n)</li>
                                <li><strong>Özellik:</strong> En hızlı yoldan hedefe koşar ama kör noktaya girebilir.</li>
                            </ul>
                        </div>

                        {/* A* KART */}
                        <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', padding: '15px', background: 'var(--bg-secondary)' }}>
                            <h3 style={{ color: 'var(--success)', marginBottom: '10px' }}>A* (A-Star)</h3>
                            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                                <li><strong>Formül:</strong> <span style={{ fontFamily: 'monospace' }}>f(n) = g(n) + h(n)</span></li>
                                <li><strong>Özellik:</strong> Hem gidilen yolu (g) hem kalanı (h) hesaplar. <strong>En iyisidir.</strong></li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
};

export default SearchTheory;
