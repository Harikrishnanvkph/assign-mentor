/**
 * ChartForge Pro - Advanced Customization Module
 * Comprehensive chart styling and customization options
 */

class CustomizationManager {
    constructor() {
        this.activeCustomizations = new Map();
        this.presets = new Map();
        this.colorSchemes = new Map();
        this.fontStacks = new Map();
        this.animations = new Map();
        this.filters = new Map();
        this.gradients = new Map();
        this.patterns = new Map();
        this.shadows = new Map();
        this.glowEffects = new Map();
        this.initializeCustomization();
    }

    /**
     * Initialize customization system
     */
    initializeCustomization() {
        this.loadPresets();
        this.loadColorSchemes();
        this.loadFontStacks();
        this.loadAnimations();
        this.loadFilters();
        this.loadGradients();
        this.loadPatterns();
        this.loadShadows();
        this.loadGlowEffects();
        this.setupCustomizationUI();
        console.log('Customization Manager initialized');
    }

    /**
     * Load preset configurations
     */
    loadPresets() {
        // Business Preset
        this.presets.set('business', {
            name: 'Business Professional',
            description: 'Clean and professional look for business presentations',
            config: {
                colors: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#6C464E'],
                fonts: {
                    title: 'Helvetica Neue, Arial, sans-serif',
                    labels: 'Arial, sans-serif',
                    values: 'Courier New, monospace'
                },
                background: '#FFFFFF',
                gridLines: true,
                gridColor: '#E0E0E0',
                borderRadius: 0,
                shadow: {
                    enabled: true,
                    blur: 10,
                    color: 'rgba(0, 0, 0, 0.1)',
                    offsetX: 0,
                    offsetY: 2
                },
                animation: {
                    enabled: true,
                    duration: 1000,
                    easing: 'cubicOut'
                }
            }
        });

        // Creative Preset
        this.presets.set('creative', {
            name: 'Creative & Colorful',
            description: 'Vibrant and eye-catching design for creative projects',
            config: {
                colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
                fonts: {
                    title: 'Montserrat, sans-serif',
                    labels: 'Open Sans, sans-serif',
                    values: 'Roboto Mono, monospace'
                },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                gridLines: false,
                borderRadius: 15,
                shadow: {
                    enabled: true,
                    blur: 20,
                    color: 'rgba(131, 56, 236, 0.3)',
                    offsetX: 0,
                    offsetY: 10
                },
                animation: {
                    enabled: true,
                    duration: 1500,
                    easing: 'elasticOut'
                }
            }
        });

        // Minimal Preset
        this.presets.set('minimal', {
            name: 'Minimal & Clean',
            description: 'Simple and elegant design with focus on data',
            config: {
                colors: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
                fonts: {
                    title: 'Inter, sans-serif',
                    labels: 'Inter, sans-serif',
                    values: 'Inter, sans-serif'
                },
                background: '#FAFAFA',
                gridLines: true,
                gridColor: '#F0F0F0',
                borderRadius: 0,
                shadow: {
                    enabled: false
                },
                animation: {
                    enabled: true,
                    duration: 800,
                    easing: 'linear'
                }
            }
        });

        // Dark Mode Preset
        this.presets.set('darkMode', {
            name: 'Dark Mode',
            description: 'Eye-friendly dark theme for low-light environments',
            config: {
                colors: ['#00D9FF', '#00FF88', '#FF006E', '#FFBE0B', '#FB5607'],
                fonts: {
                    title: 'SF Pro Display, sans-serif',
                    labels: 'SF Pro Text, sans-serif',
                    values: 'SF Mono, monospace'
                },
                background: '#1A1A2E',
                gridLines: true,
                gridColor: '#2A2A3E',
                borderRadius: 8,
                shadow: {
                    enabled: true,
                    blur: 15,
                    color: 'rgba(0, 217, 255, 0.2)',
                    offsetX: 0,
                    offsetY: 5
                },
                animation: {
                    enabled: true,
                    duration: 1200,
                    easing: 'cubicInOut'
                }
            }
        });

        // Scientific Preset
        this.presets.set('scientific', {
            name: 'Scientific',
            description: 'Precise and detailed visualization for scientific data',
            config: {
                colors: ['#003F5C', '#2F4B7C', '#665191', '#A05195', '#D45087'],
                fonts: {
                    title: 'Times New Roman, serif',
                    labels: 'Arial, sans-serif',
                    values: 'Courier New, monospace'
                },
                background: '#FFFFFF',
                gridLines: true,
                gridColor: '#CCCCCC',
                borderRadius: 0,
                shadow: {
                    enabled: false
                },
                animation: {
                    enabled: false
                },
                precision: 4,
                showErrorBars: true,
                showConfidenceIntervals: true
            }
        });
    }

