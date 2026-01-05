// Utility: Disjoint Set (Union-Find) for Kruskal
class DisjointSet {
    constructor(size) {
        this.parent = new Array(size).fill(0).map((_, i) => i);
        this.rank = new Array(size).fill(0);
    }

    find(i) {
        if (this.parent[i] !== i) {
            this.parent[i] = this.find(this.parent[i]);
        }
        return this.parent[i];
    }

    union(i, j) {
        const rootI = this.find(i);
        const rootJ = this.find(j);

        if (rootI !== rootJ) {
            if (this.rank[rootI] < this.rank[rootJ]) {
                this.parent[rootI] = rootJ;
            } else if (this.rank[rootI] > this.rank[rootJ]) {
                this.parent[rootJ] = rootI;
            } else {
                this.parent[rootJ] = rootI;
                this.rank[rootI]++;
            }
            return true; // Merged
        }
        return false; // Cycle detected
    }
}

// 1. Random Graph Generator
export const generateRandomGraphData = (nodeCount = 7, width = 800, height = 500) => {
    const nodes = [];
    const edges = [];
    const minDistance = 100;

    // Generate Nodes with simple collision avoidance
    for (let i = 0; i < nodeCount; i++) {
        let x, y, tooClose;
        let attempts = 0;

        do {
            x = Math.floor(Math.random() * (width - 100)) + 50;
            y = Math.floor(Math.random() * (height - 100)) + 50;
            tooClose = false;

            for (const node of nodes) {
                const dx = node.x - x;
                const dy = node.y - y;
                if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
                    tooClose = true;
                    break;
                }
            }
            attempts++;
        } while (tooClose && attempts < 50);

        nodes.push({ id: i, label: String.fromCharCode(65 + i), x, y });
    }

    // Generate random edges (ensure connectivity roughly)
    const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Reduced range for simplicity
    for (let i = 0; i < nodeCount - 1; i++) {
        const weight = weights[Math.floor(Math.random() * weights.length)];
        edges.push({ id: `e${i}-${i + 1}`, source: i, target: i + 1, weight });
    }

    // Add random extra edges
    for (let i = 0; i < nodeCount * 1.5; i++) {
        const s = Math.floor(Math.random() * nodeCount);
        const t = Math.floor(Math.random() * nodeCount);
        if (s !== t && !edges.some(e => (e.source === s && e.target === t) || (e.source === t && e.target === s))) {
            const weight = weights[Math.floor(Math.random() * weights.length)];
            edges.push({ id: `e${s}-${t}`, source: s, target: t, weight });
        }
    }

    return { nodes, edges };
};

// 2. Prim's Algorithm
export const getPrimAnimations = (nodes, edges) => {
    const animations = [];
    const visited = new Set();
    const mstEdges = [];
    const logs = [];

    // Start from node 0
    visited.add(0);
    animations.push({ type: 'visitNode', nodeId: 0, log: "Başlangıç düğümü seçildi: A (0)" });

    while (visited.size < nodes.length) {
        let minEdge = null;
        let minWeight = Infinity;

        // Find smallest edge connecting visited to unvisited
        for (const edge of edges) {
            const isSourceVisited = visited.has(edge.source);
            const isTargetVisited = visited.has(edge.target);

            // XOR: Exact one must be visited
            if (isSourceVisited !== isTargetVisited) {
                // Animation: checking this edge
                animations.push({
                    type: 'checkEdge',
                    edgeId: edge.id,
                    log: `Kenar kontrol ediliyor: ${String.fromCharCode(65 + edge.source)}-${String.fromCharCode(65 + edge.target)} (Maliyet: ${edge.weight})`
                });

                if (edge.weight < minWeight) {
                    minWeight = edge.weight;
                    minEdge = edge;
                }
            }
        }

        if (minEdge) {
            mstEdges.push(minEdge);
            const newNode = visited.has(minEdge.source) ? minEdge.target : minEdge.source;
            visited.add(newNode);

            animations.push({
                type: 'selectEdge',
                edgeId: minEdge.id,
                log: `EN UCUZ kenar seçildi: ${String.fromCharCode(65 + minEdge.source)}-${String.fromCharCode(65 + minEdge.target)}`
            });
            animations.push({
                type: 'visitNode',
                nodeId: newNode,
                log: `Fethedilen düğüm: ${String.fromCharCode(65 + newNode)}`
            });
        } else {
            animations.push({ type: 'info', log: "Graf bağlı değil, ulaşılamayan düğümler var!" });
            break; // Graph might be disconnected
        }
    }

    animations.push({ type: 'info', log: "Prim Algoritması tamamlandı! MST oluşturuldu." });
    return animations;
};

