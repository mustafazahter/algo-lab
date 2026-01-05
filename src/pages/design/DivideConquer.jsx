import React, { useState, useEffect } from 'react';
import { Card, PageHeader, Badge } from '../../components/ui/Common';
import { GitMerge, Scissors, Layers, PlayCircle } from 'lucide-react';

const DivideConquer = () => {
    const [array, setArray] = useState([38, 27, 43, 3, 9, 82, 10]);
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        generateMergeSortSteps([...array]);
    }, []);

    const generateMergeSortSteps = (arr) => {
        let newSteps = [];

        // Recursive merge simulation
        const mergeSortRec = (arr, depth, id) => {
            newSteps.push({ type: 'split', arr: [...arr], depth, id, msg: `Parçala: [${arr.join(', ')}]` });

            if (arr.length <= 1) {
                newSteps.push({ type: 'base', arr: [...arr], depth, id, msg: `Temel Durum: [${arr.join(', ')}] (Sıralı kabul edilir)` });
                return arr;
            }

            const mid = Math.floor(arr.length / 2);
            const left = mergeSortRec(arr.slice(0, mid), depth + 1, id + 'L');
            const right = mergeSortRec(arr.slice(mid), depth + 1, id + 'R');

            const merged = merge(left, right);
            newSteps.push({ type: 'merge', arr: [...merged], left, right, depth, id, msg: `Birleştir: [${left}] ve [${right}] -> [${merged}]` });
            return merged;
        };

        const merge = (left, right) => {
            let result = [];
            let lIndex = 0;
            let rIndex = 0;

            while (lIndex < left.length && rIndex < right.length) {
                if (left[lIndex] < right[rIndex]) {
                    result.push(left[lIndex]);
                    lIndex++;
                } else {
                    result.push(right[rIndex]);
                    rIndex++;
                }
            }
            return result.concat(left.slice(lIndex)).concat(right.slice(rIndex));
        };

        mergeSortRec(arr, 0, 'root');
        setSteps(newSteps);
        setCurrentStepIndex(0);
    };

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            setIsSorted(true);
        }
    };

    const reset = () => {
        setCurrentStepIndex(0);
        setIsSorted(false);
    };

    const currentStep = steps[currentStepIndex];

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="2.2 Böl ve Yönet (Divide & Conquer)"
                subtitle=" 'Büyük problemleri yönetilebilir küçük parçalara böl, çöz ve birleştir.' - Julius Caesar'dan Algoritmalara"
            />

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>
                <Card>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Scissors size={20} /> Strateji
                    </h3>
                    <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li><strong>Divide (Böl):</strong> Problemi alt problemlere ayır.</li>
                        <li><strong>Conquer (Çöz):</strong> Alt problemleri recursive olarak çöz (Base Case'e in).</li>
                        <li><strong>Combine (Birleştir):</strong> Alt çözümleri birleştirerek ana çözümü oluştur.</li>
                    </ol>
                </Card>
                <Card>
                    <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Layers size={20} /> Örnek Algoritmalar
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <Badge type="primary">Merge Sort</Badge>
                        <Badge type="primary">Quick Sort</Badge>
                        <Badge type="primary">Binary Search</Badge>
                        <Badge type="primary">Strassen Matris Çarpımı</Badge>
                    </div>
                </Card>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GitMerge size={28} /> Merge Sort Görselleştirme
            </h2>

            <Card>
                <div style={{ marginBottom: 'var(--space-lg)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'var(--text-secondary)' }}>
                        {currentStep ? currentStep.msg : 'Hazır'}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <button
                            onClick={nextStep}
                            className="hover-scale"
                            disabled={isSorted}
                            style={{ padding: '10px 30px', background: 'var(--primary)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <PlayCircle size={20} /> {isSorted ? 'Tamamlandı' : 'Adım İlerle'}
                        </button>
                        <button
                            onClick={reset}
                            style={{ padding: '10px 20px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-md)' }}
                        >
                            Sıfırla
                        </button>
                    </div>
                </div>

                {/* Görselleştirme Alanı */}
                <div style={{
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-xl)',
                    border: '1px solid var(--border-light)'
                }}>
                    {/* Mevcut Adımın Dizisi */}
                    {currentStep && (
                        <div className="animate-fade-in" style={{ display: 'flex', gap: '10px', marginBottom: 'var(--space-xl)' }}>
                            {currentStep.arr.map((num, i) => (
                                <div key={i} style={{
                                    width: '50px', height: '50px',
                                    background:
                                        currentStep.type === 'base' ? 'var(--success)' :
                                            currentStep.type === 'merge' ? 'var(--accent)' :
                                                'var(--bg-card)',
                                    color: currentStep.type === 'base' || currentStep.type === 'merge' ? 'white' : 'var(--text-primary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 'bold',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}>
                                    {num}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Merge İşlemi Görseli (Eğer merge ise göster) */}
                    {currentStep?.type === 'merge' && (
                        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', opacity: 0.6 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginBottom: '5px' }}>Sol</div>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {currentStep.left.map(n => <div key={n} style={{ padding: '5px', background: 'var(--bg-card)', border: '1px solid var(--border-medium)' }}>{n}</div>)}
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ marginBottom: '5px' }}>Sağ</div>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {currentStep.right.map(n => <div key={n} style={{ padding: '5px', background: 'var(--bg-card)', border: '1px solid var(--border-medium)' }}>{n}</div>)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

        </div>
    );
};

export default DivideConquer;
