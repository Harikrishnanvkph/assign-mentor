/**
 * ChartForge Pro - Advanced Chart Engine
 * Extended chart configurations and real-time processing
 */

class ChartEngine {
    constructor() {
        this.charts = new Map();
        this.activeChart = null;
        this.realtimeData = new Map();
        this.dataStreams = new Map();
        this.annotations = [];
        this.customShapes = [];
        this.dataProcessors = new Map();
        this.visualEffects = new Map();
        this.interactionHandlers = new Map();
        this.performanceMonitor = new PerformanceMonitor();
        this.initializeEngine();
    }

    /**
     * Initialize the chart engine with advanced capabilities
     */
    initializeEngine() {
        this.registerDataProcessors();
        this.registerVisualEffects();
        this.registerInteractionHandlers();
        this.initializeWebGL();
        this.setupRealtimeEngine();
        console.log('Advanced Chart Engine initialized');
    }

    /**
     * Register data processors for various transformations
     */
    registerDataProcessors() {
        // Moving Average Processor
        this.dataProcessors.set('movingAverage', {
            name: 'Moving Average',
            process: (data, window = 3) => {
                const result = [];
                for (let i = 0; i < data.length; i++) {
                    if (i < window - 1) {
                        result.push(null);
                    } else {
                        let sum = 0;
                        for (let j = 0; j < window; j++) {
                            sum += data[i - j];
                        }
                        result.push(sum / window);
                    }
                }
                return result;
            }
        });

        // Exponential Smoothing
        this.dataProcessors.set('exponentialSmoothing', {
            name: 'Exponential Smoothing',
            process: (data, alpha = 0.3) => {
                const result = [data[0]];
                for (let i = 1; i < data.length; i++) {
                    result.push(alpha * data[i] + (1 - alpha) * result[i - 1]);
                }
                return result;
            }
        });

        // Trend Line Calculator
        this.dataProcessors.set('trendLine', {
            name: 'Trend Line',
            process: (data) => {
                const n = data.length;
                const xSum = (n * (n - 1)) / 2;
                const xSquaredSum = (n * (n - 1) * (2 * n - 1)) / 6;
                let ySum = 0;
                let xySum = 0;

                for (let i = 0; i < n; i++) {
                    ySum += data[i];
                    xySum += i * data[i];
                }

                const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
                const intercept = (ySum - slope * xSum) / n;

                return data.map((_, i) => slope * i + intercept);
            }
        });

        // Standard Deviation Bands
        this.dataProcessors.set('stdDevBands', {
            name: 'Standard Deviation Bands',
            process: (data, multiplier = 2) => {
                const mean = data.reduce((a, b) => a + b, 0) / data.length;
                const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
                const stdDev = Math.sqrt(variance);
                
                return {
                    upper: data.map(() => mean + multiplier * stdDev),
                    middle: data.map(() => mean),
                    lower: data.map(() => mean - multiplier * stdDev)
                };
            }
        });

        // Fourier Transform for frequency analysis
        this.dataProcessors.set('fourierTransform', {
            name: 'Fourier Transform',
            process: (data) => {
                const n = data.length;
                const frequencies = [];
                const amplitudes = [];
                
                for (let k = 0; k < n; k++) {
                    let real = 0;
                    let imag = 0;
                    
                    for (let t = 0; t < n; t++) {
                        const angle = -2 * Math.PI * k * t / n;
                        real += data[t] * Math.cos(angle);
                        imag += data[t] * Math.sin(angle);
                    }
                    
                    frequencies.push(k);
                    amplitudes.push(Math.sqrt(real * real + imag * imag));
                }
                
                return { frequencies, amplitudes };
            }
        });

        // Outlier Detection
        this.dataProcessors.set('outlierDetection', {
            name: 'Outlier Detection',
            process: (data, threshold = 1.5) => {
                const sorted = [...data].sort((a, b) => a - b);
                const q1 = sorted[Math.floor(sorted.length * 0.25)];
                const q3 = sorted[Math.floor(sorted.length * 0.75)];
                const iqr = q3 - q1;
                const lowerBound = q1 - threshold * iqr;
                const upperBound = q3 + threshold * iqr;
                
                return data.map((value, index) => ({
                    value,
                    index,
                    isOutlier: value < lowerBound || value > upperBound
                }));
            }
        });

        // Regression Analysis
        this.dataProcessors.set('regression', {
            name: 'Regression Analysis',
            types: {
                linear: this.linearRegression,
                polynomial: this.polynomialRegression,
                exponential: this.exponentialRegression,
                logarithmic: this.logarithmicRegression,
                power: this.powerRegression
            },
            process: (xData, yData, type = 'linear', degree = 2) => {
                return this.dataProcessors.get('regression').types[type](xData, yData, degree);
            }
        });

        // Time Series Decomposition
        this.dataProcessors.set('decomposition', {
            name: 'Time Series Decomposition',
            process: (data, period = 12) => {
                // Trend component using moving average
                const trend = this.calculateTrend(data, period);
                
                // Detrended data
                const detrended = data.map((val, i) => val - (trend[i] || 0));
                
                // Seasonal component
                const seasonal = this.calculateSeasonalComponent(detrended, period);
                
                // Residual component
                const residual = data.map((val, i) => 
                    val - (trend[i] || 0) - (seasonal[i % period] || 0)
                );
                
                return { trend, seasonal, residual };
            }
        });

        // Correlation Matrix
        this.dataProcessors.set('correlation', {
            name: 'Correlation Matrix',
            process: (datasets) => {
                const n = datasets.length;
                const matrix = Array(n).fill(null).map(() => Array(n).fill(0));
                
                for (let i = 0; i < n; i++) {
                    for (let j = 0; j < n; j++) {
                        matrix[i][j] = this.calculateCorrelation(datasets[i], datasets[j]);
                    }
                }
                
                return matrix;
            }
        });

        // Data Interpolation
        this.dataProcessors.set('interpolation', {
            name: 'Data Interpolation',
            methods: {
                linear: this.linearInterpolation,
                cubic: this.cubicInterpolation,
                spline: this.splineInterpolation
            },
            process: (data, method = 'linear', points = 100) => {
                return this.dataProcessors.get('interpolation').methods[method](data, points);
            }
        });
    }

    /**
     * Calculate trend using moving average
     */
    calculateTrend(data, period) {
        const trend = [];
        for (let i = 0; i < data.length; i++) {
            if (i < period - 1) {
                trend.push(null);
            } else {
                let sum = 0;
                for (let j = 0; j < period; j++) {
                    sum += data[i - j];
                }
                trend.push(sum / period);
            }
        }
        return trend;
    }

    /**
     * Calculate seasonal component
     */
    calculateSeasonalComponent(detrended, period) {
        const seasonal = Array(period).fill(0);
        const counts = Array(period).fill(0);
        
        for (let i = 0; i < detrended.length; i++) {
            const seasonIndex = i % period;
            seasonal[seasonIndex] += detrended[i];
            counts[seasonIndex]++;
        }
        
        return seasonal.map((sum, i) => sum / counts[i]);
    }

    /**
     * Calculate correlation between two datasets
     */
    calculateCorrelation(x, y) {
        const n = Math.min(x.length, y.length);
        const meanX = x.reduce((a, b) => a + b, 0) / n;
        const meanY = y.reduce((a, b) => a + b, 0) / n;
        
        let numerator = 0;
        let denomX = 0;
        let denomY = 0;
        
        for (let i = 0; i < n; i++) {
            const dx = x[i] - meanX;
            const dy = y[i] - meanY;
            numerator += dx * dy;
            denomX += dx * dx;
            denomY += dy * dy;
        }
        
        return numerator / Math.sqrt(denomX * denomY);
    }