// 3. Kruskal's Algorithm
export const getKruskalAnimations = (nodes, edges) => {
    const animations = [];
    const ds = new DisjointSet(nodes.length);

    animations.push({ type: 'info', log: "Kruskal başlıyor: Tüm kenarlar küçükten büyüğe sıralanıyor..." });

    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);

    for (const edge of sortedEdges) {
        animations.push({
            type: 'checkEdge',
            edgeId: edge.id,
            log: `Sıradaki en ucuz kenar: ${String.fromCharCode(65 + edge.source)}-${String.fromCharCode(65 + edge.target)} (${edge.weight})`
        });

        // Try to union
        if (ds.union(edge.source, edge.target)) {
            // Success: Add to MST
            animations.push({
                type: 'selectEdge',
                edgeId: edge.id,
                log: `Döngü yok! Kenar eklendi: ${String.fromCharCode(65 + edge.source)}-${String.fromCharCode(65 + edge.target)}`
            });
            animations.push({ type: 'visitNode', nodeId: edge.source }); // Cosmetic
            animations.push({ type: 'visitNode', nodeId: edge.target });
        } else {
            // Cycle detected: Reject
            animations.push({
                type: 'rejectEdge',
                edgeId: edge.id,
                log: `DÖNGÜ TESPİT EDİLDİ! ${String.fromCharCode(65 + edge.source)}-${String.fromCharCode(65 + edge.target)} reddedildi.`
            });
        }
    }

    animations.push({ type: 'info', log: "Kruskal Algoritması tamamlandı!" });
    return animations;
};

// 4. Dijkstra's Algorithm (Shortest Path)
export const getDijkstraAnimations = (nodes, edges) => {
    const animations = [];
    const distances = {};
    const previous = {};
    const unvisited = new Set(nodes.map(n => n.id));

    // Initialize
    nodes.forEach(n => distances[n.id] = Infinity);
    distances[0] = 0; // Start from A (0)

    animations.push({ type: 'info', log: "Dijkstra Başlıyor: Hedef tüm düğümlere en kısa yolu bulmak." });
    animations.push({ type: 'visitNode', nodeId: 0, log: "Başlangıç: A (Mesafe: 0)" });

    while (unvisited.size > 0) {
        // Find min distance node
        let minNode = null;
        let minDist = Infinity;

        unvisited.forEach(id => {
            if (distances[id] < minDist) {
                minDist = distances[id];
                minNode = id;
            }
        });

        if (minNode === null) break; // Remaining are unreachable

        unvisited.delete(minNode);
        animations.push({ type: 'visitNode', nodeId: minNode, log: `Şu an üzerinde durulan düğüm: ${String.fromCharCode(65 + minNode)}` });

        // Check neighbors
        const neighbors = edges.filter(e => e.source === minNode || e.target === minNode);
        for (const edge of neighbors) {
            const neighborId = edge.source === minNode ? edge.target : edge.source;
            if (unvisited.has(neighborId)) {
                animations.push({ type: 'checkEdge', edgeId: edge.id, log: `Komşu ${String.fromCharCode(65 + neighborId)} kontrol ediliyor...` });

                const alt = distances[minNode] + edge.weight;
                if (alt < distances[neighborId]) {
                    distances[neighborId] = alt;
                    previous[neighborId] = minNode;
                    animations.push({
                        type: 'selectEdge',
                        edgeId: edge.id,
                        log: `GÜNCELLEME: ${String.fromCharCode(65 + neighborId)} için yeni en kısa mesafe: ${alt}`
                    });
                }
            }
        }
    }

    animations.push({ type: 'info', log: "Dijkstra tamamlandı! En kısa yollar hesaplandı." });
    return animations;
};

