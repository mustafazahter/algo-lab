import React, { useState, useEffect, useMemo } from 'react';
import { Card, Badge, Button } from '../../components/ui/Common';
import { CornerDownRight, GitMerge, Scissors, Layers, PlayCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DivideConquer = () => {
    const initialArray = useMemo(() => [38, 27, 43, 3, 9, 82, 10], []);
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSorted, setIsSorted] = useState(false);

    useEffect(() => {
        generateMergeSortSteps([...initialArray]);
    }, [initialArray]);

    const generateMergeSortSteps = (arr) => {
        let newSteps = [];
        let currentArray = [...arr];

        const mergeSortRec = (startIndex, endIndex) => {
            const length = endIndex - startIndex;
            const subArray = currentArray.slice(startIndex, endIndex);

            if (length <= 1) return;

            // Split Step
            const mid = Math.floor((startIndex + endIndex) / 2);
            newSteps.push({
                type: 'split',
                fullArray: [...currentArray],
                activeRange: [startIndex, endIndex],
                mid: mid,
                msg: `Bölünüyor: [${subArray.join(', ')}]`,
                description: `${startIndex} ve ${endIndex - 1} indisleri arası ikiye ayrılıyor.`
            });

            mergeSortRec(startIndex, mid);
            mergeSortRec(mid, endIndex);

            // Merge Step
            const left = currentArray.slice(startIndex, mid);
            const right = currentArray.slice(mid, endIndex);
            const merged = merge(left, right);

            // Update currentArray with merged values for subsequent steps
            for (let i = 0; i < merged.length; i++) {
                currentArray[startIndex + i] = merged[i];
            }

            newSteps.push({
                type: 'merge',
                fullArray: [...currentArray],
                activeRange: [startIndex, endIndex],
                left,
                right,
                msg: `Birleşiyor: [${left.join(', ')}] ve [${right.join(', ')}]`,
                description: `Sıralı alt diziler birleştirilerek [${merged.join(', ')}] elde edildi.`
            });
        };

        const merge = (left, right) => {
            let result = [];
            let l = 0, r = 0;
            while (l < left.length && r < right.length) {
                if (left[l] <= right[r]) result.push(left[l++]);
                else result.push(right[r++]);
            }
            return [...result, ...left.slice(l), ...right.slice(r)];
        };

        mergeSortRec(0, arr.length);
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
        <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
            {/* Alt Başlık Bölümü */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 12px)', marginBottom: '25px', flexWrap: 'wrap' }}>
                <div style={{ padding: 'clamp(8px, 2vw, 10px)', background: 'rgba(59,130,246,0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <CornerDownRight size={window.innerWidth <= 768 ? 20 : 24} />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                    <h2 className="text-subheading" style={{ margin: 0, fontWeight: '700' }}>2.2 Böl ve Yönet (Divide & Conquer)</h2>
                    <p className="text-small" style={{ margin: 0, color: 'var(--text-secondary)' }}>Karmaşık problemleri küçük parçalara indirgeyerek fethet.</p>
                </div>
            </div>

            <div className="grid-responsive" style={{ marginBottom: '40px' }}>
                <Card style={{ borderLeft: '4px solid var(--primary)' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' }}>
                        <Scissors size={20} /> Strateji Döngüsü
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                minWidth: '28px',
                                background: 'rgba(59,130,246,0.1)',
                                color: 'var(--primary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '0.8rem',
                                border: '1px solid rgba(59,130,246,0.2)',
                                flexShrink: 0,
                                marginTop: '2px'
                            }}>1</div>
                            <span><strong>Böl:</strong> Diziyi en küçük birimlere kadar ortadan ikiye ayır.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                minWidth: '28px',
                                background: 'rgba(59,130,246,0.1)',
                                color: 'var(--primary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '0.8rem',
                                border: '1px solid rgba(59,130,246,0.2)',
                                flexShrink: 0,
                                marginTop: '2px'
                            }}>2</div>
                            <span><strong>Yönet:</strong> Tek elemanlı diziler kendiliğinden sıralıdır.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '28px',
                                height: '28px',
                                minWidth: '28px',
                                background: 'rgba(59,130,246,0.1)',
                                color: 'var(--primary)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: '0.8rem',
                                border: '1px solid rgba(59,130,246,0.2)',
                                flexShrink: 0,
                                marginTop: '2px'
                            }}>3</div>
                            <span><strong>Birleştir:</strong> Küçük parçaları sıralı şekilde harmanlayarak yukarı çık.</span>
                        </li>
                    </ul>
                </Card>
                <Card style={{ borderLeft: '4px solid var(--accent)' }}>
                    <h3 style={{ color: 'var(--accent)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '700' }}>
                        <Layers size={20} /> Endüstriyel Kullanım
                    </h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                        <Badge variant="primary" icon={ChevronRight}>Merge Sort</Badge>
                        <Badge variant="primary" icon={ChevronRight}>Quick Sort</Badge>
                        <Badge variant="primary" icon={ChevronRight}>FFT Algorithms</Badge>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Böl ve Yönet, paralel hesaplama ve büyük veri setlerinin işlenmesinde modern mimarilerin temel taşıdır.
                    </p>
                </Card>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
                <h2 className="text-subheading" style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
                    <GitMerge size={window.innerWidth <= 768 ? 20 : 24} style={{ color: 'var(--primary)' }} /> Simülasyon Akışı
                </h2>
                <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', flexWrap: 'wrap' }}>
                    <Button
                        onClick={nextStep}
                        disabled={isSorted}
                        icon={<PlayCircle size={18} />}
                        style={{ padding: 'clamp(8px, 2vw, 10px) clamp(16px, 4vw, 24px)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                    >
                        {isSorted ? 'Tamamlandı' : 'Adım İlerle'}
                    </Button>
                    <Button
                        onClick={reset}
                        variant="secondary"
                        icon={<RotateCcw size={18} />}
                        style={{ padding: 'clamp(8px, 2vw, 10px) clamp(14px, 3vw, 20px)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                    >
                        Sıfırla
                    </Button>
                </div>
            </div>

            <Card style={{ padding: 'clamp(20px, 5vw, 40px)', background: 'var(--bg-secondary)', overflow: 'hidden', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStepIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{ minHeight: '60px' }}
                        >
                            <div style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                                {currentStep ? currentStep.msg : 'Başlamak için ilerleyin'}
                            </div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                                {currentStep?.description || 'Dizi üzerinde operasyon başlatılmaya hazır.'}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '50px'
                }}>
                    {/* Ana Dizi Görünümü */}
                    <div style={{ display: 'flex', gap: 'clamp(6px, 2vw, 12px)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {(currentStep ? currentStep.fullArray : initialArray).map((num, i) => {
                            const isActive = currentStep && i >= currentStep.activeRange[0] && i < currentStep.activeRange[1];

                            return (
                                <motion.div
                                    key={`box-${i}`}
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.05 : 1,
                                        backgroundColor: isActive
                                            ? (currentStep.type === 'merge' ? 'var(--primary)' : 'var(--accent)')
                                            : 'var(--bg-card)',
                                        color: isActive ? 'white' : 'var(--text-primary)',
                                        borderColor: isActive ? 'transparent' : 'var(--border-light)',
                                        boxShadow: isActive ? '0 8px 20px rgba(59,130,246,0.3)' : '0 4px 6px rgba(0,0,0,0.05)'
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: 'clamp(50px, 12vw, 60px)',
                                        height: 'clamp(50px, 12vw, 60px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                                        fontWeight: '800',
                                        borderRadius: 'clamp(10px, 3vw, 14px)',
                                        border: '2px solid'
                                    }}
                                >
                                    {num}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Operasyon Detayı */}
                    <div style={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <AnimatePresence mode="wait">
                            {currentStep && (
                                <motion.div
                                    key={`op-${currentStepIndex}`}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        padding: 'clamp(15px, 4vw, 20px) clamp(20px, 5vw, 30px)',
                                        borderRadius: 'clamp(12px, 3vw, 16px)',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px dashed var(--border-medium)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 'clamp(10px, 3vw, 15px)',
                                        maxWidth: '100%',
                                        overflowX: 'auto'
                                    }}
                                >
                                    <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                                        {currentStep.type === 'split' ? 'Dinamik Ayrıştırma' : 'Hiyerarşik Birleştirme'}
                                    </div>
                                    <div style={{ display: 'flex', gap: 'clamp(15px, 5vw, 30px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        {currentStep.type === 'split' ? (
                                            <>
                                                <div style={{ padding: '10px 15px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                                    [ {currentStep.fullArray.slice(currentStep.activeRange[0], currentStep.mid).join(', ')} ]
                                                </div>
                                                <ChevronRight style={{ color: 'var(--accent)' }} size={20} />
                                                <div style={{ padding: '10px 15px', background: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                                                    [ {currentStep.fullArray.slice(currentStep.mid, currentStep.activeRange[1]).join(', ')} ]
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div style={{ padding: '10px 15px', background: 'rgba(59,130,246,0.1)', color: 'var(--primary)', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                                                    [ {currentStep.left.join(', ')} ]
                                                </div>
                                                <div style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>+</div>
                                                <div style={{ padding: '10px 15px', background: 'rgba(59,130,246,0.1)', color: 'var(--primary)', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                                                    [ {currentStep.right.join(', ')} ]
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DivideConquer;

