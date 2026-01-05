import React from 'react';

const SimpleGraph = ({ nodes, edges, height = 200, title }) => {
    // Helper to find node execution
    const getNode = (id) => nodes.find(n => n.id === id);

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '15px 0'
        }}>
            {title && (
                <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    color: 'var(--text-primary)',
                    marginBottom: '10px'
                }}>
                    {title}
                </div>
            )}

            <svg
                width="100%"
                height={height}
                viewBox={`0 0 300 ${height}`}
                style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-medium)',
                    maxWidth: '100%',
                    overflow: 'visible'
                }}
            >
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--text-secondary)" />
                    </marker>
                    <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--danger)" />
                    </marker>
                    <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--success)" />
                    </marker>
                </defs>

                {/* EDGES */}
                {edges.map((edge, idx) => {
                    const from = getNode(edge.from);
                    const to = getNode(edge.to);
                    if (!from || !to) return null;

                    const isDirected = edge.type === 'directed';
                    const isBidirectional = edge.type === 'bidirectional';

                    return (
                        <g key={idx}>
                            <line
                                x1={from.x} y1={from.y}
                                x2={to.x} y2={to.y}
                                stroke={edge.color || "var(--border-medium)"}
                                strokeWidth="2"
                                strokeDasharray={edge.dashed ? "5,5" : "none"}
                                markerEnd={isDirected ? `url(#arrowhead${edge.color === 'var(--danger)' ? '-red' : ''})` : undefined}
                            />
                            {edge.label && (
                                <g>
                                    <rect
                                        x={(from.x + to.x) / 2 - 15}
                                        y={(from.y + to.y) / 2 - 10}
                                        width="30"
                                        height="20"
                                        rx="4"
                                        fill="var(--bg-primary)"
                                        stroke={edge.color || "var(--border-medium)"}
                                    />
                                    <text
                                        x={(from.x + to.x) / 2}
                                        y={(from.y + to.y) / 2 + 4}
                                        textAnchor="middle"
                                        fontSize="10"
                                        fill={edge.color || "var(--text-secondary)"}
                                        fontWeight="bold"
                                    >
                                        {edge.label}
                                    </text>
                                </g>
                            )}
                        </g>
                    );
                })}

                {/* NODES */}
                {nodes.map((node, idx) => (
                    <g key={idx}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="20"
                            fill={node.bg || "var(--bg-secondary)"}
                            stroke={node.borderColor || "var(--primary)"}
                            strokeWidth="2"
                        />
                        <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill={node.color || "var(--text-primary)"}
                            fontWeight="bold"
                            fontSize="12"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default SimpleGraph;
