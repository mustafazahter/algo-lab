import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Common';
import { CornerDownRight, Play, Square, RotateCcw, BarChart2, Circle, Palette } from 'lucide-react';
import {
    getBubbleSortAnimations,
    getSelectionSortAnimations,
    getInsertionSortAnimations,
    getMergeSortAnimations,
    getQuickSortAnimations
} from './algorithms';

// 🎨 Gelişmiş Renk Paleti
const COLORS = {
    primary: '#6366f1',
    compare: '#f59e0b',
    swap: '#ef4444',
    sorted: '#10b981',
};

const SortVisualizer = () => {
    const [array, setArray] = useState([]);
    const [algorithm, setAlgorithm] = useState('bubble');
    const [visualMode, setVisualMode] = useState('bars');
    const [isRunning, setIsRunning] = useState(false);
    const [arraySize, setArraySize] = useState(40);
    const [speed, setSpeed] = useState(30);

    // Refs for animation control
    const containerRef = useRef(null);
    const abortControllerRef = useRef(null); // To stop async loop
    const speedRef = useRef(speed); // Read fresh speed

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        resetArray();
        return () => stopAnimation();
    }, [arraySize, visualMode]);

    const stopAnimation = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        setIsRunning(false);
    };

    const resetArray = () => {
        stopAnimation();
        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(randomIntFromInterval(20, 450));
        }
        setArray(newArray);

        // DOM Reset
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length; i++) {
            resetBarStyle(arrayBars[i], newArray[i]);
        }
    };

    const resetBarStyle = (element, value) => {
        if (!element) return;
        element.style.height = visualMode === 'dots' ? '12px' : `${value}px`;
        element.style.bottom = visualMode === 'dots' ? `${value}px` : '0';
        element.style.backgroundColor = getBarColor(value);
    };

    const getBarColor = (value) => {
        if (visualMode === 'rainbow') {
            const hue = (value / 450) * 320;
            return `hsl(${hue}, 80%, 60%)`;
        }
        return COLORS.primary;
    };

    const handleStart = async () => {
        if (isRunning) {
            resetArray();
            return;
        }

        setIsRunning(true);

        let animations = [];
        const auxArray = [...array];
        switch (algorithm) {
            case 'bubble': animations = getBubbleSortAnimations(auxArray); break;
            case 'selection': animations = getSelectionSortAnimations(auxArray); break;
            case 'insertion': animations = getInsertionSortAnimations(auxArray); break;
            case 'merge': animations = getMergeSortAnimations(auxArray); break;
            case 'quick': animations = getQuickSortAnimations(auxArray); break;
            default: break;
        }

        await animate(animations);
    };

    // Helper: Sleep that respects abort immediately
    const sleep = (ms) => {
        return new Promise((resolve, reject) => {
            if (!abortControllerRef.current) {
                resolve();
                return;
            }
            const signal = abortControllerRef.current.signal;

            if (signal.aborted) {
                reject(new Error('Aborted'));
                return;
            }

            const timeoutId = setTimeout(() => {
                resolve();
                cleanup();
            }, ms);

            const onAbort = () => {
                clearTimeout(timeoutId);
                reject(new Error('Aborted'));
                cleanup();
            };

            const cleanup = () => {
                signal.removeEventListener('abort', onAbort);
            };

            signal.addEventListener('abort', onAbort);
        });
    };

    const animate = async (animations) => {
        // Clear any previous controller just in case
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        const arrayBars = document.getElementsByClassName('array-bar');

        try {
            for (let i = 0; i < animations.length; i++) {
                if (signal.aborted) throw new Error('Aborted');

                // Universal format for this algorithms.js: [barOneIdx, data2, isChange]
                // If isChange is false: data2 = barTwoIdx (Compare)
                // If isChange is true:  data2 = newHeight (Overwrite)
                const [barOneIdx, data2, isChange] = animations[i];

                // Safety check
                if (!arrayBars[barOneIdx]) continue;

                if (!isChange) {
                    // --- COMPARE ---
                    const barTwoIdx = data2;
                    const barOneStyle = arrayBars[barOneIdx]?.style;
                    const barTwoStyle = arrayBars[barTwoIdx]?.style;

                    // Visual Feedback for Compare
                    if (barOneStyle) barOneStyle.backgroundColor = COLORS.compare;
                    if (barTwoStyle) barTwoStyle.backgroundColor = COLORS.compare;

                    await sleep(speedRef.current);

                    // Revert Colors
                    if (barOneStyle) barOneStyle.backgroundColor = getBarColor(parseInt(visualMode === 'dots' ? barOneStyle.bottom : barOneStyle.height));
                    if (barTwoStyle) barTwoStyle.backgroundColor = getBarColor(parseInt(visualMode === 'dots' ? barTwoStyle.bottom : barTwoStyle.height));

                } else {
                    // --- OVERWRITE ---
                    const newHeight = data2;
                    const barOneStyle = arrayBars[barOneIdx]?.style;

                    if (barOneStyle) {
                        barOneStyle.backgroundColor = COLORS.swap;

                        if (visualMode === 'dots') {
                            barOneStyle.bottom = `${newHeight}px`;
                            // Dots might need height adjustment to look good or stay fixed? 
                            // Usually dots just change position (bottom).
                        } else {
                            barOneStyle.height = `${newHeight}px`;
                        }

                        await sleep(speedRef.current);

                        barOneStyle.backgroundColor = getBarColor(newHeight);
                    }
                }
            }

            // Finish Sequence - Green Flash
            setIsRunning(false);
            for (let k = 0; k < arrayBars.length; k++) {
                if (signal.aborted) break;
                if (arrayBars[k]) arrayBars[k].style.backgroundColor = COLORS.sorted;
                await new Promise(r => setTimeout(r, 10));
            }

        } catch (error) {
            // Aborted explicitly
        } finally {
            abortControllerRef.current = null;
        }
    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700' }}>6.3. Sıralama Görselleştirici</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Algoritmaların adım adım diziyi nasıl sıraladığını canlı izleyin.</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: '20px' }}>
                <Card>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                        {/* 1. ROW: LEJANT */}
                        <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 20px)', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)', fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>DURUMLAR:</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.compare }}></div>
                                <span>Karşılaştırma (Compare)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.swap }}></div>
                                <span>Yer Değiştirme (Swap)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: COLORS.sorted }}></div>
                                <span>Tamamlandı</span>
                            </div>
                        </div>

                        {/* 2. ROW: CONTROLS */}
                        <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 15px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 15px)', alignItems: 'center', flexWrap: 'wrap', flex: '1 1 auto', minWidth: '0' }}>
                                {/* Mode Toggle */}
                                <div style={{ display: 'flex', gap: '2px', background: 'var(--bg-primary)', padding: '2px', borderRadius: '6px', flexShrink: 0 }}>
                                    {['bars', 'rainbow', 'dots'].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => setVisualMode(m)}
                                            disabled={isRunning}
                                            style={{
                                                padding: 'clamp(4px, 1.5vw, 6px)',
                                                borderRadius: '4px',
                                                border: 'none',
                                                background: visualMode === m ? 'var(--bg-card)' : 'transparent',
                                                boxShadow: visualMode === m ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                                cursor: 'pointer',
                                                opacity: isRunning ? 0.5 : 1
                                            }}>
                                            {m === 'bars' && <BarChart2 size={window.innerWidth <= 768 ? 14 : 16} color={visualMode === m ? 'var(--primary)' : 'var(--text-secondary)'} />}
                                            {m === 'rainbow' && <Palette size={window.innerWidth <= 768 ? 14 : 16} color={visualMode === m ? 'orange' : 'var(--text-secondary)'} />}
                                            {m === 'dots' && <Circle size={window.innerWidth <= 768 ? 14 : 16} color={visualMode === m ? 'var(--accent)' : 'var(--text-secondary)'} />}
                                        </button>
                                    ))}
                                </div>

                                {window.innerWidth > 768 && <div style={{ height: '20px', width: '1px', background: 'var(--border-light)' }}></div>}

                                <div style={{ display: 'flex', gap: 'clamp(10px, 2vw, 15px)', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 'clamp(70px, 20vw, 90px)' }}>
                                        <label style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.65rem)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Boyut: {arraySize}</label>
                                        <input type="range" min="10" max="150" value={arraySize} onChange={(e) => setArraySize(parseInt(e.target.value))} disabled={isRunning} style={{ width: '100%' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 'clamp(70px, 20vw, 90px)' }}>
                                        <label style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.65rem)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Hız: {speed}ms</label>
                                        <input type="range" min="1" max="200" step="5" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} style={{ width: '100%', direction: 'rtl' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', gap: 'clamp(6px, 2vw, 10px)', flexWrap: 'wrap', justifyContent: 'center', width: window.innerWidth <= 768 ? '100%' : 'auto' }}>
                                <select
                                    value={algorithm}
                                    onChange={(e) => setAlgorithm(e.target.value)}
                                    disabled={isRunning}
                                    style={{
                                        padding: 'clamp(6px, 2vw, 8px)',
                                        borderRadius: '6px',
                                        background: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        border: '1px solid var(--border-medium)',
                                        fontWeight: 'bold',
                                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                                        flex: window.innerWidth <= 768 ? '1 1 auto' : '0 0 auto',
                                        minWidth: 'clamp(120px, 35vw, 150px)'
                                    }}
                                >
                                    <option value="bubble">Bubble Sort</option>
                                    <option value="selection">Selection Sort</option>
                                    <option value="insertion">Insertion Sort</option>
                                    <option value="merge">Merge Sort</option>
                                    <option value="quick">Quick Sort</option>
                                </select>

                                <button onClick={resetArray} disabled={isRunning} style={{ padding: 'clamp(6px, 2vw, 8px)', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', cursor: 'pointer', flexShrink: 0 }}>
                                    <RotateCcw size={window.innerWidth <= 768 ? 16 : 18} />
                                </button>

                                <button
                                    onClick={handleStart}
                                    style={{
                                        padding: 'clamp(6px, 2vw, 8px) clamp(16px, 4vw, 20px)',
                                        borderRadius: '6px',
                                        background: isRunning ? 'var(--danger)' : 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px',
                                        fontWeight: 'bold',
                                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                                        minWidth: 'clamp(90px, 25vw, 100px)',
                                        justifyContent: 'center',
                                        flex: window.innerWidth <= 768 ? '1 1 auto' : '0 0 auto'
                                    }}>
                                    {isRunning ? <><Square size={window.innerWidth <= 768 ? 14 : 16} fill="white" /> DUR</> : <><Play size={window.innerWidth <= 768 ? 16 : 18} /> BAŞLAT</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div
                ref={containerRef}
                style={{
                    height: 'clamp(350px, 80vw, 500px)',
                    background: 'var(--bg-card)',
                    padding: 'clamp(12px, 3vw, 20px)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            backgroundColor: getBarColor(value),
                            height: visualMode === 'dots' ? '12px' : `${value}px`,
                            bottom: visualMode === 'dots' ? `${value}px` : '0',
                            width: `${Math.floor(700 / arraySize)}px`,
                            margin: '0 1px',
                            display: 'inline-block',
                            borderRadius: visualMode === 'dots' ? '50%' : '2px 2px 0 0',
                            position: visualMode === 'dots' ? 'relative' : 'static',
                            transition: 'height 0.1s, bottom 0.1s'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default SortVisualizer;
