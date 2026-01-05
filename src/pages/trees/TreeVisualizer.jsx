import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCw, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TreeVisualizer = () => {
    const { theme } = useTheme();
    // Basic BST Logic
    class Node {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
            this.x = 0;
            this.y = 0;
        }
    }

    const [root, setRoot] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [traversalResult, setTraversalResult] = useState([]);
    const [highlightNode, setHighlightNode] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Canvas & Layout
    const width = 800;
    const height = 500;
    const nodeRadius = 24;

    const [selectedNode, setSelectedNode] = useState(null);

    // Helper to insert into BST
    const insertNode = (r, val) => {
        if (!r) return new Node(val);
        if (val < r.value) r.left = insertNode(r.left, val);
        else if (val > r.value) r.right = insertNode(r.right, val);
        return r;
    };

    const handleAdd = () => {
        if (!inputValue) return;
        const val = parseInt(inputValue);
        const newRoot = insertNode(root ? { ...root } : null, val); // Simple clone for reactivity triggers
        // Recalculate positions
        calculatePositions(newRoot, width / 2, 50, width / 4);
        setRoot(newRoot);
        setInputValue('');
        setTraversalResult([]);
        setHighlightNode(null);
        setSelectedNode(null);
    };

    // Delete Node Logic
    const getMin = (node) => {
        let current = node;
        while (current.left) current = current.left;
        return current;
    };

    const deleteNode = (node, value) => {
        if (!node) return null;

        if (value < node.value) {
            node.left = deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = deleteNode(node.right, value);
        } else {
            // Node to delete found

            // Case 1: No child or 1 child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 2: 2 children
            const temp = getMin(node.right);
            node.value = temp.value;
            node.right = deleteNode(node.right, temp.value);
        }
        return node;
    };

    const handleNodeClick = (value, e) => {
        if (isAnimating) return;
        e.stopPropagation(); // Prevent canvas click from deselecting
        setSelectedNode(selectedNode === value ? null : value);
    };

    const confirmDelete = (value) => {
        // Deep clone to avoid direct mutation issues during React updates
        const cloneTree = (n) => {
            if (!n) return null;
            const newNode = new Node(n.value);
            newNode.left = cloneTree(n.left);
            newNode.right = cloneTree(n.right);
            return newNode;
        };

        const currentRootClone = cloneTree(root);
        const newRoot = deleteNode(currentRootClone, value);

        calculatePositions(newRoot, width / 2, 50, width / 4);
        setRoot(newRoot);
        setTraversalResult([]);
        setHighlightNode(null);
        setSelectedNode(null);
    };

    // Simple layout algorithm
    const calculatePositions = (node, x, y, offset) => {
        if (!node) return;
        node.x = x;
        node.y = y;
        calculatePositions(node.left, x - offset, y + 80, offset / 1.8);
        calculatePositions(node.right, x + offset, y + 80, offset / 1.8);
    };

    // Traversal Generators
    function* inorder(node) {
        if (!node) return;
        yield* inorder(node.left);
        yield node.value;
        yield* inorder(node.right);
    }

    function* preorder(node) {
        if (!node) return;
        yield node.value;
        yield* preorder(node.left);
        yield* preorder(node.right);
    }

    function* postorder(node) {
        if (!node) return;
        yield* postorder(node.left);
        yield* postorder(node.right);
        yield node.value;
    }

    const runTraversal = async (type) => {
        if (isAnimating || !root) return;
        setIsAnimating(true);
        setTraversalResult([]);
        setSelectedNode(null); // Deselect when running traversal

        let generator;
        if (type === 'pre') generator = preorder(root);
        else if (type === 'in') generator = inorder(root);
        else if (type === 'post') generator = postorder(root);

        const results = [];
        for (const val of generator) {
            setHighlightNode(val);
            results.push(val);
            setTraversalResult([...results]);
            await new Promise(r => setTimeout(r, 800));
        }
        setHighlightNode(null);
        setIsAnimating(false);
    };

    // Recursive render helper
    const renderTree = (node) => {
        if (!node) return null;

        const isHighlight = highlightNode === node.value;
        const isSelected = selectedNode === node.value;

        return (
            <g key={node.value} onClick={(e) => handleNodeClick(node.value, e)} style={{ cursor: isAnimating ? 'default' : 'pointer' }}>
                {node.left && (
                    <line x1={node.x} y1={node.y} x2={node.left.x} y2={node.left.y} stroke="var(--text-muted)" strokeWidth="2" />
                )}
                {node.right && (
                    <line x1={node.x} y1={node.y} x2={node.right.x} y2={node.right.y} stroke="var(--text-muted)" strokeWidth="2" />
                )}
                {renderTree(node.left)}
                {renderTree(node.right)}
                <circle
                    cx={node.x} cy={node.y} r={nodeRadius}
                    fill={isHighlight ? '#eab308' : (isSelected ? '#3b82f6' : 'var(--bg-card)')}
                    stroke={isHighlight ? '#fde047' : (isSelected ? '#60a5fa' : 'var(--text-muted)')}
                    strokeWidth={isHighlight || isSelected ? 3 : 2}
                    style={{ transition: 'all 0.3s' }}
                />
                <text
                    x={node.x} y={node.y} dy=".35em" textAnchor="middle"
                    fill={isHighlight || isSelected ? 'white' : 'var(--text-primary)'}
                    fontWeight="bold" fontSize="15"
                    style={{ pointerEvents: 'none' }}
                >
                    {node.value}
                </text>

                {isSelected && (
                    <foreignObject x={node.x + 12} y={node.y - 35} width={32} height={32}>
                        <div
                            onClick={(e) => { e.stopPropagation(); confirmDelete(node.value); }}
                            style={{
                                background: '#ef4444',
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                border: '2px solid var(--bg-card)',
                                animation: 'fade-in 0.2s'
                            }}
                            title="Sil"
                        >
                            <Trash2 size={16} color="white" />
                        </div>
                    </foreignObject>
                )}
            </g>
        );
    };

    // Initial Tree
    useEffect(() => {
        const initialValues = [50, 30, 70, 20, 40, 60, 80];
        let r = null;
        initialValues.forEach(v => r = insertNode(r, v));
        calculatePositions(r, width / 2, 50, width / 4);
        setRoot(r);
    }, []);

    // Styles
    const containerStyle = {
        background: 'transparent',
    };

    const cardStyle = {
        background: 'var(--bg-card)',
        border: '1px solid var(--border-medium)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };

    const inputStyle = {
        background: 'transparent',
        border: '1px solid var(--border-medium)',
        color: 'var(--text-primary)',
        padding: '10px 14px',
        borderRadius: '8px',
        width: '120px',
        outline: 'none',
        fontSize: '0.95rem',
        transition: 'border-color 0.2s',
    };

    const iconButtonStyle = (type) => ({
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: type === 'add' ? '#3b82f6' : '#ef4444',
        color: 'white', border: 'none', borderRadius: '8px',
        width: '40px', height: '40px', cursor: isAnimating ? 'not-allowed' : 'pointer',
        opacity: isAnimating ? 0.6 : 1,
        transition: 'transform 0.1s'
    });

    const actionButtonStyle = (color, isActive) => ({
        background: isActive ? color : 'transparent',
        border: `1px solid ${color}`,
        color: isActive ? 'white' : color,
        padding: '10px 20px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        cursor: isAnimating ? 'not-allowed' : 'pointer',
        opacity: isAnimating ? 0.6 : 1,
        transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: '8px'
    });

    return (
        <div style={containerStyle} className="animate-fade-in">
            {/* Controls */}
            <div style={{ ...cardStyle, display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Sayı gir..."
                        style={inputStyle}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
                        onBlur={(e) => e.target.style.borderColor = 'var(--border-medium)'}
                    />
                    <button onClick={handleAdd} disabled={isAnimating} style={iconButtonStyle('add')} title="Ekle">
                        <Plus size={20} />
                    </button>
                    <button onClick={() => { setRoot(null); setTraversalResult([]); }} disabled={isAnimating} style={iconButtonStyle('delete')} title="Temizle">
                        <Trash2 size={20} />
                    </button>
                </div>

                <div style={{ width: '1px', height: '35px', background: 'var(--border-medium)', margin: '0 10px' }}></div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => runTraversal('pre')} disabled={isAnimating} style={actionButtonStyle('#2563eb', false)}>
                        <Play size={16} /> Preorder
                    </button>
                    <button onClick={() => runTraversal('in')} disabled={isAnimating} style={actionButtonStyle('#9333ea', false)}>
                        <Play size={16} /> Inorder
                    </button>
                    <button onClick={() => runTraversal('post')} disabled={isAnimating} style={actionButtonStyle('#d97706', false)}>
                        <Play size={16} /> Postorder
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }}>
                {/* Visualization Area */}
                <div
                    onClick={() => setSelectedNode(null)}
                    style={{ ...cardStyle, padding: 0, height: '550px', overflow: 'hidden', position: 'relative', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)' }}
                >
                    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
                        <defs>
                            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="var(--bg-secondary)" />
                                <stop offset="100%" stopColor="var(--bg-card)" />
                            </radialGradient>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        {renderTree(root)}
                    </svg>
                    <div style={{ position: 'absolute', top: 20, left: 20, color: 'var(--text-muted)', fontSize: '1rem', pointerEvents: 'none', fontWeight: 'bold' }}>
                        Binary Search Tree (BST)
                    </div>
                </div>

                {/* Status Panel & Definitions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Status */}
                    <div style={{ ...cardStyle, marginBottom: 0, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                            <ArrowRight size={20} color="#22c55e" />
                            Gezinme Sonucu
                        </h3>

                        <div style={{ flex: 1, minHeight: '100px', background: 'var(--bg-primary)', borderRadius: '10px', padding: '16px', fontFamily: 'monospace', fontSize: '0.9rem', overflowY: 'auto', border: '1px solid var(--border-medium)' }}>
                            {traversalResult.length > 0 ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {traversalResult.map((val, idx) => (
                                        <span key={idx} style={{
                                            padding: '4px 10px',
                                            background: 'rgba(59,130,246,0.1)',
                                            borderRadius: '6px',
                                            color: 'var(--text-primary)',
                                            border: '1px solid var(--border-medium)',
                                            fontSize: '0.95rem'
                                        }}>
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', padding: '10px', fontSize: '0.9rem' }}>
                                    Bir gezinme simülasyonu başlatın...
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '10px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px' }}>
                            <strong style={{ color: 'var(--text-primary)' }}>Silme:</strong> Düğüme tıklayın, çıkan kırmızı çöp kutusuna basarak silin.
                        </div>
                    </div>

                    {/* Definitions */}
                    <div style={{ ...cardStyle, marginBottom: 0 }}>
                        <h3 style={{ color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '12px', fontSize: '1rem' }}>
                            Gezinme Yöntemleri
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span>
                                <strong style={{ color: '#3b82f6', width: '80px' }}>Preorder:</strong>
                                <span style={{ color: 'var(--text-secondary)' }}>Kök → Sol → Sağ</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9333ea' }}></span>
                                <strong style={{ color: '#9333ea', width: '80px' }}>Inorder:</strong>
                                <span style={{ color: 'var(--text-secondary)' }}>Sol → Kök → Sağ</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d97706' }}></span>
                                <strong style={{ color: '#d97706', width: '80px' }}>Postorder:</strong>
                                <span style={{ color: 'var(--text-secondary)' }}>Sol → Sağ → Kök</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TreeVisualizer;
