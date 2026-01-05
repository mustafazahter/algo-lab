// Yardımcı Fonksiyonlar
const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { col, row } = node;
    // Yukarı, Aşağı, Sol, Sağ
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

    // Duvarları filtrele
    return neighbors.filter(neighbor => !neighbor.isWall);
};

const getNodesInShortestPathOrder = (finishNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
};

// --- ALGORITHMS ---

// 1. BFS (Genişlik Öncelikli) - Unweighted
// Queue (FIFO) kullanır. Dalga gibi yayılır. Optimaldir (Ağırlıksızsa).
export const bfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const queue = [];
    queue.push(startNode);
    startNode.isVisited = true;

    while (queue.length > 0) {
        const currentNode = queue.shift();
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.isVisited = true;
                neighbor.previousNode = currentNode;
                queue.push(neighbor);
            }
        }
    }
    return visitedNodesInOrder;
};

// 2. DFS (Derinlik Öncelikli) - Unweighted
// Stack (LIFO) kullanır. Bir yolda sonuna kadar gider. Optimal değildir.
export const dfs = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const stack = [];
    stack.push(startNode);
    // DFS'de visited kontrolü pop edilirken veya push edilirken yapılabilir.
    // Burada stack mantığıyla:

    while (stack.length > 0) {
        const currentNode = stack.pop();

        if (!currentNode.isVisited) {
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);

            if (currentNode === finishNode) return visitedNodesInOrder;

            const neighbors = getNeighbors(currentNode, grid);
            // Stack olduğu için ters sırada ekleyelim ki beklenen sırada çıksınlar (Opsiyonel)
            for (const neighbor of neighbors) {
                if (!neighbor.isVisited) {
                    neighbor.previousNode = currentNode;
                    stack.push(neighbor);
                }
            }
        }
    }
    return visitedNodesInOrder;
};

// 3. UCS (Uniform Cost Search) / Dijkstra
// Priority Queue kullanır. Grid'de ağırlık yoksa BFS gibi davranır ama yapı olarak farklıdır.
// Biz burada maliyet varmış gibi (her adım 1) işleyeceğiz, ileride ağırlık eklenirse çalışır.
export const dijkstra = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);

    while (unvisitedNodes.length > 0) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        // Duvar ise atla (Gerçi getNeighbors'da filtreledik ama getAllNodes tümünü alır)
        if (closestNode.isWall) continue;

        // Eğer en yakın düğümün mesafesi sonsuzsa, hedef ulaşılamaz demektir
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid);
    }
    return visitedNodesInOrder;
};

const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
};

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getNeighbors(node, grid).filter(n => !n.isVisited);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
};

// 4. A* (A-Star)
// f(n) = g(n) + h(n)
// Informed Search.
export const astar = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0; // g(n)
    startNode.totalDistance = 0; // f(n)

    // Basit bir OpenSet dizisi kullanalım ve her seferinde sort edelim (Priority Queue simülasyonu için)
    // Gerçek bir PQ daha verimli olurdu ama bu ölçekte (20x50 grid) sorun değil.
    const openSet = [startNode];

    // Kapalı set (visited) node property'si üzerinden takip ediliyor.

    while (openSet.length > 0) {
        // En düşük f(n) değerine sahip nodu seç (Eşitlikte h(n)'e bakılabilir)
        openSet.sort((a, b) => a.totalDistance - b.totalDistance);
        const currentNode = openSet.shift();

        // Zaten ziyaret edildiyse atla (Normalde openSet management ile buna gerek kalmayabilir)
        if (currentNode.isVisited) continue;

        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (neighbor.isVisited) continue;

            const tentativeG = currentNode.distance + 1; // Her adım 1 maliyet

            // Neighbor openSet'te değilse veya daha iyi bir yol bulduysak
            // Not: Basitlik adına her komşuyu değerlendiriyoruz.
            // Gerçek A* 'da openSet kontrolü yapılır. Burada distance Infinity ise yenidir.

            if (tentativeG < neighbor.distance) {
                neighbor.distance = tentativeG;
                neighbor.previousNode = currentNode;
                // Manhattan Heuristic
                const h = Math.abs(neighbor.col - finishNode.col) + Math.abs(neighbor.row - finishNode.row);
                neighbor.totalDistance = neighbor.distance + h;

                // OpenSet'te yoksa ekle (Basit kontrol: distance değişiminden anlıyoruz)
                // Ama duplicate olmaması için basit bir check:
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return visitedNodesInOrder;
};

// 5. Greedy Best-First Search
// Sadece h(n)'e bakar.
export const greedyBestFirst = (grid, startNode, finishNode) => {
    const visitedNodesInOrder = [];
    const openSet = [startNode];

    // distance kullanmıyoruz sadece heuristic. Ama property olarak saklayacak yer lazım.
    // distance property'sini "heuristic score" olarak kullanalım.

    // Başlangıç için h hesapla
    startNode.distance = Math.abs(startNode.col - finishNode.col) + Math.abs(startNode.row - finishNode.row);

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.distance - b.distance); // Sadece h(n)'e göre sırala
        const currentNode = openSet.shift();

        if (currentNode.isVisited) continue;
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);

        if (currentNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.previousNode = currentNode;
                neighbor.distance = Math.abs(neighbor.col - finishNode.col) + Math.abs(neighbor.row - finishNode.row);
                if (!openSet.includes(neighbor)) openSet.push(neighbor);
            }
        }
    }
    return visitedNodesInOrder;
};

export { getNodesInShortestPathOrder };
