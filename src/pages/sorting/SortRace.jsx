import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/ui/Common';
import { CornerDownRight, Play, RotateCcw, Swords, Square, RefreshCw } from 'lucide-react';
import {
    getBubbleSortAnimations,
    getSelectionSortAnimations,
    getInsertionSortAnimations,
    getMergeSortAnimations,
    getQuickSortAnimations
} from './algorithms';

const RaceChart = ({ id, array, title, isFinished, colorOverride }) => {
    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', padding: '10px', borderRadius: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', color: isFinished ? 'var(--success)' : 'var(--text-primary)' }}>{title}</h3>
                {isFinished && <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 'bold' }}>BİTTİ! 🏁</span>}
            </div>
            <div style={{
                height: '300px',
                background: 'var(--bg-card)',
                border: isFinished ? '2px solid var(--success)' : '1px solid var(--border-light)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '10px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {array.map((value, idx) => (
                    <div
                        className={`bar-${id}`}
                        key={idx}
                        style={{
                            height: `${value}px`,
                            width: `${Math.floor(300 / array.length)}px`,
                            margin: '0 1px',
                            backgroundColor: colorOverride || 'var(--primary)',
                            display: 'inline-block',
                            borderRadius: '2px 2px 0 0',
                            transition: 'height 0.1s ease'
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

const SortRace = () => {
    const [arraySize] = useState(30);
    const [speed] = useState(40);
    const [baseArray, setBaseArray] = useState([]);

    // Competitors
    const [algo1, setAlgo1] = useState('bubble');
    const [algo2, setAlgo2] = useState('quick');

    // Status
    const [isRunning, setIsRunning] = useState(false);
    const [finished1, setFinished1] = useState(false);
    const [finished2, setFinished2] = useState(false);

    // Abort Logic
    const abortControllerRef1 = useRef(null);
    const abortControllerRef2 = useRef(null);

    // Initial render
    useEffect(() => {
        resetRace();
        return () => stopRace();
    }, []);

    const stopRace = () => {
        if (abortControllerRef1.current) abortControllerRef1.current.abort();
        if (abortControllerRef2.current) abortControllerRef2.current.abort();
        setIsRunning(false);
    };

    const resetRace = () => {
        stopRace();

        const newArray = [];
        for (let i = 0; i < arraySize; i++) {
            newArray.push(Math.floor(Math.random() * 250) + 10); // Random heights
        }
        setBaseArray(newArray);

        // Use timeout to allow previous async operations to fully bail out
        setTimeout(() => {
            resetBars('race1', newArray);
            resetBars('race2', newArray);
        }, 50);

        setFinished1(false);
        setFinished2(false);
    };

    const resetBars = (id, arr) => {
        const bars = document.getElementsByClassName(`bar-${id}`);
        // We might run into race conditions if React re-renders, but DOM manipulation is usually faster
        if (bars.length !== arr.length) return; // Mismatch safety

        for (let i = 0; i < bars.length; i++) {
            if (bars[i]) {
                bars[i].style.height = `${arr[i]}px`;
                bars[i].style.backgroundColor = 'var(--primary)';
            }
        }
    };

    const runRace = () => {
        if (isRunning) {
            resetRace();
            return;
        }

        setIsRunning(true);
        setFinished1(false);
        setFinished2(false);

        abortControllerRef1.current = new AbortController();
        abortControllerRef2.current = new AbortController();

        // Run both asynchronously
        runAlgorithm(algo1, 'race1', setFinished1, abortControllerRef1.current);
        runAlgorithm(algo2, 'race2', setFinished2, abortControllerRef2.current);
    };

    const safeSleep = (ms, signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error('Aborted'));
                return;
            }
            const timeout = setTimeout(() => {
                resolve();
                cleanup();
            }, ms);
            const onAbort = () => {
                clearTimeout(timeout);
                reject(new Error('Aborted'));
                cleanup();
            };
            const cleanup = () => {
                signal.removeEventListener('abort', onAbort);
            };
            signal.addEventListener('abort', onAbort);
        });
    };

    const runAlgorithm = async (name, id, setFinish, controller) => {
        let animations = [];
        const arrCopy = [...baseArray];

        switch (name) {
            case 'bubble': animations = getBubbleSortAnimations(arrCopy); break;
            case 'selection': animations = getSelectionSortAnimations(arrCopy); break;
            case 'insertion': animations = getInsertionSortAnimations(arrCopy); break;
            case 'merge': animations = getMergeSortAnimations(arrCopy); break;
            case 'quick': animations = getQuickSortAnimations(arrCopy); break;
            default: break;
        }

        const bars = document.getElementsByClassName(`bar-${id}`);
        const signal = controller.signal;

        try {
            for (let i = 0; i < animations.length; i++) {
                if (signal.aborted) throw new Error('Aborted');

                const [barOneIdx, data2, isChange] = animations[i];

                if (!bars[barOneIdx]) continue;

                if (!isChange) {
                    // Compare (data2 = index)
                    const barTwoIdx = data2;
                    const barOne = bars[barOneIdx];
                    const barTwo = bars[barTwoIdx];

                    if (barOne) barOne.style.backgroundColor = 'var(--accent)';
                    if (barTwo) barTwo.style.backgroundColor = 'var(--accent)';

                    await safeSleep(speed, signal);

                    if (barOne) barOne.style.backgroundColor = 'var(--primary)';
                    if (barTwo) barTwo.style.backgroundColor = 'var(--primary)';
                } else {
                    // Overwrite (data2 = newHeight)
                    const newHeight = data2;
                    const barOne = bars[barOneIdx];

                    if (barOne) {
                        barOne.style.backgroundColor = 'var(--danger)';
                        barOne.style.height = `${newHeight}px`;

                        await safeSleep(speed, signal);

                        barOne.style.backgroundColor = 'var(--primary)';
                    }
                }
            }

            // Finish
            setFinish(true);
            for (let k = 0; k < bars.length; k++) {
                if (signal.aborted) break;
                if (bars[k]) bars[k].style.backgroundColor = 'var(--success)';
                await new Promise(r => setTimeout(r, 5));
            }
        } catch (e) {
            // Aborted
        }
    };

    return (
        <div className="animate-fade-in">
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <div style={{ padding: '10px', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={24} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>6.4. Algoritma Yarışı (Duel Mode)</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>İki algoritmayı aynı veri setinde kafa kafaya yarıştır.</p>
                </div>
            </div>

            <Card>
                {/* CONTROLS */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <select
                        value={algo1}
                        onChange={(e) => setAlgo1(e.target.value)}
                        disabled={isRunning}
                        style={{ padding: '10px', borderRadius: '6px', border: '2px solid var(--border-medium)', fontWeight: 'bold' }}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>VS</div>

                    <select
                        value={algo2}
                        onChange={(e) => setAlgo2(e.target.value)}
                        disabled={isRunning}
                        style={{ padding: '10px', borderRadius: '6px', border: '2px solid var(--border-medium)', fontWeight: 'bold' }}>
                        <option value="bubble">Bubble Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                    </select>

                    <div style={{ width: '20px' }}></div>

                    <button onClick={resetRace} disabled={isRunning} style={{ padding: '10px', borderRadius: '6px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', cursor: 'pointer' }}>
                        <RefreshCw size={20} />
                    </button>

                    <button
                        onClick={runRace}
                        style={{
                            padding: '10px 30px',
                            borderRadius: '6px',
                            background: isRunning ? 'var(--danger)' : 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                        {isRunning ? <><Square size={20} fill="white" /> DUR ve SIFIRLA</> : <><Play size={20} /> YARIŞI BAŞLAT</>}
                    </button>
                </div>

                {/* ARENA */}
                <div style={{ display: 'flex', gap: '20px', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
                    <RaceChart id="race1" array={baseArray} title={algo1.toUpperCase()} isFinished={finished1} />
                    <RaceChart id="race2" array={baseArray} title={algo2.toUpperCase()} isFinished={finished2} />
                </div>
            </Card>
        </div>
    );
};

export default SortRace;
