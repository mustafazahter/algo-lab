import React, { useState, useEffect, useRef } from 'react';
import { Card, Button } from '../../components/ui/Common';
import { Play, RotateCcw, Zap, MousePointer2 } from 'lucide-react';

const PnpVisualizer = () => {
    // Cities are stored as normalized coordinates (0.0 to 1.0)
    // This ensures they stay relatively positioned regardless of screen resize
    const [cities, setCities] = useState([]);
    const [bestPath, setBestPath] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [isComputing, setIsComputing] = useState(false);
    const [minDistance, setMinDistance] = useState(Infinity);
    const [algorithm, setAlgorithm] = useState(null); // 'brute', 'greedy'
    const [stepDescription, setStepDescription] = useState('Şehir ekleyerek başlayın...');
    const [progress, setProgress] = useState(0); // 0 to 100
    const [stats, setStats] = useState({ time: 0, checked: 0 });

    const canvasContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

    // Resize Observer to handle dynamic screen sizes perfectly
    useEffect(() => {
        if (!canvasContainerRef.current) return;

        const updateSize = () => {
            if (canvasContainerRef.current) {
                const { clientWidth, clientHeight } = canvasContainerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
            }
        };

        // Initial size
        updateSize();

        const observer = new ResizeObserver(() => {
            updateSize();
        });

        observer.observe(canvasContainerRef.current);
        return () => observer.disconnect();
    }, []);


    // Add City (Normalized Coordinates 0-1)
    const handleCanvasClick = (e) => {
        if (isComputing) return;

        // Get exact click position relative to the container
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        // Normalize (0.0 - 1.0)
        const nx = offsetX / rect.width;
        const ny = offsetY / rect.height;

        const newCity = { x: nx, y: ny, id: cities.length };
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

    // Calculate distance (Based on a virtual 1000x1000 grid for consistency)
    // This prevents distance from changing just because user resized the window
    const dist = (c1, c2) => {
        const dx = (c1.x - c2.x) * 1000;
        const dy = (c1.y - c2.y) * 1000; // Assuming square aspect for math simplicity or keep aspect influence?
        // To be physically accurate on screen, we should account for aspect ratio,
        // but for TSP abstract logic, a generalized euclidean distance on square plane is fine.
        return Math.sqrt(dx * dx + dy * dy);
    };

    // Calculate total path distance
    const calcPathDist = (path) => {
        let d = 0;
        for (let i = 0; i < path.length - 1; i++) {
            d += dist(path[i], path[i + 1]);
        }
        if (path.length > 0) d += dist(path[path.length - 1], path[0]);
        return d;
    };

    // --- ALGORITHMS ---
    // (Algorithms work with normalized coordinates logic wrapped in dist function)

    const startBruteForce = async () => {
        if (cities.length < 2) return;
        setIsComputing(true);
        setAlgorithm('brute');
        setStats({ time: 0, checked: 0 });
        setProgress(0);
        setStepDescription('Olası tüm rotalar hesaplanıyor...');

        if (cities.length > 8) {
            alert("Dikkat: 8'den fazla şehir için Brute Force tarayıcınızı dondurabilir!");
        }

        let localMin = Infinity;
        let startTime = performance.now();
        let checkedCount = 0;

        const arr = cities.slice(1);
        const startCity = cities[0];
        const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);
        const totalPerms = factorial(cities.length - 1);
        const swap = (a, i, j) => { let t = a[i]; a[i] = a[j]; a[j] = t; };

        const n = arr.length;
        const c = new Array(n).fill(0);
        let i = 0;

        let path = [startCity, ...arr];
        let d = calcPathDist(path);
        localMin = d;
        setMinDistance(d);
        setBestPath([...path]);
        setCurrentPath([...path]);
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
                    setMinDistance(d);
                    setBestPath([...path]);
                    setStepDescription(`Yeni en kısa yol: ${Math.round(d)} birim`);
                }

                if (checkedCount % Math.max(1, Math.floor(totalPerms / 20)) === 0 || checkedCount === totalPerms) {
                    setProgress(Math.round((checkedCount / totalPerms) * 100));
                    setStats({ time: Math.round(performance.now() - startTime), checked: checkedCount });
                }

                c[i] += 1;
                i = 0;
                if (checkedCount % 5 === 0) await new Promise(r => setTimeout(r, 1));
            } else {
                c[i] = 0;
                i += 1;
            }
        }

        setProgress(100);
        setStats({ time: Math.round(performance.now() - startTime), checked: checkedCount });
        setStepDescription(`Tamamlandı! ${checkedCount} rota denendi.`);
        setCurrentPath([]);
        setIsComputing(false);
    };

    const solveGreedy = async () => {
        if (cities.length < 2) return;
        setIsComputing(true);
        setAlgorithm('greedy');
        setStats({ time: 0, checked: 0 });
        setProgress(0);
        let startTime = performance.now();

        const unvisited = [...cities];
        const path = [unvisited.shift()];
        setBestPath([...path]);

        while (unvisited.length > 0) {
            const current = path[path.length - 1];
            let nearest = null;
            let minDist = Infinity;
            let nearestIdx = -1;

            setStepDescription(`${current.id + 1}. şehirden en yakın komşu aranıyor...`);

            for (let i = 0; i < unvisited.length; i++) {
                const d = dist(current, unvisited[i]);
                setCurrentPath([current, unvisited[i]]);
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
        setStepDescription('Greedy tamamlandı! "En yakın" mantığıyla sonuç.');
        setStats({ time: Math.round(performance.now() - startTime), checked: cities.length });
        setCurrentPath([]);
        setIsComputing(false);
    };

    // Helper to scale normalized coordinates to screen pixels
    const toPx = (normVal, dimension) => normVal * dimension;

    return (
        <div className="animate-fade-in" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', width: '100%' }}>

            {/* Visualizer Area */}
            <div
                ref={canvasContainerRef}
                style={{
                    background: '#020617',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: 'clamp(400px, 60vh, 550px)',
                    position: 'relative',
                    flex: '2 1 400px', // Responsive flex grow
                    minWidth: '0'
                }}
            >
                {/* 
                   Canvas: Used for rendering high-frequency drawings like brute force lines 
                   Using exact pixel dimensions prevents blur and coordinate mismatch.
                */}
                <canvas
                    ref={canvasRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    onClick={handleCanvasClick}
                    style={{ cursor: isComputing ? 'wait' : 'cell', display: 'block' }}
                />

                {/* 
                   SVG Overlay: Used for UI elements (Cities, Best Path) that need perfect scaling 
                   Using the same pixel dimensions for viewBox ensures alignment with canvas.
                */}
                <svg
                    width={dimensions.width}
                    height={dimensions.height}
                    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                    style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                >
                    {/* Active testing path (Canvas might be better for this, but consistent SVG use is fine too) */}
                    {isComputing && currentPath.length > 1 && (
                        <path
                            d={`M ${currentPath.map(c => `${toPx(c.x, dimensions.width)} ${toPx(c.y, dimensions.height)}`).join(' L ')} ${algorithm === 'brute' ? 'Z' : ''}`}
                            fill="none"
                            stroke={algorithm === 'brute' ? 'rgba(99, 102, 241, 0.4)' : 'rgba(234, 179, 8, 0.6)'}
                            strokeWidth="2"
                            strokeDasharray="5,5"
                        />
                    )}

                    {/* Best Path Found */}
                    {bestPath.length > 1 && (
                        <path
                            d={`M ${bestPath.map(c => `${toPx(c.x, dimensions.width)} ${toPx(c.y, dimensions.height)}`).join(' L ')} Z`}
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
                            <circle
                                cx={toPx(city.x, dimensions.width)}
                                cy={toPx(city.y, dimensions.height)}
                                r="8"
                                fill="#e2e8f0"
                                stroke="#020617"
                                strokeWidth="2"
                            />
                            <text
                                x={toPx(city.x, dimensions.width)}
                                y={toPx(city.y, dimensions.height) - 12}
                                textAnchor="middle"
                                fill="#94a3b8"
                                fontSize="12"
                                fontWeight="bold"
                            >
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: '1 1 300px' }}>
                <Card>
                    <h3 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-medium)', paddingBottom: '10px' }}>
                        Algoritma Durumu
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{
                            padding: '12px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '10px',
                            border: '1px solid var(--border-light)',
                            wordBreak: 'break-word'
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

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '10px' }}>
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
