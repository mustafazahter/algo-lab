import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, ChevronRight, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const Card = ({ children, className = '', style = {} }) => {
    return (
        <div
            className={`glass-panel animate-fade-in ${className}`}
            style={{
                padding: 'var(--space-lg)',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export const Badge = ({ children, type = 'primary', variant, icon }) => {
    const badgeType = variant || type;
    const colors = {
        primary: 'var(--primary)',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
    };

    const color = colors[badgeType] || colors.primary;
    const Icon = icon;

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.7rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor: `color-mix(in srgb, ${color}, transparent 88%)`,
            color: color,
            border: `1px solid color-mix(in srgb, ${color}, transparent 75%)`,
            transition: 'all var(--duration-fast)',
        }}>
            {Icon && <Icon size={12} />}
            {children}
        </span>
    );
};

export const PageHeader = ({ title, subtitle }) => {
    return (
        <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <h1 className="text-gradient animate-fade-in text-heading" style={{ marginBottom: 'var(--space-sm)' }}>
                {title}
            </h1>
            <p className="text-body" style={{
                color: 'var(--text-secondary)',
                maxWidth: '700px',
                lineHeight: 1.6
            }}>
                {subtitle}
            </p>
            <div style={{
                height: '1px',
                width: 'clamp(60px, 15vw, 100px)',
                background: 'linear-gradient(90deg, var(--primary), transparent)',
                marginTop: 'var(--space-lg)'
            }} />
        </div>
    );
};

export const Button = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    icon,
    fullWidth = false,
    style = {}
}) => {
    const variants = {
        primary: { bg: 'var(--primary)', color: '#fff', border: 'transparent' },
        secondary: { bg: 'var(--bg-card)', color: 'var(--text-primary)', border: 'var(--border-light)' },
        danger: { bg: 'var(--danger)', color: '#fff', border: 'transparent' },
        success: { bg: 'var(--success)', color: '#fff', border: 'transparent' },
        warning: { bg: 'var(--warning)', color: '#fff', border: 'transparent' },
    };

    const currentVariant = variants[variant] || variants.primary;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="hover-scale"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: 'var(--space-sm) var(--space-lg)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: currentVariant.bg,
                color: currentVariant.color,
                border: `1px solid ${currentVariant.border}`,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                fontWeight: '600',
                fontSize: '0.95rem',
                width: fullWidth ? '100%' : 'auto',
                transition: 'all var(--duration-fast)',
                ...style
            }}
        >
            {icon && icon}
            {children}
        </button>
    );
};

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="hover-scale"
            style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)'
            }}
            title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
};
