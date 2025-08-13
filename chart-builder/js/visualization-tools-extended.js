/**
 * Extended Visualization Tools Library - Part 2
 * Comprehensive tools for advanced chart customization
 * Continues from visualization-tools.js
 */

(function(global) {
    'use strict';

    // Get reference to main VisualizationTools or create new
    const VisualizationTools = global.VisualizationTools || {};

    // =====================================================================
    // ORIENTATION CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Orientation = {
        // Chart orientation tools
        chart: {
            setPortrait: function(chart) {
                chart.chart = chart.chart || {};
                if (chart.chart.width > chart.chart.height) {
                    const temp = chart.chart.width;
                    chart.chart.width = chart.chart.height;
                    chart.chart.height = temp;
                }
                return this;
            },
            setLandscape: function(chart) {
                chart.chart = chart.chart || {};
                if (chart.chart.height > chart.chart.width) {
                    const temp = chart.chart.width;
                    chart.chart.width = chart.chart.height;
                    chart.chart.height = temp;
                }
                return this;
            },
            setSquare: function(chart, size) {
                chart.chart = chart.chart || {};
                chart.chart.width = size;
                chart.chart.height = size;
                return this;
            },
            setInverted: function(chart, inverted = true) {
                chart.chart = chart.chart || {};
                chart.chart.inverted = inverted;
                return this;
            },
            setPolar: function(chart, polar = true) {
                chart.chart = chart.chart || {};
                chart.chart.polar = polar;
                return this;
            },
            set3D: function(chart, enabled = true) {
                chart.chart = chart.chart || {};
                chart.chart.options3d = {
                    enabled: enabled,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                };
                return this;
            },
            setRotation: function(chart, angle) {
                chart.chart = chart.chart || {};
                chart.chart.rotation = angle;
                return this;
            },
            setSkew: function(chart, x, y) {
                chart.chart = chart.chart || {};
                chart.chart.skewX = x;
                chart.chart.skewY = y;
                return this;
            },
            setPerspective: function(chart, perspective) {
                chart.chart = chart.chart || {};
                chart.chart.perspective = perspective;
                return this;
            },
            setFlip: function(chart, horizontal = false, vertical = false) {
                chart.chart = chart.chart || {};
                if (horizontal) chart.chart.scaleX = -1;
                if (vertical) chart.chart.scaleY = -1;
                return this;
            },
            setTransform: function(chart, transform) {
                chart.chart = chart.chart || {};
                chart.chart.transform = transform;
                return this;
            },
            setMatrix: function(chart, matrix) {
                chart.chart = chart.chart || {};
                chart.chart.transformMatrix = matrix;
                return this;
            },
            setViewBox: function(chart, x, y, width, height) {
                chart.chart = chart.chart || {};
                chart.chart.viewBox = `${x} ${y} ${width} ${height}`;
                return this;
            },
            setAspectRatio: function(chart, ratio) {
                chart.chart = chart.chart || {};
                chart.chart.aspectRatio = ratio;
                return this;
            },
            setOrientation: function(chart, orientation) {
                chart.chart = chart.chart || {};
                chart.chart.orientation = orientation;
                return this;
            },
            setDirection: function(chart, direction) {
                chart.chart = chart.chart || {};
                chart.chart.direction = direction; // 'ltr', 'rtl'
                return this;
            },
            setProjection: function(chart, projection) {
                chart.chart = chart.chart || {};
                chart.chart.projection = projection;
                return this;
            },
            setCoordinateSystem: function(chart, system) {
                chart.chart = chart.chart || {};
                chart.chart.coordinateSystem = system; // 'cartesian', 'polar', 'geographic'
                return this;
            },
            setRadialAxis: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.radialAxis = enabled;
                return this;
            },
            setAngularAxis: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.angularAxis = enabled;
                return this;
            }
        },

        // Series orientation tools
        series: {
            setVertical: function(series) {
                series.type = series.type || 'column';
                if (series.type === 'bar') series.type = 'column';
                return this;
            },
            setHorizontal: function(series) {
                series.type = series.type || 'bar';
                if (series.type === 'column') series.type = 'bar';
                return this;
            },
            setStacked: function(series, stacking = 'normal') {
                series.stacking = stacking; // 'normal', 'percent', null
                return this;
            },
            setGrouped: function(series) {
                series.stacking = null;
                return this;
            },
            setOverlapping: function(series, overlap) {
                series.groupPadding = -overlap;
                return this;
            },
            setRadial: function(series) {
                series.type = 'column';
                series.polar = true;
                return this;
            },
            setCircular: function(series) {
                series.type = 'pie';
                return this;
            },
            setSpiral: function(series) {
                series.type = 'spiral';
                return this;
            },
            setTreemap: function(series) {
                series.type = 'treemap';
                return this;
            },
            setSunburst: function(series) {
                series.type = 'sunburst';
                return this;
            },
            setPackedBubble: function(series) {
                series.type = 'packedbubble';
                return this;
            },
            setNetworkGraph: function(series) {
                series.type = 'networkgraph';
                return this;
            },
            setSankey: function(series) {
                series.type = 'sankey';
                return this;
            },
            setDependencyWheel: function(series) {
                series.type = 'dependencywheel';
                return this;
            },
            setOrganization: function(series) {
                series.type = 'organization';
                return this;
            },
            setVenn: function(series) {
                series.type = 'venn';
                return this;
            },
            setWordcloud: function(series) {
                series.type = 'wordcloud';
                return this;
            },
            setTimeline: function(series) {
                series.type = 'timeline';
                return this;
            },
            setParallel: function(series) {
                series.type = 'parallel';
                return this;
            },
            setStreamgraph: function(series) {
                series.type = 'streamgraph';
                return this;
            }
        },

        // Label orientation tools
        label: {
            setRotation: function(labels, angle) {
                labels.rotation = angle;
                return this;
            },
            setAutoRotation: function(labels, angles) {
                labels.autoRotation = angles || [-45, -90];
                return this;
            },
            setStaggered: function(labels, lines = 2) {
                labels.staggerLines = lines;
                return this;
            },
            setVertical: function(labels) {
                labels.rotation = -90;
                labels.align = 'right';
                return this;
            },
            setHorizontal: function(labels) {
                labels.rotation = 0;
                labels.align = 'center';
                return this;
            },
            setDiagonal: function(labels, angle = 45) {
                labels.rotation = -angle;
                labels.align = angle > 0 ? 'right' : 'left';
                return this;
            },
            setRadial: function(labels) {
                labels.useRadialAlignment = true;
                return this;
            },
            setTangential: function(labels) {
                labels.tangential = true;
                return this;
            },
            setFollowPointer: function(labels) {
                labels.followPointer = true;
                return this;
            },
            setFollowTouchMove: function(labels) {
                labels.followTouchMove = true;
                return this;
            },
            setCircular: function(labels, radius) {
                labels.circular = true;
                labels.circularRadius = radius;
                return this;
            },
            setCurved: function(labels, curve) {
                labels.curved = true;
                labels.curveFactor = curve;
                return this;
            },
            setSpiral: function(labels, spiralFactor) {
                labels.spiral = true;
                labels.spiralFactor = spiralFactor;
                return this;
            },
            setWave: function(labels, amplitude, frequency) {
                labels.wave = true;
                labels.waveAmplitude = amplitude;
                labels.waveFrequency = frequency;
                return this;
            },
            setZigzag: function(labels, amplitude) {
                labels.zigzag = true;
                labels.zigzagAmplitude = amplitude;
                return this;
            },
            setRandom: function(labels, range) {
                labels.random = true;
                labels.randomRange = range;
                return this;
            },
            setDistributed: function(labels, distribution) {
                labels.distributed = true;
                labels.distribution = distribution;
                return this;
            },
            setAlternating: function(labels) {
                labels.alternating = true;
                return this;
            },
            setSkewed: function(labels, skewX, skewY) {
                labels.skewX = skewX;
                labels.skewY = skewY;
                return this;
            }
        }
    };

    // =====================================================================
    // AXIS CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Axis = {
        // X-Axis tools
        xAxis: {
            setType: function(chart, type) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.type = type; // 'linear', 'logarithmic', 'datetime', 'category'
                return this;
            },
            setTitle: function(chart, title, style) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.title = {
                    text: title,
                    style: style || {}
                };
                return this;
            },
            setMin: function(chart, min) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.min = min;
                return this;
            },
            setMax: function(chart, max) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.max = max;
                return this;
            },
            setRange: function(chart, min, max) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.min = min;
                chart.xAxis.max = max;
                return this;
            },
            setTickInterval: function(chart, interval) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickInterval = interval;
                return this;
            },
            setTickAmount: function(chart, amount) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickAmount = amount;
                return this;
            },
            setTickPositions: function(chart, positions) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickPositions = positions;
                return this;
            },
            setTickWidth: function(chart, width) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickWidth = width;
                return this;
            },
            setTickLength: function(chart, length) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickLength = length;
                return this;
            },
            setTickColor: function(chart, color) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickColor = color;
                return this;
            },
            setLineWidth: function(chart, width) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.lineWidth = width;
                return this;
            },
            setLineColor: function(chart, color) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.lineColor = color;
                return this;
            },
            setGridLineWidth: function(chart, width) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.gridLineWidth = width;
                return this;
            },
            setGridLineColor: function(chart, color) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.gridLineColor = color;
                return this;
            },
            setGridLineDashStyle: function(chart, style) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.gridLineDashStyle = style; // 'Solid', 'Dash', 'Dot', 'DashDot'
                return this;
            },
            setMinorTicks: function(chart, enabled) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.minorTicks = enabled;
                return this;
            },
            setMinorTickInterval: function(chart, interval) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.minorTickInterval = interval;
                return this;
            },
            setMinorGridLines: function(chart, enabled) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.minorGridLineWidth = enabled ? 1 : 0;
                return this;
            },
            setReversed: function(chart, reversed) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.reversed = reversed;
                return this;
            },
            setOpposite: function(chart, opposite) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.opposite = opposite;
                return this;
            },
            setOffset: function(chart, offset) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.offset = offset;
                return this;
            },
            setStartOnTick: function(chart, start) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.startOnTick = start;
                return this;
            },
            setEndOnTick: function(chart, end) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.endOnTick = end;
                return this;
            },
            setShowFirstLabel: function(chart, show) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.showFirstLabel = show;
                return this;
            },
            setShowLastLabel: function(chart, show) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.showLastLabel = show;
                return this;
            },
            setCrosshair: function(chart, enabled, options) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.crosshair = enabled ? (options || true) : false;
                return this;
            },
            setPlotBands: function(chart, bands) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.plotBands = bands;
                return this;
            },
            setPlotLines: function(chart, lines) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.plotLines = lines;
                return this;
            },
            setBreaks: function(chart, breaks) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.breaks = breaks;
                return this;
            },
            setCategories: function(chart, categories) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.categories = categories;
                return this;
            },
            setLabels: function(chart, options) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.labels = options;
                return this;
            },
            setDateTimeLabelFormats: function(chart, formats) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.dateTimeLabelFormats = formats;
                return this;
            },
            setUnits: function(chart, units) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.units = units;
                return this;
            },
            setAllowDecimals: function(chart, allow) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.allowDecimals = allow;
                return this;
            },
            setAlternateGridColor: function(chart, color) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.alternateGridColor = color;
                return this;
            },
            setAngle: function(chart, angle) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.angle = angle;
                return this;
            },
            setCeiling: function(chart, ceiling) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.ceiling = ceiling;
                return this;
            },
            setFloor: function(chart, floor) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.floor = floor;
                return this;
            },
            setSoftMin: function(chart, softMin) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.softMin = softMin;
                return this;
            },
            setSoftMax: function(chart, softMax) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.softMax = softMax;
                return this;
            },
            setTickPixelInterval: function(chart, interval) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickPixelInterval = interval;
                return this;
            },
            setTickmarkPlacement: function(chart, placement) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.tickmarkPlacement = placement; // 'on', 'between'
                return this;
            },
            setUniqueNames: function(chart, unique) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.uniqueNames = unique;
                return this;
            },
            setVisible: function(chart, visible) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.visible = visible;
                return this;
            },
            setAccessibility: function(chart, options) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.accessibility = options;
                return this;
            },
            setPanning: function(chart, enabled) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.panningEnabled = enabled;
                return this;
            },
            setZoomEnabled: function(chart, enabled) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.zoomEnabled = enabled;
                return this;
            },
            setScrollbar: function(chart, enabled, options) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.scrollbar = enabled ? (options || {enabled: true}) : {enabled: false};
                return this;
            },
            setMinRange: function(chart, minRange) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.minRange = minRange;
                return this;
            },
            setMaxPadding: function(chart, padding) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.maxPadding = padding;
                return this;
            },
            setMinPadding: function(chart, padding) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.minPadding = padding;
                return this;
            },
            setOrdinal: function(chart, ordinal) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.ordinal = ordinal;
                return this;
            },
            setOverscroll: function(chart, overscroll) {
                chart.xAxis = chart.xAxis || {};
                chart.xAxis.overscroll = overscroll;
                return this;
            }
        },

        // Y-Axis tools (similar to X-Axis with additional features)
        yAxis: {
            setType: function(chart, type) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.type = type;
                return this;
            },
            setTitle: function(chart, title, style) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.title = {
                    text: title,
                    style: style || {}
                };
                return this;
            },
            setMin: function(chart, min) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.min = min;
                return this;
            },
            setMax: function(chart, max) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.max = max;
                return this;
            },
            setRange: function(chart, min, max) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.min = min;
                chart.yAxis.max = max;
                return this;
            },
            setStackLabels: function(chart, enabled, options) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.stackLabels = {
                    enabled: enabled,
                    ...options
                };
                return this;
            },
            setLogarithmic: function(chart, base = 10) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.type = 'logarithmic';
                chart.yAxis.minorTickInterval = 0.1;
                return this;
            },
            setPercentage: function(chart) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.labels = {
                    format: '{value}%'
                };
                return this;
            },
            setCurrency: function(chart, symbol = '$') {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.labels = {
                    format: symbol + '{value}'
                };
                return this;
            },
            setScientific: function(chart) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.labels = {
                    formatter: function() {
                        return this.value.toExponential(2);
                    }
                };
                return this;
            },
            setCustomFormatter: function(chart, formatter) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.labels = {
                    formatter: formatter
                };
                return this;
            },
            setHeight: function(chart, height) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.height = height;
                return this;
            },
            setTop: function(chart, top) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.top = top;
                return this;
            },
            setShowEmpty: function(chart, show) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.showEmpty = show;
                return this;
            },
            setPane: function(chart, pane) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.pane = pane;
                return this;
            },
            setGridLineInterpolation: function(chart, interpolation) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.gridLineInterpolation = interpolation; // 'circle', 'polygon'
                return this;
            },
            setMaxColor: function(chart, color) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.maxColor = color;
                return this;
            },
            setMinColor: function(chart, color) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.minColor = color;
                return this;
            },
            setStops: function(chart, stops) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.stops = stops;
                return this;
            },
            setReversedStacks: function(chart, reversed) {
                chart.yAxis = chart.yAxis || {};
                chart.yAxis.reversedStacks = reversed;
                return this;
            }
        },

        // Z-Axis tools (for 3D charts)
        zAxis: {
            setEnabled: function(chart, enabled) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.enabled = enabled;
                return this;
            },
            setMin: function(chart, min) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.min = min;
                return this;
            },
            setMax: function(chart, max) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.max = max;
                return this;
            },
            setDepth: function(chart, depth) {
                chart.chart = chart.chart || {};
                chart.chart.options3d = chart.chart.options3d || {};
                chart.chart.options3d.depth = depth;
                return this;
            },
            setTitle: function(chart, title) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.title = {
                    text: title
                };
                return this;
            },
            setLabels: function(chart, options) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.labels = options;
                return this;
            },
            setGridLines: function(chart, enabled) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.gridLineWidth = enabled ? 1 : 0;
                return this;
            },
            setTickInterval: function(chart, interval) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.tickInterval = interval;
                return this;
            },
            setCategories: function(chart, categories) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.categories = categories;
                return this;
            },
            setReversed: function(chart, reversed) {
                chart.zAxis = chart.zAxis || {};
                chart.zAxis.reversed = reversed;
                return this;
            }
        },

        // Color axis tools (for heatmaps, etc.)
        colorAxis: {
            setMin: function(chart, min) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.min = min;
                return this;
            },
            setMax: function(chart, max) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.max = max;
                return this;
            },
            setMinColor: function(chart, color) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.minColor = color;
                return this;
            },
            setMaxColor: function(chart, color) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.maxColor = color;
                return this;
            },
            setStops: function(chart, stops) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.stops = stops;
                return this;
            },
            setType: function(chart, type) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.type = type; // 'linear', 'logarithmic'
                return this;
            },
            setLabels: function(chart, options) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.labels = options;
                return this;
            },
            setMarker: function(chart, options) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.marker = options;
                return this;
            },
            setDataClasses: function(chart, dataClasses) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.dataClasses = dataClasses;
                return this;
            },
            setDataClassColor: function(chart, color) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.dataClassColor = color;
                return this;
            },
            setShowInLegend: function(chart, show) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.showInLegend = show;
                return this;
            },
            setLayout: function(chart, layout) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.layout = layout; // 'horizontal', 'vertical'
                return this;
            },
            setReversed: function(chart, reversed) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.reversed = reversed;
                return this;
            },
            setStartOnTick: function(chart, start) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.startOnTick = start;
                return this;
            },
            setEndOnTick: function(chart, end) {
                chart.colorAxis = chart.colorAxis || {};
                chart.colorAxis.endOnTick = end;
                return this;
            }
        },

        // Multiple axes tools
        multiple: {
            addAxis: function(chart, axis, options) {
                const axisType = axis + 'Axis';
                if (!Array.isArray(chart[axisType])) {
                    chart[axisType] = chart[axisType] ? [chart[axisType]] : [];
                }
                chart[axisType].push(options);
                return chart[axisType].length - 1; // Return index
            },
            removeAxis: function(chart, axis, index) {
                const axisType = axis + 'Axis';
                if (Array.isArray(chart[axisType])) {
                    chart[axisType].splice(index, 1);
                }
                return this;
            },
            linkAxes: function(chart, axis1, axis2) {
                axis1.linkedTo = chart[axis2];
                return this;
            },
            syncAxes: function(chart, axes) {
                axes.forEach(axis => {
                    axis.linkedTo = axes[0];
                });
                return this;
            },
            setAxisGroup: function(chart, axes, group) {
                axes.forEach(axis => {
                    axis.group = group;
                });
                return this;
            },
            distributeAxes: function(chart, axes, spacing) {
                let offset = 0;
                axes.forEach(axis => {
                    axis.offset = offset;
                    offset += spacing;
                });
                return this;
            }
        },

        // Parallel axes tools
        parallelAxes: {
            setEnabled: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.parallelCoordinates = enabled;
                return this;
            },
            setAxes: function(chart, axes) {
                chart.parallelAxes = axes;
                return this;
            },
            setLineWidth: function(chart, width) {
                chart.parallelAxes = chart.parallelAxes || [];
                chart.parallelAxes.forEach(axis => {
                    axis.lineWidth = width;
                });
                return this;
            },
            setLineColor: function(chart, color) {
                chart.parallelAxes = chart.parallelAxes || [];
                chart.parallelAxes.forEach(axis => {
                    axis.lineColor = color;
                });
                return this;
            }
        }
    };

    // =====================================================================
    // BACKGROUND CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Background = {
        // Chart background tools
        chart: {
            setColor: function(chart, color) {
                chart.chart = chart.chart || {};
                chart.chart.backgroundColor = color;
                return this;
            },
            setGradient: function(chart, gradient) {
                chart.chart = chart.chart || {};
                chart.chart.backgroundColor = gradient;
                return this;
            },
            setImage: function(chart, imageUrl) {
                chart.chart = chart.chart || {};
                chart.chart.backgroundColor = null;
                chart.chart.plotBackgroundImage = imageUrl;
                return this;
            },
            setPattern: function(chart, pattern) {
                chart.chart = chart.chart || {};
                chart.chart.backgroundColor = {
                    pattern: pattern
                };
                return this;
            },
            setOpacity: function(chart, opacity) {
                chart.chart = chart.chart || {};
                chart.chart.backgroundColor = chart.chart.backgroundColor || '#FFFFFF';
                if (typeof chart.chart.backgroundColor === 'string') {
                    chart.chart.backgroundColor += Math.round(opacity * 255).toString(16).padStart(2, '0');
                }
                return this;
            },
            setBorderColor: function(chart, color) {
                chart.chart = chart.chart || {};
                chart.chart.borderColor = color;
                return this;
            },
            setBorderWidth: function(chart, width) {
                chart.chart = chart.chart || {};
                chart.chart.borderWidth = width;
                return this;
            },
            setBorderRadius: function(chart, radius) {
                chart.chart = chart.chart || {};
                chart.chart.borderRadius = radius;
                return this;
            },
            setShadow: function(chart, shadow) {
                chart.chart = chart.chart || {};
                chart.chart.shadow = shadow;
                return this;
            },
            setClassName: function(chart, className) {
                chart.chart = chart.chart || {};
                chart.chart.className = className;
                return this;
            },
            setStyle: function(chart, style) {
                chart.chart = chart.chart || {};
                chart.chart.style = style;
                return this;
            },
            setSelectionMarkerFill: function(chart, color) {
                chart.chart = chart.chart || {};
                chart.chart.selectionMarkerFill = color;
                return this;
            },
            setResetZoomButton: function(chart, options) {
                chart.chart = chart.chart || {};
                chart.chart.resetZoomButton = options;
                return this;
            },
            setPanKey: function(chart, key) {
                chart.chart = chart.chart || {};
                chart.chart.panKey = key; // 'shift', 'ctrl', 'alt'
                return this;
            },
            setPanning: function(chart, enabled, type) {
                chart.chart = chart.chart || {};
                chart.chart.panning = {
                    enabled: enabled,
                    type: type // 'x', 'y', 'xy'
                };
                return this;
            },
            setZoomType: function(chart, type) {
                chart.chart = chart.chart || {};
                chart.chart.zoomType = type; // 'x', 'y', 'xy'
                return this;
            },
            setZoomKey: function(chart, key) {
                chart.chart = chart.chart || {};
                chart.chart.zoomKey = key; // 'shift', 'ctrl', 'alt'
                return this;
            },
            setParallelCoordinates: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.parallelCoordinates = enabled;
                return this;
            },
            setParallelAxes: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.parallelAxes = enabled;
                return this;
            }
        },

        // Plot area background tools
        plotArea: {
            setBackgroundColor: function(chart, color) {
                chart.chart = chart.chart || {};
                chart.chart.plotBackgroundColor = color;
                return this;
            },
            setBackgroundImage: function(chart, imageUrl) {
                chart.chart = chart.chart || {};
                chart.chart.plotBackgroundImage = imageUrl;
                return this;
            },
            setBorderColor: function(chart, color) {
                chart.chart = chart.chart || {};
                chart.chart.plotBorderColor = color;
                return this;
            },
            setBorderWidth: function(chart, width) {
                chart.chart = chart.chart || {};
                chart.chart.plotBorderWidth = width;
                return this;
            },
            setShadow: function(chart, shadow) {
                chart.chart = chart.chart || {};
                chart.chart.plotShadow = shadow;
                return this;
            },
            setClip: function(chart, clip) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.series = chart.plotOptions.series || {};
                chart.plotOptions.series.clip = clip;
                return this;
            },
            setMask: function(chart, mask) {
                chart.chart = chart.chart || {};
                chart.chart.plotMask = mask;
                return this;
            },
            setFilter: function(chart, filter) {
                chart.chart = chart.chart || {};
                chart.chart.plotFilter = filter;
                return this;
            },
            setBlendMode: function(chart, mode) {
                chart.chart = chart.chart || {};
                chart.chart.plotBlendMode = mode;
                return this;
            },
            setOpacity: function(chart, opacity) {
                chart.chart = chart.chart || {};
                chart.chart.plotOpacity = opacity;
                return this;
            }
        },

        // Pane background (for polar/gauge charts)
        pane: {
            setBackground: function(chart, backgrounds) {
                chart.pane = chart.pane || {};
                chart.pane.background = backgrounds;
                return this;
            },
            setCenter: function(chart, center) {
                chart.pane = chart.pane || {};
                chart.pane.center = center;
                return this;
            },
            setSize: function(chart, size) {
                chart.pane = chart.pane || {};
                chart.pane.size = size;
                return this;
            },
            setStartAngle: function(chart, angle) {
                chart.pane = chart.pane || {};
                chart.pane.startAngle = angle;
                return this;
            },
            setEndAngle: function(chart, angle) {
                chart.pane = chart.pane || {};
                chart.pane.endAngle = angle;
                return this;
            },
            setInnerSize: function(chart, size) {
                chart.pane = chart.pane || {};
                chart.pane.innerSize = size;
                return this;
            },
            setBorderWidth: function(chart, width) {
                chart.pane = chart.pane || {};
                chart.pane.background = chart.pane.background || [{}];
                chart.pane.background[0].borderWidth = width;
                return this;
            },
            setBorderColor: function(chart, color) {
                chart.pane = chart.pane || {};
                chart.pane.background = chart.pane.background || [{}];
                chart.pane.background[0].borderColor = color;
                return this;
            },
            setShape: function(chart, shape) {
                chart.pane = chart.pane || {};
                chart.pane.background = chart.pane.background || [{}];
                chart.pane.background[0].shape = shape; // 'circle', 'arc'
                return this;
            },
            setOuterRadius: function(chart, radius) {
                chart.pane = chart.pane || {};
                chart.pane.background = chart.pane.background || [{}];
                chart.pane.background[0].outerRadius = radius;
                return this;
            },
            setInnerRadius: function(chart, radius) {
                chart.pane = chart.pane || {};
                chart.pane.background = chart.pane.background || [{}];
                chart.pane.background[0].innerRadius = radius;
                return this;
            }
        },

        // Pattern tools
        pattern: {
            createStripes: function(color1, color2, width = 10) {
                return {
                    pattern: {
                        path: {
                            d: `M 0 0 L ${width} 0 L ${width} ${width} L 0 ${width} Z`,
                            fill: color1
                        },
                        width: width * 2,
                        height: width,
                        patternTransform: 'rotate(45)'
                    }
                };
            },
            createDots: function(color, size = 3, spacing = 10) {
                return {
                    pattern: {
                        circle: {
                            r: size,
                            fill: color
                        },
                        width: spacing,
                        height: spacing
                    }
                };
            },
            createGrid: function(color, thickness = 1, spacing = 10) {
                return {
                    pattern: {
                        path: {
                            d: `M ${spacing} 0 L 0 0 0 ${spacing}`,
                            stroke: color,
                            strokeWidth: thickness,
                            fill: 'none'
                        },
                        width: spacing,
                        height: spacing
                    }
                };
            },
            createCrosshatch: function(color, thickness = 1, spacing = 10) {
                return {
                    pattern: {
                        path: {
                            d: `M 0 ${spacing} L ${spacing} 0 M 0 0 L ${spacing} ${spacing}`,
                            stroke: color,
                            strokeWidth: thickness,
                            fill: 'none'
                        },
                        width: spacing,
                        height: spacing
                    }
                };
            },
            createChevron: function(color, width = 10, height = 10) {
                return {
                    pattern: {
                        path: {
                            d: `M 0 ${height/2} L ${width/2} 0 L ${width} ${height/2} L ${width/2} ${height} Z`,
                            fill: color
                        },
                        width: width,
                        height: height
                    }
                };
            },
            createWaves: function(color, amplitude = 5, frequency = 20) {
                const path = [];
                for (let x = 0; x <= frequency; x++) {
                    const y = amplitude * Math.sin((x / frequency) * Math.PI * 2) + amplitude;
                    path.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
                }
                return {
                    pattern: {
                        path: {
                            d: path.join(' '),
                            stroke: color,
                            strokeWidth: 2,
                            fill: 'none'
                        },
                        width: frequency,
                        height: amplitude * 2
                    }
                };
            }
        }
    };

    // Export the extended module
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = VisualizationTools;
    } else {
        global.VisualizationTools = VisualizationTools;
    }

})(typeof window !== 'undefined' ? window : this);