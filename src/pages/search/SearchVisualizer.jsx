import React, { useState, useEffect, useRef } from 'react';
import { Card, PageHeader, Badge } from '../../components/ui/Common';
import { Play, RotateCcw, MousePointer2, Eraser, Info } from 'lucide-react';
import { bfs, dfs, dijkstra, astar, greedyBestFirst, getNodesInShortestPathOrder } from './algorithms';

// Grid Constants
const ROWS = 15;
const COLS = 25;
const START_NODE_ROW = 7;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 7;
const FINISH_NODE_COL = 20;

const SearchVisualizer = () => {
    const [grid, setGrid] = useState([]);
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [algorithm, setAlgorithm] = useState('bfs');
    const [stats, setStats] = useState({ visited: 0, pathLength: 0, status: 'Hazır' });
    const [message, setMessage] = useState("Hazine avına başlamak için bir algoritma seç ve 'Başlat'a bas!");

    const timeouts = useRef([]);

    useEffect(() => {
        initializeGrid();
        return () => clearTimeouts();
    }, []);

    const clearTimeouts = () => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
    };

    const initializeGrid = () => {
        const newGrid = [];
        for (let row = 0; row < ROWS; row++) {
            const currentRow = [];
            for (let col = 0; col < COLS; col++) {
                currentRow.push(createNode(col, row));
            }
            newGrid.push(currentRow);
        }
        setGrid(newGrid);
        setStats({ visited: 0, pathLength: 0, status: 'Hazır' });
        setMessage("Harita hazır! Engeller çizmek için fareyi kullanabilirsin.");
    };

    const createNode = (col, row) => {
        return {
            col,
            row,
            isStart: row === START_NODE_ROW && col === START_NODE_COL,
            isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null,
            type: (row === START_NODE_ROW && col === START_NODE_COL) ? 'start' :
                (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) ? 'finish' : 'empty'
        };
    };

    // --- Mouse Interactions ---
    const handleMouseDown = (row, col) => {
        if (isRunning) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setIsMousePressed(true);
    };

    const handleMouseEnter = (row, col) => {
        if (!isMousePressed || isRunning) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
    };

    const handleMouseUp = () => setIsMousePressed(false);

    const getNewGridWithWallToggled = (grid, row, col) => {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        if (node.isStart || node.isFinish) return newGrid;

        const newNode = {
            ...node,
            isWall: !node.isWall,
            type: !node.isWall ? 'wall' : 'empty'
        };
        newGrid[row][col] = newNode;
        return newGrid;
    };

    // --- Visualization ---

    const visualizeAlgorithm = () => {
        if (isRunning) return;
        setIsRunning(true);
        clearTimeouts();

        // Reset Logic: Keep walls, reset state
        const newGrid = grid.map(row => row.map(node => ({
            ...node,
            isVisited: false,
            distance: Infinity,
            totalDistance: Infinity,
            previousNode: null,
            type: node.isWall ? 'wall' : (node.isStart ? 'start' : (node.isFinish ? 'finish' : 'empty'))
        })));
        setGrid(newGrid);

        const startNode = newGrid[START_NODE_ROW][START_NODE_COL];
        const finishNode = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];

        let visitedNodesInOrder;

        switch (algorithm) {
            case 'bfs':
                visitedNodesInOrder = bfs(newGrid, startNode, finishNode);
                setMessage("BFS Çalışıyor: Dalga dalga yayılıyorum...");
                break;
            case 'dfs':
                visitedNodesInOrder = dfs(newGrid, startNode, finishNode);
                setMessage("DFS Çalışıyor: Bir yol bulup sonuna kadar gidiyorum!");
                break;
            case 'ucs':
                visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
                setMessage("UCS Çalışıyor: En az maliyetli yolu arıyorum...");
                break;
            case 'astar':
                visitedNodesInOrder = astar(newGrid, startNode, finishNode);
                setMessage("A* Çalışıyor: Hedefe odaklandım, en akıllı benim!");
                break;
            case 'greedy':
                visitedNodesInOrder = greedyBestFirst(newGrid, startNode, finishNode);
                setMessage("Greedy Çalışıyor: Sadece hedefe koşuyorum!");
                break;
            default: visitedNodesInOrder = bfs(newGrid, startNode, finishNode); break;
        }

        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);

        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                const timeout = setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                timeouts.current.push(timeout);
                return;
            }
            const timeout = setTimeout(() => {
                const node = visitedNodesInOrder[i];
                if (!node.isStart && !node.isFinish) {
                    updateNodeState(node.row, node.col, 'visited');
                }
                setStats(prev => ({ ...prev, visited: i + 1, status: 'Aranıyor...' }));
            }, 10 * i);
            timeouts.current.push(timeout);
        }
    };

    const animateShortestPath = (nodesInShortestPathOrder) => {
        // Path bulunamadıysa
        if (nodesInShortestPathOrder.length <= 1) { // 1 because startNode is always there if path fails? Logic check needed. 
            // actually startNode logic: getNodesInShortestPathOrder returns path including finish to start.
            // if no prev node, it returns [finishNode] if loop 0 times? No, loop `while(currentNode!==null)`.
            // If unreachable, finishNode.previousNode is null. So list has only finishNode.
            // But startNode.previous is null. It stops at startNode.
            // If unreachable, finishNode.previous is null. It returns [finishNode].

            setStats(prev => ({ ...prev, status: 'Bulunamadı! ❌' }));
            setMessage("Hazineye ulaşılamadı! Duvarlar yolu kapatmış.");
            setIsRunning(false);
            return;
        }

        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            const timeout = setTimeout(() => {
                const node = nodesInShortestPathOrder[nodesInShortestPathOrder.length - 1 - i]; // Reverse to animate from start
                if (!node.isStart && !node.isFinish) {
                    updateNodeState(node.row, node.col, 'path');
                }
                // Son adımda bitir
                if (i === nodesInShortestPathOrder.length - 1) {
                    setIsRunning(false);
                    setStats(prev => ({ ...prev, pathLength: nodesInShortestPathOrder.length, status: 'Tamamlandı! ✅' }));
                    setMessage("Hazine Bulundu! İşte en kısa yol.");
                }
            }, 50 * i);
            timeouts.current.push(timeout);
        }
    };

    const updateNodeState = (row, col, type) => {
        // React state update for a single cell - optimized by cloning only necessary row
        setGrid(prevGrid => {
            const newGrid = [...prevGrid];
            const newNode = { ...newGrid[row][col], type: type };
            newGrid[row][col] = newNode;
            return newGrid; // This triggers re-render. Might be slow on huge grids but ok here.
        });
    };

    // Renk fonksiyonu
    const getNodeColor = (node) => {
        // Renkler type'a göre, ancak inline style yerine class kullanılabilir, 
        // fakat burada dinamiklik için inline style basit çözüm.
        if (node.type === 'start') return 'var(--primary)';
        if (node.type === 'finish') return 'var(--accent)';
        if (node.type === 'wall') return '#1e293b';
        if (node.type === 'path') return 'var(--success)';
        if (node.type === 'visited') return 'rgba(59, 130, 246, 0.4)';
        return 'transparent'; // bg defined in container
    };

    return (
        <div className="animate-fade-in" onMouseUp={handleMouseUp}>
            {/* Kontrol ve İstatistik */}
            <div className="grid-responsive" style={{ marginBottom: 'var(--space-md)' }}>
                <Card>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <select
                                value={algorithm}
                                onChange={(e) => setAlgorithm(e.target.value)}
                                disabled={isRunning}
                                style={{
                                    padding: '12px',
                                    borderRadius: '8px',
                                    background: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-medium)',
                                    fontWeight: 'bold',
                                    minWidth: '200px'
                                }}
                            >
                                <option value="bfs">BFS - Genişlik Öncelikli</option>
                                <option value="dfs">DFS - Derinlik Öncelikli</option>
                                <option value="ucs">UCS - Sabit Maliyetli</option>
                                <option value="greedy">Greedy - Açgözlü</option>
                                <option value="astar">A* - A-Star (En İyi)</option>
                            </select>

                            <button
                                onClick={visualizeAlgorithm}
                                disabled={isRunning}
                                className="hover-scale"
                                style={{
                                    padding: '12px 24px',
                                    background: isRunning ? 'var(--text-muted)' : 'var(--success)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: isRunning ? 'not-allowed' : 'pointer',
                                    boxShadow: isRunning ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.3)'
                                }}
                            >
                                <Play size={20} /> BAŞLAT
                            </button>

                            <button
                                onClick={() => { clearTimeouts(); initializeGrid(); setIsRunning(false); }}
                                className="hover-scale"
                                style={{
                                    padding: '12px',
                                    background: 'var(--bg-secondary)',
                                    color: 'var(--text-secondary)',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-light)',
                                    cursor: 'pointer'
                                }}
                            >
                                <RotateCcw size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{stats.visited}</div>
                                <div>Ziyaret</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--success)', fontSize: '1.2rem' }}>{stats.pathLength}</div>
                                <div>Yol Birimi</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontWeight: 'bold', color: stats.status.includes('❌') ? 'var(--danger)' : 'var(--accent)', fontSize: '1.2rem' }}>{stats.status}</div>
                                <div>Durum</div>
                            </div>
                        </div>

                    </div>

                    {/* Mesaj */}
                    <div style={{
                        marginTop: '20px',
                        padding: '12px 15px',
                        background: 'var(--bg-secondary)',
                        borderLeft: '4px solid var(--primary)',
                        borderRadius: '0 4px 4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '0.95rem'
                    }}>
                        <Info size={20} color="var(--primary)" />
                        <span>{message}</span>
                    </div>
                </Card>
            </div>

            {/* Grid Container */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                background: 'var(--bg-card)',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid var(--border-light)',
                overflowX: 'auto'
            }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${COLS}, 30px)`,
                        gap: '1px',
                        backgroundColor: 'var(--border-light)', // Grid lines color
                        border: '5px solid var(--border-medium)',
                        borderRadius: '4px'
                    }}
                >
                    {grid.map((row, rowIdx) => (
                        row.map((node, nodeIdx) => (
                            <div
                                key={`${rowIdx}-${nodeIdx}`}
                                onMouseDown={() => handleMouseDown(rowIdx, nodeIdx)}
                                onMouseEnter={() => handleMouseEnter(rowIdx, nodeIdx)}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: getNodeColor(node),
                                    transition: (node.type === 'visited' || node.type === 'path') ? 'all 0.3s ease-out' : 'background-color 0.1s',
                                    animation: node.type === 'visited' ? 'pop 0.3s ease-out' : node.type === 'path' ? 'pulse 1s infinite' : 'none',
                                    borderRadius: node.type === 'wall' ? '2px' : node.type === 'visited' ? '10px' : '0'
                                }}
                            ></div>
                        ))
                    ))}
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <MousePointer2 size={14} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} />
                Haritaya tıklayarak duvarlar ekleyebilirsin
            </div>
        </div>
    );
};

export default SearchVisualizer;