// 5. Bellman-Ford (Detect Negative Cycles logic primarily)
export const getBellmanFordAnimations = (nodes, edges) => {
    const animations = [];
    const distances = {};
    const nodeCount = nodes.length;

    nodes.forEach(n => distances[n.id] = Infinity);
    distances[0] = 0;

    animations.push({ type: 'info', log: "Bellman-Ford Başlıyor: Tüm kenarlar N-1 kez gezilecek." });

    // Relax all edges V-1 times
    for (let i = 0; i < nodeCount - 1; i++) {
        let changed = false;
        animations.push({ type: 'info', log: `Tur ${i + 1}/${nodeCount - 1} başlıyor...` });

        for (const edge of edges) {
            animations.push({ type: 'checkEdge', edgeId: edge.id, log: `Kenar kontrol: ${String.fromCharCode(65 + edge.source)}-${String.fromCharCode(65 + edge.target)}` });

            // Try relaxing both directions since graph implies undirected (or bidirectional) here for simplicity visual
            // But standard Bellman is directed. We will treat our edges as bidirectional for this demo.

            // Direction 1: Source -> Target
            if (distances[edge.source] !== Infinity && distances[edge.source] + edge.weight < distances[edge.target]) {
                distances[edge.target] = distances[edge.source] + edge.weight;
                changed = true;
                animations.push({
                    type: 'selectEdge',
                    edgeId: edge.id,
                    log: `GÜNCELLEME: ${String.fromCharCode(65 + edge.target)} mesafesi ${distances[edge.target]} oldu.`
                });
            }
            // Direction 2: Target -> Source (for undirected graph representation)
            if (distances[edge.target] !== Infinity && distances[edge.target] + edge.weight < distances[edge.source]) {
                distances[edge.source] = distances[edge.target] + edge.weight;
                changed = true;
                animations.push({
                    type: 'selectEdge',
                    edgeId: edge.id,
                    log: `GÜNCELLEME: ${String.fromCharCode(65 + edge.source)} mesafesi ${distances[edge.source]} oldu.`
                });
            }
        }
        if (!changed) {
            animations.push({ type: 'info', log: "Erken bitiş: Daha fazla güncelleme yok." });
            break;
        }
    }

    animations.push({ type: 'info', log: "Bellman-Ford tamamlandı!" });
    return animations;
};

// 6. Edmonds-Karp (Simple BFS Path visualization)
export const getEdmondsKarpAnimations = (nodes, edges) => {
    const animations = [];
    const source = 0;
    const sink = nodes.length - 1;

    animations.push({ type: 'info', log: `Edmonds-Karp: Kaynak ${String.fromCharCode(65 + source)} -> Hedef ${String.fromCharCode(65 + sink)}` });

    // Simplification: Just find a few augmentation paths to show logic
    // We treat weights as capacities

    let pathFound = true;
    let paths = 0;

    // Create a residual graph copy to track available capacities
    const residualEdges = edges.map(e => ({ ...e, flow: 0, capacity: e.weight }));

    while (pathFound && paths < 5) { // Limit for visual demo
        const parent = {};
        const q = [source];
        const visited = new Set([source]);
        let foundSink = false;

        // BFS
        while (q.length > 0) {
            const u = q.shift();
            if (u === sink) {
                foundSink = true;
                break;
            }

            // Find neighbors in residual graph
            // Note: In undirected graph demo, we can flow both ways if capacity exists
            // To simplify logic for visualization, we just iterate edges connected to u
            const connectedEdges = residualEdges.filter(e => e.source === u || e.target === u);

            for (const edge of connectedEdges) {
                const v = edge.source === u ? edge.target : edge.source; // Neighbor
                const availableCap = edge.capacity - edge.flow; // Simplified undirected capacity

                if (!visited.has(v) && availableCap > 0) {
                    visited.add(v);
                    parent[v] = { node: u, edge: edge };
                    q.push(v);
                    animations.push({ type: 'checkEdge', edgeId: edge.id, log: `BFS: ${String.fromCharCode(65 + u)} -> ${String.fromCharCode(65 + v)} kontrol ediliyor...` });
                }
            }
        }

        if (foundSink) {
            paths++;
            animations.push({ type: 'info', log: `Artırıcı Yol #${paths} bulundu!` });

            // Backtrack path
            let curr = sink;
            let pathFlow = Infinity;

            // First pass: Calculate min flow
            const pathEdges = [];
            while (curr !== source) {
                const { node, edge } = parent[curr];
                const available = edge.capacity - edge.flow;
                pathFlow = Math.min(pathFlow, available);
                pathEdges.push(edge);
                curr = node;
            }

            animations.push({ type: 'info', log: `Bu yoldan gönderilecek akış: ${pathFlow} birim` });

            // Second pass: Update and Highlight
            curr = sink;
            while (curr !== source) {
                const { node, edge } = parent[curr];
                edge.flow += pathFlow; // Simplified flow update

                animations.push({
                    type: 'selectEdge',
                    edgeId: edge.id,
                    log: `Akış eklendi: ${edge.id} (Yeni Doluluk: ${edge.flow}/${edge.capacity})`
                });

                curr = node;
            }

        } else {
            pathFound = false;
        }
    }

    animations.push({ type: 'info', log: "Maksimum Akışa ulaşıldı!" });
    return animations;
};
