import React, { useState } from 'react';
import { Card, PageHeader, Badge } from '../../components/ui/Common';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight, Scale, Info, Car, Truck, Bike } from 'lucide-react';

const Asymptotic = () => {
    const [graphPoints] = useState(() => {
        const data = [];
        for (let n = 1; n <= 20; n++) {
            data.push({
                n,
                linear: n,
                quadratic: n * n,
                upper: 2 * (n * n),
                lower: 0.5 * (n * n)
            });
        }
        return data;
    });

    return (
        <div className="animate-fade-in">
            <PageHeader
                title="3.1 Asimptotik Notasyonlar"
                subtitle="Algoritmaların performansını donanım gücünden (GHz, RAM) bağımsız olarak, sadece girdi boyutu (n) büyüdükçe nasıl davrandığına göre ölçme sanatıdır."
            />

            <div className="grid-responsive" style={{ marginBottom: 'var(--space-2xl)' }}>

                {/* BIG O ANALOGY CARD */}
                <Card style={{ gridColumn: 'span 1' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowUpRight size={24} /> Big-O (O) - En Kötü Senaryo
                    </h3>
                    <div style={{ marginBottom: 'var(--space-md)', padding: '15px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary)' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                            <Truck size={18} /> Otopark Analojisi
                        </h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            "Otoparkta boş yer arıyorsun. <strong>En kötü ihtimalle</strong> (Big O) en sonuncu yere kadar bakıp bulamayabilirsin. Yani tüm otoparkı gezmek zorundasın."
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Üst Sınır (Upper Bound). Algoritmanın çalışması asla bu sınırın üzerine çıkmaz. "Garanti edilen en kötü performans" budur.
                    </p>
                    <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                        f(n) ≤ c · g(n)
                    </div>
                </Card>

                {/* OMEGA ANALOGY CARD */}
                <Card style={{ gridColumn: 'span 1' }}>
                    <h3 style={{ color: 'var(--success)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TrendingUp size={24} /> Omega (Ω) - En İyi Senaryo
                    </h3>
                    <div style={{ marginBottom: 'var(--space-md)', padding: '15px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--success)' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                            <Bike size={18} /> Otopark Analojisi
                        </h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            "Otoparkta boş yer arıyorsun. <strong>En iyi ihtimalle</strong> (Omega) girer girmez ilk yerin boş olduğunu görürsün. Yani şansın yaver gitti."
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Alt Sınır (Lower Bound). Algoritma hiçbir zaman bu sınırdan daha hızlı çalışamaz.
                    </p>
                    <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                        f(n) ≥ c · g(n)
                    </div>
                </Card>

                {/* THETA ANALOGY CARD */}
                <Card style={{ gridColumn: 'span 1' }}>
                    <h3 style={{ color: 'var(--accent)', marginBottom: 'var(--space-md)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Scale size={24} /> Theta (Θ) - Ortalamada Olan
                    </h3>
                    <div style={{ marginBottom: 'var(--space-md)', padding: '15px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent)' }}>
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--text-primary)' }}>
                            <Car size={18} /> Otopark Analojisi
                        </h4>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                            "Genelde ne olur? Ne girişte bulursun ne de en sonda. <strong>Ortalama</strong> olarak otoparkın yarısını gezersin. Gerçek hayat budur."
                        </p>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        Tam Sınır (Tight Bound). Hem alttan hem üstten sınırlanmıştır. Algoritmanın karakteristiğini en net ifade eden notasyondur.
                    </p>
                    <div style={{ padding: '8px', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                        c₁·g(n) ≤ f(n) ≤ c₂·g(n)
                    </div>
                </Card>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: 'var(--space-lg)' }}>📉 Görsel Kanıt: Sınırlar Arasında</h2>

            <Card style={{ height: '450px', padding: 'var(--space-md)' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphPoints} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                        <XAxis
                            dataKey="n"
                            stroke="var(--text-secondary)"
                            label={{ value: 'Girdi Boyutu (n)', position: 'insideBottomRight', offset: -10, fill: 'var(--text-muted)' }}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            label={{ value: 'İşlem Süresi', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)' }}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px', color: 'var(--text-primary)' }}
                        />
                        <Legend verticalAlign="top" height={36} />

                        {/* Upper Bound */}
                        <Line type="monotone" dataKey="upper" stroke="var(--danger)" name="Üst Sınır (Big O)" strokeDasharray="5 5" dot={false} strokeWidth={2} />

                        {/* Actual Function */}
                        <Line type="monotone" dataKey="quadratic" stroke="var(--primary)" name="Gerçek Çalışma Zamanı f(n)" strokeWidth={4} dot={false} />

                        {/* Lower Bound */}
                        <Line type="monotone" dataKey="lower" stroke="var(--success)" name="Alt Sınır (Omega)" strokeDasharray="5 5" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <Info size={16} /> Grafikte görüldüğü gibi, algoritmanın gerçek performansı (Mavi), her zaman Kırmızı (Kötü) ve Yeşil (İyi) çizgilerin arasında kalır.
                </div>
            </Card>
        </div>
    );
};

export default Asymptotic;
