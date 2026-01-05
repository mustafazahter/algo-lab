import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Common';
import { CornerDownRight, Play, Square, Shuffle, ScrollText, CheckCircle, XCircle, Search, Info } from 'lucide-react';
import {
    generateRandomGraphData,
    getPrimAnimations,
    getKruskalAnimations,
    getDijkstraAnimations,
    getBellmanFordAnimations,
    getEdmondsKarpAnimations
} from './algorithms';

const COLORS = {
    defaultEdge: '#64748b', // Slate 500 (Lighter for better visibility)
    checking: '#f59e0b',    // Amber
    selected: '#10b981',    // Emerald
    rejected: '#ef4444',    // Red
    nodeDefault: '#1e293b', // Slate 800
    nodeText: '#94a3b8',    // Slate 400
    nodeVisited: '#6366f1', // Indigo
};

const GraphVisualizer = () => {
    // State
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
    const [algorithm, setAlgorithm] = useState('prim');
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);

    // Dragging
    const [draggingNodeId, setDraggingNodeId] = useState(null);

    // Visual Styles State
    const [edgeStyles, setEdgeStyles] = useState({});
    const [nodeStyles, setNodeStyles] = useState({});

    // Refs
    const abortControllerRef = useRef(null);
    const logContainerRef = useRef(null);

    // Dimensions
    const width = 800;
    const height = 500;

    useEffect(() => {
        handleGenerate();
        return () => handleStop();
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const handleGenerate = () => {
        handleStop();
        const data = generateRandomGraphData(8, width, height);
        setGraphData(data);
        setEdgeStyles({});
        setNodeStyles({});
        setLogs([]);
    };

    const handleStop = () => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
        setIsRunning(false);
        setDraggingNodeId(null);
    };

    const handleStart = async () => {
        if (isRunning) {
            setEdgeStyles({});
            setNodeStyles({});
            setLogs([]);
            await new Promise(r => setTimeout(r, 50));
        }

        setIsRunning(true);
        setLogs([{ type: 'info', text: `${algorithm.toUpperCase()} simülasyonu başlatıldı...` }]);

        let animations = [];
        const { nodes, edges } = graphData;

        switch (algorithm) {
            case 'prim': animations = getPrimAnimations(nodes, edges); break;
            case 'kruskal': animations = getKruskalAnimations(nodes, edges); break;
            case 'dijkstra': animations = getDijkstraAnimations(nodes, edges); break;
            case 'bellman': animations = getBellmanFordAnimations(nodes, edges); break;
            case 'edmonds': animations = getEdmondsKarpAnimations(nodes, edges); break;
            default: break;
        }

        await animate(animations);
    };

    const animate = async (animations) => {
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        try {
            for (const step of animations) {
                if (signal.aborted) throw new Error('Aborted');

                if (step.log) {
                    setLogs(prev => [...prev, { type: 'step', text: step.log }]);
                }

                if (step.type === 'checkEdge') {
                    setEdgeStyles(prev => ({ ...prev, [step.edgeId]: { stroke: COLORS.checking, width: 4 } }));
                    await new Promise(r => setTimeout(r, 400));
                    setEdgeStyles(prev => {
                        const current = prev[step.edgeId] || {};
                        if (current.stroke === COLORS.checking) {
                            return { ...prev, [step.edgeId]: { stroke: COLORS.defaultEdge, width: 2 } };
                        }
                        return prev;
                    });
                }
                else if (step.type === 'selectEdge') {
                    setEdgeStyles(prev => ({ ...prev, [step.edgeId]: { stroke: COLORS.selected, width: 6, glow: true, opacity: 1 } }));
                    await new Promise(r => setTimeout(r, 400));
                }
                else if (step.type === 'rejectEdge') {
                    setEdgeStyles(prev => ({ ...prev, [step.edgeId]: { stroke: COLORS.rejected, width: 2, opacity: 0.2 } }));
                    await new Promise(r => setTimeout(r, 200));
                }
                else if (step.type === 'visitNode') {
                    setNodeStyles(prev => ({ ...prev, [step.nodeId]: { fill: COLORS.nodeVisited, color: 'white' } }));
                    await new Promise(r => setTimeout(r, 300));
                }
                else if (step.type === 'info') {
                    await new Promise(r => setTimeout(r, 200));
                }
            }
            setIsRunning(false);
        } catch (e) { }
    };

    // Drag Handlers
    const handleMouseDown = (e, nodeId) => {
        if (isRunning) return;
        setDraggingNodeId(nodeId);
    };

    const handleMouseMove = (e) => {
        if (draggingNodeId === null) return;
        const svg = e.currentTarget;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

        setGraphData(prev => ({
            ...prev,
            nodes: prev.nodes.map(n => n.id === draggingNodeId ? { ...n, x: svgP.x, y: svgP.y } : n)
        }));
    };

    const handleMouseUp = () => setDraggingNodeId(null);
    const handleMouseLeave = () => setDraggingNodeId(null);

    // CSS Variables Styles
    const containerStyle = {
        background: 'var(--bg-primary, #0f172a)',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    };

    const cardStyle = {
        background: 'var(--bg-card, #1e293b)',
        borderColor: 'var(--border-color, #334155)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '100%'
    };

    const buttonStyle = (variant) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: isRunning ? 'not-allowed' : 'pointer',
        fontWeight: '700', // Bolder text
        fontSize: '0.95rem', // Slightly larger
        letterSpacing: '0.5px', // More distinct text
        background: variant === 'start' ? 'var(--accent-success, #10b981)' :
            variant === 'stop' ? 'var(--accent-danger, #ef4444)' :
                '#6366f1', // Indigo-500 for New Graph (Primary Action)
        color: 'white',
        boxShadow: variant !== 'stop' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
        opacity: isRunning && variant !== 'stop' ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
        transform: isRunning ? 'none' : 'scale(1)',
        flex: 1, // Butonların eşit genişlikte olması için
        minWidth: '120px'
    });

    const selectStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        background: 'var(--bg-secondary, #0f172a)',
        color: 'var(--text-primary, #fff)',
        border: '1px solid var(--border-color, #334155)',
        fontSize: '0.95rem',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle} className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', flexWrap: 'wrap', width: '100%' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)', flexShrink: 0 }}>
                    <CornerDownRight size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '0' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700', wordBreak: 'break-word' }}>7.3 Graf Algoritmaları Simülatörü</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Popüler graf algoritmalarını canlı izleyin, kenar ağırlıklarını ve düğümleri görün.</p>
                </div>
            </div>

            {/* CONTROL PANEL */}
            <div style={cardStyle}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'end', flexWrap: 'wrap', width: '100%' }}>
                        <div style={{ flex: 1, minWidth: '250px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary, #94a3b8)', textTransform: 'uppercase' }}>
                                ALGORİTMA SEÇİN
                            </label>
                            <select
                                value={algorithm}
                                onChange={(e) => { setAlgorithm(e.target.value); handleGenerate(); }}
                                disabled={isRunning}
                                style={selectStyle}
                            >
                                <optgroup label="Minimum Spanning Tree">
                                    <option value="prim">Prim Algoritması</option>
                                    <option value="kruskal">Kruskal Algoritması</option>
                                </optgroup>
                                <optgroup label="Shortest Path">
                                    <option value="dijkstra">Dijkstra (Shortest Path)</option>
                                    <option value="bellman">Bellman-Ford</option>
                                </optgroup>
                                <optgroup label="Network Flow">
                                    <option value="edmonds">Edmonds-Karp (Max Flow)</option>
                                </optgroup>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '250px' }}>
                            <button onClick={handleGenerate} disabled={isRunning} style={buttonStyle('default')}>
                                <Shuffle size={18} /> Yeni Graf
                            </button>
                            <button onClick={isRunning ? handleStop : handleStart} style={buttonStyle(isRunning ? 'stop' : 'start')}>
                                {isRunning ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                {isRunning ? 'Durdur' : 'Başlat'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* GRAPH VISUALIZATION */}
            <div style={{ ...cardStyle, padding: 0, position: 'relative', height: 'clamp(400px, 60vh, 600px)', overflow: 'hidden', background: '#020617' }}>
                {/* Legend */}
                <div style={{
                    position: 'absolute', top: 20, left: 20,
                    background: 'rgba(15, 23, 42, 0.9)',
                    padding: '15px', borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    pointerEvents: 'none',
                    zIndex: 10,
                    maxWidth: '80%', // Mobilde taşmayı engelle
                }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px' }}>LEJANT</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.85rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.selected, flexShrink: 0 }}></div>
                        <span style={{ color: COLORS.selected }}>Seçildi / Yol</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.85rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.checking, flexShrink: 0 }}></div>
                        <span style={{ color: COLORS.checking }}>Kontrol Ediliyor</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.85rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.rejected, flexShrink: 0 }}></div>
                        <span style={{ color: COLORS.rejected }}>Reddedildi</span>
                    </div>
                </div>

                <div style={{ position: 'absolute', right: 20, top: 20, color: '#64748b', fontSize: '0.8rem', textAlign: 'right', display: window.innerWidth <= 768 ? 'none' : 'block' }}>
                    Düğümleri sürükleyebilirsiniz
                </div>

                <svg
                    width="100%" height="100%"
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    style={{ cursor: draggingNodeId ? 'grabbing' : 'default', width: '100%', height: '100%' }}
                >
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Edges */}
                    {graphData.edges.map((edge) => {
                        const s = graphData.nodes.find(n => n.id === edge.source);
                        const t = graphData.nodes.find(n => n.id === edge.target);
                        if (!s || !t) return null;

                        const style = edgeStyles[edge.id] || { stroke: COLORS.defaultEdge, width: 2, opacity: 0.6 };
                        const midX = (s.x + t.x) / 2;
                        const midY = (s.y + t.y) / 2;

                        return (
                            <g key={edge.id} style={{ opacity: style.opacity, transition: 'all 0.3s' }}>
                                <line
                                    x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                                    stroke={style.stroke}
                                    strokeWidth={style.width}
                                    strokeLinecap="round"
                                />
                                <rect
                                    x={midX - 14} y={midY - 14} width="28" height="28" rx="6"
                                    fill="#0f172a" stroke={style.stroke} strokeWidth="1"
                                />
                                <text
                                    x={midX} y={midY}
                                    dy=".3em" textAnchor="middle"
                                    fontSize="12" fill="#fff" fontWeight="bold"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {edge.weight}
                                </text>
                            </g>
                        );
                    })}

                    {/* Nodes */}
                    {graphData.nodes.map((node) => {
                        const style = nodeStyles[node.id] || { fill: COLORS.nodeDefault, color: COLORS.nodeText };
                        const isDragging = draggingNodeId === node.id;
                        return (
                            <g
                                key={node.id}
                                onMouseDown={(e) => handleMouseDown(e, node.id)}
                                style={{ cursor: isRunning ? 'not-allowed' : 'grab', transition: 'transform 0.1s' }}
                            >
                                <circle
                                    cx={node.x} cy={node.y} r={isDragging ? 24 : 20}
                                    fill={style.fill}
                                    stroke={isDragging ? '#fff' : style.color}
                                    strokeWidth={2}
                                />
                                <text
                                    x={node.x} y={node.y} dy=".3em"
                                    textAnchor="middle"
                                    fontWeight="bold" fill={style.color === 'white' ? '#fff' : '#94a3b8'}
                                    style={{ fontSize: '14px', pointerEvents: 'none', userSelect: 'none' }}
                                >
                                    {node.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* LOG PANEL */}
            <div style={{ ...cardStyle, padding: 0, height: '300px', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    padding: '16px', background: 'rgba(255,255,255,0.03)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                        <ScrollText size={18} /> SİMÜLASYON ANLIK İZLEME
                    </div>
                </div>
                <div ref={logContainerRef} style={{ flex: 1, overflowY: 'auto', padding: '16px', fontFamily: 'monospace', fontSize: '0.9rem', overflowX: 'hidden' }}>
                    {logs.length === 0 ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                            <Info size={32} style={{ marginBottom: 10 }} />
                            <div>Simülasyon bekleniyor...</div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {logs.map((log, i) => {
                                let borderColor = 'var(--border-color)';
                                let color = 'var(--text-secondary)';
                                let bg = 'rgba(255,255,255,0.02)';

                                if (log.text.includes('KABUL') || log.text.includes('GÜNCELLEME')) {
                                    borderColor = COLORS.selected; color = '#34d399';
                                    bg = 'rgba(16, 185, 129, 0.1)';
                                } else if (log.text.includes('RED')) {
                                    borderColor = COLORS.rejected; color = '#f87171';
                                    bg = 'rgba(239, 68, 68, 0.1)';
                                } else if (log.text.includes('kontrol')) {
                                    borderColor = COLORS.checking; color = '#fbbf24';
                                }

                                return (
                                    <div key={i} style={{
                                        padding: '10px 14px', borderRadius: '4px',
                                        borderLeft: `3px solid ${borderColor}`,
                                        background: bg, color: color,
                                        display: 'flex', gap: '10px',
                                        wordBreak: 'break-word'
                                    }} className="animate-slide-in-left">
                                        <span style={{ opacity: 0.5, fontSize: '0.8rem', minWidth: '20px', flexShrink: 0 }}>{(i + 1).toString().padStart(2, '0')}</span>
                                        <span>{log.text}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GraphVisualizer;
