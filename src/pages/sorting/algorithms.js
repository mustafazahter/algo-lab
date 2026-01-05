// 1. Bubble Sort
export const getBubbleSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    bubbleSortHelper(auxArray, animations);
    return animations;
};

const bubbleSortHelper = (auxArray, animations) => {
    const n = auxArray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Karşılaştırma (Compare) - Renk değişimi için
            animations.push([j, j + 1, false]);
            // array[j] > array[j+1] mi?
            if (auxArray[j] > auxArray[j + 1]) {
                // Swap - Değer değişimi için
                animations.push([j, auxArray[j + 1], true]); // j'nin yeni değeri
                animations.push([j + 1, auxArray[j], true]); // j+1'in yeni değeri

                // Gerçek swap
                let temp = auxArray[j];
                auxArray[j] = auxArray[j + 1];
                auxArray[j + 1] = temp;
            } else {
                // Swap olmadı, dummy push (formatı korumak için gerekebilir ama burada esnek yapı kuracağız)
            }
        }
    }
};

// 2. Selection Sort
export const getSelectionSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    const n = auxArray.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            animations.push([minIdx, j, false]); // Karşılaştırma
            if (auxArray[j] < auxArray[minIdx]) {
                minIdx = j;
            }
        }
        // Swap
        animations.push([i, auxArray[minIdx], true]);
        animations.push([minIdx, auxArray[i], true]);

        let temp = auxArray[minIdx];
        auxArray[minIdx] = auxArray[i];
        auxArray[i] = temp;
    }
    return animations;
};

// 3. Insertion Sort
export const getInsertionSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    const n = auxArray.length;
    for (let i = 1; i < n; i++) {
        let key = auxArray[i];
        let j = i - 1;
        while (j >= 0 && auxArray[j] > key) {
            animations.push([j, j + 1, false]); // Compare
            // Shift
            animations.push([j + 1, auxArray[j], true]); // Overwrite
            auxArray[j + 1] = auxArray[j];
            j = j - 1;
        }
        animations.push([j + 1, key, true]); // Place key
        auxArray[j + 1] = key;
    }
    return animations;
};

// 4. Merge Sort
export const getMergeSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
};

function mergeSortHelper(mainArray, startIdx, endIdx, auxArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // Compare
        animations.push([i, j, false]);
        if (auxArray[i] <= auxArray[j]) {
            // Overwrite value at index k
            animations.push([k, auxArray[i], true]);
            mainArray[k++] = auxArray[i++];
        } else {
            animations.push([k, auxArray[j], true]);
            mainArray[k++] = auxArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i, false]);
        animations.push([k, auxArray[i], true]);
        mainArray[k++] = auxArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j, false]);
        animations.push([k, auxArray[j], true]);
        mainArray[k++] = auxArray[j++];
    }
}

// 5. Quick Sort (Simple Hoare or Lomuto Partition implementation needed for viz)
export const getQuickSortAnimations = (array) => {
    const animations = [];
    const auxArray = array.slice();
    quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
};

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        animations.push([i, endIdx, false]); // Compare with pivot
        if (array[i] < pivotValue) {
            animations.push([i, array[pivotIdx], true]);
            animations.push([pivotIdx, array[i], true]);
            [array[i], array[pivotIdx]] = [array[pivotIdx], array[i]];
            pivotIdx++;
        }
    }
    animations.push([pivotIdx, array[endIdx], true]);
    animations.push([endIdx, array[pivotIdx], true]);
    [array[pivotIdx], array[endIdx]] = [array[endIdx], array[pivotIdx]];
    return pivotIdx;
}
