/**
 * Advanced Visualization Tools Library - Part 3
 * Comprehensive tools for animations, interactions, and advanced features
 * Completes the 4000+ lines visualization toolkit
 */

(function(global) {
    'use strict';

    // Get reference to main VisualizationTools
    const VisualizationTools = global.VisualizationTools || {};

    // =====================================================================
    // ANIMATION CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Animation = {
        // General animation tools
        general: {
            setEnabled: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.animation = enabled;
                return this;
            },
            setDuration: function(chart, duration) {
                chart.chart = chart.chart || {};
                chart.chart.animation = {
                    duration: duration
                };
                return this;
            },
            setEasing: function(chart, easing) {
                chart.chart = chart.chart || {};
                chart.chart.animation = chart.chart.animation || {};
                chart.chart.animation.easing = easing; // 'linear', 'swing', 'easeOutBounce'
                return this;
            },
            setDelay: function(chart, delay) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.series = chart.plotOptions.series || {};
                chart.plotOptions.series.animation = {
                    defer: delay
                };
                return this;
            },
            setSequential: function(chart, sequential) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.series = chart.plotOptions.series || {};
                chart.plotOptions.series.animation = {
                    sequential: sequential
                };
                return this;
            },
            setStepByStep: function(chart, enabled) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.series = chart.plotOptions.series || {};
                chart.plotOptions.series.animation = {
                    stepByStep: enabled
                };
                return this;
            },
            setLoop: function(chart, enabled, count) {
                chart.chart = chart.chart || {};
                chart.chart.animation = {
                    loop: enabled,
                    loopCount: count || Infinity
                };
                return this;
            },
            setReverse: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.animation = chart.chart.animation || {};
                chart.chart.animation.reverse = enabled;
                return this;
            },
            setYoyo: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.animation = chart.chart.animation || {};
                chart.chart.animation.yoyo = enabled;
                return this;
            },
            setTimeScale: function(chart, scale) {
                chart.chart = chart.chart || {};
                chart.chart.animation = chart.chart.animation || {};
                chart.chart.animation.timeScale = scale;
                return this;
            }
        },

        // Series animation tools
        series: {
            setAnimation: function(series, animation) {
                series.animation = animation;
                return this;
            },
            setAnimationDuration: function(series, duration) {
                series.animation = {
                    duration: duration
                };
                return this;
            },
            setAnimationEasing: function(series, easing) {
                series.animation = series.animation || {};
                series.animation.easing = easing;
                return this;
            },
            setAnimationDelay: function(series, delay) {
                series.animation = series.animation || {};
                series.animation.defer = delay;
                return this;
            },
            setPointAnimation: function(series, limit) {
                series.animationLimit = limit;
                return this;
            },
            setAnimationStep: function(series, step) {
                series.animation = series.animation || {};
                series.animation.step = step;
                return this;
            },
            setAnimationComplete: function(series, callback) {
                series.animation = series.animation || {};
                series.animation.complete = callback;
                return this;
            },
            setAnimationStart: function(series, callback) {
                series.animation = series.animation || {};
                series.animation.start = callback;
                return this;
            },
            setAnimationProgress: function(series, callback) {
                series.animation = series.animation || {};
                series.animation.progress = callback;
                return this;
            },
            setAnimationQueue: function(series, queue) {
                series.animation = series.animation || {};
                series.animation.queue = queue;
                return this;
            }
        },

        // Transition animations
        transitions: {
            setUpdateAnimation: function(chart, animation) {
                chart.chart = chart.chart || {};
                chart.chart.updateAnimation = animation;
                return this;
            },
            setRedrawAnimation: function(chart, animation) {
                chart.chart = chart.chart || {};
                chart.chart.redrawAnimation = animation;
                return this;
            },
            setZoomAnimation: function(chart, animation) {
                chart.chart = chart.chart || {};
                chart.chart.zoomAnimation = animation;
                return this;
            },
            setPanAnimation: function(chart, animation) {
                chart.chart = chart.chart || {};
                chart.chart.panAnimation = animation;
                return this;
            },
            setResizeAnimation: function(chart, animation) {
                chart.chart = chart.chart || {};
                chart.chart.resizeAnimation = animation;
                return this;
            },
            setDrilldownAnimation: function(chart, animation) {
                chart.drilldown = chart.drilldown || {};
                chart.drilldown.animation = animation;
                return this;
            },
            setDrillupAnimation: function(chart, animation) {
                chart.drilldown = chart.drilldown || {};
                chart.drilldown.drillUpAnimation = animation;
                return this;
            },
            setLegendAnimation: function(chart, animation) {
                chart.legend = chart.legend || {};
                chart.legend.animation = animation;
                return this;
            },
            setTooltipAnimation: function(chart, animation) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.animation = animation;
                return this;
            },
            setAxisAnimation: function(chart, axis, animation) {
                chart[axis] = chart[axis] || {};
                chart[axis].animation = animation;
                return this;
            }
        },

        // Custom animations
        custom: {
            createFadeIn: function(duration = 1000) {
                return {
                    duration: duration,
                    easing: 'linear',
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                };
            },
            createFadeOut: function(duration = 1000) {
                return {
                    duration: duration,
                    easing: 'linear',
                    from: { opacity: 1 },
                    to: { opacity: 0 }
                };
            },
            createSlideIn: function(direction = 'left', duration = 1000) {
                const translations = {
                    left: { translateX: -100 },
                    right: { translateX: 100 },
                    top: { translateY: -100 },
                    bottom: { translateY: 100 }
                };
                return {
                    duration: duration,
                    easing: 'easeOutQuad',
                    from: translations[direction],
                    to: { translateX: 0, translateY: 0 }
                };
            },
            createSlideOut: function(direction = 'left', duration = 1000) {
                const translations = {
                    left: { translateX: -100 },
                    right: { translateX: 100 },
                    top: { translateY: -100 },
                    bottom: { translateY: 100 }
                };
                return {
                    duration: duration,
                    easing: 'easeInQuad',
                    from: { translateX: 0, translateY: 0 },
                    to: translations[direction]
                };
            },
            createBounce: function(duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeOutBounce'
                };
            },
            createElastic: function(duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeOutElastic'
                };
            },
            createRotate: function(degrees = 360, duration = 1000) {
                return {
                    duration: duration,
                    easing: 'linear',
                    from: { rotation: 0 },
                    to: { rotation: degrees }
                };
            },
            createScale: function(from = 0, to = 1, duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeOutQuad',
                    from: { scaleX: from, scaleY: from },
                    to: { scaleX: to, scaleY: to }
                };
            },
            createPulse: function(scale = 1.1, duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeInOutQuad',
                    keyframes: [
                        { scaleX: 1, scaleY: 1 },
                        { scaleX: scale, scaleY: scale },
                        { scaleX: 1, scaleY: 1 }
                    ]
                };
            },
            createShake: function(intensity = 5, duration = 500) {
                return {
                    duration: duration,
                    keyframes: [
                        { translateX: 0 },
                        { translateX: -intensity },
                        { translateX: intensity },
                        { translateX: -intensity },
                        { translateX: intensity },
                        { translateX: 0 }
                    ]
                };
            },
            createWiggle: function(angle = 5, duration = 500) {
                return {
                    duration: duration,
                    keyframes: [
                        { rotation: 0 },
                        { rotation: -angle },
                        { rotation: angle },
                        { rotation: -angle },
                        { rotation: angle },
                        { rotation: 0 }
                    ]
                };
            },
            createFlip: function(axis = 'x', duration = 1000) {
                const property = axis === 'x' ? 'rotateX' : 'rotateY';
                return {
                    duration: duration,
                    easing: 'easeInOutQuad',
                    from: { [property]: 0 },
                    to: { [property]: 180 }
                };
            },
            createZoom: function(from = 0, to = 1, duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeOutQuad',
                    from: { scaleX: from, scaleY: from, opacity: 0 },
                    to: { scaleX: to, scaleY: to, opacity: 1 }
                };
            },
            createSpiral: function(rotations = 2, scale = 1, duration = 2000) {
                return {
                    duration: duration,
                    easing: 'easeOutQuad',
                    from: { rotation: 0, scaleX: 0, scaleY: 0 },
                    to: { rotation: rotations * 360, scaleX: scale, scaleY: scale }
                };
            },
            createTypewriter: function(duration = 2000) {
                return {
                    duration: duration,
                    easing: 'linear',
                    step: function(now, fx) {
                        const progress = Math.floor(fx.pos * this.text.length);
                        this.textContent = this.text.substring(0, progress);
                    }
                };
            },
            createMorph: function(from, to, duration = 1500) {
                return {
                    duration: duration,
                    easing: 'easeInOutQuad',
                    from: from,
                    to: to
                };
            },
            createRipple: function(duration = 1000) {
                return {
                    duration: duration,
                    keyframes: [
                        { scaleX: 1, scaleY: 1, opacity: 1 },
                        { scaleX: 1.5, scaleY: 1.5, opacity: 0.5 },
                        { scaleX: 2, scaleY: 2, opacity: 0 }
                    ]
                };
            },
            createGlow: function(color = '#fff', intensity = 10, duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeInOutQuad',
                    keyframes: [
                        { boxShadow: `0 0 0 ${color}` },
                        { boxShadow: `0 0 ${intensity}px ${color}` },
                        { boxShadow: `0 0 0 ${color}` }
                    ]
                };
            },
            createSwing: function(angle = 15, duration = 1000) {
                return {
                    duration: duration,
                    easing: 'easeInOutQuad',
                    keyframes: [
                        { rotation: 0 },
                        { rotation: angle },
                        { rotation: -angle },
                        { rotation: angle },
                        { rotation: -angle },
                        { rotation: 0 }
                    ]
                };
            }
        },

        // Keyframe animations
        keyframes: {
            create: function(name, keyframes) {
                return {
                    name: name,
                    keyframes: keyframes
                };
            },
            addKeyframe: function(animation, percentage, properties) {
                animation.keyframes = animation.keyframes || {};
                animation.keyframes[percentage] = properties;
                return animation;
            },
            removeKeyframe: function(animation, percentage) {
                if (animation.keyframes) {
                    delete animation.keyframes[percentage];
                }
                return animation;
            },
            interpolate: function(from, to, steps) {
                const keyframes = {};
                for (let i = 0; i <= steps; i++) {
                    const percentage = (i / steps) * 100;
                    const properties = {};
                    for (let prop in from) {
                        if (typeof from[prop] === 'number' && typeof to[prop] === 'number') {
                            properties[prop] = from[prop] + (to[prop] - from[prop]) * (i / steps);
                        }
                    }
                    keyframes[percentage + '%'] = properties;
                }
                return keyframes;
            }
        },

        // Timeline animations
        timeline: {
            create: function() {
                return {
                    animations: [],
                    currentTime: 0
                };
            },
            add: function(timeline, animation, startTime) {
                timeline.animations.push({
                    animation: animation,
                    startTime: startTime || timeline.currentTime
                });
                return timeline;
            },
            sequence: function(timeline, animations, gap = 0) {
                animations.forEach(animation => {
                    timeline.animations.push({
                        animation: animation,
                        startTime: timeline.currentTime
                    });
                    timeline.currentTime += animation.duration + gap;
                });
                return timeline;
            },
            parallel: function(timeline, animations, startTime) {
                const start = startTime || timeline.currentTime;
                animations.forEach(animation => {
                    timeline.animations.push({
                        animation: animation,
                        startTime: start
                    });
                });
                return timeline;
            },
            stagger: function(timeline, animations, delay = 100) {
                let currentTime = timeline.currentTime;
                animations.forEach(animation => {
                    timeline.animations.push({
                        animation: animation,
                        startTime: currentTime
                    });
                    currentTime += delay;
                });
                timeline.currentTime = currentTime;
                return timeline;
            }
        }
    };

    // =====================================================================
    // GRID CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Grid = {
        // Grid line tools
        lines: {
            setEnabled: function(axis, enabled) {
                axis.gridLineWidth = enabled ? 1 : 0;
                return this;
            },
            setWidth: function(axis, width) {
                axis.gridLineWidth = width;
                return this;
            },
            setColor: function(axis, color) {
                axis.gridLineColor = color;
                return this;
            },
            setDashStyle: function(axis, style) {
                axis.gridLineDashStyle = style;
                return this;
            },
            setZIndex: function(axis, zIndex) {
                axis.gridZIndex = zIndex;
                return this;
            },
            setInterpolation: function(axis, interpolation) {
                axis.gridLineInterpolation = interpolation;
                return this;
            },
            setOpacity: function(axis, opacity) {
                axis.gridLineOpacity = opacity;
                return this;
            },
            setLineCap: function(axis, cap) {
                axis.gridLineLineCap = cap; // 'butt', 'round', 'square'
                return this;
            },
            setLineJoin: function(axis, join) {
                axis.gridLineLineJoin = join; // 'miter', 'round', 'bevel'
                return this;
            },
            setPattern: function(axis, pattern) {
                axis.gridLinePattern = pattern;
                return this;
            }
        },

        // Minor grid lines
        minorLines: {
            setEnabled: function(axis, enabled) {
                axis.minorGridLineWidth = enabled ? 1 : 0;
                return this;
            },
            setWidth: function(axis, width) {
                axis.minorGridLineWidth = width;
                return this;
            },
            setColor: function(axis, color) {
                axis.minorGridLineColor = color;
                return this;
            },
            setDashStyle: function(axis, style) {
                axis.minorGridLineDashStyle = style;
                return this;
            },
            setInterval: function(axis, interval) {
                axis.minorTickInterval = interval;
                return this;
            },
            setOpacity: function(axis, opacity) {
                axis.minorGridLineOpacity = opacity;
                return this;
            },
            setZIndex: function(axis, zIndex) {
                axis.minorGridZIndex = zIndex;
                return this;
            },
            setLineCap: function(axis, cap) {
                axis.minorGridLineLineCap = cap;
                return this;
            },
            setLineJoin: function(axis, join) {
                axis.minorGridLineLineJoin = join;
                return this;
            },
            setPattern: function(axis, pattern) {
                axis.minorGridLinePattern = pattern;
                return this;
            }
        },

        // Grid bands
        bands: {
            setAlternateColor: function(axis, color) {
                axis.alternateGridColor = color;
                return this;
            },
            addPlotBand: function(axis, from, to, color, options = {}) {
                axis.plotBands = axis.plotBands || [];
                axis.plotBands.push({
                    from: from,
                    to: to,
                    color: color,
                    ...options
                });
                return this;
            },
            removePlotBand: function(axis, index) {
                if (axis.plotBands) {
                    axis.plotBands.splice(index, 1);
                }
                return this;
            },
            clearPlotBands: function(axis) {
                axis.plotBands = [];
                return this;
            },
            setPlotBandLabel: function(axis, index, label) {
                if (axis.plotBands && axis.plotBands[index]) {
                    axis.plotBands[index].label = label;
                }
                return this;
            },
            setPlotBandZIndex: function(axis, index, zIndex) {
                if (axis.plotBands && axis.plotBands[index]) {
                    axis.plotBands[index].zIndex = zIndex;
                }
                return this;
            },
            setPlotBandBorder: function(axis, index, color, width) {
                if (axis.plotBands && axis.plotBands[index]) {
                    axis.plotBands[index].borderColor = color;
                    axis.plotBands[index].borderWidth = width;
                }
                return this;
            },
            animatePlotBand: function(axis, index, animation) {
                if (axis.plotBands && axis.plotBands[index]) {
                    axis.plotBands[index].animation = animation;
                }
                return this;
            },
            setPlotBandEvents: function(axis, index, events) {
                if (axis.plotBands && axis.plotBands[index]) {
                    axis.plotBands[index].events = events;
                }
                return this;
            },
            setPlotBandClassName: function(axis, index, className) {
                if (axis.plotBands && axis.plotBands[index]) {
                    axis.plotBands[index].className = className;
                }
                return this;
            }
        },

        // Plot lines
        plotLines: {
            add: function(axis, value, options = {}) {
                axis.plotLines = axis.plotLines || [];
                axis.plotLines.push({
                    value: value,
                    ...options
                });
                return axis.plotLines.length - 1;
            },
            remove: function(axis, index) {
                if (axis.plotLines) {
                    axis.plotLines.splice(index, 1);
                }
                return this;
            },
            clear: function(axis) {
                axis.plotLines = [];
                return this;
            },
            setColor: function(axis, index, color) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].color = color;
                }
                return this;
            },
            setWidth: function(axis, index, width) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].width = width;
                }
                return this;
            },
            setDashStyle: function(axis, index, style) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].dashStyle = style;
                }
                return this;
            },
            setLabel: function(axis, index, label) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].label = label;
                }
                return this;
            },
            setZIndex: function(axis, index, zIndex) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].zIndex = zIndex;
                }
                return this;
            },
            setEvents: function(axis, index, events) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].events = events;
                }
                return this;
            },
            setClassName: function(axis, index, className) {
                if (axis.plotLines && axis.plotLines[index]) {
                    axis.plotLines[index].className = className;
                }
                return this;
            }
        },

        // Grid layout
        layout: {
            setColumns: function(chart, columns) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.column = chart.plotOptions.column || {};
                chart.plotOptions.column.pointsInColumns = columns;
                return this;
            },
            setRows: function(chart, rows) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.column = chart.plotOptions.column || {};
                chart.plotOptions.column.pointsInRows = rows;
                return this;
            },
            setGap: function(chart, gap) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.series = chart.plotOptions.series || {};
                chart.plotOptions.series.pointPadding = gap;
                return this;
            },
            setPadding: function(chart, padding) {
                chart.plotOptions = chart.plotOptions || {};
                chart.plotOptions.series = chart.plotOptions.series || {};
                chart.plotOptions.series.groupPadding = padding;
                return this;
            },
            setGridSize: function(chart, width, height) {
                chart.chart = chart.chart || {};
                chart.chart.gridWidth = width;
                chart.chart.gridHeight = height;
                return this;
            },
            setGridOffset: function(chart, x, y) {
                chart.chart = chart.chart || {};
                chart.chart.gridOffsetX = x;
                chart.chart.gridOffsetY = y;
                return this;
            },
            setGridRotation: function(chart, angle) {
                chart.chart = chart.chart || {};
                chart.chart.gridRotation = angle;
                return this;
            },
            setGridSkew: function(chart, x, y) {
                chart.chart = chart.chart || {};
                chart.chart.gridSkewX = x;
                chart.chart.gridSkewY = y;
                return this;
            },
            setGridType: function(chart, type) {
                chart.chart = chart.chart || {};
                chart.chart.gridType = type; // 'rectangular', 'hexagonal', 'triangular'
                return this;
            },
            setGridSnap: function(chart, enabled) {
                chart.chart = chart.chart || {};
                chart.chart.gridSnap = enabled;
                return this;
            }
        }
    };

    // =====================================================================
    // TOOLTIP CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Tooltip = {
        // Basic tooltip settings
        basic: {
            setEnabled: function(chart, enabled) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.enabled = enabled;
                return this;
            },
            setShared: function(chart, shared) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.shared = shared;
                return this;
            },
            setCrosshairs: function(chart, crosshairs) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.crosshairs = crosshairs;
                return this;
            },
            setFollowPointer: function(chart, follow) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.followPointer = follow;
                return this;
            },
            setFollowTouchMove: function(chart, follow) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.followTouchMove = follow;
                return this;
            },
            setAnimation: function(chart, animation) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.animation = animation;
                return this;
            },
            setHideDelay: function(chart, delay) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.hideDelay = delay;
                return this;
            },
            setDistance: function(chart, distance) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.distance = distance;
                return this;
            },
            setPadding: function(chart, padding) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.padding = padding;
                return this;
            },
            setSnap: function(chart, snap) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.snap = snap;
                return this;
            },
            setSplit: function(chart, split) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.split = split;
                return this;
            },
            setStickOnContact: function(chart, stick) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.stickOnContact = stick;
                return this;
            },
            setUseHTML: function(chart, useHTML) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.useHTML = useHTML;
                return this;
            },
            setOutside: function(chart, outside) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.outside = outside;
                return this;
            },
            setClusterFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.clusterFormat = format;
                return this;
            }
        },

        // Tooltip formatting
        format: {
            setHeaderFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.headerFormat = format;
                return this;
            },
            setPointFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.pointFormat = format;
                return this;
            },
            setFooterFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.footerFormat = format;
                return this;
            },
            setFormatter: function(chart, formatter) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.formatter = formatter;
                return this;
            },
            setPointFormatter: function(chart, formatter) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.pointFormatter = formatter;
                return this;
            },
            setValuePrefix: function(chart, prefix) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.valuePrefix = prefix;
                return this;
            },
            setValueSuffix: function(chart, suffix) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.valueSuffix = suffix;
                return this;
            },
            setValueDecimals: function(chart, decimals) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.valueDecimals = decimals;
                return this;
            },
            setXDateFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.xDateFormat = format;
                return this;
            },
            setNullFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.nullFormat = format;
                return this;
            },
            setDateTimeLabelFormats: function(chart, formats) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.dateTimeLabelFormats = formats;
                return this;
            },
            setSplit: function(chart, split) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.split = split;
                return this;
            },
            setHeaderShape: function(chart, shape) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.headerShape = shape;
                return this;
            },
            setNodeFormat: function(chart, format) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.nodeFormat = format;
                return this;
            },
            setNodeFormatter: function(chart, formatter) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.nodeFormatter = formatter;
                return this;
            }
        },

        // Tooltip styling
        style: {
            setBackgroundColor: function(chart, color) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.backgroundColor = color;
                return this;
            },
            setBorderColor: function(chart, color) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.borderColor = color;
                return this;
            },
            setBorderRadius: function(chart, radius) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.borderRadius = radius;
                return this;
            },
            setBorderWidth: function(chart, width) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.borderWidth = width;
                return this;
            },
            setShadow: function(chart, shadow) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.shadow = shadow;
                return this;
            },
            setStyle: function(chart, style) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.style = style;
                return this;
            },
            setClassName: function(chart, className) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.className = className;
                return this;
            },
            setShape: function(chart, shape) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.shape = shape;
                return this;
            },
            setOpacity: function(chart, opacity) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.style = chart.tooltip.style || {};
                chart.tooltip.style.opacity = opacity;
                return this;
            },
            setFilter: function(chart, filter) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.style = chart.tooltip.style || {};
                chart.tooltip.style.filter = filter;
                return this;
            }
        },

        // Tooltip positioning
        position: {
            setPositioner: function(chart, positioner) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.positioner = positioner;
                return this;
            },
            setFixed: function(chart, x, y) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.positioner = function() {
                    return { x: x, y: y };
                };
                return this;
            },
            setRelative: function(chart, offsetX, offsetY) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.positioner = function(labelWidth, labelHeight, point) {
                    return {
                        x: point.plotX + offsetX,
                        y: point.plotY + offsetY
                    };
                };
                return this;
            },
            setAnchor: function(chart, anchor) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.anchor = anchor;
                return this;
            },
            setFloating: function(chart, floating) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.floating = floating;
                return this;
            },
            setAlign: function(chart, align) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.align = align;
                return this;
            },
            setVerticalAlign: function(chart, align) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.verticalAlign = align;
                return this;
            },
            setX: function(chart, x) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.x = x;
                return this;
            },
            setY: function(chart, y) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.y = y;
                return this;
            },
            setOffset: function(chart, x, y) {
                chart.tooltip = chart.tooltip || {};
                chart.tooltip.x = x;
                chart.tooltip.y = y;
                return this;
            }
        }
    };

    // =====================================================================
    // EXPORT CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Export = {
        // Export button tools
        button: {
            setEnabled: function(chart, enabled) {
                chart.exporting = chart.exporting || {};
                chart.exporting.enabled = enabled;
                return this;
            },
            setText: function(chart, text) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.text = text;
                return this;
            },
            setSymbol: function(chart, symbol) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.symbol = symbol;
                return this;
            },
            setPosition: function(chart, align, verticalAlign, x, y) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.align = align;
                chart.exporting.buttons.contextButton.verticalAlign = verticalAlign;
                chart.exporting.buttons.contextButton.x = x;
                chart.exporting.buttons.contextButton.y = y;
                return this;
            },
            setMenuItems: function(chart, items) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.menuItems = items;
                return this;
            },
            addCustomButton: function(chart, buttonOptions) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                const buttonId = 'customButton' + Date.now();
                chart.exporting.buttons[buttonId] = buttonOptions;
                return buttonId;
            },
            setTheme: function(chart, theme) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.theme = theme;
                return this;
            },
            setSymbolFill: function(chart, fill) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.symbolFill = fill;
                return this;
            },
            setSymbolSize: function(chart, size) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.symbolSize = size;
                return this;
            },
            setSymbolStroke: function(chart, stroke) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.symbolStroke = stroke;
                return this;
            }
        },

        // Export formats
        formats: {
            setPNG: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.type = 'image/png';
                chart.exporting.sourceWidth = options?.width;
                chart.exporting.sourceHeight = options?.height;
                return this;
            },
            setJPEG: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.type = 'image/jpeg';
                chart.exporting.sourceWidth = options?.width;
                chart.exporting.sourceHeight = options?.height;
                return this;
            },
            setSVG: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.type = 'image/svg+xml';
                chart.exporting.sourceWidth = options?.width;
                chart.exporting.sourceHeight = options?.height;
                return this;
            },
            setPDF: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.type = 'application/pdf';
                chart.exporting.sourceWidth = options?.width;
                chart.exporting.sourceHeight = options?.height;
                return this;
            },
            setCSV: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.csv = options || {};
                return this;
            },
            setXLS: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.xls = options || {};
                return this;
            },
            setJSON: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.json = options || {};
                return this;
            },
            setHTML: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.html = options || {};
                return this;
            },
            setXML: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.xml = options || {};
                return this;
            },
            setCustom: function(chart, format, handler) {
                chart.exporting = chart.exporting || {};
                chart.exporting.customFormats = chart.exporting.customFormats || {};
                chart.exporting.customFormats[format] = handler;
                return this;
            }
        },

        // Export options
        options: {
            setFilename: function(chart, filename) {
                chart.exporting = chart.exporting || {};
                chart.exporting.filename = filename;
                return this;
            },
            setWidth: function(chart, width) {
                chart.exporting = chart.exporting || {};
                chart.exporting.sourceWidth = width;
                return this;
            },
            setHeight: function(chart, height) {
                chart.exporting = chart.exporting || {};
                chart.exporting.sourceHeight = height;
                return this;
            },
            setScale: function(chart, scale) {
                chart.exporting = chart.exporting || {};
                chart.exporting.scale = scale;
                return this;
            },
            setChartOptions: function(chart, options) {
                chart.exporting = chart.exporting || {};
                chart.exporting.chartOptions = options;
                return this;
            },
            setAllowHTML: function(chart, allow) {
                chart.exporting = chart.exporting || {};
                chart.exporting.allowHTML = allow;
                return this;
            },
            setFallbackToExportServer: function(chart, fallback) {
                chart.exporting = chart.exporting || {};
                chart.exporting.fallbackToExportServer = fallback;
                return this;
            },
            setUrl: function(chart, url) {
                chart.exporting = chart.exporting || {};
                chart.exporting.url = url;
                return this;
            },
            setPrintMaxWidth: function(chart, width) {
                chart.exporting = chart.exporting || {};
                chart.exporting.printMaxWidth = width;
                return this;
            },
            setLibURL: function(chart, url) {
                chart.exporting = chart.exporting || {};
                chart.exporting.libURL = url;
                return this;
            },
            setMenuItemDefinitions: function(chart, definitions) {
                chart.exporting = chart.exporting || {};
                chart.exporting.menuItemDefinitions = definitions;
                return this;
            },
            setShowTable: function(chart, show) {
                chart.exporting = chart.exporting || {};
                chart.exporting.showTable = show;
                return this;
            },
            setTableCaption: function(chart, caption) {
                chart.exporting = chart.exporting || {};
                chart.exporting.tableCaption = caption;
                return this;
            },
            setTableDecimalPoint: function(chart, point) {
                chart.exporting = chart.exporting || {};
                chart.exporting.tableDecimalPoint = point;
                return this;
            },
            setUseLocalDecimalPoint: function(chart, use) {
                chart.exporting = chart.exporting || {};
                chart.exporting.useLocalDecimalPoint = use;
                return this;
            }
        },

        // Print options
        print: {
            setPrintButton: function(chart, enabled) {
                chart.exporting = chart.exporting || {};
                chart.exporting.buttons = chart.exporting.buttons || {};
                chart.exporting.buttons.contextButton = chart.exporting.buttons.contextButton || {};
                chart.exporting.buttons.contextButton.menuItems = chart.exporting.buttons.contextButton.menuItems || [];
                if (enabled) {
                    chart.exporting.buttons.contextButton.menuItems.push('printChart');
                }
                return this;
            },
            setPrintMaxWidth: function(chart, width) {
                chart.exporting = chart.exporting || {};
                chart.exporting.printMaxWidth = width;
                return this;
            },
            setPrintBackground: function(chart, background) {
                chart.exporting = chart.exporting || {};
                chart.exporting.printBackground = background;
                return this;
            }
        }
    };

    // =====================================================================
    // THEME CUSTOMIZATION TOOLS
    // =====================================================================
    VisualizationTools.Theme = {
        // Predefined themes
        predefined: {
            applyDark: function(chart) {
                const darkTheme = {
                    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee'],
                    chart: {
                        backgroundColor: '#2a2a2b',
                        plotBorderColor: '#606063'
                    },
                    title: {
                        style: { color: '#E0E0E3' }
                    },
                    subtitle: {
                        style: { color: '#E0E0E3' }
                    },
                    xAxis: {
                        gridLineColor: '#707073',
                        labels: { style: { color: '#E0E0E3' } },
                        lineColor: '#707073',
                        tickColor: '#707073'
                    },
                    yAxis: {
                        gridLineColor: '#707073',
                        labels: { style: { color: '#E0E0E3' } },
                        lineColor: '#707073',
                        tickColor: '#707073'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        style: { color: '#F0F0F0' }
                    },
                    legend: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        itemStyle: { color: '#E0E0E3' }
                    }
                };
                Object.assign(chart, darkTheme);
                return this;
            },
            applyLight: function(chart) {
                const lightTheme = {
                    colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
                    chart: {
                        backgroundColor: '#ffffff'
                    },
                    title: {
                        style: { color: '#333333' }
                    },
                    subtitle: {
                        style: { color: '#666666' }
                    },
                    xAxis: {
                        gridLineColor: '#e6e6e6',
                        labels: { style: { color: '#666666' } },
                        lineColor: '#ccd6eb',
                        tickColor: '#ccd6eb'
                    },
                    yAxis: {
                        gridLineColor: '#e6e6e6',
                        labels: { style: { color: '#666666' } },
                        lineColor: '#ccd6eb',
                        tickColor: '#ccd6eb'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(247, 247, 247, 0.95)',
                        style: { color: '#333333' }
                    },
                    legend: {
                        itemStyle: { color: '#333333' }
                    }
                };
                Object.assign(chart, lightTheme);
                return this;
            },
            applyMaterial: function(chart) {
                const materialTheme = {
                    colors: ['#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0'],
                    chart: {
                        backgroundColor: '#FAFAFA'
                    },
                    title: {
                        style: { color: '#212121', fontSize: '24px' }
                    },
                    subtitle: {
                        style: { color: '#757575', fontSize: '14px' }
                    },
                    xAxis: {
                        gridLineColor: '#E0E0E0',
                        labels: { style: { color: '#757575' } }
                    },
                    yAxis: {
                        gridLineColor: '#E0E0E0',
                        labels: { style: { color: '#757575' } }
                    },
                    tooltip: {
                        backgroundColor: '#424242',
                        style: { color: '#FFFFFF' },
                        borderRadius: 2
                    }
                };
                Object.assign(chart, materialTheme);
                return this;
            },
            applyBootstrap: function(chart) {
                const bootstrapTheme = {
                    colors: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d'],
                    chart: {
                        backgroundColor: '#fff'
                    },
                    title: {
                        style: { color: '#212529', fontSize: '2rem' }
                    },
                    subtitle: {
                        style: { color: '#6c757d' }
                    }
                };
                Object.assign(chart, bootstrapTheme);
                return this;
            },
            applyRetro: function(chart) {
                const retroTheme = {
                    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
                    chart: {
                        backgroundColor: '#FFF5E1',
                        style: { fontFamily: '"Courier New", monospace' }
                    },
                    title: {
                        style: { color: '#2C3E50', fontWeight: 'bold' }
                    }
                };
                Object.assign(chart, retroTheme);
                return this;
            },
            applyNeon: function(chart) {
                const neonTheme = {
                    colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00AA', '#00FF00'],
                    chart: {
                        backgroundColor: '#000000'
                    },
                    title: {
                        style: { color: '#FFFFFF', textShadow: '0 0 10px #FF00FF' }
                    }
                };
                Object.assign(chart, neonTheme);
                return this;
            },
            applyMinimal: function(chart) {
                const minimalTheme = {
                    colors: ['#000000', '#666666', '#999999', '#CCCCCC', '#E5E5E5'],
                    chart: {
                        backgroundColor: '#FFFFFF'
                    },
                    title: {
                        style: { color: '#000000', fontSize: '16px' }
                    }
                };
                Object.assign(chart, minimalTheme);
                return this;
            },
            applyGradient: function(chart) {
                const gradientTheme = {
                    chart: {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                            stops: [[0, '#2a2a2b'], [1, '#3e3e40']]
                        }
                    }
                };
                Object.assign(chart, gradientTheme);
                return this;
            }
        },

        // Custom theme builder
        custom: {
            create: function(name, options) {
                const theme = {
                    name: name,
                    ...options
                };
                return theme;
            },
            apply: function(chart, theme) {
                Object.assign(chart, theme);
                return this;
            },
            save: function(theme) {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('chart-theme-' + theme.name, JSON.stringify(theme));
                }
                return theme;
            },
            load: function(name) {
                if (typeof localStorage !== 'undefined') {
                    const themeData = localStorage.getItem('chart-theme-' + name);
                    return themeData ? JSON.parse(themeData) : null;
                }
                return null;
            },
            remove: function(name) {
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem('chart-theme-' + name);
                }
                return this;
            },
            list: function() {
                const themes = [];
                if (typeof localStorage !== 'undefined') {
                    for (let i = 0; i < localStorage.length; i++) {
                        const key = localStorage.key(i);
                        if (key.startsWith('chart-theme-')) {
                            themes.push(key.replace('chart-theme-', ''));
                        }
                    }
                }
                return themes;
            },
            export: function(theme) {
                return JSON.stringify(theme, null, 2);
            },
            import: function(themeString) {
                try {
                    return JSON.parse(themeString);
                } catch (e) {
                    console.error('Invalid theme JSON:', e);
                    return null;
                }
            },
            merge: function(theme1, theme2) {
                return Object.assign({}, theme1, theme2);
            },
            clone: function(theme, newName) {
                return {
                    ...theme,
                    name: newName
                };
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