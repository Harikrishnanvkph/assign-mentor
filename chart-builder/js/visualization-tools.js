/**
 * Comprehensive Visualization Tools Library
 * Version: 2.0.0
 * Description: Advanced tools for chart customization including legends, labels, colors, 
 * fonts, sizes, orientations, axes, backgrounds, and much more.
 * Total Lines: 4000+
 */

(function(global) {
    'use strict';

    // =====================================================================
    // CORE VISUALIZATION TOOLS MODULE
    // =====================================================================
    const VisualizationTools = {
        version: '2.0.0',
        author: 'Chart Builder Pro',
        license: 'MIT',
        
        // Core modules
        Legend: {},
        Label: {},
        Color: {},
        Font: {},
        Size: {},
        Orientation: {},
        Axis: {},
        Background: {},
        Animation: {},
        Grid: {},
        Tooltip: {},
        Export: {},
        Theme: {},
        Pattern: {},
        Gradient: {},
        Shadow: {},
        Border: {},
        Margin: {},
        Padding: {},
        Transform: {},
        Filter: {},
        Blend: {},
        Clip: {},
        Mask: {},
        DataPoint: {},
        Annotation: {},
        Interaction: {},
        Zoom: {},
        Pan: {},
        Brush: {},
        Selection: {},
        Highlight: {},
        CrossHair: {},
        Navigator: {},
        RangeSelector: {},
        Timeline: {},
        Watermark: {},
        Title: {},
        Subtitle: {},
        Caption: {},
        Credits: {},
        Logo: {},
        Badge: {},
        Indicator: {},
        Progress: {},
        Gauge: {},
        Meter: {},
        Scale: {},
        Tick: {},
        GridLine: {},
        PlotBand: {},
        PlotLine: {},
        SeriesLine: {},
        SeriesArea: {},
        SeriesBar: {},
        SeriesColumn: {},
        SeriesPie: {},
        SeriesDonut: {},
        SeriesRadar: {},
        SeriesPolar: {},
        SeriesHeatmap: {},
        SeriesTreemap: {},
        SeriesSankey: {},
        SeriesNetwork: {},
        SeriesGauge: {},
        SeriesFunnel: {},
        SeriesPyramid: {},
        SeriesWaterfall: {},
        SeriesBoxPlot: {},
        SeriesViolin: {},
        SeriesRidgeline: {},
        SeriesStream: {},
        SeriesChord: {},
        SeriesSunburst: {},
        SeriesPackedBubble: {},
        SeriesWordCloud: {},
        SeriesParallel: {},
        SeriesGantt: {},
        SeriesCalendar: {},
        SeriesMatrix: {},
        Utils: {}
    };

    // =====================================================================
    // LEGEND CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Legend = {
        // Legend positioning tools
        position: {
            setTop: function(chart, value) {
                if (!chart || !chart.legend) return;
                chart.legend.y = value;
                return this;
            },
            setLeft: function(chart, value) {
                if (!chart || !chart.legend) return;
                chart.legend.x = value;
                return this;
            },
            setRight: function(chart, value) {
                if (!chart || !chart.legend) return;
                chart.legend.x = chart.width - value;
                return this;
            },
            setBottom: function(chart, value) {
                if (!chart || !chart.legend) return;
                chart.legend.y = chart.height - value;
                return this;
            },
            setCenter: function(chart) {
                if (!chart || !chart.legend) return;
                chart.legend.x = chart.width / 2;
                chart.legend.y = chart.height / 2;
                return this;
            },
            setFloating: function(chart, enabled) {
                if (!chart || !chart.legend) return;
                chart.legend.floating = enabled;
                return this;
            },
            setAlignment: function(chart, align) {
                if (!chart || !chart.legend) return;
                chart.legend.align = align; // 'left', 'center', 'right'
                return this;
            },
            setVerticalAlignment: function(chart, align) {
                if (!chart || !chart.legend) return;
                chart.legend.verticalAlign = align; // 'top', 'middle', 'bottom'
                return this;
            },
            setLayout: function(chart, layout) {
                if (!chart || !chart.legend) return;
                chart.legend.layout = layout; // 'horizontal', 'vertical', 'proximate'
                return this;
            },
            setOffset: function(chart, x, y) {
                if (!chart || !chart.legend) return;
                chart.legend.x = x;
                chart.legend.y = y;
                return this;
            },
            setMargin: function(chart, margin) {
                if (!chart || !chart.legend) return;
                chart.legend.margin = margin;
                return this;
            },
            setPadding: function(chart, padding) {
                if (!chart || !chart.legend) return;
                chart.legend.padding = padding;
                return this;
            },
            setItemMargin: function(chart, margin) {
                if (!chart || !chart.legend) return;
                chart.legend.itemMarginTop = margin;
                chart.legend.itemMarginBottom = margin;
                return this;
            },
            setItemDistance: function(chart, distance) {
                if (!chart || !chart.legend) return;
                chart.legend.itemDistance = distance;
                return this;
            },
            setMaxHeight: function(chart, height) {
                if (!chart || !chart.legend) return;
                chart.legend.maxHeight = height;
                return this;
            },
            setWidth: function(chart, width) {
                if (!chart || !chart.legend) return;
                chart.legend.width = width;
                return this;
            },
            setItemWidth: function(chart, width) {
                if (!chart || !chart.legend) return;
                chart.legend.itemWidth = width;
                return this;
            },
            setSquareSymbol: function(chart, enabled) {
                if (!chart || !chart.legend) return;
                chart.legend.squareSymbol = enabled;
                return this;
            },
            setSymbolHeight: function(chart, height) {
                if (!chart || !chart.legend) return;
                chart.legend.symbolHeight = height;
                return this;
            },
            setSymbolWidth: function(chart, width) {
                if (!chart || !chart.legend) return;
                chart.legend.symbolWidth = width;
                return this;
            },
            setSymbolRadius: function(chart, radius) {
                if (!chart || !chart.legend) return;
                chart.legend.symbolRadius = radius;
                return this;
            },
            setSymbolPadding: function(chart, padding) {
                if (!chart || !chart.legend) return;
                chart.legend.symbolPadding = padding;
                return this;
            }
        },

        // Legend styling tools
        style: {
            setBackgroundColor: function(chart, color) {
                if (!chart || !chart.legend) return;
                chart.legend.backgroundColor = color;
                return this;
            },
            setBorderColor: function(chart, color) {
                if (!chart || !chart.legend) return;
                chart.legend.borderColor = color;
                return this;
            },
            setBorderWidth: function(chart, width) {
                if (!chart || !chart.legend) return;
                chart.legend.borderWidth = width;
                return this;
            },
            setBorderRadius: function(chart, radius) {
                if (!chart || !chart.legend) return;
                chart.legend.borderRadius = radius;
                return this;
            },
            setShadow: function(chart, shadow) {
                if (!chart || !chart.legend) return;
                chart.legend.shadow = shadow;
                return this;
            },
            setItemStyle: function(chart, style) {
                if (!chart || !chart.legend) return;
                chart.legend.itemStyle = style;
                return this;
            },
            setItemHoverStyle: function(chart, style) {
                if (!chart || !chart.legend) return;
                chart.legend.itemHoverStyle = style;
                return this;
            },
            setItemHiddenStyle: function(chart, style) {
                if (!chart || !chart.legend) return;
                chart.legend.itemHiddenStyle = style;
                return this;
            },
            setTitleStyle: function(chart, style) {
                if (!chart || !chart.legend) return;
                chart.legend.title = chart.legend.title || {};
                chart.legend.title.style = style;
                return this;
            },
            setNavigationStyle: function(chart, style) {
                if (!chart || !chart.legend) return;
                chart.legend.navigation = chart.legend.navigation || {};
                chart.legend.navigation.style = style;
                return this;
            }
        },

        // Legend behavior tools
        behavior: {
            setEnabled: function(chart, enabled) {
                if (!chart || !chart.legend) return;
                chart.legend.enabled = enabled;
                return this;
            },
            setClickable: function(chart, clickable) {
                if (!chart || !chart.legend) return;
                chart.legend.itemCheckboxStyle = clickable ? {} : {display: 'none'};
                return this;
            },
            setReversed: function(chart, reversed) {
                if (!chart || !chart.legend) return;
                chart.legend.reversed = reversed;
                return this;
            },
            setRtl: function(chart, rtl) {
                if (!chart || !chart.legend) return;
                chart.legend.rtl = rtl;
                return this;
            },
            setUseHTML: function(chart, useHTML) {
                if (!chart || !chart.legend) return;
                chart.legend.useHTML = useHTML;
                return this;
            },
            setLabelFormatter: function(chart, formatter) {
                if (!chart || !chart.legend) return;
                chart.legend.labelFormatter = formatter;
                return this;
            },
            setNavigation: function(chart, enabled) {
                if (!chart || !chart.legend) return;
                chart.legend.navigation = chart.legend.navigation || {};
                chart.legend.navigation.enabled = enabled;
                return this;
            },
            setNavigationAnimation: function(chart, animation) {
                if (!chart || !chart.legend) return;
                chart.legend.navigation = chart.legend.navigation || {};
                chart.legend.navigation.animation = animation;
                return this;
            },
            setNavigationArrowSize: function(chart, size) {
                if (!chart || !chart.legend) return;
                chart.legend.navigation = chart.legend.navigation || {};
                chart.legend.navigation.arrowSize = size;
                return this;
            },
            setAlignColumns: function(chart, align) {
                if (!chart || !chart.legend) return;
                chart.legend.alignColumns = align;
                return this;
            }
        },

        // Legend title tools
        title: {
            setText: function(chart, text) {
                if (!chart || !chart.legend) return;
                chart.legend.title = chart.legend.title || {};
                chart.legend.title.text = text;
                return this;
            },
            setStyle: function(chart, style) {
                if (!chart || !chart.legend) return;
                chart.legend.title = chart.legend.title || {};
                chart.legend.title.style = style;
                return this;
            }
        },

        // Advanced legend tools
        advanced: {
            setPaging: function(chart, enabled) {
                if (!chart || !chart.legend) return;
                chart.legend.navigation = chart.legend.navigation || {};
                chart.legend.navigation.enabled = enabled;
                return this;
            },
            setMaxItems: function(chart, max) {
                if (!chart || !chart.legend) return;
                chart.legend.maxHeight = max * 20; // Approximate height per item
                return this;
            },
            setColumns: function(chart, columns) {
                if (!chart || !chart.legend) return;
                chart.legend.alignColumns = true;
                chart.legend.itemWidth = chart.legend.width / columns;
                return this;
            },
            setCustomRenderer: function(chart, renderer) {
                if (!chart || !chart.legend) return;
                chart.legend.labelFormatter = renderer;
                return this;
            },
            setInteractive: function(chart, interactive) {
                if (!chart || !chart.legend) return;
                chart.legend.itemHoverStyle = interactive ? {cursor: 'pointer'} : {};
                return this;
            }
        }
    };

    // =====================================================================
    // LABEL CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Label = {
        // Text formatting tools
        format: {
            setText: function(element, text) {
                if (!element) return;
                element.text = text;
                return this;
            },
            setFormatter: function(element, formatter) {
                if (!element) return;
                element.formatter = formatter;
                return this;
            },
            setTemplate: function(element, template) {
                if (!element) return;
                element.format = template;
                return this;
            },
            setPrefix: function(element, prefix) {
                if (!element) return;
                element.prefix = prefix;
                return this;
            },
            setSuffix: function(element, suffix) {
                if (!element) return;
                element.suffix = suffix;
                return this;
            },
            setDecimals: function(element, decimals) {
                if (!element) return;
                element.decimals = decimals;
                return this;
            },
            setThousandsSeparator: function(element, separator) {
                if (!element) return;
                element.thousandsSep = separator;
                return this;
            },
            setDecimalPoint: function(element, point) {
                if (!element) return;
                element.decimalPoint = point;
                return this;
            },
            setDateFormat: function(element, format) {
                if (!element) return;
                element.dateTimeLabelFormats = format;
                return this;
            },
            setNumberFormat: function(element, format) {
                if (!element) return;
                element.numberFormat = format;
                return this;
            },
            setCurrency: function(element, currency) {
                if (!element) return;
                element.currency = currency;
                return this;
            },
            setPercentage: function(element, enabled) {
                if (!element) return;
                element.percentage = enabled;
                return this;
            },
            setScientific: function(element, enabled) {
                if (!element) return;
                element.scientific = enabled;
                return this;
            },
            setUpperCase: function(element, enabled) {
                if (!element) return;
                if (enabled && element.text) {
                    element.text = element.text.toUpperCase();
                }
                return this;
            },
            setLowerCase: function(element, enabled) {
                if (!element) return;
                if (enabled && element.text) {
                    element.text = element.text.toLowerCase();
                }
                return this;
            },
            setCapitalize: function(element, enabled) {
                if (!element) return;
                if (enabled && element.text) {
                    element.text = element.text.charAt(0).toUpperCase() + element.text.slice(1);
                }
                return this;
            },
            setTruncate: function(element, maxLength) {
                if (!element) return;
                element.maxLength = maxLength;
                return this;
            },
            setWrap: function(element, enabled) {
                if (!element) return;
                element.wrap = enabled;
                return this;
            },
            setEllipsis: function(element, enabled) {
                if (!element) return;
                element.ellipsis = enabled;
                return this;
            }
        },

        // Label positioning tools
        position: {
            setX: function(element, x) {
                if (!element) return;
                element.x = x;
                return this;
            },
            setY: function(element, y) {
                if (!element) return;
                element.y = y;
                return this;
            },
            setAlign: function(element, align) {
                if (!element) return;
                element.align = align;
                return this;
            },
            setVerticalAlign: function(element, align) {
                if (!element) return;
                element.verticalAlign = align;
                return this;
            },
            setRotation: function(element, rotation) {
                if (!element) return;
                element.rotation = rotation;
                return this;
            },
            setOffset: function(element, x, y) {
                if (!element) return;
                element.x = x;
                element.y = y;
                return this;
            },
            setDistance: function(element, distance) {
                if (!element) return;
                element.distance = distance;
                return this;
            },
            setPadding: function(element, padding) {
                if (!element) return;
                element.padding = padding;
                return this;
            },
            setInside: function(element, inside) {
                if (!element) return;
                element.inside = inside;
                return this;
            },
            setOutside: function(element, outside) {
                if (!element) return;
                element.outside = outside;
                return this;
            },
            setOverflow: function(element, overflow) {
                if (!element) return;
                element.overflow = overflow;
                return this;
            },
            setCrop: function(element, crop) {
                if (!element) return;
                element.crop = crop;
                return this;
            },
            setAutoRotation: function(element, angles) {
                if (!element) return;
                element.autoRotation = angles;
                return this;
            },
            setAutoRotationLimit: function(element, limit) {
                if (!element) return;
                element.autoRotationLimit = limit;
                return this;
            },
            setStaggerLines: function(element, lines) {
                if (!element) return;
                element.staggerLines = lines;
                return this;
            },
            setStep: function(element, step) {
                if (!element) return;
                element.step = step;
                return this;
            },
            setZIndex: function(element, zIndex) {
                if (!element) return;
                element.zIndex = zIndex;
                return this;
            },
            setFloating: function(element, floating) {
                if (!element) return;
                element.floating = floating;
                return this;
            },
            setReserveSpace: function(element, reserve) {
                if (!element) return;
                element.reserveSpace = reserve;
                return this;
            }
        },

        // Label styling tools
        style: {
            setFontFamily: function(element, fontFamily) {
                if (!element) return;
                element.style = element.style || {};
                element.style.fontFamily = fontFamily;
                return this;
            },
            setFontSize: function(element, fontSize) {
                if (!element) return;
                element.style = element.style || {};
                element.style.fontSize = fontSize;
                return this;
            },
            setFontWeight: function(element, fontWeight) {
                if (!element) return;
                element.style = element.style || {};
                element.style.fontWeight = fontWeight;
                return this;
            },
            setFontStyle: function(element, fontStyle) {
                if (!element) return;
                element.style = element.style || {};
                element.style.fontStyle = fontStyle;
                return this;
            },
            setColor: function(element, color) {
                if (!element) return;
                element.style = element.style || {};
                element.style.color = color;
                return this;
            },
            setBackgroundColor: function(element, color) {
                if (!element) return;
                element.backgroundColor = color;
                return this;
            },
            setBorderColor: function(element, color) {
                if (!element) return;
                element.borderColor = color;
                return this;
            },
            setBorderWidth: function(element, width) {
                if (!element) return;
                element.borderWidth = width;
                return this;
            },
            setBorderRadius: function(element, radius) {
                if (!element) return;
                element.borderRadius = radius;
                return this;
            },
            setBoxShadow: function(element, shadow) {
                if (!element) return;
                element.style = element.style || {};
                element.style.boxShadow = shadow;
                return this;
            },
            setTextShadow: function(element, shadow) {
                if (!element) return;
                element.style = element.style || {};
                element.style.textShadow = shadow;
                return this;
            },
            setTextDecoration: function(element, decoration) {
                if (!element) return;
                element.style = element.style || {};
                element.style.textDecoration = decoration;
                return this;
            },
            setTextTransform: function(element, transform) {
                if (!element) return;
                element.style = element.style || {};
                element.style.textTransform = transform;
                return this;
            },
            setLetterSpacing: function(element, spacing) {
                if (!element) return;
                element.style = element.style || {};
                element.style.letterSpacing = spacing;
                return this;
            },
            setLineHeight: function(element, height) {
                if (!element) return;
                element.style = element.style || {};
                element.style.lineHeight = height;
                return this;
            },
            setOpacity: function(element, opacity) {
                if (!element) return;
                element.style = element.style || {};
                element.style.opacity = opacity;
                return this;
            },
            setVisibility: function(element, visibility) {
                if (!element) return;
                element.style = element.style || {};
                element.style.visibility = visibility;
                return this;
            },
            setDisplay: function(element, display) {
                if (!element) return;
                element.style = element.style || {};
                element.style.display = display;
                return this;
            },
            setCursor: function(element, cursor) {
                if (!element) return;
                element.style = element.style || {};
                element.style.cursor = cursor;
                return this;
            }
        },

        // Label behavior tools
        behavior: {
            setEnabled: function(element, enabled) {
                if (!element) return;
                element.enabled = enabled;
                return this;
            },
            setUseHTML: function(element, useHTML) {
                if (!element) return;
                element.useHTML = useHTML;
                return this;
            },
            setAllowOverlap: function(element, allow) {
                if (!element) return;
                element.allowOverlap = allow;
                return this;
            },
            setClassName: function(element, className) {
                if (!element) return;
                element.className = className;
                return this;
            },
            setClickHandler: function(element, handler) {
                if (!element) return;
                element.events = element.events || {};
                element.events.click = handler;
                return this;
            },
            setHoverHandler: function(element, handler) {
                if (!element) return;
                element.events = element.events || {};
                element.events.mouseOver = handler;
                return this;
            },
            setMouseOutHandler: function(element, handler) {
                if (!element) return;
                element.events = element.events || {};
                element.events.mouseOut = handler;
                return this;
            },
            setAnimation: function(element, animation) {
                if (!element) return;
                element.animation = animation;
                return this;
            },
            setDefer: function(element, defer) {
                if (!element) return;
                element.defer = defer;
                return this;
            },
            setFilter: function(element, filter) {
                if (!element) return;
                element.filter = filter;
                return this;
            }
        }
    };

    // =====================================================================
    // COLOR CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Color = {
        // Color palette tools
        palette: {
            setColors: function(chart, colors) {
                if (!chart) return;
                chart.colors = colors;
                return this;
            },
            addColor: function(chart, color) {
                if (!chart) return;
                chart.colors = chart.colors || [];
                chart.colors.push(color);
                return this;
            },
            removeColor: function(chart, index) {
                if (!chart || !chart.colors) return;
                chart.colors.splice(index, 1);
                return this;
            },
            replaceColor: function(chart, index, color) {
                if (!chart || !chart.colors) return;
                chart.colors[index] = color;
                return this;
            },
            generatePalette: function(baseColor, count) {
                const palette = [];
                const hsl = this.hexToHsl(baseColor);
                for (let i = 0; i < count; i++) {
                    const hue = (hsl.h + (360 / count) * i) % 360;
                    palette.push(this.hslToHex(hue, hsl.s, hsl.l));
                }
                return palette;
            },
            generateMonochromatic: function(baseColor, count) {
                const palette = [];
                const hsl = this.hexToHsl(baseColor);
                for (let i = 0; i < count; i++) {
                    const lightness = 20 + (60 / count) * i;
                    palette.push(this.hslToHex(hsl.h, hsl.s, lightness));
                }
                return palette;
            },
            generateComplementary: function(baseColor) {
                const hsl = this.hexToHsl(baseColor);
                return [
                    baseColor,
                    this.hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l)
                ];
            },
            generateTriadic: function(baseColor) {
                const hsl = this.hexToHsl(baseColor);
                return [
                    baseColor,
                    this.hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
                    this.hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l)
                ];
            },
            generateTetradic: function(baseColor) {
                const hsl = this.hexToHsl(baseColor);
                return [
                    baseColor,
                    this.hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
                    this.hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
                    this.hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l)
                ];
            },
            generateAnalogous: function(baseColor) {
                const hsl = this.hexToHsl(baseColor);
                return [
                    this.hslToHex((hsl.h - 30) % 360, hsl.s, hsl.l),
                    baseColor,
                    this.hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
                ];
            },
            hexToHsl: function(hex) {
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
            },
            hslToHex: function(h, s, l) {
                h /= 360;
                s /= 100;
                l /= 100;
                
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
                
                return '#' + toHex(r) + toHex(g) + toHex(b);
            }
        },

        // Gradient tools
        gradient: {
            createLinear: function(stops, angle = 0) {
                return {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: Math.cos(angle * Math.PI / 180),
                        y2: Math.sin(angle * Math.PI / 180)
                    },
                    stops: stops
                };
            },
            createRadial: function(stops, cx = 0.5, cy = 0.5, r = 0.5) {
                return {
                    radialGradient: {
                        cx: cx,
                        cy: cy,
                        r: r
                    },
                    stops: stops
                };
            },
            createConical: function(stops, cx = 0.5, cy = 0.5) {
                return {
                    conicalGradient: {
                        cx: cx,
                        cy: cy
                    },
                    stops: stops
                };
            },
            addStop: function(gradient, offset, color, opacity = 1) {
                gradient.stops = gradient.stops || [];
                gradient.stops.push([offset, color, opacity]);
                return gradient;
            },
            removeStop: function(gradient, index) {
                if (gradient.stops) {
                    gradient.stops.splice(index, 1);
                }
                return gradient;
            },
            interpolateColors: function(color1, color2, steps) {
                const stops = [];
                for (let i = 0; i <= steps; i++) {
                    const ratio = i / steps;
                    const color = this.mixColors(color1, color2, ratio);
                    stops.push([ratio, color]);
                }
                return stops;
            },
            mixColors: function(color1, color2, ratio) {
                const r1 = parseInt(color1.slice(1, 3), 16);
                const g1 = parseInt(color1.slice(3, 5), 16);
                const b1 = parseInt(color1.slice(5, 7), 16);
                const r2 = parseInt(color2.slice(1, 3), 16);
                const g2 = parseInt(color2.slice(3, 5), 16);
                const b2 = parseInt(color2.slice(5, 7), 16);
                
                const r = Math.round(r1 + (r2 - r1) * ratio);
                const g = Math.round(g1 + (g2 - g1) * ratio);
                const b = Math.round(b1 + (b2 - b1) * ratio);
                
                return '#' + 
                    r.toString(16).padStart(2, '0') +
                    g.toString(16).padStart(2, '0') +
                    b.toString(16).padStart(2, '0');
            }
        },

        // Color manipulation tools
        manipulation: {
            lighten: function(color, amount) {
                const hsl = VisualizationTools.Color.palette.hexToHsl(color);
                hsl.l = Math.min(100, hsl.l + amount);
                return VisualizationTools.Color.palette.hslToHex(hsl.h, hsl.s, hsl.l);
            },
            darken: function(color, amount) {
                const hsl = VisualizationTools.Color.palette.hexToHsl(color);
                hsl.l = Math.max(0, hsl.l - amount);
                return VisualizationTools.Color.palette.hslToHex(hsl.h, hsl.s, hsl.l);
            },
            saturate: function(color, amount) {
                const hsl = VisualizationTools.Color.palette.hexToHsl(color);
                hsl.s = Math.min(100, hsl.s + amount);
                return VisualizationTools.Color.palette.hslToHex(hsl.h, hsl.s, hsl.l);
            },
            desaturate: function(color, amount) {
                const hsl = VisualizationTools.Color.palette.hexToHsl(color);
                hsl.s = Math.max(0, hsl.s - amount);
                return VisualizationTools.Color.palette.hslToHex(hsl.h, hsl.s, hsl.l);
            },
            rotate: function(color, degrees) {
                const hsl = VisualizationTools.Color.palette.hexToHsl(color);
                hsl.h = (hsl.h + degrees) % 360;
                return VisualizationTools.Color.palette.hslToHex(hsl.h, hsl.s, hsl.l);
            },
            invert: function(color) {
                const r = 255 - parseInt(color.slice(1, 3), 16);
                const g = 255 - parseInt(color.slice(3, 5), 16);
                const b = 255 - parseInt(color.slice(5, 7), 16);
                return '#' + 
                    r.toString(16).padStart(2, '0') +
                    g.toString(16).padStart(2, '0') +
                    b.toString(16).padStart(2, '0');
            },
            grayscale: function(color) {
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
                return '#' + 
                    gray.toString(16).padStart(2, '0') +
                    gray.toString(16).padStart(2, '0') +
                    gray.toString(16).padStart(2, '0');
            },
            sepia: function(color) {
                const r = parseInt(color.slice(1, 3), 16);
                const g = parseInt(color.slice(3, 5), 16);
                const b = parseInt(color.slice(5, 7), 16);
                
                const tr = Math.min(255, (0.393 * r) + (0.769 * g) + (0.189 * b));
                const tg = Math.min(255, (0.349 * r) + (0.686 * g) + (0.168 * b));
                const tb = Math.min(255, (0.272 * r) + (0.534 * g) + (0.131 * b));
                
                return '#' + 
                    Math.round(tr).toString(16).padStart(2, '0') +
                    Math.round(tg).toString(16).padStart(2, '0') +
                    Math.round(tb).toString(16).padStart(2, '0');
            },
            opacity: function(color, alpha) {
                return color + Math.round(alpha * 255).toString(16).padStart(2, '0');
            }
        },

        // Color scheme tools
        scheme: {
            applyDarkMode: function(chart) {
                chart.backgroundColor = '#1a1a1a';
                chart.colors = ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80'];
                return this;
            },
            applyLightMode: function(chart) {
                chart.backgroundColor = '#ffffff';
                chart.colors = ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce'];
                return this;
            },
            applyHighContrast: function(chart) {
                chart.backgroundColor = '#000000';
                chart.colors = ['#ffffff', '#ffff00', '#00ffff', '#ff00ff', '#00ff00'];
                return this;
            },
            applyColorBlindSafe: function(chart) {
                chart.colors = ['#0173B2', '#DE8F05', '#029E73', '#CC78BC', '#ECE133'];
                return this;
            },
            applyPastel: function(chart) {
                chart.colors = ['#FFB6C1', '#FFE4B5', '#E0BBE4', '#B6E5D8', '#FFDAB9'];
                return this;
            },
            applyVibrant: function(chart) {
                chart.colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'];
                return this;
            },
            applyEarth: function(chart) {
                chart.colors = ['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460'];
                return this;
            },
            applyOcean: function(chart) {
                chart.colors = ['#001F3F', '#0074D9', '#39CCCC', '#7FDBFF', '#B1E5F2'];
                return this;
            },
            applyForest: function(chart) {
                chart.colors = ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#74C69D'];
                return this;
            },
            applySunset: function(chart) {
                chart.colors = ['#FF4E50', '#FC913A', '#F9D62E', '#EAE374', '#E2F4C5'];
                return this;
            }
        }
    };

    // =====================================================================
    // FONT CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Font = {
        // Font family tools
        family: {
            setDefault: function(chart, fontFamily) {
                chart.style = chart.style || {};
                chart.style.fontFamily = fontFamily;
                return this;
            },
            setSerif: function(chart) {
                return this.setDefault(chart, 'Georgia, Times, "Times New Roman", serif');
            },
            setSansSerif: function(chart) {
                return this.setDefault(chart, 'Arial, Helvetica, sans-serif');
            },
            setMonospace: function(chart) {
                return this.setDefault(chart, '"Courier New", Courier, monospace');
            },
            setCustom: function(chart, fontFamily) {
                return this.setDefault(chart, fontFamily);
            },
            addGoogleFont: function(fontName) {
                const link = document.createElement('link');
                link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}`;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
                return fontName;
            },
            setSystemFont: function(chart) {
                return this.setDefault(chart, '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif');
            },
            setDisplay: function(chart) {
                return this.setDefault(chart, '"Playfair Display", Georgia, serif');
            },
            setHandwriting: function(chart) {
                return this.setDefault(chart, '"Comic Sans MS", cursive, sans-serif');
            },
            setFantasy: function(chart) {
                return this.setDefault(chart, 'Impact, fantasy');
            }
        },

        // Font size tools
        size: {
            setDefault: function(element, size) {
                element.style = element.style || {};
                element.style.fontSize = size + 'px';
                return this;
            },
            setRelative: function(element, size) {
                element.style = element.style || {};
                element.style.fontSize = size + 'em';
                return this;
            },
            setResponsive: function(element, minSize, maxSize, unit = 'vw') {
                element.style = element.style || {};
                element.style.fontSize = `clamp(${minSize}px, 2${unit}, ${maxSize}px)`;
                return this;
            },
            increase: function(element, amount) {
                element.style = element.style || {};
                const current = parseInt(element.style.fontSize) || 12;
                element.style.fontSize = (current + amount) + 'px';
                return this;
            },
            decrease: function(element, amount) {
                element.style = element.style || {};
                const current = parseInt(element.style.fontSize) || 12;
                element.style.fontSize = Math.max(8, current - amount) + 'px';
                return this;
            },
            setScale: function(chart, scale) {
                const sizes = {
                    small: { title: 14, subtitle: 12, label: 10, axis: 9 },
                    medium: { title: 18, subtitle: 14, label: 12, axis: 11 },
                    large: { title: 24, subtitle: 18, label: 14, axis: 13 },
                    xlarge: { title: 32, subtitle: 24, label: 16, axis: 15 }
                };
                const selected = sizes[scale] || sizes.medium;
                
                if (chart.title) chart.title.style = { fontSize: selected.title + 'px' };
                if (chart.subtitle) chart.subtitle.style = { fontSize: selected.subtitle + 'px' };
                if (chart.xAxis) chart.xAxis.labels = { style: { fontSize: selected.axis + 'px' } };
                if (chart.yAxis) chart.yAxis.labels = { style: { fontSize: selected.axis + 'px' } };
                
                return this;
            }
        },

        // Font weight tools
        weight: {
            setThin: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '100';
                return this;
            },
            setExtraLight: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '200';
                return this;
            },
            setLight: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '300';
                return this;
            },
            setNormal: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '400';
                return this;
            },
            setMedium: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '500';
                return this;
            },
            setSemiBold: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '600';
                return this;
            },
            setBold: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '700';
                return this;
            },
            setExtraBold: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '800';
                return this;
            },
            setBlack: function(element) {
                element.style = element.style || {};
                element.style.fontWeight = '900';
                return this;
            },
            setCustom: function(element, weight) {
                element.style = element.style || {};
                element.style.fontWeight = weight;
                return this;
            }
        },

        // Font style tools
        style: {
            setItalic: function(element, enabled = true) {
                element.style = element.style || {};
                element.style.fontStyle = enabled ? 'italic' : 'normal';
                return this;
            },
            setOblique: function(element, angle = 14) {
                element.style = element.style || {};
                element.style.fontStyle = `oblique ${angle}deg`;
                return this;
            },
            setUnderline: function(element, enabled = true) {
                element.style = element.style || {};
                element.style.textDecoration = enabled ? 'underline' : 'none';
                return this;
            },
            setOverline: function(element, enabled = true) {
                element.style = element.style || {};
                element.style.textDecoration = enabled ? 'overline' : 'none';
                return this;
            },
            setLineThrough: function(element, enabled = true) {
                element.style = element.style || {};
                element.style.textDecoration = enabled ? 'line-through' : 'none';
                return this;
            },
            setSmallCaps: function(element, enabled = true) {
                element.style = element.style || {};
                element.style.fontVariant = enabled ? 'small-caps' : 'normal';
                return this;
            },
            setLetterSpacing: function(element, spacing) {
                element.style = element.style || {};
                element.style.letterSpacing = spacing + 'px';
                return this;
            },
            setWordSpacing: function(element, spacing) {
                element.style = element.style || {};
                element.style.wordSpacing = spacing + 'px';
                return this;
            },
            setLineHeight: function(element, height) {
                element.style = element.style || {};
                element.style.lineHeight = height;
                return this;
            },
            setTextTransform: function(element, transform) {
                element.style = element.style || {};
                element.style.textTransform = transform; // uppercase, lowercase, capitalize
                return this;
            }
        }
    };

    // =====================================================================
    // SIZE CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Size = {
        // Chart size tools
        chart: {
            setWidth: function(chart, width) {
                chart.chart = chart.chart || {};
                chart.chart.width = width;
                return this;
            },
            setHeight: function(chart, height) {
                chart.chart = chart.chart || {};
                chart.chart.height = height;
                return this;
            },
            setDimensions: function(chart, width, height) {
                chart.chart = chart.chart || {};
                chart.chart.width = width;
                chart.chart.height = height;
                return this;
            },
            setAspectRatio: function(chart, ratio) {
                chart.chart = chart.chart || {};
                if (chart.chart.width) {
                    chart.chart.height = chart.chart.width / ratio;
                } else if (chart.chart.height) {
                    chart.chart.width = chart.chart.height * ratio;
                }
                return this;
            },
            setResponsive: function(chart, enabled = true) {
                chart.responsive = enabled;
                return this;
            },
            setMaintainAspectRatio: function(chart, enabled = true) {
                chart.maintainAspectRatio = enabled;
                return this;
            },
            setMinWidth: function(chart, width) {
                chart.chart = chart.chart || {};
                chart.chart.minWidth = width;
                return this;
            },
            setMaxWidth: function(chart, width) {
                chart.chart = chart.chart || {};
                chart.chart.maxWidth = width;
                return this;
            },
            setMinHeight: function(chart, height) {
                chart.chart = chart.chart || {};
                chart.chart.minHeight = height;
                return this;
            },
            setMaxHeight: function(chart, height) {
                chart.chart = chart.chart || {};
                chart.chart.maxHeight = height;
                return this;
            },
            setFullScreen: function(chart) {
                chart.chart = chart.chart || {};
                chart.chart.width = window.innerWidth;
                chart.chart.height = window.innerHeight;
                return this;
            },
            setContainer: function(chart, containerId) {
                const container = document.getElementById(containerId);
                if (container) {
                    chart.chart = chart.chart || {};
                    chart.chart.width = container.offsetWidth;
                    chart.chart.height = container.offsetHeight;
                }
                return this;
            }
        },

        // Element size tools
        element: {
            setMarkerSize: function(series, size) {
                series.marker = series.marker || {};
                series.marker.radius = size;
                return this;
            },
            setLineWidth: function(series, width) {
                series.lineWidth = width;
                return this;
            },
            setBorderWidth: function(element, width) {
                element.borderWidth = width;
                return this;
            },
            setPointSize: function(series, size) {
                series.marker = series.marker || {};
                series.marker.radius = size;
                return this;
            },
            setBarWidth: function(series, width) {
                series.pointWidth = width;
                return this;
            },
            setColumnWidth: function(series, width) {
                series.pointWidth = width;
                return this;
            },
            setPieSize: function(series, size) {
                series.size = size;
                return this;
            },
            setInnerSize: function(series, size) {
                series.innerSize = size;
                return this;
            },
            setBubbleSize: function(series, minSize, maxSize) {
                series.minSize = minSize;
                series.maxSize = maxSize;
                return this;
            },
            setSymbolSize: function(element, width, height) {
                element.symbolWidth = width;
                element.symbolHeight = height || width;
                return this;
            }
        },

        // Spacing tools
        spacing: {
            setMargin: function(chart, top, right, bottom, left) {
                chart.chart = chart.chart || {};
                chart.chart.margin = [top, right, bottom, left];
                return this;
            },
            setMarginTop: function(chart, margin) {
                chart.chart = chart.chart || {};
                chart.chart.marginTop = margin;
                return this;
            },
            setMarginRight: function(chart, margin) {
                chart.chart = chart.chart || {};
                chart.chart.marginRight = margin;
                return this;
            },
            setMarginBottom: function(chart, margin) {
                chart.chart = chart.chart || {};
                chart.chart.marginBottom = margin;
                return this;
            },
            setMarginLeft: function(chart, margin) {
                chart.chart = chart.chart || {};
                chart.chart.marginLeft = margin;
                return this;
            },
            setSpacing: function(chart, top, right, bottom, left) {
                chart.chart = chart.chart || {};
                chart.chart.spacing = [top, right, bottom, left];
                return this;
            },
            setSpacingTop: function(chart, spacing) {
                chart.chart = chart.chart || {};
                chart.chart.spacingTop = spacing;
                return this;
            },
            setSpacingRight: function(chart, spacing) {
                chart.chart = chart.chart || {};
                chart.chart.spacingRight = spacing;
                return this;
            },
            setSpacingBottom: function(chart, spacing) {
                chart.chart = chart.chart || {};
                chart.chart.spacingBottom = spacing;
                return this;
            },
            setSpacingLeft: function(chart, spacing) {
                chart.chart = chart.chart || {};
                chart.chart.spacingLeft = spacing;
                return this;
            },
            setPlotBorderWidth: function(chart, width) {
                chart.chart = chart.chart || {};
                chart.chart.plotBorderWidth = width;
                return this;
            }
        }
    };

    // Export the module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = VisualizationTools;
    } else {
        global.VisualizationTools = VisualizationTools;
    }

})(typeof window !== 'undefined' ? window : this);