import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from '../../components/ui/Common';
import { Play, RotateCcw, Zap, MousePointer2 } from 'lucide-react';

const PnpVisualizer = () => {
    const [cities, setCities] = useState([]);
    const [bestPath, setBestPath] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isComputing, setIsComputing] = useState(false);
    const [minDistance, setMinDistance] = useState(Infinity);
    const [algorithm, setAlgorithm] = useState(null); // 'brute', 'greedy'
    const [stepDescription, setStepDescription] = useState('Şehir ekleyerek başlayın...');
    const [progress, setProgress] = useState(0); // 0 to 100
    const [stats, setStats] = useState({ time: 0, checked: 0 });

    const canvasRef = useRef(null);
    const width = 800;
    const height = 500;

    // Canvas Click: Add City
    const handleCanvasClick = (e) => {
        if (isComputing) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newCity = { x, y, id: cities.length };
        setCities([...cities, newCity]);
        // Reset state
        setBestPath([]);
        setCurrentPath([]);
        setMinDistance(Infinity);
        setStepDescription(`${cities.length + 1} şehir eklendi. Algoritma seçebilirsiniz.`);
        setProgress(0);
        setStats({ time: 0, checked: 0 });
    };

    const handleReset = () => {
        setCities([]);
        setBestPath([]);
        setCurrentPath([]);
        setMinDistance(Infinity);
        setIsComputing(false);
    };

    // Calculate distance between two points
    const dist = (c1, c2) => Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2));

    // Calculate total path distance
    const calcPathDist = (path) => {
        let d = 0;
        for (let i = 0; i < path.length - 1; i++) {
            d += dist(path[i], path[i + 1]);
        }
        // Return to start
        if (path.length > 0) d += dist(path[path.length - 1], path[0]);
        return d;
    };

    // --- ALGORITHMS ---

    // 1. Brute Force (Recursive Permutation) - Improved Async Implementation
    const startBruteForce = async () => {
        if (cities.length < 2) return;
        setIsComputing(true);
        setAlgorithm('brute');
        setStats({ time: 0, checked: 0 });
        setProgress(0);
        setStepDescription('Olası tüm rotalar hesaplanıyor (Brute Force)...');

        if (cities.length > 8) {
            alert("Dikkat: 8'den fazla şehir için Brute Force tarayıcınızı dondurabilir!");
        }

        let localMin = Infinity;
        let localBest = [];
        let startTime = performance.now();
        let checkedCount = 0;

        const arr = cities.slice(1); // Keep city 0 fixed
        const startCity = cities[0];

        // Total permutations: (n-1)!
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        const totalPerms = factorial(cities.length - 1);

        const swap = (a, i, j) => { let t = a[i]; a[i] = a[j]; a[j] = t; };

        // Iterative Heap's Algorithm
        const n = arr.length;
        const c = new Array(n).fill(0);
        let i = 0;

        // Process First Permutation
        let path = [startCity, ...arr];
        let d = calcPathDist(path);
        localMin = d;
        localBest = [...path];
        setMinDistance(d);
        setBestPath(path);
        setCurrentPath(path);
        checkedCount++;

        while (i < n) {
            if (c[i] < i) {
                if (i % 2 === 0) swap(arr, 0, i);
                else swap(arr, c[i], i);

                path = [startCity, ...arr];
                d = calcPathDist(path);
                setCurrentPath([...path]);
                checkedCount++;

                if (d < localMin) {
                    localMin = d;
                    localBest = [...path];
                    setMinDistance(d);
                    setBestPath([...path]);
                    setStepDescription(`Yeni en kısa yol: ${Math.round(d)} br`);
                }

                // Batch progress updates
                if (checkedCount % Math.max(1, Math.floor(totalPerms / 20)) === 0 || checkedCount === totalPerms) {
                    setProgress(Math.round((checkedCount / totalPerms) * 100));
                    setStats({ time: Math.round(performance.now() - startTime), checked: checkedCount });
                }

                c[i] += 1;
                i = 0;
                // Faster delay for brute force
                if (checkedCount % 5 === 0) await new Promise(r => setTimeout(r, 1));
            } else {
                c[i] = 0;
                i += 1;
            }
        }

        setProgress(100);
        setStats({ time: Math.round(performance.now() - startTime), checked: checkedCount });
        setStepDescription(`Tamamlandı! ${checkedCount} farklı rota denendi.`);
        setCurrentPath([]);
        setIsComputing(false);
    };


    // 2. Greedy (Nearest Neighbor)
    const solveGreedy = async () => {
        if (cities.length < 2) return;
        setIsComputing(true);
        setAlgorithm('greedy');
        setStats({ time: 0, checked: 0 });
        setProgress(0);
        let startTime = performance.now();

        const unvisited = [...cities];
        const path = [unvisited.shift()]; // Start at first city
        setBestPath([...path]);

        while (unvisited.length > 0) {
            const current = path[path.length - 1];
            let nearest = null;
            let minDist = Infinity;
            let nearestIdx = -1;

            setStepDescription(`${current.id + 1}. şehirden en yakın komşu aranıyor...`);

            for (let i = 0; i < unvisited.length; i++) {
                const d = dist(current, unvisited[i]);
                setCurrentPath([current, unvisited[i]]); // Show test line
                await new Promise(r => setTimeout(r, 200));

                if (d < minDist) {
                    minDist = d;
                    nearest = unvisited[i];
                    nearestIdx = i;
                }
            }

            path.push(nearest);
            unvisited.splice(nearestIdx, 1);
            setBestPath([...path]);
            setProgress(Math.round((path.length / cities.length) * 100));
        }

        const totalD = calcPathDist(path);
        setMinDistance(totalD);
        setBestPath(path);
        setStepDescription('Greedy tamamlandı! "En yakın" mantığıyla hızlı bir yol bulundu.');
        setStats({ time: Math.round(performance.now() - startTime), checked: cities.length });
        setCurrentPath([]);
        setIsComputing(false);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }}>

            {/* Visualizer Area */}
            <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden', height: '550px', position: 'relative' }}>
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    onClick={handleCanvasClick}
                    style={{ cursor: isComputing ? 'wait' : 'cell', width: '100%', height: '100%' }}
                />

                {/* Overlay UI */}
                <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

                    {/* Active testing path (Gray/Faint) */}
                    {isComputing && currentPath.length > 1 && (
                        <path
                            d={`M ${currentPath.map(c => `${c.x} ${c.y}`).join(' L ')} ${algorithm === 'brute' ? 'Z' : ''}`}
                            fill="none"
                            stroke={algorithm === 'brute' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(234, 179, 8, 0.6)'}
                            strokeWidth="2"
                            strokeDasharray="5,5"
                        />
                    )}

                    {/* Best Path Found (Solid Color) */}
                    {bestPath.length > 1 && (
                        <path
                            d={`M ${bestPath.map(c => `${c.x} ${c.y}`).join(' L ')} Z`}
                            fill="none"
                            stroke={algorithm === 'greedy' ? '#f59e0b' : '#10b981'}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}
                        />
                    )}

                    {/* Cities */}
                    {cities.map((city, i) => (
                        <g key={i}>
                            <circle cx={city.x} cy={city.y} r="8" fill="#e2e8f0" stroke="#020617" strokeWidth="2" />
                            <text x={city.x} y={city.y - 12} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">
                                {i + 1}
                            </text>
                        </g>
                    ))}
                </svg>

                {cities.length === 0 && (
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none', color: '#475569' }}>
                        <MousePointer2 style={{ margin: '0 auto 10px', display: 'block', opacity: 0.5 }} size={40} />
                        <p>Şehir eklemek için tıklayın</p>
                    </div>
                )}
            </div>

            {/* Controls Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Card>
                    <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-medium)', paddingBottom: '10px' }}>
                        Algoritma Durumu
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{
                            padding: '12px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '10px',
                            border: '1px solid var(--border-light)'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '4px' }}>DURUM:</p>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{stepDescription}</p>
                        </div>

                        {isComputing && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>İlerleme:</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>%{progress}</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${progress}%`,
                                        height: '100%',
                                        background: 'var(--primary)',
                                        transition: 'width 0.2s ease'
                                    }} />
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '2px' }}>TOPLAM MESAFA</span>
                                <span style={{ color: 'var(--success)', fontWeight: '700' }}>
                                    {minDistance === Infinity ? '-' : Math.round(minDistance)} <span style={{ fontSize: '0.7rem' }}>br</span>
                                </span>
                            </div>
                            <div style={{ background: 'var(--bg-secondary)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'block', marginBottom: '2px' }}>SÜRE</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>
                                    {stats.time} <span style={{ fontSize: '0.7rem' }}>ms</span>
                                </span>
                            </div>
                        </div>

                        {stats.checked > 0 && (
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                                <strong>{stats.checked}</strong> rota/adım kontrol edildi.
                            </div>
                        )}
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Button
                            fullWidth
                            variant="primary"
                            onClick={startBruteForce}
                            disabled={isComputing || cities.length < 2}
                            icon={<Zap size={18} />}
                        >
                            Brute Force (Tümünü Dene)
                        </Button>

                        <Button
                            fullWidth
                            variant="secondary"
                            onClick={solveGreedy}
                            disabled={isComputing || cities.length < 2}
                            icon={<Play size={18} />}
                        >
                            En Yakın Komşu (Hızlı)
                        </Button>

                        <div style={{ height: '1px', background: 'var(--border-light)', margin: '10px 0' }} />

                        <Button
                            fullWidth
                            variant="secondary"
                            onClick={handleReset}
                            disabled={isComputing && cities.length === 0}
                            icon={<RotateCcw size={18} />}
                            style={{ opacity: 0.7 }}
                        >
                            Sıfırla
                        </Button>
                    </div>
                </Card>

                <Card>
                    <h4 style={{ color: 'var(--text-primary)', margin: '0 0 10px 0' }}>Nedir bu TSP?</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        <strong>Gezgin Satıcı Problemi (Traveling Salesperson)</strong>, bir satıcının tüm şehirleri gezip başladığı yere dönmesi için gereken en kısa yolu arar.
                        <br /><br />
                        Şehir sayısı arttıkça olasılıklar patlar (Faktöriyel büyüme). Bu yüzden <strong>NP-Hard</strong> bir problemdir.
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default PnpVisualizer;
