import React, { useState, useEffect } from 'react';
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen && isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen, isMobile]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
            {/* Mobile Header */}
            {isMobile && (
                <header style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 var(--space-md)',
                    zIndex: 100,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                }}>
                    <h1 className="text-gradient" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        Algoritma Lab
                    </h1>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                color: 'var(--text-primary)',
                                padding: '8px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--bg-card)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </header>
            )}

            {/* Mobile Menu Overlay */}
            {isMobile && mobileMenuOpen && (
                <div
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: '60px',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 99,
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <aside style={{
                width: isMobile ? '280px' : (collapsed ? '80px' : '280px'),
                backgroundColor: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-light)',
                padding: isMobile ? 'var(--space-lg) var(--space-md)' : 'var(--space-md)',
                position: 'fixed',
                top: isMobile ? '60px' : 0,
                left: isMobile ? (mobileMenuOpen ? 0 : '-280px') : 0,
                height: isMobile ? 'calc(100vh - 60px)' : '100vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                transition: isMobile ? 'left 0.3s var(--ease-smooth)' : 'width var(--duration-normal)',
                zIndex: 100,
                boxShadow: isMobile && mobileMenuOpen ? '4px 0 12px rgba(0, 0, 0, 0.1)' : 'none'
            }}>
                {!isMobile && (
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
                            aria-label="Toggle sidebar"
                        >
                            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
                        </button>
                    </div>
                )}

                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                title={collapsed && !isMobile ? item.label : ''}
                                style={{
                                    padding: 'var(--space-sm) var(--space-md)',
                                    borderRadius: 'var(--radius-md)',
                                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                    backgroundColor: isActive ? 'var(--bg-card)' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: (collapsed && !isMobile) ? 'center' : 'flex-start',
                                    gap: 'var(--space-sm)',
                                    transition: 'all var(--duration-fast)',
                                    fontWeight: isActive ? 600 : 400,
                                    border: isActive ? '1px solid var(--border-light)' : '1px solid transparent',
                                    cursor: 'pointer'
                                }}
                            >
                                <item.icon size={20} color={isActive ? 'var(--primary)' : 'currentColor'} />
                                {(!collapsed || isMobile) &&
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

                {/* Desktop Footer actions */}
                {!isMobile && (
                    <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <ThemeToggle />
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main style={{
                marginLeft: isMobile ? 0 : (collapsed ? '80px' : '280px'),
                marginTop: isMobile ? '60px' : 0,
                flex: 1,
                padding: isMobile ? 'var(--space-md)' : 'var(--space-2xl)',
                backgroundColor: 'var(--bg-primary)',
                transition: 'margin-left var(--duration-normal)',
                minHeight: isMobile ? 'calc(100vh - 60px)' : '100vh',
                width: '100%',
                maxWidth: '100%',
                overflowX: 'hidden'
            }}>
                <div className="container animate-fade-in">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
