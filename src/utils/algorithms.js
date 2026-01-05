// Algoritma yardımcı fonksiyonları

export const calculateGreedyCoinChange = (target, coins) => {
    let remaining = target;
    const result = [];

    // Büyükten küçüğe sıralandığından emin ol
    const sortedCoins = [...coins].sort((a, b) => b - a);

    for (let coin of sortedCoins) {
        while (remaining >= coin) {
            result.push(coin);
            remaining -= coin;
        }
    }

    return result;
};
