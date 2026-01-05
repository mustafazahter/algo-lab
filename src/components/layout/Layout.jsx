import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/Common';
import {
    Home,
    BookOpen,
    Layers,
    Activity,
    Code,
    Search,
    ArrowUpDown,
    Share2,
    Network,
    Puzzle,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Database,
    Cpu,
    BarChart2,
    TreeDeciduous,
    Boxes
} from 'lucide-react';

const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: Home },
    { path: '/basics', label: '1. Temel Kavramlar', icon: BookOpen },
    { path: '/design', label: '2. Tasarım Yöntemleri', icon: Layers },
    { path: '/complexity', label: '3. Karmaşıklık Analizi', icon: Activity },
    { path: '/code-analysis', label: '4. Kod Analizi', icon: Code },
    { path: '/search', label: '5. Arama Algoritmaları', icon: Search },
    { path: '/sorting', label: '6. Sıralama Algoritmaları', icon: ArrowUpDown },
    { path: '/graphs', label: '7. Graf Algoritmaları', icon: Share2 },
    { path: '/trees', label: '8. Ağaçlar & Heap', icon: Network },
    { path: '/pnp', label: '9. P vs NP', icon: Puzzle },
];

const Layout = () => {
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: collapsed ? '80px' : '280px',
                backgroundColor: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-light)',
                padding: 'var(--space-md)',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                transition: 'width var(--duration-normal)',
                zIndex: 10
            }}>
                <div style={{
                    marginBottom: 'var(--space-xl)',
                    display: 'flex',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    alignItems: 'center'
                }}>
                    {!collapsed && (
                        <h1 className="text-gradient animate-fade-in" style={{ fontSize: '1.25rem', fontWeight: 'bold', lineHeight: 1.2 }}>
                            Algoritma<br />Laboratuvarı
                        </h1>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hover-scale"
                        style={{
                            color: 'var(--text-secondary)',
                            padding: '8px',
                            borderRadius: 'var(--radius-md)',
                            background: collapsed ? 'transparent' : 'var(--bg-card)'
                        }}
                    >
                        {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={collapsed ? item.label : ''}
                                style={{
                                    padding: 'var(--space-sm) var(--space-md)',
                                    borderRadius: 'var(--radius-md)',
                                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                    gap: 'var(--space-sm)',
                                    transition: 'all var(--duration-fast)',
                                    fontWeight: isActive ? 600 : 400,
                                    border: isActive ? '1px solid var(--border-light)' : '1px solid transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                <item.icon size={20} color={isActive ? 'var(--primary)' : 'currentColor'} />
                                {!collapsed &&
                                    <span style={{
                                        opacity: 1,
                                        transition: 'opacity 0.2s',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {item.label}
                                    </span>
                                }
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer actions */}
                <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <ThemeToggle />
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: collapsed ? '80px' : '280px',
                flex: 1,
                padding: 'var(--space-2xl)',
                backgroundColor: 'var(--bg-primary)',
                transition: 'margin-left var(--duration-normal)',
                minHeight: '100vh'
            }}>
                <div className="container animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