    /**
     * Linear regression implementation
     */
    linearRegression(xData, yData) {
        const n = xData.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        for (let i = 0; i < n; i++) {
            sumX += xData[i];
            sumY += yData[i];
            sumXY += xData[i] * yData[i];
            sumX2 += xData[i] * xData[i];
        }
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        const predictedY = xData.map(x => slope * x + intercept);
        
        // Calculate R-squared
        const meanY = sumY / n;
        let ssRes = 0, ssTot = 0;
        
        for (let i = 0; i < n; i++) {
            ssRes += Math.pow(yData[i] - predictedY[i], 2);
            ssTot += Math.pow(yData[i] - meanY, 2);
        }
        
        const rSquared = 1 - (ssRes / ssTot);
        
        return {
            equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
            slope,
            intercept,
            predictedY,
            rSquared
        };
    }

    /**
     * Polynomial regression implementation
     */
    polynomialRegression(xData, yData, degree = 2) {
        const n = xData.length;
        const matrix = [];
        const vector = [];
        
        // Build the matrix for least squares
        for (let i = 0; i <= degree; i++) {
            matrix[i] = [];
            for (let j = 0; j <= degree; j++) {
                let sum = 0;
                for (let k = 0; k < n; k++) {
                    sum += Math.pow(xData[k], i + j);
                }
                matrix[i][j] = sum;
            }
            
            let sum = 0;
            for (let k = 0; k < n; k++) {
                sum += yData[k] * Math.pow(xData[k], i);
            }
            vector[i] = sum;
        }
        
        // Solve using Gaussian elimination
        const coefficients = this.gaussianElimination(matrix, vector);
        
        // Generate predicted values
        const predictedY = xData.map(x => {
            let y = 0;
            for (let i = 0; i <= degree; i++) {
                y += coefficients[i] * Math.pow(x, i);
            }
            return y;
        });
        
        return {
            coefficients,
            predictedY,
            degree
        };
    }

    /**
     * Gaussian elimination for solving linear systems
     */
    gaussianElimination(matrix, vector) {
        const n = vector.length;
        const augmented = matrix.map((row, i) => [...row, vector[i]]);
        
        // Forward elimination
        for (let i = 0; i < n; i++) {
            // Find pivot
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
            
            // Make all rows below this one 0 in current column
            for (let k = i + 1; k < n; k++) {
                const factor = augmented[k][i] / augmented[i][i];
                for (let j = i; j <= n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }
        
        // Back substitution
        const solution = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            solution[i] = augmented[i][n];
            for (let j = i + 1; j < n; j++) {
                solution[i] -= augmented[i][j] * solution[j];
            }
            solution[i] /= augmented[i][i];
        }
        
        return solution;
    }

    /**
     * Register visual effects for enhanced chart rendering
     */
    registerVisualEffects() {
        // Glow Effect
        this.visualEffects.set('glow', {
            name: 'Glow Effect',
            apply: (chartInstance, options = {}) => {
                const {
                    color = '#fff',
                    blur = 10,
                    intensity = 1
                } = options;
                
                return {
                    shadowBlur: blur * intensity,
                    shadowColor: color,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0
                };
            }
        });

        // Gradient Fill
        this.visualEffects.set('gradient', {
            name: 'Gradient Fill',
            apply: (chartInstance, options = {}) => {
                const {
                    type = 'linear',
                    colors = ['#5470c6', '#91cc75'],
                    direction = 'vertical'
                } = options;
                
                if (type === 'linear') {
                    return new echarts.graphic.LinearGradient(
                        direction === 'horizontal' ? 1 : 0,
                        direction === 'vertical' ? 1 : 0,
                        direction === 'horizontal' ? 0 : 0,
                        direction === 'vertical' ? 0 : 0,
                        colors.map((color, i) => ({
                            offset: i / (colors.length - 1),
                            color
                        }))
                    );
                } else if (type === 'radial') {
                    return new echarts.graphic.RadialGradient(
                        0.5, 0.5, 0.5,
                        colors.map((color, i) => ({
                            offset: i / (colors.length - 1),
                            color
                        }))
                    );
                }
            }
        });

        // Pattern Fill
        this.visualEffects.set('pattern', {
            name: 'Pattern Fill',
            types: {
                dots: this.createDotsPattern,
                lines: this.createLinesPattern,
                crosshatch: this.createCrosshatchPattern,
                zigzag: this.createZigzagPattern
            },
            apply: (chartInstance, options = {}) => {
                const { type = 'dots', color = '#000', size = 10 } = options;
                return this.visualEffects.get('pattern').types[type](color, size);
            }
        });

        // 3D Effect
        this.visualEffects.set('3d', {
            name: '3D Effect',
            apply: (chartInstance, options = {}) => {
                const { depth = 10, angle = 45 } = options;
                
                return {
                    emphasis: {
                        scale: true,
                        focus: 'self',
                        blurScope: 'global',
                        itemStyle: {
                            shadowBlur: depth,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            shadowOffsetX: depth * Math.cos(angle * Math.PI / 180),
                            shadowOffsetY: depth * Math.sin(angle * Math.PI / 180)
                        }
                    }
                };
            }
        });

        // Animation Sequences
        this.visualEffects.set('animationSequence', {
            name: 'Animation Sequence',
            sequences: {
                wave: this.createWaveAnimation,
                pulse: this.createPulseAnimation,
                spiral: this.createSpiralAnimation,
                bounce: this.createBounceAnimation
            },
            apply: (chartInstance, options = {}) => {
                const { sequence = 'wave', duration = 2000 } = options;
                return this.visualEffects.get('animationSequence').sequences[sequence](duration);
            }
        });

        // Blur Effect
        this.visualEffects.set('blur', {
            name: 'Blur Effect',
            apply: (chartInstance, options = {}) => {
                const { radius = 5, opacity = 0.5 } = options;
                
                return {
                    itemStyle: {
                        opacity,
                        emphasis: {
                            opacity: 1
                        }
                    },
                    blur: {
                        enabled: true,
                        radius
                    }
                };
            }
        });
    }

    /**
     * Create dots pattern
     */
    createDotsPattern(color, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 4, 0, Math.PI * 2);
        ctx.fill();
        
        return {
            image: canvas,
            repeat: 'repeat'
        };
    }