    /**
     * Load color schemes
     */
    loadColorSchemes() {
        // Material Design Colors
        this.colorSchemes.set('material', {
            name: 'Material Design',
            primary: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'],
            secondary: ['#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50'],
            accent: ['#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'],
            neutral: ['#FF5722', '#795548', '#9E9E9E', '#607D8B', '#263238']
        });

        // Pastel Colors
        this.colorSchemes.set('pastel', {
            name: 'Pastel',
            primary: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF'],
            secondary: ['#E8BBF8', '#F8BBE8', '#BBF8F8', '#BBF8D8', '#F8F8BB'],
            accent: ['#FFDFD3', '#D3DFFF', '#D3FFD3', '#FFD3F8', '#F8FFD3'],
            neutral: ['#E0E0E0', '#D0D0D0', '#C0C0C0', '#B0B0B0', '#A0A0A0']
        });

        // Earth Tones
        this.colorSchemes.set('earth', {
            name: 'Earth Tones',
            primary: ['#8B4513', '#A0522D', '#D2691E', '#CD853F', '#DEB887'],
            secondary: ['#BC8F8F', '#F4A460', '#DAA520', '#B8860B', '#FFE4B5'],
            accent: ['#8FBC8F', '#90EE90', '#98FB98', '#9ACD32', '#ADFF2F'],
            neutral: ['#696969', '#708090', '#778899', '#808080', '#A9A9A9']
        });

        // Ocean Theme
        this.colorSchemes.set('ocean', {
            name: 'Ocean',
            primary: ['#001F3F', '#003366', '#004080', '#0059B3', '#0073E6'],
            secondary: ['#008CBA', '#00A6FB', '#00BFFF', '#00CED1', '#00FFFF'],
            accent: ['#20B2AA', '#48D1CC', '#40E0D0', '#00CED1', '#5F9EA0'],
            neutral: ['#4682B4', '#5F9EA0', '#6495ED', '#7B68EE', '#8470FF']
        });

        // Neon Colors
        this.colorSchemes.set('neon', {
            name: 'Neon',
            primary: ['#FF073A', '#FF0099', '#FF00FF', '#9D00FF', '#0033FF'],
            secondary: ['#00FFFF', '#00FF00', '#39FF14', '#DFFF00', '#FFFF00'],
            accent: ['#FF6600', '#FF3300', '#FF1493', '#FF69B4', '#FFB6C1'],
            neutral: ['#1A1A1A', '#2A2A2A', '#3A3A3A', '#4A4A4A', '#5A5A5A']
        });

        // Monochromatic schemes
        this.generateMonochromaticSchemes();

        // Complementary schemes
        this.generateComplementarySchemes();

        // Triadic schemes
        this.generateTriadicSchemes();

        // Analogous schemes
        this.generateAnalogousSchemes();
    }

    /**
     * Generate monochromatic color schemes
     */
    generateMonochromaticSchemes() {
        const baseColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        
        baseColors.forEach((base, index) => {
            const scheme = this.generateMonochromatic(base);
            this.colorSchemes.set(`mono_${index}`, {
                name: `Monochromatic ${index + 1}`,
                primary: scheme.slice(0, 5),
                secondary: scheme.slice(5, 10),
                accent: scheme.slice(10, 15),
                neutral: ['#F0F0F0', '#D0D0D0', '#B0B0B0', '#909090', '#707070']
            });
        });
    }

    /**
     * Generate monochromatic colors from base
     */
    generateMonochromatic(baseColor) {
        const colors = [];
        const hsl = this.hexToHSL(baseColor);
        
        // Vary lightness
        for (let i = 0; i < 5; i++) {
            const lightness = 20 + (i * 15);
            colors.push(this.hslToHex(hsl.h, hsl.s, lightness));
        }
        
        // Vary saturation
        for (let i = 0; i < 5; i++) {
            const saturation = 20 + (i * 20);
            colors.push(this.hslToHex(hsl.h, saturation, hsl.l));
        }
        
        // Vary both
        for (let i = 0; i < 5; i++) {
            const lightness = 30 + (i * 10);
            const saturation = 40 + (i * 10);
            colors.push(this.hslToHex(hsl.h, saturation, lightness));
        }
        
        return colors;
    }

    /**
     * Generate complementary color schemes
     */
    generateComplementarySchemes() {
        const baseColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
        
        baseColors.forEach((base, index) => {
            const scheme = this.generateComplementary(base);
            this.colorSchemes.set(`comp_${index}`, {
                name: `Complementary ${index + 1}`,
                primary: scheme.primary,
                secondary: scheme.secondary,
                accent: scheme.accent,
                neutral: scheme.neutral
            });
        });
    }