    /**
     * Create lines pattern
     */
    createLinesPattern(color, size) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, size);
        ctx.lineTo(size, 0);
        ctx.stroke();
        
        return {
            image: canvas,
            repeat: 'repeat'
        };
    }

    /**
     * Register interaction handlers
     */
    registerInteractionHandlers() {
        // Drill-down Handler
        this.interactionHandlers.set('drillDown', {
            name: 'Drill Down',
            handler: (params, chartInstance) => {
                const drillData = this.getDrillDownData(params);
                if (drillData) {
                    this.updateChartWithDrillDown(chartInstance, drillData);
                }
            }
        });

        // Cross-chart Filtering
        this.interactionHandlers.set('crossFilter', {
            name: 'Cross Chart Filtering',
            handler: (params, sourceChart) => {
                const filter = this.createFilterFromSelection(params);
                this.applyCrossChartFilter(filter, sourceChart);
            }
        });

        // Data Point Annotation
        this.interactionHandlers.set('annotation', {
            name: 'Data Point Annotation',
            handler: (params, chartInstance) => {
                this.showAnnotationDialog(params, (annotation) => {
                    this.addAnnotation(chartInstance, annotation);
                });
            }
        });

        // Export Region
        this.interactionHandlers.set('exportRegion', {
            name: 'Export Region',
            handler: (params, chartInstance) => {
                const region = this.getSelectedRegion(params);
                this.exportChartRegion(chartInstance, region);
            }
        });

        // Compare Mode
        this.interactionHandlers.set('compare', {
            name: 'Compare Mode',
            handler: (params, chartInstance) => {
                this.toggleCompareMode(chartInstance, params);
            }
        });
    }

    /**
     * Initialize WebGL for performance
     */
    initializeWebGL() {
        this.webglRenderer = {
            enabled: this.checkWebGLSupport(),
            context: null,
            programs: new Map(),
            buffers: new Map(),
            textures: new Map()
        };

        if (this.webglRenderer.enabled) {
            this.setupWebGLShaders();
            console.log('WebGL rendering enabled');
        }
    }

    /**
     * Check WebGL support
     */
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return false;
        }
    }

    /**
     * Setup WebGL shaders for advanced rendering
     */
    setupWebGLShaders() {
        // Vertex shader for data points
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec4 a_color;
            uniform mat3 u_matrix;
            varying vec4 v_color;
            
            void main() {
                gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
                v_color = a_color;
                gl_PointSize = 10.0;
            }
        `;

        // Fragment shader for effects
        const fragmentShaderSource = `
            precision mediump float;
            varying vec4 v_color;
            
            void main() {
                float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
                if (dist > 0.5) {
                    discard;
                }
                gl_FragColor = v_color * (1.0 - dist * 2.0);
            }
        `;

        this.webglRenderer.shaders = {
            vertex: vertexShaderSource,
            fragment: fragmentShaderSource
        };
    }

    /**
     * Setup real-time data engine
     */
    setupRealtimeEngine() {
        this.realtimeConfig = {
            updateInterval: 1000,
            bufferSize: 100,
            streams: new Map(),
            processors: new Map()
        };

        // Start real-time update loop
        this.startRealtimeLoop();
    }

    /**
     * Start real-time update loop
     */
    startRealtimeLoop() {
        setInterval(() => {
            this.realtimeConfig.streams.forEach((stream, id) => {
                if (stream.active) {
                    this.updateRealtimeData(id, stream);
                }
            });
        }, this.realtimeConfig.updateInterval);
    }

    /**
     * Update real-time data for a stream
     */
    updateRealtimeData(streamId, stream) {
        const newData = stream.generator();
        const buffer = this.realtimeData.get(streamId) || [];
        
        buffer.push(newData);
        if (buffer.length > this.realtimeConfig.bufferSize) {
            buffer.shift();
        }
        
        this.realtimeData.set(streamId, buffer);
        
        // Notify subscribers
        stream.subscribers.forEach(callback => {
            callback(buffer);
        });
    }

    /**
     * Create real-time data stream
     */
    createRealtimeStream(config) {
        const streamId = `stream_${Date.now()}`;
        const stream = {
            id: streamId,
            active: true,
            generator: config.generator || (() => Math.random() * 100),
            subscribers: new Set(),
            interval: config.interval || 1000,
            bufferSize: config.bufferSize || 100
        };
        
        this.realtimeConfig.streams.set(streamId, stream);
        return streamId;
    }

    /**
     * Subscribe to real-time stream
     */
    subscribeToStream(streamId, callback) {
        const stream = this.realtimeConfig.streams.get(streamId);
        if (stream) {
            stream.subscribers.add(callback);
            return () => stream.subscribers.delete(callback);
        }
        return null;
    }

    /**
     * Advanced chart creation with all features
     */
    createAdvancedChart(container, config) {
        const chartId = `chart_${Date.now()}`;
        const chartInstance = echarts.init(container, config.theme);
        
        // Apply advanced configurations
        const option = this.buildAdvancedOption(config);
        
        // Apply visual effects
        if (config.effects) {
            config.effects.forEach(effect => {
                const effectConfig = this.visualEffects.get(effect.type);
                if (effectConfig) {
                    Object.assign(option, effectConfig.apply(chartInstance, effect.options));
                }
            });
        }
        
        // Setup interaction handlers
        if (config.interactions) {
            config.interactions.forEach(interaction => {
                const handler = this.interactionHandlers.get(interaction);
                if (handler) {
                    chartInstance.on('click', (params) => handler.handler(params, chartInstance));
                }
            });
        }
        
        // Apply data processors
        if (config.processors) {
            option.series = this.applyDataProcessors(option.series, config.processors);
        }
        
        chartInstance.setOption(option);
        this.charts.set(chartId, { instance: chartInstance, config, option });
        
        return chartId;
    }

    /**
     * Build advanced chart option
     */
    buildAdvancedOption(config) {
        const baseOption = {
            title: this.buildTitle(config.title),
            tooltip: this.buildTooltip(config.tooltip),
            legend: this.buildLegend(config.legend),
            grid: this.buildGrid(config.grid),
            xAxis: this.buildAxis(config.xAxis, 'x'),
            yAxis: this.buildAxis(config.yAxis, 'y'),
            series: this.buildSeries(config.series),
            dataZoom: this.buildDataZoom(config.dataZoom),
            visualMap: this.buildVisualMap(config.visualMap),
            toolbox: this.buildToolbox(config.toolbox),
            brush: this.buildBrush(config.brush),
            timeline: this.buildTimeline(config.timeline),
            graphic: this.buildGraphic(config.graphic),
            calendar: this.buildCalendar(config.calendar),
            dataset: config.dataset,
            aria: this.buildAria(config.aria),
            animation: config.animation !== false,
            animationDuration: config.animationDuration || 1000,
            animationEasing: config.animationEasing || 'cubicOut'
        };
        
        // Add responsive configuration
        if (config.responsive) {
            baseOption.media = this.buildResponsiveConfig(config.responsive);
        }
        
        return baseOption;
    }

    /**
     * Build title configuration
     */
    buildTitle(titleConfig = {}) {
        return {
            text: titleConfig.text || '',
            subtext: titleConfig.subtext || '',
            left: titleConfig.left || 'center',
            top: titleConfig.top || 'top',
            textStyle: {
                fontSize: titleConfig.fontSize || 18,
                fontWeight: titleConfig.fontWeight || 'bold',
                color: titleConfig.color || '#333'
            },
            subtextStyle: {
                fontSize: titleConfig.subtextFontSize || 14,
                color: titleConfig.subtextColor || '#666'
            },
            padding: titleConfig.padding || 10,
            itemGap: titleConfig.itemGap || 10
        };
    }

    /**
     * Build tooltip configuration
     */
    buildTooltip(tooltipConfig = {}) {
        return {
            show: tooltipConfig.show !== false,
            trigger: tooltipConfig.trigger || 'item',
            axisPointer: {
                type: tooltipConfig.axisPointerType || 'cross',
                crossStyle: {
                    color: '#999'
                },
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            },
            formatter: tooltipConfig.formatter || this.defaultTooltipFormatter,
            backgroundColor: tooltipConfig.backgroundColor || 'rgba(50, 50, 50, 0.9)',
            borderColor: tooltipConfig.borderColor || '#333',
            borderWidth: tooltipConfig.borderWidth || 1,
            padding: tooltipConfig.padding || 10,
            textStyle: {
                color: tooltipConfig.textColor || '#fff',
                fontSize: tooltipConfig.fontSize || 14
            },
            extraCssText: tooltipConfig.extraCssText || 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);'
        };
    }

    /**
     * Default tooltip formatter
     */
    defaultTooltipFormatter(params) {
        if (Array.isArray(params)) {
            let result = `<strong>${params[0].axisValueLabel}</strong><br/>`;
            params.forEach(item => {
                result += `${item.marker} ${item.seriesName}: <strong>${item.value}</strong><br/>`;
            });
            return result;
        } else {
            return `${params.marker} ${params.name}: <strong>${params.value}</strong>`;
        }
    }

    /**
     * Build legend configuration
     */
    buildLegend(legendConfig = {}) {
        return {
            show: legendConfig.show !== false,
            type: legendConfig.type || 'plain',
            left: legendConfig.left || 'center',
            top: legendConfig.top || 'bottom',
            orient: legendConfig.orient || 'horizontal',
            align: legendConfig.align || 'auto',
            padding: legendConfig.padding || 5,
            itemGap: legendConfig.itemGap || 10,
            itemWidth: legendConfig.itemWidth || 25,
            itemHeight: legendConfig.itemHeight || 14,
            formatter: legendConfig.formatter,
            selectedMode: legendConfig.selectedMode !== false,
            inactiveColor: legendConfig.inactiveColor || '#ccc',
            selected: legendConfig.selected,
            textStyle: {
                color: legendConfig.textColor || '#333',
                fontSize: legendConfig.fontSize || 12
            },
            icon: legendConfig.icon,
            data: legendConfig.data
        };
    }

    /**
     * Build grid configuration
     */
    buildGrid(gridConfig = {}) {
        return {
            show: gridConfig.show || false,
            left: gridConfig.left || '10%',
            right: gridConfig.right || '10%',
            top: gridConfig.top || '15%',
            bottom: gridConfig.bottom || '15%',
            width: gridConfig.width || 'auto',
            height: gridConfig.height || 'auto',
            containLabel: gridConfig.containLabel !== false,
            backgroundColor: gridConfig.backgroundColor,
            borderColor: gridConfig.borderColor || '#ccc',
            borderWidth: gridConfig.borderWidth || 1,
            shadowBlur: gridConfig.shadowBlur,
            shadowColor: gridConfig.shadowColor,
            shadowOffsetX: gridConfig.shadowOffsetX || 0,
            shadowOffsetY: gridConfig.shadowOffsetY || 0
        };
    }

    /**
     * Build axis configuration
     */
    buildAxis(axisConfig = {}, type = 'x') {
        const axis = {
            show: axisConfig.show !== false,
            type: axisConfig.type || (type === 'x' ? 'category' : 'value'),
            name: axisConfig.name || '',
            nameLocation: axisConfig.nameLocation || 'end',
            nameTextStyle: {
                color: axisConfig.nameColor || '#333',
                fontSize: axisConfig.nameFontSize || 12,
                fontWeight: axisConfig.nameFontWeight || 'normal'
            },
            nameGap: axisConfig.nameGap || 15,
            nameRotate: axisConfig.nameRotate,
            inverse: axisConfig.inverse || false,
            boundaryGap: axisConfig.boundaryGap,
            min: axisConfig.min,
            max: axisConfig.max,
            scale: axisConfig.scale || false,
            splitNumber: axisConfig.splitNumber || 5,
            minInterval: axisConfig.minInterval,
            maxInterval: axisConfig.maxInterval,
            interval: axisConfig.interval,
            axisLine: {
                show: axisConfig.axisLineShow !== false,
                onZero: axisConfig.onZero !== false,
                onZeroAxisIndex: axisConfig.onZeroAxisIndex,
                symbol: axisConfig.axisLineSymbol,
                symbolSize: axisConfig.axisLineSymbolSize,
                lineStyle: {
                    color: axisConfig.axisLineColor || '#333',
                    width: axisConfig.axisLineWidth || 1,
                    type: axisConfig.axisLineType || 'solid'
                }
            },
            axisTick: {
                show: axisConfig.axisTickShow !== false,
                alignWithLabel: axisConfig.alignWithLabel || false,
                interval: axisConfig.tickInterval,
                inside: axisConfig.tickInside || false,
                length: axisConfig.tickLength || 5,
                lineStyle: {
                    color: axisConfig.tickColor || '#333',
                    width: axisConfig.tickWidth || 1
                }
            },
            axisLabel: {
                show: axisConfig.axisLabelShow !== false,
                interval: axisConfig.labelInterval,
                inside: axisConfig.labelInside || false,
                rotate: axisConfig.labelRotate || 0,
                margin: axisConfig.labelMargin || 8,
                formatter: axisConfig.labelFormatter,
                showMinLabel: axisConfig.showMinLabel,
                showMaxLabel: axisConfig.showMaxLabel,
                color: axisConfig.labelColor || '#333',
                fontSize: axisConfig.labelFontSize || 12,
                fontWeight: axisConfig.labelFontWeight || 'normal'
            },
            splitLine: {
                show: axisConfig.splitLineShow,
                interval: axisConfig.splitLineInterval,
                lineStyle: {
                    color: axisConfig.splitLineColor || '#e0e0e0',
                    width: axisConfig.splitLineWidth || 1,
                    type: axisConfig.splitLineType || 'solid'
                }
            },
            splitArea: {
                show: axisConfig.splitAreaShow || false,
                interval: axisConfig.splitAreaInterval,
                areaStyle: {
                    color: axisConfig.splitAreaColor || ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']
                }
            },
            data: axisConfig.data
        };
        
        // Add specific configurations for different axis types
        if (axisConfig.type === 'time') {
            axis.minInterval = axis.minInterval || 3600 * 1000;
        }
        
        if (axisConfig.type === 'log') {
            axis.logBase = axisConfig.logBase || 10;
        }
        
        return axis;
    }

    /**
     * Build series configuration
     */
    buildSeries(seriesConfig = []) {
        return seriesConfig.map(series => {
            const baseSeries = {
                name: series.name,
                type: series.type || 'line',
                data: series.data,
                symbol: series.symbol || 'circle',
                symbolSize: series.symbolSize || 6,
                symbolRotate: series.symbolRotate,
                symbolKeepAspect: series.symbolKeepAspect || false,
                showSymbol: series.showSymbol !== false,
                showAllSymbol: series.showAllSymbol || 'auto',
                hoverAnimation: series.hoverAnimation !== false,
                legendHoverLink: series.legendHoverLink !== false,
                stack: series.stack,
                cursor: series.cursor || 'pointer',
                connectNulls: series.connectNulls || false,
                clipOverflow: series.clipOverflow !== false,
                step: series.step,
                label: this.buildLabel(series.label),
                itemStyle: this.buildItemStyle(series.itemStyle),
                lineStyle: this.buildLineStyle(series.lineStyle),
                areaStyle: series.areaStyle ? this.buildAreaStyle(series.areaStyle) : null,
                emphasis: this.buildEmphasis(series.emphasis),
                blur: this.buildBlur(series.blur),
                select: this.buildSelect(series.select),
                selectedMode: series.selectedMode,
                smooth: series.smooth || false,
                smoothMonotone: series.smoothMonotone,
                sampling: series.sampling,
                dimensions: series.dimensions,
                encode: series.encode,
                seriesLayoutBy: series.seriesLayoutBy,
                datasetIndex: series.datasetIndex,
                dataGroupId: series.dataGroupId,
                markPoint: this.buildMarkPoint(series.markPoint),
                markLine: this.buildMarkLine(series.markLine),
                markArea: this.buildMarkArea(series.markArea),
                zlevel: series.zlevel || 0,
                z: series.z || 2,
                silent: series.silent || false,
                animation: series.animation !== false,
                animationThreshold: series.animationThreshold || 2000,
                animationDuration: series.animationDuration || 1000,
                animationEasing: series.animationEasing || 'linear',
                animationDelay: series.animationDelay || 0,
                animationDurationUpdate: series.animationDurationUpdate || 300,
                animationEasingUpdate: series.animationEasingUpdate || 'cubicOut',
                animationDelayUpdate: series.animationDelayUpdate || 0
            };
            
            // Add type-specific configurations
            return this.addTypeSpecificConfig(baseSeries, series);
        });
    }

    /**
     * Add type-specific configuration to series
     */
    addTypeSpecificConfig(baseSeries, series) {
        switch (series.type) {
            case 'bar':
                return {
                    ...baseSeries,
                    barWidth: series.barWidth,
                    barMaxWidth: series.barMaxWidth,
                    barMinWidth: series.barMinWidth,
                    barGap: series.barGap || '30%',
                    barCategoryGap: series.barCategoryGap || '20%',
                    large: series.large || false,
                    largeThreshold: series.largeThreshold || 400,
                    progressive: series.progressive || 5000,
                    progressiveThreshold: series.progressiveThreshold || 10000,
                    progressiveChunkMode: series.progressiveChunkMode || 'sequential'
                };
                
            case 'pie':
                return {
                    ...baseSeries,
                    legendHoverLink: series.legendHoverLink !== false,
                    hoverAnimation: series.hoverAnimation !== false,
                    hoverOffset: series.hoverOffset || 10,
                    selectedMode: series.selectedMode || false,
                    selectedOffset: series.selectedOffset || 10,
                    clockwise: series.clockwise !== false,
                    startAngle: series.startAngle || 90,
                    minAngle: series.minAngle || 0,
                    minShowLabelAngle: series.minShowLabelAngle || 0,
                    roseType: series.roseType || false,
                    avoidLabelOverlap: series.avoidLabelOverlap !== false,
                    stillShowZeroSum: series.stillShowZeroSum !== false,
                    percentPrecision: series.percentPrecision || 2,
                    center: series.center || ['50%', '50%'],
                    radius: series.radius || [0, '75%']
                };
                
            case 'scatter':
                return {
                    ...baseSeries,
                    coordinateSystem: series.coordinateSystem || 'cartesian2d',
                    xAxisIndex: series.xAxisIndex || 0,
                    yAxisIndex: series.yAxisIndex || 0,
                    polarIndex: series.polarIndex || 0,
                    geoIndex: series.geoIndex || 0,
                    calendarIndex: series.calendarIndex || 0,
                    large: series.large || false,
                    largeThreshold: series.largeThreshold || 2000,
                    progressive: series.progressive || null,
                    progressiveThreshold: series.progressiveThreshold || null
                };
                
            case 'heatmap':
                return {
                    ...baseSeries,
                    coordinateSystem: series.coordinateSystem || 'cartesian2d',
                    xAxisIndex: series.xAxisIndex || 0,
                    yAxisIndex: series.yAxisIndex || 0,
                    geoIndex: series.geoIndex || 0,
                    calendarIndex: series.calendarIndex || 0,
                    blurSize: series.blurSize || 20,
                    minOpacity: series.minOpacity || 0,
                    maxOpacity: series.maxOpacity || 1,
                    progressive: series.progressive || 1000,
                    progressiveThreshold: series.progressiveThreshold || 3000
                };
                
            default:
                return baseSeries;
        }
    }

    /**
     * Build label configuration
     */
    buildLabel(labelConfig = {}) {
        return {
            show: labelConfig.show || false,
            position: labelConfig.position || 'top',
            distance: labelConfig.distance || 5,
            rotate: labelConfig.rotate || 0,
            offset: labelConfig.offset,
            formatter: labelConfig.formatter,
            color: labelConfig.color || '#333',
            fontSize: labelConfig.fontSize || 12,
            fontWeight: labelConfig.fontWeight || 'normal',
            fontFamily: labelConfig.fontFamily || 'sans-serif',
            align: labelConfig.align,
            verticalAlign: labelConfig.verticalAlign,
            lineHeight: labelConfig.lineHeight,
            backgroundColor: labelConfig.backgroundColor || 'transparent',
            borderColor: labelConfig.borderColor,
            borderWidth: labelConfig.borderWidth || 0,
            borderRadius: labelConfig.borderRadius || 0,
            padding: labelConfig.padding || 0,
            shadowColor: labelConfig.shadowColor,
            shadowBlur: labelConfig.shadowBlur || 0,
            shadowOffsetX: labelConfig.shadowOffsetX || 0,
            shadowOffsetY: labelConfig.shadowOffsetY || 0,
            width: labelConfig.width,
            height: labelConfig.height,
            textBorderColor: labelConfig.textBorderColor,
            textBorderWidth: labelConfig.textBorderWidth || 0,
            textShadowColor: labelConfig.textShadowColor,
            textShadowBlur: labelConfig.textShadowBlur || 0,
            textShadowOffsetX: labelConfig.textShadowOffsetX || 0,
            textShadowOffsetY: labelConfig.textShadowOffsetY || 0,
            overflow: labelConfig.overflow || 'none',
            ellipsis: labelConfig.ellipsis || '...',
            rich: labelConfig.rich
        };
    }

    /**
     * Build item style configuration
     */
    buildItemStyle(itemStyleConfig = {}) {
        return {
            color: itemStyleConfig.color,
            borderColor: itemStyleConfig.borderColor || '#000',
            borderWidth: itemStyleConfig.borderWidth || 0,
            borderType: itemStyleConfig.borderType || 'solid',
            borderRadius: itemStyleConfig.borderRadius || 0,
            shadowBlur: itemStyleConfig.shadowBlur || 0,
            shadowColor: itemStyleConfig.shadowColor,
            shadowOffsetX: itemStyleConfig.shadowOffsetX || 0,
            shadowOffsetY: itemStyleConfig.shadowOffsetY || 0,
            opacity: itemStyleConfig.opacity || 1
        };
    }

    /**
     * Build line style configuration
     */
    buildLineStyle(lineStyleConfig = {}) {
        return {
            color: lineStyleConfig.color,
            width: lineStyleConfig.width || 2,
            type: lineStyleConfig.type || 'solid',
            shadowBlur: lineStyleConfig.shadowBlur || 0,
            shadowColor: lineStyleConfig.shadowColor,
            shadowOffsetX: lineStyleConfig.shadowOffsetX || 0,
            shadowOffsetY: lineStyleConfig.shadowOffsetY || 0,
            opacity: lineStyleConfig.opacity || 1
        };
    }

    /**
     * Build area style configuration
     */
    buildAreaStyle(areaStyleConfig = {}) {
        return {
            color: areaStyleConfig.color,
            origin: areaStyleConfig.origin || 'auto',
            shadowBlur: areaStyleConfig.shadowBlur || 0,
            shadowColor: areaStyleConfig.shadowColor,
            shadowOffsetX: areaStyleConfig.shadowOffsetX || 0,
            shadowOffsetY: areaStyleConfig.shadowOffsetY || 0,
            opacity: areaStyleConfig.opacity || 0.7
        };
    }

    /**
     * Build emphasis configuration
     */
    buildEmphasis(emphasisConfig = {}) {
        return {
            disabled: emphasisConfig.disabled || false,
            scale: emphasisConfig.scale !== false,
            focus: emphasisConfig.focus || 'none',
            blurScope: emphasisConfig.blurScope || 'coordinateSystem',
            label: emphasisConfig.label ? this.buildLabel(emphasisConfig.label) : null,
            itemStyle: emphasisConfig.itemStyle ? this.buildItemStyle(emphasisConfig.itemStyle) : null,
            lineStyle: emphasisConfig.lineStyle ? this.buildLineStyle(emphasisConfig.lineStyle) : null,
            areaStyle: emphasisConfig.areaStyle ? this.buildAreaStyle(emphasisConfig.areaStyle) : null
        };
    }

    /**
     * Build blur configuration
     */
    buildBlur(blurConfig = {}) {
        return {
            label: blurConfig.label ? this.buildLabel(blurConfig.label) : null,
            itemStyle: blurConfig.itemStyle ? this.buildItemStyle(blurConfig.itemStyle) : null,
            lineStyle: blurConfig.lineStyle ? this.buildLineStyle(blurConfig.lineStyle) : null,
            areaStyle: blurConfig.areaStyle ? this.buildAreaStyle(blurConfig.areaStyle) : null
        };
    }

    /**
     * Build select configuration
     */
    buildSelect(selectConfig = {}) {
        return {
            disabled: selectConfig.disabled || false,
            label: selectConfig.label ? this.buildLabel(selectConfig.label) : null,
            itemStyle: selectConfig.itemStyle ? this.buildItemStyle(selectConfig.itemStyle) : null,
            lineStyle: selectConfig.lineStyle ? this.buildLineStyle(selectConfig.lineStyle) : null,
            areaStyle: selectConfig.areaStyle ? this.buildAreaStyle(selectConfig.areaStyle) : null
        };
    }

    /**
     * Build mark point configuration
     */
    buildMarkPoint(markPointConfig = {}) {
        if (!markPointConfig.data) return null;
        
        return {
            symbol: markPointConfig.symbol || 'pin',
            symbolSize: markPointConfig.symbolSize || 50,
            symbolRotate: markPointConfig.symbolRotate,
            symbolKeepAspect: markPointConfig.symbolKeepAspect || false,
            symbolOffset: markPointConfig.symbolOffset,
            silent: markPointConfig.silent || false,
            label: this.buildLabel(markPointConfig.label),
            itemStyle: this.buildItemStyle(markPointConfig.itemStyle),
            emphasis: this.buildEmphasis(markPointConfig.emphasis),
            blur: this.buildBlur(markPointConfig.blur),
            data: markPointConfig.data,
            animation: markPointConfig.animation !== false,
            animationThreshold: markPointConfig.animationThreshold || 2000,
            animationDuration: markPointConfig.animationDuration || 1000,
            animationEasing: markPointConfig.animationEasing || 'cubicOut',
            animationDelay: markPointConfig.animationDelay || 0,
            animationDurationUpdate: markPointConfig.animationDurationUpdate || 300,
            animationEasingUpdate: markPointConfig.animationEasingUpdate || 'cubicOut',
            animationDelayUpdate: markPointConfig.animationDelayUpdate || 0
        };
    }

    /**
     * Build mark line configuration
     */
    buildMarkLine(markLineConfig = {}) {
        if (!markLineConfig.data) return null;
        
        return {
            silent: markLineConfig.silent || false,
            symbol: markLineConfig.symbol || ['circle', 'arrow'],
            symbolSize: markLineConfig.symbolSize || [8, 16],
            precision: markLineConfig.precision || 2,
            label: this.buildLabel(markLineConfig.label),
            lineStyle: this.buildLineStyle(markLineConfig.lineStyle),
            emphasis: this.buildEmphasis(markLineConfig.emphasis),
            blur: this.buildBlur(markLineConfig.blur),
            data: markLineConfig.data,
            animation: markLineConfig.animation !== false,
            animationThreshold: markLineConfig.animationThreshold || 2000,
            animationDuration: markLineConfig.animationDuration || 1000,
            animationEasing: markLineConfig.animationEasing || 'cubicOut',
            animationDelay: markLineConfig.animationDelay || 0,
            animationDurationUpdate: markLineConfig.animationDurationUpdate || 300,
            animationEasingUpdate: markLineConfig.animationEasingUpdate || 'cubicOut',
            animationDelayUpdate: markLineConfig.animationDelayUpdate || 0
        };
    }

    /**
     * Build mark area configuration
     */
    buildMarkArea(markAreaConfig = {}) {
        if (!markAreaConfig.data) return null;
        
        return {
            silent: markAreaConfig.silent || false,
            label: this.buildLabel(markAreaConfig.label),
            itemStyle: this.buildItemStyle(markAreaConfig.itemStyle),
            emphasis: this.buildEmphasis(markAreaConfig.emphasis),
            blur: this.buildBlur(markAreaConfig.blur),
            data: markAreaConfig.data,
            animation: markAreaConfig.animation !== false,
            animationThreshold: markAreaConfig.animationThreshold || 2000,
            animationDuration: markAreaConfig.animationDuration || 1000,
            animationEasing: markAreaConfig.animationEasing || 'cubicOut',
            animationDelay: markAreaConfig.animationDelay || 0,
            animationDurationUpdate: markAreaConfig.animationDurationUpdate || 300,
            animationEasingUpdate: markAreaConfig.animationEasingUpdate || 'cubicOut',
            animationDelayUpdate: markAreaConfig.animationDelayUpdate || 0
        };
    }

    /**
     * Build data zoom configuration
     */
    buildDataZoom(dataZoomConfig = []) {
        return dataZoomConfig.map(zoom => ({
            type: zoom.type || 'slider',
            show: zoom.show !== false,
            realtime: zoom.realtime !== false,
            start: zoom.start || 0,
            end: zoom.end || 100,
            startValue: zoom.startValue,
            endValue: zoom.endValue,
            xAxisIndex: zoom.xAxisIndex,
            yAxisIndex: zoom.yAxisIndex,
            filterMode: zoom.filterMode || 'filter',
            throttle: zoom.throttle || 100,
            handleIcon: zoom.handleIcon,
            handleSize: zoom.handleSize || '100%',
            handleStyle: zoom.handleStyle,
            labelPrecision: zoom.labelPrecision || 'auto',
            labelFormatter: zoom.labelFormatter,
            showDetail: zoom.showDetail !== false,
            showDataShadow: zoom.showDataShadow || 'auto',
            moveHandleIcon: zoom.moveHandleIcon,
            moveHandleSize: zoom.moveHandleSize || 7,
            moveHandleStyle: zoom.moveHandleStyle,
            zoomLock: zoom.zoomLock || false,
            zoomOnMouseWheel: zoom.zoomOnMouseWheel !== false,
            moveOnMouseMove: zoom.moveOnMouseMove !== false,
            moveOnMouseWheel: zoom.moveOnMouseWheel || false,
            preventDefaultMouseMove: zoom.preventDefaultMouseMove !== false
        }));
    }

    /**
     * Build visual map configuration
     */
    buildVisualMap(visualMapConfig = []) {
        return visualMapConfig.map(vm => ({
            type: vm.type || 'continuous',
            show: vm.show !== false,
            min: vm.min || 0,
            max: vm.max || 100,
            range: vm.range,
            calculable: vm.calculable !== false,
            realtime: vm.realtime !== false,
            inverse: vm.inverse || false,
            precision: vm.precision || 0,
            itemWidth: vm.itemWidth || 20,
            itemHeight: vm.itemHeight || 140,
            align: vm.align || 'auto',
            text: vm.text,
            textGap: vm.textGap || 10,
            dimension: vm.dimension,
            seriesIndex: vm.seriesIndex,
            hoverLink: vm.hoverLink !== false,
            inRange: vm.inRange,
            outOfRange: vm.outOfRange,
            controller: vm.controller,
            zlevel: vm.zlevel || 0,
            z: vm.z || 4,
            left: vm.left || 'auto',
            top: vm.top || 'auto',
            right: vm.right || 'auto',
            bottom: vm.bottom || 'auto',
            orient: vm.orient || 'vertical',
            padding: vm.padding || 5,
            backgroundColor: vm.backgroundColor || 'transparent',
            borderColor: vm.borderColor || '#ccc',
            borderWidth: vm.borderWidth || 0,
            color: vm.color || ['#bf444c', '#d88273', '#f6efa6'],
            textStyle: {
                color: vm.textColor || '#333',
                fontSize: vm.textFontSize || 12
            },
            formatter: vm.formatter
        }));
    }

    /**
     * Build toolbox configuration
     */
    buildToolbox(toolboxConfig = {}) {
        return {
            show: toolboxConfig.show !== false,
            orient: toolboxConfig.orient || 'horizontal',
            itemSize: toolboxConfig.itemSize || 15,
            itemGap: toolboxConfig.itemGap || 10,
            showTitle: toolboxConfig.showTitle !== false,
            feature: {
                saveAsImage: toolboxConfig.saveAsImage !== false ? {
                    type: 'png',
                    name: toolboxConfig.imageName || 'chart',
                    backgroundColor: toolboxConfig.imageBackgroundColor || 'auto',
                    connectedBackgroundColor: toolboxConfig.connectedBackgroundColor || '#fff',
                    excludeComponents: toolboxConfig.excludeComponents || ['toolbox'],
                    show: true,
                    title: 'Save as Image',
                    icon: null,
                    iconStyle: {
                        borderColor: '#666',
                        borderWidth: 1
                    },
                    emphasis: {
                        iconStyle: {
                            borderColor: '#3E98C5'
                        }
                    },
                    pixelRatio: toolboxConfig.pixelRatio || 2
                } : null,
                restore: toolboxConfig.restore !== false ? {
                    show: true,
                    title: 'Restore',
                    icon: null,
                    iconStyle: {},
                    emphasis: {}
                } : null,
                dataView: toolboxConfig.dataView ? {
                    show: true,
                    title: 'Data View',
                    readOnly: toolboxConfig.dataViewReadOnly || false,
                    lang: toolboxConfig.dataViewLang || ['Data View', 'Close', 'Refresh'],
                    backgroundColor: toolboxConfig.dataViewBackgroundColor || '#fff',
                    textareaColor: toolboxConfig.dataViewTextareaColor || '#fff',
                    textareaBorderColor: toolboxConfig.dataViewTextareaBorderColor || '#333',
                    textColor: toolboxConfig.dataViewTextColor || '#000',
                    buttonColor: toolboxConfig.dataViewButtonColor || '#c23531',
                    buttonTextColor: toolboxConfig.dataViewButtonTextColor || '#fff'
                } : null,
                dataZoom: toolboxConfig.dataZoom ? {
                    show: true,
                    title: {
                        zoom: 'Zoom',
                        back: 'Zoom Reset'
                    },
                    icon: {},
                    iconStyle: {},
                    emphasis: {},
                    filterMode: toolboxConfig.dataZoomFilterMode || 'filter'
                } : null,
                magicType: toolboxConfig.magicType ? {
                    show: true,
                    type: toolboxConfig.magicTypeOptions || ['line', 'bar', 'stack'],
                    title: {
                        line: 'Line',
                        bar: 'Bar',
                        stack: 'Stack',
                        tiled: 'Tiled'
                    },
                    icon: {},
                    iconStyle: {},
                    emphasis: {}
                } : null,
                brush: toolboxConfig.brush ? {
                    type: toolboxConfig.brushType || ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                    icon: {},
                    title: {
                        rect: 'Rectangle Selection',
                        polygon: 'Polygon Selection',
                        lineX: 'Horizontal Selection',
                        lineY: 'Vertical Selection',
                        keep: 'Keep Selection',
                        clear: 'Clear Selection'
                    }
                } : null
            },
            iconStyle: {
                borderColor: toolboxConfig.iconBorderColor || '#666',
                borderWidth: toolboxConfig.iconBorderWidth || 1
            },
            emphasis: {
                iconStyle: {
                    borderColor: toolboxConfig.iconEmphasisBorderColor || '#3E98C5'
                }
            },
            zlevel: toolboxConfig.zlevel || 0,
            z: toolboxConfig.z || 2,
            left: toolboxConfig.left || 'auto',
            top: toolboxConfig.top || 'auto',
            right: toolboxConfig.right || 'auto',
            bottom: toolboxConfig.bottom || 'auto',
            width: toolboxConfig.width || 'auto',
            height: toolboxConfig.height || 'auto'
        };
    }

    /**
     * Build brush configuration
     */
    buildBrush(brushConfig = {}) {
        if (!brushConfig.enabled) return null;
        
        return {
            toolbox: brushConfig.toolbox || ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
            brushLink: brushConfig.brushLink || null,
            seriesIndex: brushConfig.seriesIndex || 'all',
            geoIndex: brushConfig.geoIndex || null,
            xAxisIndex: brushConfig.xAxisIndex || null,
            yAxisIndex: brushConfig.yAxisIndex || null,
            brushType: brushConfig.brushType || 'rect',
            brushMode: brushConfig.brushMode || 'single',
            transformable: brushConfig.transformable !== false,
            brushStyle: {
                borderWidth: brushConfig.borderWidth || 1,
                color: brushConfig.color || 'rgba(120,140,180,0.3)',
                borderColor: brushConfig.borderColor || 'rgba(120,140,180,0.8)'
            },
            throttleType: brushConfig.throttleType || 'fixRate',
            throttleDelay: brushConfig.throttleDelay || 0,
            removeOnClick: brushConfig.removeOnClick !== false,
            inBrush: brushConfig.inBrush || {},
            outOfBrush: brushConfig.outOfBrush || {},
            z: brushConfig.z || 10000
        };
    }

    /**
     * Build timeline configuration
     */
    buildTimeline(timelineConfig = {}) {
        if (!timelineConfig.enabled) return null;
        
        return {
            show: timelineConfig.show !== false,
            type: timelineConfig.type || 'slider',
            axisType: timelineConfig.axisType || 'time',
            currentIndex: timelineConfig.currentIndex || 0,
            autoPlay: timelineConfig.autoPlay || false,
            rewind: timelineConfig.rewind || false,
            loop: timelineConfig.loop !== false,
            playInterval: timelineConfig.playInterval || 2000,
            realtime: timelineConfig.realtime !== false,
            replaceMerge: timelineConfig.replaceMerge || undefined,
            controlPosition: timelineConfig.controlPosition || 'left',
            zlevel: timelineConfig.zlevel || 0,
            z: timelineConfig.z || 2,
            left: timelineConfig.left || '10%',
            top: timelineConfig.top || 'auto',
            right: timelineConfig.right || '10%',
            bottom: timelineConfig.bottom || 0,
            padding: timelineConfig.padding || 5,
            orient: timelineConfig.orient || 'horizontal',
            inverse: timelineConfig.inverse || false,
            symbol: timelineConfig.symbol || 'emptyCircle',
            symbolSize: timelineConfig.symbolSize || 10,
            symbolRotate: timelineConfig.symbolRotate,
            symbolKeepAspect: timelineConfig.symbolKeepAspect || false,
            symbolOffset: timelineConfig.symbolOffset || [0, 0],
            lineStyle: {
                show: true,
                width: timelineConfig.lineWidth || 2,
                color: timelineConfig.lineColor || '#304654'
            },
            label: {
                position: timelineConfig.labelPosition || 'auto',
                show: timelineConfig.showLabel !== false,
                interval: timelineConfig.labelInterval || 'auto',
                rotate: timelineConfig.labelRotate || 0,
                formatter: timelineConfig.labelFormatter,
                color: timelineConfig.labelColor || '#304654',
                fontSize: timelineConfig.labelFontSize || 12,
                fontWeight: timelineConfig.labelFontWeight || 'normal',
                fontFamily: timelineConfig.labelFontFamily || 'sans-serif'
            },
            itemStyle: {
                color: timelineConfig.itemColor || '#304654',
                borderColor: timelineConfig.itemBorderColor || '#304654',
                borderWidth: timelineConfig.itemBorderWidth || 1
            },
            checkpointStyle: {
                symbol: timelineConfig.checkpointSymbol || 'circle',
                symbolSize: timelineConfig.checkpointSymbolSize || 13,
                symbolRotate: timelineConfig.checkpointSymbolRotate,
                symbolKeepAspect: timelineConfig.checkpointSymbolKeepAspect || false,
                symbolOffset: timelineConfig.checkpointSymbolOffset,
                color: timelineConfig.checkpointColor || '#c23531',
                borderColor: timelineConfig.checkpointBorderColor || 'rgba(194,53,49,0.5)',
                borderWidth: timelineConfig.checkpointBorderWidth || 5,
                animation: timelineConfig.checkpointAnimation !== false,
                animationDuration: timelineConfig.checkpointAnimationDuration || 300,
                animationEasing: timelineConfig.checkpointAnimationEasing || 'quinticInOut'
            },
            controlStyle: {
                show: timelineConfig.showControl !== false,
                showPlayBtn: timelineConfig.showPlayBtn !== false,
                showPrevBtn: timelineConfig.showPrevBtn !== false,
                showNextBtn: timelineConfig.showNextBtn !== false,
                itemSize: timelineConfig.controlItemSize || 22,
                itemGap: timelineConfig.controlItemGap || 12,
                position: timelineConfig.controlPosition || 'left',
                playIcon: timelineConfig.playIcon,
                stopIcon: timelineConfig.stopIcon,
                prevIcon: timelineConfig.prevIcon,
                nextIcon: timelineConfig.nextIcon,
                color: timelineConfig.controlColor || '#304654',
                borderColor: timelineConfig.controlBorderColor || '#304654',
                borderWidth: timelineConfig.controlBorderWidth || 1
            },
            emphasis: {
                label: {
                    show: true,
                    color: timelineConfig.emphasisLabelColor || '#c23531'
                },
                itemStyle: {
                    color: timelineConfig.emphasisItemColor || '#c23531'
                },
                checkpointStyle: {
                    color: timelineConfig.emphasisCheckpointColor || '#c23531',
                    borderColor: timelineConfig.emphasisCheckpointBorderColor || 'rgba(194,53,49,0.5)'
                },
                controlStyle: {
                    color: timelineConfig.emphasisControlColor || '#c23531',
                    borderColor: timelineConfig.emphasisControlBorderColor || '#c23531',
                    borderWidth: timelineConfig.emphasisControlBorderWidth || 2
                }
            },
            data: timelineConfig.data || []
        };
    }

    /**
     * Build graphic configuration
     */
    buildGraphic(graphicConfig = []) {
        return graphicConfig.map(graphic => ({
            type: graphic.type || 'group',
            id: graphic.id,
            $action: graphic.$action || 'merge',
            left: graphic.left,
            right: graphic.right,
            top: graphic.top,
            bottom: graphic.bottom,
            bounding: graphic.bounding || 'all',
            z: graphic.z || 0,
            zlevel: graphic.zlevel || 0,
            silent: graphic.silent || false,
            invisible: graphic.invisible || false,
            cursor: graphic.cursor || 'pointer',
            draggable: graphic.draggable || false,
            progressive: graphic.progressive || false,
            width: graphic.width,
            height: graphic.height,
            children: graphic.children,
            onclick: graphic.onclick,
            onmouseover: graphic.onmouseover,
            onmouseout: graphic.onmouseout,
            onmousemove: graphic.onmousemove,
            onmousewheel: graphic.onmousewheel,
            onmousedown: graphic.onmousedown,
            onmouseup: graphic.onmouseup,
            ondrag: graphic.ondrag,
            ondragstart: graphic.ondragstart,
            ondragend: graphic.ondragend,
            ondragenter: graphic.ondragenter,
            ondragleave: graphic.ondragleave,
            ondragover: graphic.ondragover,
            ondrop: graphic.ondrop
        }));
    }

    /**
     * Build calendar configuration
     */
    buildCalendar(calendarConfig = {}) {
        if (!calendarConfig.enabled) return null;
        
        return {
            zlevel: calendarConfig.zlevel || 0,
            z: calendarConfig.z || 2,
            left: calendarConfig.left || 80,
            top: calendarConfig.top || 60,
            right: calendarConfig.right || 'auto',
            bottom: calendarConfig.bottom || 'auto',
            width: calendarConfig.width || 'auto',
            height: calendarConfig.height || 'auto',
            range: calendarConfig.range,
            cellSize: calendarConfig.cellSize || ['auto', 20],
            orient: calendarConfig.orient || 'horizontal',
            splitLine: {
                show: calendarConfig.showSplitLine !== false,
                lineStyle: {
                    color: calendarConfig.splitLineColor || '#000',
                    width: calendarConfig.splitLineWidth || 1,
                    type: calendarConfig.splitLineType || 'solid'
                }
            },
            itemStyle: {
                color: calendarConfig.itemColor || '#fff',
                borderColor: calendarConfig.itemBorderColor || '#ccc',
                borderWidth: calendarConfig.itemBorderWidth || 1
            },
            dayLabel: {
                show: calendarConfig.showDayLabel !== false,
                firstDay: calendarConfig.firstDay || 0,
                margin: calendarConfig.dayLabelMargin || 0,
                position: calendarConfig.dayLabelPosition || 'start',
                nameMap: calendarConfig.dayLabelNameMap || 'en',
                color: calendarConfig.dayLabelColor || '#000',
                fontSize: calendarConfig.dayLabelFontSize || 12,
                fontWeight: calendarConfig.dayLabelFontWeight || 'normal',
                fontFamily: calendarConfig.dayLabelFontFamily || 'sans-serif'
            },
            monthLabel: {
                show: calendarConfig.showMonthLabel !== false,
                align: calendarConfig.monthLabelAlign,
                margin: calendarConfig.monthLabelMargin || 0,
                position: calendarConfig.monthLabelPosition || 'start',
                nameMap: calendarConfig.monthLabelNameMap || 'en',
                formatter: calendarConfig.monthLabelFormatter,
                color: calendarConfig.monthLabelColor || '#000',
                fontSize: calendarConfig.monthLabelFontSize || 12,
                fontWeight: calendarConfig.monthLabelFontWeight || 'normal',
                fontFamily: calendarConfig.monthLabelFontFamily || 'sans-serif'
            },
            yearLabel: {
                show: calendarConfig.showYearLabel !== false,
                margin: calendarConfig.yearLabelMargin || 30,
                position: calendarConfig.yearLabelPosition,
                formatter: calendarConfig.yearLabelFormatter,
                color: calendarConfig.yearLabelColor || '#ccc',
                fontSize: calendarConfig.yearLabelFontSize || 12,
                fontWeight: calendarConfig.yearLabelFontWeight || 'normal',
                fontFamily: calendarConfig.yearLabelFontFamily || 'sans-serif'
            },
            silent: calendarConfig.silent || false
        };
    }

    /**
     * Build aria configuration for accessibility
     */
    buildAria(ariaConfig = {}) {
        return {
            enabled: ariaConfig.enabled !== false,
            label: {
                enabled: ariaConfig.labelEnabled !== false,
                description: ariaConfig.description,
                general: {
                    withTitle: ariaConfig.withTitle || 'This is a chart about "{title}"',
                    withoutTitle: ariaConfig.withoutTitle || 'This is a chart'
                },
                series: {
                    single: ariaConfig.seriesSingle,
                    multiple: ariaConfig.seriesMultiple
                },
                data: {
                    allData: ariaConfig.dataAllData,
                    partialData: ariaConfig.dataPartialData,
                    withName: ariaConfig.dataWithName,
                    withoutName: ariaConfig.dataWithoutName,
                    separator: ariaConfig.dataSeparator || ', '
                }
            },
            decal: {
                show: ariaConfig.decalShow || false,
                decals: ariaConfig.decals
            }
        };
    }

    /**
     * Build responsive configuration
     */
    buildResponsiveConfig(responsiveConfig = []) {
        return responsiveConfig.map(config => ({
            query: config.query || {},
            option: config.option || {}
        }));
    }

    /**
     * Apply data processors to series
     */
    applyDataProcessors(series, processors) {
        return series.map(s => {
            let processedData = s.data;
            
            processors.forEach(processor => {
                const processorFunc = this.dataProcessors.get(processor.type);
                if (processorFunc) {
                    processedData = processorFunc.process(processedData, ...processor.params);
                }
            });
            
            return {
                ...s,
                data: processedData
            };
        });
    }
}

/**
 * Performance Monitor Class
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.thresholds = {
            renderTime: 100,
            dataProcessing: 50,
            memoryUsage: 100 * 1024 * 1024
        };
    }

    /**
     * Start performance measurement
     */
    startMeasure(name) {
        this.metrics.set(name, {
            start: performance.now(),
            memory: performance.memory ? performance.memory.usedJSHeapSize : 0
        });
    }

    /**
     * End performance measurement
     */
    endMeasure(name) {
        const metric = this.metrics.get(name);
        if (metric) {
            const duration = performance.now() - metric.start;
            const memoryDelta = performance.memory ? 
                performance.memory.usedJSHeapSize - metric.memory : 0;
            
            this.metrics.set(name, {
                ...metric,
                duration,
                memoryDelta,
                timestamp: Date.now()
            });
            
            this.checkThresholds(name, duration, memoryDelta);
            
            return { duration, memoryDelta };
        }
        return null;
    }

    /**
     * Check performance thresholds
     */
    checkThresholds(name, duration, memoryDelta) {
        if (duration > this.thresholds.renderTime) {
            console.warn(`Performance warning: ${name} took ${duration.toFixed(2)}ms`);
        }
        
        if (memoryDelta > this.thresholds.memoryUsage) {
            console.warn(`Memory warning: ${name} used ${(memoryDelta / 1024 / 1024).toFixed(2)}MB`);
        }
    }

    /**
     * Get performance report
     */
    getReport() {
        const report = {};
        this.metrics.forEach((metric, name) => {
            if (metric.duration !== undefined) {
                report[name] = {
                    duration: `${metric.duration.toFixed(2)}ms`,
                    memory: `${(metric.memoryDelta / 1024 / 1024).toFixed(2)}MB`,
                    timestamp: new Date(metric.timestamp).toISOString()
                };
            }
        });
        return report;
    }

    /**
     * Clear metrics
     */
    clearMetrics() {
        this.metrics.clear();
    }
}

// Export ChartEngine
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartEngine;
} else {
    window.ChartEngine = ChartEngine;
}