    /**
     * Generate complementary colors
     */
    generateComplementary(baseColor) {
        const hsl = this.hexToHSL(baseColor);
        const complement = (hsl.h + 180) % 360;
        
        return {
            primary: [
                baseColor,
                this.hslToHex(hsl.h, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(hsl.h, hsl.s * 0.6, hsl.l * 1.4),
                this.hslToHex(hsl.h, hsl.s * 1.2, hsl.l * 0.8),
                this.hslToHex(hsl.h, hsl.s * 1.4, hsl.l * 0.6)
            ],
            secondary: [
                this.hslToHex(complement, hsl.s, hsl.l),
                this.hslToHex(complement, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(complement, hsl.s * 0.6, hsl.l * 1.4),
                this.hslToHex(complement, hsl.s * 1.2, hsl.l * 0.8),
                this.hslToHex(complement, hsl.s * 1.4, hsl.l * 0.6)
            ],
            accent: [
                this.hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
                this.hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
                this.hslToHex((complement + 30) % 360, hsl.s, hsl.l),
                this.hslToHex((complement - 30 + 360) % 360, hsl.s, hsl.l),
                this.hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l)
            ],
            neutral: [
                this.hslToHex(hsl.h, 10, 90),
                this.hslToHex(hsl.h, 10, 70),
                this.hslToHex(hsl.h, 10, 50),
                this.hslToHex(hsl.h, 10, 30),
                this.hslToHex(hsl.h, 10, 10)
            ]
        };
    }

    /**
     * Generate triadic color schemes
     */
    generateTriadicSchemes() {
        const baseColors = ['#FF0000', '#00FF00', '#0000FF'];
        
        baseColors.forEach((base, index) => {
            const scheme = this.generateTriadic(base);
            this.colorSchemes.set(`triadic_${index}`, {
                name: `Triadic ${index + 1}`,
                primary: scheme.primary,
                secondary: scheme.secondary,
                accent: scheme.accent,
                neutral: scheme.neutral
            });
        });
    }

    /**
     * Generate triadic colors
     */
    generateTriadic(baseColor) {
        const hsl = this.hexToHSL(baseColor);
        const triad1 = (hsl.h + 120) % 360;
        const triad2 = (hsl.h + 240) % 360;
        
        return {
            primary: [
                baseColor,
                this.hslToHex(hsl.h, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(hsl.h, hsl.s * 0.6, hsl.l * 1.4),
                this.hslToHex(hsl.h, hsl.s * 1.2, hsl.l * 0.8),
                this.hslToHex(hsl.h, hsl.s * 1.4, hsl.l * 0.6)
            ],
            secondary: [
                this.hslToHex(triad1, hsl.s, hsl.l),
                this.hslToHex(triad1, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(triad1, hsl.s * 0.6, hsl.l * 1.4),
                this.hslToHex(triad1, hsl.s * 1.2, hsl.l * 0.8),
                this.hslToHex(triad1, hsl.s * 1.4, hsl.l * 0.6)
            ],
            accent: [
                this.hslToHex(triad2, hsl.s, hsl.l),
                this.hslToHex(triad2, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(triad2, hsl.s * 0.6, hsl.l * 1.4),
                this.hslToHex(triad2, hsl.s * 1.2, hsl.l * 0.8),
                this.hslToHex(triad2, hsl.s * 1.4, hsl.l * 0.6)
            ],
            neutral: [
                this.hslToHex(hsl.h, 5, 95),
                this.hslToHex(hsl.h, 5, 75),
                this.hslToHex(hsl.h, 5, 55),
                this.hslToHex(hsl.h, 5, 35),
                this.hslToHex(hsl.h, 5, 15)
            ]
        };
    }

    /**
     * Generate analogous color schemes
     */
    generateAnalogousSchemes() {
        const baseColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];
        
        baseColors.forEach((base, index) => {
            const scheme = this.generateAnalogous(base);
            this.colorSchemes.set(`analogous_${index}`, {
                name: `Analogous ${index + 1}`,
                primary: scheme.primary,
                secondary: scheme.secondary,
                accent: scheme.accent,
                neutral: scheme.neutral
            });
        });
    }

    /**
     * Generate analogous colors
     */
    generateAnalogous(baseColor) {
        const hsl = this.hexToHSL(baseColor);
        const analog1 = (hsl.h + 30) % 360;
        const analog2 = (hsl.h - 30 + 360) % 360;
        const analog3 = (hsl.h + 60) % 360;
        const analog4 = (hsl.h - 60 + 360) % 360;
        
        return {
            primary: [
                baseColor,
                this.hslToHex(hsl.h, hsl.s * 0.9, hsl.l * 1.1),
                this.hslToHex(hsl.h, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(hsl.h, hsl.s * 1.1, hsl.l * 0.9),
                this.hslToHex(hsl.h, hsl.s * 1.2, hsl.l * 0.8)
            ],
            secondary: [
                this.hslToHex(analog1, hsl.s, hsl.l),
                this.hslToHex(analog2, hsl.s, hsl.l),
                this.hslToHex(analog1, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(analog2, hsl.s * 0.8, hsl.l * 1.2),
                this.hslToHex(analog1, hsl.s * 1.2, hsl.l * 0.8)
            ],
            accent: [
                this.hslToHex(analog3, hsl.s, hsl.l),
                this.hslToHex(analog4, hsl.s, hsl.l),
                this.hslToHex(analog3, hsl.s * 0.7, hsl.l * 1.3),
                this.hslToHex(analog4, hsl.s * 0.7, hsl.l * 1.3),
                this.hslToHex(analog3, hsl.s * 1.3, hsl.l * 0.7)
            ],
            neutral: [
                this.hslToHex(hsl.h, 15, 85),
                this.hslToHex(hsl.h, 15, 65),
                this.hslToHex(hsl.h, 15, 45),
                this.hslToHex(hsl.h, 15, 25),
                this.hslToHex(hsl.h, 15, 5)
            ]
        };
    }

    /**
     * Convert hex to HSL
     */
    hexToHSL(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    /**
     * Convert HSL to hex
     */
    hslToHex(h, s, l) {
        h = h / 360;
        s = Math.min(100, Math.max(0, s)) / 100;
        l = Math.min(100, Math.max(0, l)) / 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    /**
     * Load font stacks
     */
    loadFontStacks() {
        this.fontStacks.set('sansSerif', {
            name: 'Sans Serif',
            stack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            weights: [100, 300, 400, 500, 600, 700, 900],
            styles: ['normal', 'italic']
        });

        this.fontStacks.set('serif', {
            name: 'Serif',
            stack: 'Georgia, Cambria, "Times New Roman", Times, serif',
            weights: [400, 700],
            styles: ['normal', 'italic']
        });

        this.fontStacks.set('monospace', {
            name: 'Monospace',
            stack: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            weights: [400, 700],
            styles: ['normal']
        });

        this.fontStacks.set('display', {
            name: 'Display',
            stack: '"SF Pro Display", "Helvetica Neue", Arial Black, sans-serif',
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            styles: ['normal', 'italic']
        });

        this.fontStacks.set('handwriting', {
            name: 'Handwriting',
            stack: '"Lucida Handwriting", "Brush Script MT", cursive',
            weights: [400],
            styles: ['normal']
        });
    }

    /**
     * Load animations
     */
    loadAnimations() {
        // Entrance animations
        this.animations.set('fadeIn', {
            name: 'Fade In',
            keyframes: [
                { opacity: 0 },
                { opacity: 1 }
            ],
            duration: 1000,
            easing: 'ease-in-out'
        });

        this.animations.set('slideInLeft', {
            name: 'Slide In Left',
            keyframes: [
                { transform: 'translateX(-100%)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ],
            duration: 800,
            easing: 'ease-out'
        });

        this.animations.set('slideInRight', {
            name: 'Slide In Right',
            keyframes: [
                { transform: 'translateX(100%)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ],
            duration: 800,
            easing: 'ease-out'
        });

        this.animations.set('slideInTop', {
            name: 'Slide In Top',
            keyframes: [
                { transform: 'translateY(-100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            duration: 800,
            easing: 'ease-out'
        });

        this.animations.set('slideInBottom', {
            name: 'Slide In Bottom',
            keyframes: [
                { transform: 'translateY(100%)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ],
            duration: 800,
            easing: 'ease-out'
        });

        this.animations.set('zoomIn', {
            name: 'Zoom In',
            keyframes: [
                { transform: 'scale(0)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ],
            duration: 600,
            easing: 'ease-out'
        });

        this.animations.set('rotateIn', {
            name: 'Rotate In',
            keyframes: [
                { transform: 'rotate(-180deg) scale(0)', opacity: 0 },
                { transform: 'rotate(0) scale(1)', opacity: 1 }
            ],
            duration: 1000,
            easing: 'ease-out'
        });

        this.animations.set('bounceIn', {
            name: 'Bounce In',
            keyframes: [
                { transform: 'scale(0)', opacity: 0 },
                { transform: 'scale(1.2)', opacity: 0.8 },
                { transform: 'scale(0.9)', opacity: 0.9 },
                { transform: 'scale(1.05)', opacity: 0.95 },
                { transform: 'scale(1)', opacity: 1 }
            ],
            duration: 1200,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });

        this.animations.set('elasticIn', {
            name: 'Elastic In',
            keyframes: [
                { transform: 'scale(0)', opacity: 0 },
                { transform: 'scale(1.1)', opacity: 0.7 },
                { transform: 'scale(0.95)', opacity: 0.85 },
                { transform: 'scale(1.02)', opacity: 0.95 },
                { transform: 'scale(1)', opacity: 1 }
            ],
            duration: 1500,
            easing: 'elastic'
        });

        // Loop animations
        this.animations.set('pulse', {
            name: 'Pulse',
            keyframes: [
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ],
            duration: 2000,
            easing: 'ease-in-out',
            iterations: 'infinite'
        });

        this.animations.set('rotate', {
            name: 'Rotate',
            keyframes: [
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(360deg)' }
            ],
            duration: 3000,
            easing: 'linear',
            iterations: 'infinite'
        });

        this.animations.set('shake', {
            name: 'Shake',
            keyframes: [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ],
            duration: 500,
            easing: 'ease-in-out',
            iterations: 1
        });

        // Morphing animations
        this.animations.set('morph', {
            name: 'Morph',
            keyframes: [
                { borderRadius: '0%' },
                { borderRadius: '50%' },
                { borderRadius: '0%' }
            ],
            duration: 2000,
            easing: 'ease-in-out',
            iterations: 'infinite'
        });
    }

    /**
     * Load filters
     */
    loadFilters() {
        this.filters.set('blur', {
            name: 'Blur',
            css: 'blur(5px)',
            svg: `<filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
            </filter>`
        });

        this.filters.set('brightness', {
            name: 'Brightness',
            css: 'brightness(1.5)',
            svg: `<filter id="brightness">
                <feComponentTransfer>
                    <feFuncR type="linear" slope="1.5"/>
                    <feFuncG type="linear" slope="1.5"/>
                    <feFuncB type="linear" slope="1.5"/>
                </feComponentTransfer>
            </filter>`
        });

        this.filters.set('contrast', {
            name: 'Contrast',
            css: 'contrast(2)',
            svg: `<filter id="contrast">
                <feComponentTransfer>
                    <feFuncR type="linear" slope="2" intercept="-0.5"/>
                    <feFuncG type="linear" slope="2" intercept="-0.5"/>
                    <feFuncB type="linear" slope="2" intercept="-0.5"/>
                </feComponentTransfer>
            </filter>`
        });

        this.filters.set('grayscale', {
            name: 'Grayscale',
            css: 'grayscale(100%)',
            svg: `<filter id="grayscale">
                <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0
                                                     0.3333 0.3333 0.3333 0 0
                                                     0.3333 0.3333 0.3333 0 0
                                                     0 0 0 1 0"/>
            </filter>`
        });

        this.filters.set('sepia', {
            name: 'Sepia',
            css: 'sepia(100%)',
            svg: `<filter id="sepia">
                <feColorMatrix type="matrix" values="0.393 0.769 0.189 0 0
                                                     0.349 0.686 0.168 0 0
                                                     0.272 0.534 0.131 0 0
                                                     0 0 0 1 0"/>
            </filter>`
        });

        this.filters.set('invert', {
            name: 'Invert',
            css: 'invert(100%)',
            svg: `<filter id="invert">
                <feComponentTransfer>
                    <feFuncR type="table" tableValues="1 0"/>
                    <feFuncG type="table" tableValues="1 0"/>
                    <feFuncB type="table" tableValues="1 0"/>
                </feComponentTransfer>
            </filter>`
        });

        this.filters.set('hueRotate', {
            name: 'Hue Rotate',
            css: 'hue-rotate(90deg)',
            svg: `<filter id="hueRotate">
                <feColorMatrix type="hueRotate" values="90"/>
            </filter>`
        });

        this.filters.set('saturate', {
            name: 'Saturate',
            css: 'saturate(2)',
            svg: `<filter id="saturate">
                <feColorMatrix type="saturate" values="2"/>
            </filter>`
        });

        this.filters.set('dropShadow', {
            name: 'Drop Shadow',
            css: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))',
            svg: `<filter id="dropShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="5" dy="5" result="offsetblur"/>
                <feFlood flood-color="#000000" flood-opacity="0.5"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>`
        });
    }

    /**
     * Load gradients
     */
    loadGradients() {
        // Linear gradients
        this.gradients.set('sunset', {
            name: 'Sunset',
            type: 'linear',
            angle: 45,
            stops: [
                { offset: 0, color: '#FF512F' },
                { offset: 100, color: '#DD2476' }
            ]
        });

        this.gradients.set('ocean', {
            name: 'Ocean',
            type: 'linear',
            angle: 90,
            stops: [
                { offset: 0, color: '#2E3192' },
                { offset: 100, color: '#1BFFFF' }
            ]
        });

        this.gradients.set('forest', {
            name: 'Forest',
            type: 'linear',
            angle: 135,
            stops: [
                { offset: 0, color: '#134E5E' },
                { offset: 100, color: '#71B280' }
            ]
        });

        this.gradients.set('fire', {
            name: 'Fire',
            type: 'linear',
            angle: 0,
            stops: [
                { offset: 0, color: '#F00000' },
                { offset: 50, color: '#FF8C00' },
                { offset: 100, color: '#FFD700' }
            ]
        });

        this.gradients.set('aurora', {
            name: 'Aurora',
            type: 'linear',
            angle: 180,
            stops: [
                { offset: 0, color: '#00C9FF' },
                { offset: 100, color: '#92FE9D' }
            ]
        });

        // Radial gradients
        this.gradients.set('spotlight', {
            name: 'Spotlight',
            type: 'radial',
            centerX: 50,
            centerY: 50,
            radius: 50,
            stops: [
                { offset: 0, color: '#FFFFFF' },
                { offset: 100, color: '#000000' }
            ]
        });

        this.gradients.set('halo', {
            name: 'Halo',
            type: 'radial',
            centerX: 50,
            centerY: 50,
            radius: 70,
            stops: [
                { offset: 0, color: 'rgba(255, 255, 255, 1)' },
                { offset: 50, color: 'rgba(255, 255, 255, 0.5)' },
                { offset: 100, color: 'rgba(255, 255, 255, 0)' }
            ]
        });

        // Conic gradients
        this.gradients.set('rainbow', {
            name: 'Rainbow',
            type: 'conic',
            angle: 0,
            centerX: 50,
            centerY: 50,
            stops: [
                { offset: 0, color: '#FF0000' },
                { offset: 17, color: '#FF8C00' },
                { offset: 33, color: '#FFD700' },
                { offset: 50, color: '#00FF00' },
                { offset: 67, color: '#00CED1' },
                { offset: 83, color: '#0000FF' },
                { offset: 100, color: '#9400D3' }
            ]
        });
    }

    /**
     * Load patterns
     */
    loadPatterns() {
        this.patterns.set('dots', {
            name: 'Dots',
            svg: `<pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3"/>
            </pattern>`
        });

        this.patterns.set('lines', {
            name: 'Lines',
            svg: `<pattern id="lines" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            </pattern>`
        });

        this.patterns.set('grid', {
            name: 'Grid',
            svg: `<pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" stroke-width="1" opacity="0.2"/>
                <line x1="0" y1="0" x2="20" y2="0" stroke="currentColor" stroke-width="1" opacity="0.2"/>
            </pattern>`
        });

        this.patterns.set('crosshatch', {
            name: 'Crosshatch',
            svg: `<pattern id="crosshatch" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1" opacity="0.3"/>
                <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            </pattern>`
        });

        this.patterns.set('waves', {
            name: 'Waves',
            svg: `<pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0,10 Q10,0 20,10 T40,10" stroke="currentColor" fill="none" stroke-width="2" opacity="0.3"/>
            </pattern>`
        });

        this.patterns.set('zigzag', {
            name: 'Zigzag',
            svg: `<pattern id="zigzag" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                <path d="M0,5 L5,0 L10,5 L15,0 L20,5" stroke="currentColor" fill="none" stroke-width="1" opacity="0.3"/>
            </pattern>`
        });

        this.patterns.set('hexagon', {
            name: 'Hexagon',
            svg: `<pattern id="hexagon" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
                <polygon points="15,1 27,7.5 27,18.5 15,25 3,18.5 3,7.5" 
                         fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
            </pattern>`
        });
    }

    /**
     * Load shadow effects
     */
    loadShadows() {
        this.shadows.set('subtle', {
            name: 'Subtle',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        });

        this.shadows.set('medium', {
            name: 'Medium',
            boxShadow: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        });

        this.shadows.set('strong', {
            name: 'Strong',
            boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)'
        });

        this.shadows.set('floating', {
            name: 'Floating',
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
            textShadow: '4px 4px 8px rgba(0,0,0,0.4)'
        });

        this.shadows.set('inset', {
            name: 'Inset',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            textShadow: 'none'
        });

        this.shadows.set('neumorphism', {
            name: 'Neumorphism',
            boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
            textShadow: 'none'
        });

        this.shadows.set('glassmorphism', {
            name: 'Glassmorphism',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
            backdrop: 'blur(4px)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
        });
    }

    /**
     * Load glow effects
     */
    loadGlowEffects() {
        this.glowEffects.set('soft', {
            name: 'Soft Glow',
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
            boxShadow: '0 0 20px rgba(255,255,255,0.5)',
            textShadow: '0 0 10px rgba(255,255,255,0.5)'
        });

        this.glowEffects.set('neon', {
            name: 'Neon Glow',
            filter: 'drop-shadow(0 0 20px currentColor)',
            boxShadow: '0 0 40px currentColor, 0 0 80px currentColor',
            textShadow: '0 0 20px currentColor, 0 0 40px currentColor'
        });

        this.glowEffects.set('pulse', {
            name: 'Pulse Glow',
            animation: 'pulse-glow 2s infinite',
            keyframes: `@keyframes pulse-glow {
                0% { box-shadow: 0 0 20px rgba(255,255,255,0.5); }
                50% { box-shadow: 0 0 40px rgba(255,255,255,0.8); }
                100% { box-shadow: 0 0 20px rgba(255,255,255,0.5); }
            }`
        });

        this.glowEffects.set('rainbow', {
            name: 'Rainbow Glow',
            animation: 'rainbow-glow 3s linear infinite',
            keyframes: `@keyframes rainbow-glow {
                0% { box-shadow: 0 0 30px #ff0000; }
                17% { box-shadow: 0 0 30px #ff8c00; }
                33% { box-shadow: 0 0 30px #ffd700; }
                50% { box-shadow: 0 0 30px #00ff00; }
                67% { box-shadow: 0 0 30px #00ced1; }
                83% { box-shadow: 0 0 30px #0000ff; }
                100% { box-shadow: 0 0 30px #ff0000; }
            }`
        });
    }

    /**
     * Setup customization UI
     */
    setupCustomizationUI() {
        // This would set up event listeners and UI controls
        console.log('Customization UI setup complete');
    }

    /**
     * Apply preset to chart
     */
    applyPreset(chartInstance, presetName) {
        const preset = this.presets.get(presetName);
        if (!preset) return false;

        const option = {
            color: preset.config.colors,
            backgroundColor: preset.config.background,
            textStyle: {
                fontFamily: preset.config.fonts.labels
            },
            title: {
                textStyle: {
                    fontFamily: preset.config.fonts.title
                }
            },
            grid: {
                show: preset.config.gridLines,
                borderColor: preset.config.gridColor,
                borderWidth: 1
            },
            animation: preset.config.animation.enabled,
            animationDuration: preset.config.animation.duration,
            animationEasing: preset.config.animation.easing
        };

        chartInstance.setOption(option);
        this.activeCustomizations.set(chartInstance.id, preset);

        return true;
    }

    /**
     * Apply color scheme to chart
     */
    applyColorScheme(chartInstance, schemeName) {
        const scheme = this.colorSchemes.get(schemeName);
        if (!scheme) return false;

        const colors = [
            ...scheme.primary,
            ...scheme.secondary,
            ...scheme.accent
        ];

        chartInstance.setOption({
            color: colors
        });

        return true;
    }

    /**
     * Apply animation to element
     */
    applyAnimation(element, animationName, options = {}) {
        const animation = this.animations.get(animationName);
        if (!animation) return false;

        const {
            duration = animation.duration,
            easing = animation.easing,
            delay = 0,
            iterations = animation.iterations || 1,
            direction = 'normal',
            fillMode = 'both'
        } = options;

        // Create animation
        const keyframes = animation.keyframes;
        const animationOptions = {
            duration,
            easing,
            delay,
            iterations: iterations === 'infinite' ? Infinity : iterations,
            direction,
            fill: fillMode
        };

        // Apply animation
        const animationInstance = element.animate(keyframes, animationOptions);

        return animationInstance;
    }

    /**
     * Apply filter to element
     */
    applyFilter(element, filterName, intensity = 1) {
        const filter = this.filters.get(filterName);
        if (!filter) return false;

        // Adjust filter intensity
        let cssFilter = filter.css;
        if (intensity !== 1) {
            // Parse and adjust filter value
            cssFilter = this.adjustFilterIntensity(cssFilter, intensity);
        }

        element.style.filter = cssFilter;
        return true;
    }

    /**
     * Adjust filter intensity
     */
    adjustFilterIntensity(filterString, intensity) {
        // Parse filter function and value
        const match = filterString.match(/(\w+)\(([\d.]+)(%|px|deg)?\)/);
        if (!match) return filterString;

        const [, func, value, unit] = match;
        const adjustedValue = parseFloat(value) * intensity;

        return `${func}(${adjustedValue}${unit || ''})`;
    }

    /**
     * Apply gradient to element
     */
    applyGradient(element, gradientName) {
        const gradient = this.gradients.get(gradientName);
        if (!gradient) return false;

        let cssGradient;

        if (gradient.type === 'linear') {
            const stops = gradient.stops.map(s => `${s.color} ${s.offset}%`).join(', ');
            cssGradient = `linear-gradient(${gradient.angle}deg, ${stops})`;
        } else if (gradient.type === 'radial') {
            const stops = gradient.stops.map(s => `${s.color} ${s.offset}%`).join(', ');
            cssGradient = `radial-gradient(circle at ${gradient.centerX}% ${gradient.centerY}%, ${stops})`;
        } else if (gradient.type === 'conic') {
            const stops = gradient.stops.map(s => `${s.color} ${s.offset}%`).join(', ');
            cssGradient = `conic-gradient(from ${gradient.angle}deg at ${gradient.centerX}% ${gradient.centerY}%, ${stops})`;
        }

        element.style.background = cssGradient;
        return true;
    }

    /**
     * Apply pattern to element
     */
    applyPattern(element, patternName, color = '#000000') {
        const pattern = this.patterns.get(patternName);
        if (!pattern) return false;

        // Create SVG with pattern
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.innerHTML = pattern.svg.replace(/currentColor/g, color);

        // Convert to data URL
        const svgString = new XMLSerializer().serializeToString(svg);
        const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

        element.style.backgroundImage = `url(${dataUrl})`;
        return true;
    }

    /**
     * Apply shadow to element
     */
    applyShadow(element, shadowName) {
        const shadow = this.shadows.get(shadowName);
        if (!shadow) return false;

        element.style.boxShadow = shadow.boxShadow;

        if (shadow.backdrop) {
            element.style.backdropFilter = shadow.backdrop;
        }

        if (shadow.border) {
            element.style.border = shadow.border;
        }

        return true;
    }

    /**
     * Apply glow effect to element
     */
    applyGlow(element, glowName, color = '#ffffff') {
        const glow = this.glowEffects.get(glowName);
        if (!glow) return false;

        if (glow.filter) {
            element.style.filter = glow.filter.replace(/currentColor/g, color);
        }

        if (glow.boxShadow) {
            element.style.boxShadow = glow.boxShadow.replace(/currentColor/g, color);
        }

        if (glow.animation) {
            // Add keyframes if needed
            if (glow.keyframes && !document.querySelector(`style[data-glow="${glowName}"]`)) {
                const style = document.createElement('style');
                style.setAttribute('data-glow', glowName);
                style.textContent = glow.keyframes;
                document.head.appendChild(style);
            }

            element.style.animation = glow.animation;
        }

        return true;
    }

    /**
     * Create custom color palette
     */
    createCustomPalette(baseColor, count = 10, method = 'monochromatic') {
        const palette = [];

        switch (method) {
            case 'monochromatic':
                return this.generateMonochromatic(baseColor).slice(0, count);
            case 'complementary':
                return Object.values(this.generateComplementary(baseColor))
                    .flat()
                    .slice(0, count);
            case 'triadic':
                return Object.values(this.generateTriadic(baseColor))
                    .flat()
                    .slice(0, count);
            case 'analogous':
                return Object.values(this.generateAnalogous(baseColor))
                    .flat()
                    .slice(0, count);
            default:
                return [baseColor];
        }
    }

    /**
     * Mix two colors
     */
    mixColors(color1, color2, ratio = 0.5) {
        const rgb1 = this.hexToRGB(color1);
        const rgb2 = this.hexToRGB(color2);

        const mixed = {
            r: Math.round(rgb1.r * (1 - ratio) + rgb2.r * ratio),
            g: Math.round(rgb1.g * (1 - ratio) + rgb2.g * ratio),
            b: Math.round(rgb1.b * (1 - ratio) + rgb2.b * ratio)
        };

        return this.rgbToHex(mixed.r, mixed.g, mixed.b);
    }

    /**
     * Convert hex to RGB
     */
    hexToRGB(hex) {
        return {
            r: parseInt(hex.slice(1, 3), 16),
            g: parseInt(hex.slice(3, 5), 16),
            b: parseInt(hex.slice(5, 7), 16)
        };
    }

    /**
     * Convert RGB to hex
     */
    rgbToHex(r, g, b) {
        const toHex = n => {
            const hex = Math.round(n).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    /**
     * Get contrast ratio between two colors
     */
    getContrastRatio(color1, color2) {
        const lum1 = this.getRelativeLuminance(color1);
        const lum2 = this.getRelativeLuminance(color2);

        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * Get relative luminance of color
     */
    getRelativeLuminance(hex) {
        const rgb = this.hexToRGB(hex);

        const sRGB = [rgb.r / 255, rgb.g / 255, rgb.b / 255];
        const linear = sRGB.map(val => {
            if (val <= 0.03928) {
                return val / 12.92;
            }
            return Math.pow((val + 0.055) / 1.055, 2.4);
        });

        return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    }

    /**
     * Get accessible color
     */
    getAccessibleColor(backgroundColor, minContrast = 4.5) {
        const isDark = this.getRelativeLuminance(backgroundColor) < 0.5;
        let textColor = isDark ? '#FFFFFF' : '#000000';

        const contrast = this.getContrastRatio(backgroundColor, textColor);
        
        if (contrast < minContrast) {
            // Adjust color to meet contrast requirements
            const hsl = this.hexToHSL(textColor);
            const step = isDark ? 10 : -10;
            
            while (this.getContrastRatio(backgroundColor, textColor) < minContrast) {
                hsl.l += step;
                if (hsl.l > 100 || hsl.l < 0) break;
                textColor = this.hslToHex(hsl.h, hsl.s, hsl.l);
            }
        }

        return textColor;
    }

    /**
     * Export customization settings
     */
    exportSettings() {
        const settings = {
            presets: Array.from(this.presets.entries()),
            colorSchemes: Array.from(this.colorSchemes.entries()),
            activeCustomizations: Array.from(this.activeCustomizations.entries()),
            timestamp: new Date().toISOString()
        };

        return JSON.stringify(settings, null, 2);
    }

    /**
     * Import customization settings
     */
    importSettings(settingsJSON) {
        try {
            const settings = JSON.parse(settingsJSON);

            if (settings.presets) {
                settings.presets.forEach(([key, value]) => {
                    this.presets.set(key, value);
                });
            }

            if (settings.colorSchemes) {
                settings.colorSchemes.forEach(([key, value]) => {
                    this.colorSchemes.set(key, value);
                });
            }

            return true;
        } catch (error) {
            console.error('Failed to import settings:', error);
            return false;
        }
    }

    /**
     * Reset to defaults
     */
    resetToDefaults() {
        this.activeCustomizations.clear();
        this.initializeCustomization();
        return true;
    }
}

// Export CustomizationManager
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CustomizationManager;
} else {
    window.CustomizationManager = CustomizationManager;
}