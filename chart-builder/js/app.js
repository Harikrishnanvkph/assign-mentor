/**
 * ChartForge Pro - Main Application
 * Advanced Interactive Chart Builder with ECharts
 * Version: 2.0.0
 */

// Global Application State
const App = {
    chart: null,
    currentChartType: 'line',
    currentTheme: 'default',
    isDarkMode: false,
    chartData: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        series: [
            { name: 'Series 1', data: [120, 150, 180, 210, 190], type: 'line' },
            { name: 'Series 2', data: [80, 95, 110, 125, 140], type: 'line' }
        ]
    },
    chartConfig: {
        title: 'Sales Performance',
        subtitle: 'Q1 2024',
        showLegend: true,
        showTooltip: true,
        showGrid: true,
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut'
    },
    history: [],
    historyIndex: -1,
    clipboard: null,
    selectedSeries: 0,
    zoomLevel: 100,
    templates: [],
    customColors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de']
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeChart();
    bindEventListeners();
    loadTemplates();
    setupAutoSave();
    checkForSavedWork();
});

/**
 * Initialize Application Components
 */
function initializeApp() {
    // Check for dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        toggleDarkMode();
    }
    
    // Initialize tooltips
    initializeTooltips();
    
    // Setup resize observer for responsive chart
    setupResizeObserver();
    
    // Initialize keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Load user preferences
    loadUserPreferences();
    
    // Initialize drag and drop
    initializeDragAndDrop();
    
    console.log('ChartForge Pro initialized successfully');
}

/**
 * Initialize ECharts Instance
 */
function initializeChart() {
    const container = document.getElementById('chartContainer');
    
    // Initialize ECharts with theme
    App.chart = echarts.init(container, App.isDarkMode ? 'dark' : null);
    
    // Set initial chart options
    updateChart();
    
    // Handle chart events
    App.chart.on('click', handleChartClick);
    App.chart.on('legendselectchanged', handleLegendChange);
    App.chart.on('dataZoom', handleDataZoom);
}

/**
 * Update Chart with Current Configuration
 */
function updateChart() {
    if (!App.chart) return;
    
    const option = generateChartOption();
    App.chart.setOption(option, true);
    
    // Save to history
    saveToHistory();
    
    // Update status
    updateChartStatus();
    
    // Update code view if visible
    updateCodeView();
}

/**
 * Generate ECharts Option Object
 */
function generateChartOption() {
    const baseOption = {
        title: {
            text: App.chartConfig.title,
            subtext: App.chartConfig.subtitle,
            left: App.chartConfig.titleAlign || 'center',
            top: App.chartConfig.titlePosition === 'bottom' ? 'bottom' : 'top',
            textStyle: {
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            show: App.chartConfig.showTooltip,
            trigger: App.currentChartType === 'pie' ? 'item' : 'axis',
            axisPointer: {
                type: App.chartConfig.axisPointer || 'cross'
            },
            formatter: App.chartConfig.tooltipFormatter || null,
            confine: true
        },
        legend: {
            show: App.chartConfig.showLegend,
            type: 'scroll',
            orient: App.chartConfig.legendOrientation || 'horizontal',
            left: App.chartConfig.legendLeft || 'center',
            top: App.chartConfig.legendTop || 'bottom',
            data: App.chartData.series.map(s => s.name)
        },
        grid: {
            show: App.chartConfig.showGrid,
            left: App.chartConfig.gridLeft || '3%',
            right: App.chartConfig.gridRight || '4%',
            bottom: App.chartConfig.gridBottom || '3%',
            top: App.chartConfig.gridTop || '15%',
            containLabel: true
        },
        toolbox: {
            show: App.chartConfig.showToolbox !== false,
            feature: {
                saveAsImage: { show: App.chartConfig.toolboxSaveImage !== false },
                restore: { show: App.chartConfig.toolboxRestore !== false },
                dataView: { show: App.chartConfig.toolboxDataView !== false },
                dataZoom: { show: App.chartConfig.toolboxDataZoom || false },
                magicType: { 
                    show: App.chartConfig.toolboxMagicType || false,
                    type: ['line', 'bar', 'stack']
                }
            }
        },
        color: App.customColors
    };
    
    // Add chart type specific options
    const typeOption = getChartTypeOption();
    
    return { ...baseOption, ...typeOption };
}

/**
 * Get Chart Type Specific Options
 */
function getChartTypeOption() {
    switch (App.currentChartType) {
        case 'line':
        case 'area':
            return getLineChartOption();
        case 'bar':
            return getBarChartOption();
        case 'pie':
            return getPieChartOption();
        case 'scatter':
            return getScatterChartOption();
        case 'radar':
            return getRadarChartOption();
        case 'heatmap':
            return getHeatmapOption();
        case 'treemap':
            return getTreemapOption();
        case 'sunburst':
            return getSunburstOption();
        case 'sankey':
            return getSankeyOption();
        case 'gauge':
            return getGaugeOption();
        case 'funnel':
            return getFunnelOption();
        case 'boxplot':
            return getBoxplotOption();
        case 'candlestick':
            return getCandlestickOption();
        case 'parallel':
            return getParallelOption();
        case 'graph':
            return getGraphOption();
        default:
            return getLineChartOption();
    }
}

/**
 * Line Chart Option
 */
function getLineChartOption() {
    return {
        xAxis: {
            type: 'category',
            data: App.chartData.categories,
            show: App.chartConfig.showXAxis !== false,
            name: App.chartConfig.xAxisLabel,
            axisLabel: {
                rotate: App.chartConfig.xAxisRotation || 0
            },
            splitLine: {
                show: App.chartConfig.xAxisGrid
            }
        },
        yAxis: {
            type: 'value',
            show: App.chartConfig.showYAxis !== false,
            name: App.chartConfig.yAxisLabel,
            min: App.chartConfig.yAxisMin,
            max: App.chartConfig.yAxisMax,
            splitLine: {
                show: App.chartConfig.yAxisGrid !== false
            }
        },
        series: App.chartData.series.map(series => ({
            ...series,
            type: App.currentChartType === 'area' ? 'line' : series.type || 'line',
            smooth: App.chartConfig.smooth || false,
            areaStyle: App.currentChartType === 'area' ? {} : null,
            emphasis: {
                focus: 'series'
            },
            animationDuration: App.chartConfig.animationDuration,
            animationEasing: App.chartConfig.animationEasing
        }))
    };
}

/**
 * Bar Chart Option
 */
function getBarChartOption() {
    const isHorizontal = App.chartConfig.orientation === 'horizontal';
    return {
        xAxis: {
            type: isHorizontal ? 'value' : 'category',
            data: isHorizontal ? null : App.chartData.categories,
            show: App.chartConfig.showXAxis !== false,
            name: App.chartConfig.xAxisLabel
        },
        yAxis: {
            type: isHorizontal ? 'category' : 'value',
            data: isHorizontal ? App.chartData.categories : null,
            show: App.chartConfig.showYAxis !== false,
            name: App.chartConfig.yAxisLabel
        },
        series: App.chartData.series.map(series => ({
            ...series,
            type: 'bar',
            barWidth: App.chartConfig.barWidth,
            barGap: App.chartConfig.barGap,
            emphasis: {
                focus: 'series'
            }
        }))
    };
}

/**
 * Pie Chart Option
 */
function getPieChartOption() {
    const pieData = App.chartData.categories.map((cat, index) => ({
        name: cat,
        value: App.chartData.series[0]?.data[index] || 0
    }));
    
    return {
        series: [{
            type: 'pie',
            radius: App.chartConfig.pieRadius || '50%',
            center: App.chartConfig.pieCenter || ['50%', '50%'],
            data: pieData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            label: {
                show: App.chartConfig.showLabels !== false,
                formatter: App.chartConfig.labelFormatter || '{b}: {c} ({d}%)'
            },
            animationType: 'scale',
            animationEasing: 'elasticOut'
        }]
    };
}

/**
 * Scatter Chart Option
 */
function getScatterChartOption() {
    return {
        xAxis: {
            type: 'value',
            show: App.chartConfig.showXAxis !== false,
            name: App.chartConfig.xAxisLabel,
            splitLine: {
                show: App.chartConfig.xAxisGrid
            }
        },
        yAxis: {
            type: 'value',
            show: App.chartConfig.showYAxis !== false,
            name: App.chartConfig.yAxisLabel,
            splitLine: {
                show: App.chartConfig.yAxisGrid !== false
            }
        },
        series: App.chartData.series.map(series => ({
            ...series,
            type: 'scatter',
            symbolSize: App.chartConfig.symbolSize || 10,
            emphasis: {
                focus: 'series'
            }
        }))
    };
}

/**
 * Radar Chart Option
 */
function getRadarChartOption() {
    const maxValue = Math.max(...App.chartData.series.flatMap(s => s.data));
    
    return {
        radar: {
            indicator: App.chartData.categories.map(cat => ({
                name: cat,
                max: maxValue * 1.2
            })),
            shape: App.chartConfig.radarShape || 'polygon'
        },
        series: [{
            type: 'radar',
            data: App.chartData.series.map(series => ({
                name: series.name,
                value: series.data,
                areaStyle: App.chartConfig.radarArea ? {} : null
            }))
        }]
    };
}

/**
 * Heatmap Option
 */
function getHeatmapOption() {
    const heatmapData = [];
    App.chartData.series.forEach((series, seriesIndex) => {
        series.data.forEach((value, dataIndex) => {
            heatmapData.push([dataIndex, seriesIndex, value]);
        });
    });
    
    return {
        xAxis: {
            type: 'category',
            data: App.chartData.categories,
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: App.chartData.series.map(s => s.name),
            splitArea: { show: true }
        },
        visualMap: {
            min: 0,
            max: Math.max(...App.chartData.series.flatMap(s => s.data)),
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [{
            type: 'heatmap',
            data: heatmapData,
            label: { show: true },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
}

/**
 * Gauge Chart Option
 */
function getGaugeOption() {
    const value = App.chartData.series[0]?.data[0] || 0;
    
    return {
        series: [{
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: App.chartConfig.gaugeMin || 0,
            max: App.chartConfig.gaugeMax || 100,
            splitNumber: 10,
            radius: '80%',
            itemStyle: {
                color: App.customColors[0]
            },
            progress: {
                show: true,
                width: 30
            },
            pointer: {
                length: '60%',
                width: 8,
                offsetCenter: [0, '5%']
            },
            axisLine: {
                lineStyle: {
                    width: 30
                }
            },
            axisTick: {
                distance: -30,
                length: 8,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            splitLine: {
                distance: -30,
                length: 30,
                lineStyle: {
                    color: '#fff',
                    width: 4
                }
            },
            axisLabel: {
                color: 'inherit',
                distance: 40,
                fontSize: 16
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}%',
                color: 'inherit',
                fontSize: 24
            },
            data: [{
                value: value,
                name: App.chartData.series[0]?.name || 'Score'
            }]
        }]
    };
}

/**
 * Funnel Chart Option
 */
function getFunnelOption() {
    const funnelData = App.chartData.categories.map((cat, index) => ({
        name: cat,
        value: App.chartData.series[0]?.data[index] || 0
    })).sort((a, b) => b.value - a.value);
    
    return {
        series: [{
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: Math.max(...funnelData.map(d => d.value)),
            minSize: '0%',
            maxSize: '100%',
            sort: App.chartConfig.funnelSort || 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: funnelData
        }]
    };
}

/**
 * Treemap Option
 */
function getTreemapOption() {
    const treemapData = App.chartData.categories.map((cat, index) => ({
        name: cat,
        value: App.chartData.series[0]?.data[index] || 0,
        children: App.chartData.series.slice(1).map(series => ({
            name: series.name,
            value: series.data[index] || 0
        }))
    }));
    
    return {
        series: [{
            type: 'treemap',
            data: treemapData,
            leafDepth: 2,
            label: {
                show: true,
                formatter: '{b}'
            },
            upperLabel: {
                show: true,
                height: 30
            },
            itemStyle: {
                borderColor: '#fff'
            },
            levels: [
                {
                    itemStyle: {
                        borderColor: '#777',
                        borderWidth: 0,
                        gapWidth: 1
                    },
                    upperLabel: {
                        show: false
                    }
                },
                {
                    itemStyle: {
                        borderColor: '#555',
                        borderWidth: 5,
                        gapWidth: 1
                    },
                    emphasis: {
                        itemStyle: {
                            borderColor: '#ddd'
                        }
                    }
                }
            ]
        }]
    };
}

/**
 * Sunburst Option
 */
function getSunburstOption() {
    const sunburstData = App.chartData.categories.map((cat, index) => ({
        name: cat,
        value: App.chartData.series[0]?.data[index] || 0,
        children: App.chartData.series.slice(1).map(series => ({
            name: series.name,
            value: series.data[index] || 0
        }))
    }));
    
    return {
        series: [{
            type: 'sunburst',
            data: sunburstData,
            radius: [0, '90%'],
            label: {
                rotate: 'radial'
            },
            emphasis: {
                focus: 'ancestor'
            }
        }]
    };
}

/**
 * Sankey Option
 */
function getSankeyOption() {
    // Generate sample Sankey data
    const nodes = [];
    const links = [];
    
    App.chartData.categories.forEach((cat, i) => {
        nodes.push({ name: `Source ${cat}` });
        nodes.push({ name: `Target ${cat}` });
        links.push({
            source: `Source ${cat}`,
            target: `Target ${cat}`,
            value: App.chartData.series[0]?.data[i] || 10
        });
    });
    
    return {
        series: [{
            type: 'sankey',
            layout: 'none',
            emphasis: {
                focus: 'adjacency'
            },
            data: nodes,
            links: links,
            lineStyle: {
                color: 'gradient',
                curveness: 0.5
            }
        }]
    };
}

/**
 * Boxplot Option
 */
function getBoxplotOption() {
    // Generate sample boxplot data
    const boxplotData = App.chartData.series.map(series => {
        const sorted = [...series.data].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const q2 = sorted[Math.floor(sorted.length * 0.5)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        return [min, q1, q2, q3, max];
    });
    
    return {
        xAxis: {
            type: 'category',
            data: App.chartData.series.map(s => s.name)
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            type: 'boxplot',
            data: boxplotData
        }]
    };
}

/**
 * Candlestick Option
 */
function getCandlestickOption() {
    // Generate sample candlestick data (open, close, low, high)
    const candlestickData = App.chartData.categories.map((cat, i) => {
        const base = App.chartData.series[0]?.data[i] || 100;
        return [
            base - Math.random() * 10, // open
            base + Math.random() * 10, // close
            base - Math.random() * 15, // low
            base + Math.random() * 15  // high
        ];
    });
    
    return {
        xAxis: {
            type: 'category',
            data: App.chartData.categories
        },
        yAxis: {
            type: 'value',
            scale: true
        },
        series: [{
            type: 'candlestick',
            data: candlestickData,
            itemStyle: {
                color: App.customColors[0],
                color0: App.customColors[1],
                borderColor: App.customColors[2],
                borderColor0: App.customColors[3]
            }
        }]
    };
}

/**
 * Parallel Coordinates Option
 */
function getParallelOption() {
    const parallelAxis = App.chartData.categories.map((cat, index) => ({
        dim: index,
        name: cat,
        type: 'value',
        min: 0,
        max: Math.max(...App.chartData.series.map(s => s.data[index] || 0)) * 1.2
    }));
    
    const data = App.chartData.series.map(series => ({
        name: series.name,
        value: series.data,
        lineStyle: {
            width: 2
        }
    }));
    
    return {
        parallelAxis: parallelAxis,
        parallel: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '20%'
        },
        series: [{
            type: 'parallel',
            lineStyle: {
                width: 2
            },
            data: data
        }]
    };
}

/**
 * Graph/Network Option
 */
function getGraphOption() {
    // Generate sample graph data
    const nodes = App.chartData.categories.map((cat, i) => ({
        name: cat,
        symbolSize: 30 + Math.random() * 20,
        value: App.chartData.series[0]?.data[i] || 10,
        category: i % 3
    }));
    
    const links = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        links.push({
            source: nodes[i].name,
            target: nodes[i + 1].name
        });
    }
    
    return {
        series: [{
            type: 'graph',
            layout: App.chartConfig.graphLayout || 'force',
            data: nodes,
            links: links,
            categories: [
                { name: 'Category 1' },
                { name: 'Category 2' },
                { name: 'Category 3' }
            ],
            roam: true,
            label: {
                show: true,
                position: 'right',
                formatter: '{b}'
            },
            labelLayout: {
                hideOverlap: true
            },
            lineStyle: {
                color: 'source',
                curveness: 0.3
            },
            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 10
                }
            },
            force: {
                repulsion: 100,
                edgeLength: 50
            }
        }]
    };
}

/**
 * Bind Event Listeners
 */
function bindEventListeners() {
    // Chart Type Selection
    document.querySelectorAll('.chart-type-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.chart-type-item.active')?.classList.remove('active');
            this.classList.add('active');
            App.currentChartType = this.dataset.chartType;
            updateChart();
        });
    });
    
    // Navigation Buttons
    document.querySelector('[data-action="new-chart"]')?.addEventListener('click', newChart);
    document.querySelector('[data-action="save-chart"]')?.addEventListener('click', saveChart);
    document.querySelector('[data-action="open-file"]')?.addEventListener('click', openFile);
    document.querySelector('[data-action="templates"]')?.addEventListener('click', showTemplates);
    document.querySelector('[data-action="export"]')?.addEventListener('click', showExportModal);
    document.querySelector('[data-action="undo"]')?.addEventListener('click', undo);
    document.querySelector('[data-action="redo"]')?.addEventListener('click', redo);
    document.querySelector('[data-action="toggle-theme"]')?.addEventListener('click', toggleDarkMode);
    document.querySelector('[data-action="toggle-fullscreen"]')?.addEventListener('click', toggleFullscreen);
    
    // Data Source Tabs
    document.querySelectorAll('.data-source-tabs .tab-btn').forEach(tab => {
        tab.addEventListener('click', function() {
            switchDataTab(this.dataset.tab);
        });
    });
    
    // Data Table Events
    setupDataTableEvents();
    
    // Customization Panel Tabs
    document.querySelectorAll('.custom-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchCustomizationPanel(this.dataset.panel);
        });
    });
    
    // Customization Controls
    setupCustomizationControls();
    
    // Toolbar Controls
    setupToolbarControls();
    
    // Modal Controls
    setupModalControls();
    
    // Series Management
    setupSeriesManagement();
    
    // Theme Selection
    setupThemeSelection();
    
    // Export Options
    setupExportOptions();
}

/**
 * Setup Data Table Events
 */
function setupDataTableEvents() {
    const dataTable = document.getElementById('dataTable');
    if (!dataTable) return;
    
    // Add contenteditable cells
    dataTable.addEventListener('input', function(e) {
        if (e.target.tagName === 'TD' || e.target.tagName === 'TH') {
            updateDataFromTable();
        }
    });
    
    // Add row button
    document.querySelector('[data-action="add-row"]')?.addEventListener('click', () => {
        addTableRow();
    });
    
    // Add column button
    document.querySelector('[data-action="add-column"]')?.addEventListener('click', () => {
        addTableColumn();
    });
    
    // Clear data button
    document.querySelector('[data-action="clear-data"]')?.addEventListener('click', () => {
        clearTableData();
    });
}

/**
 * Update Data from Table
 */
function updateDataFromTable() {
    const table = document.getElementById('dataTable');
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    
    // Update categories
    App.chartData.categories = rows.map(row => row.cells[0].textContent);
    
    // Update series data
    App.chartData.series = [];
    for (let i = 1; i < headers.length; i++) {
        const seriesData = rows.map(row => parseFloat(row.cells[i]?.textContent) || 0);
        App.chartData.series.push({
            name: headers[i],
            data: seriesData,
            type: App.currentChartType
        });
    }
    
    updateChart();
}

/**
 * Add Table Row
 */
function addTableRow() {
    const table = document.getElementById('dataTable');
    const tbody = table.querySelector('tbody');
    const columnCount = table.querySelector('thead tr').cells.length;
    
    const newRow = tbody.insertRow();
    for (let i = 0; i < columnCount; i++) {
        const cell = newRow.insertCell();
        cell.contentEditable = true;
        cell.textContent = i === 0 ? `Item ${tbody.rows.length}` : '0';
    }
    
    updateDataFromTable();
}

/**
 * Add Table Column
 */
function addTableColumn() {
    const table = document.getElementById('dataTable');
    const headerRow = table.querySelector('thead tr');
    const bodyRows = table.querySelectorAll('tbody tr');
    
    // Add header
    const th = document.createElement('th');
    th.contentEditable = true;
    th.textContent = `Value ${headerRow.cells.length}`;
    headerRow.appendChild(th);
    
    // Add cells to body rows
    bodyRows.forEach(row => {
        const cell = row.insertCell();
        cell.contentEditable = true;
        cell.textContent = '0';
    });
    
    updateDataFromTable();
}

/**
 * Clear Table Data
 */
function clearTableData() {
    if (confirm('Are you sure you want to clear all data?')) {
        const table = document.getElementById('dataTable');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        
        // Add one empty row
        addTableRow();
        updateDataFromTable();
    }
}

/**
 * Setup Customization Controls
 */
function setupCustomizationControls() {
    // General Panel Controls
    document.getElementById('chartTitle')?.addEventListener('input', (e) => {
        App.chartConfig.title = e.target.value;
        updateChart();
    });
    
    document.getElementById('chartSubtitle')?.addEventListener('input', (e) => {
        App.chartConfig.subtitle = e.target.value;
        updateChart();
    });
    
    document.getElementById('titlePosition')?.addEventListener('change', (e) => {
        App.chartConfig.titlePosition = e.target.value;
        updateChart();
    });
    
    document.getElementById('titleAlign')?.addEventListener('change', (e) => {
        App.chartConfig.titleAlign = e.target.value;
        updateChart();
    });
    
    // Axes Controls
    document.getElementById('showXAxis')?.addEventListener('change', (e) => {
        App.chartConfig.showXAxis = e.target.checked;
        updateChart();
    });
    
    document.getElementById('showYAxis')?.addEventListener('change', (e) => {
        App.chartConfig.showYAxis = e.target.checked;
        updateChart();
    });
    
    document.getElementById('xAxisLabel')?.addEventListener('input', (e) => {
        App.chartConfig.xAxisLabel = e.target.value;
        updateChart();
    });
    
    document.getElementById('yAxisLabel')?.addEventListener('input', (e) => {
        App.chartConfig.yAxisLabel = e.target.value;
        updateChart();
    });
    
    document.getElementById('xAxisGrid')?.addEventListener('change', (e) => {
        App.chartConfig.xAxisGrid = e.target.checked;
        updateChart();
    });
    
    document.getElementById('yAxisGrid')?.addEventListener('change', (e) => {
        App.chartConfig.yAxisGrid = e.target.checked;
        updateChart();
    });
    
    // Legend Controls
    document.getElementById('showLegend')?.addEventListener('change', (e) => {
        App.chartConfig.showLegend = e.target.checked;
        updateChart();
    });
    
    document.getElementById('legendOrientation')?.addEventListener('change', (e) => {
        App.chartConfig.legendOrientation = e.target.value;
        updateChart();
    });
    
    // Animation Controls
    document.getElementById('enableAnimation')?.addEventListener('change', (e) => {
        App.chartConfig.animation = e.target.checked;
        updateChart();
    });
    
    document.getElementById('animationDuration')?.addEventListener('input', (e) => {
        App.chartConfig.animationDuration = parseInt(e.target.value);
        document.querySelector('#animationDuration + .range-value').textContent = `${e.target.value}ms`;
        updateChart();
    });
    
    document.getElementById('animationEasing')?.addEventListener('change', (e) => {
        App.chartConfig.animationEasing = e.target.value;
        updateChart();
    });
    
    // Tooltip Controls
    document.getElementById('showTooltip')?.addEventListener('change', (e) => {
        App.chartConfig.showTooltip = e.target.checked;
        updateChart();
    });
    
    document.getElementById('axisPointer')?.addEventListener('change', (e) => {
        App.chartConfig.axisPointer = e.target.value;
        updateChart();
    });
    
    // Range inputs with value display
    document.querySelectorAll('input[type="range"]').forEach(input => {
        const valueDisplay = input.nextElementSibling;
        if (valueDisplay?.classList.contains('range-value')) {
            input.addEventListener('input', () => {
                const suffix = input.id.includes('Rotation') ? '°' : 
                              input.id.includes('Duration') ? 'ms' : 
                              input.id.includes('Quality') ? '%' : '';
                valueDisplay.textContent = input.value + suffix;
            });
        }
    });
    
    // Color inputs
    document.querySelectorAll('input[type="color"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const syncInput = document.querySelector(`[data-sync="${input.id}"]`);
            if (syncInput) {
                syncInput.value = e.target.value;
            }
            
            // Update custom colors if in palette
            const index = input.dataset.index;
            if (index !== undefined) {
                App.customColors[index] = e.target.value;
                updateChart();
            }
        });
    });
    
    // Text inputs synced with color inputs
    document.querySelectorAll('[data-sync]').forEach(input => {
        input.addEventListener('input', (e) => {
            const colorInput = document.getElementById(input.dataset.sync);
            if (colorInput && /^#[0-9A-F]{6}$/i.test(e.target.value)) {
                colorInput.value = e.target.value;
                colorInput.dispatchEvent(new Event('change'));
            }
        });
    });
    
    // Checkbox toggles for sections
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const targetId = checkbox.id.replace('show', '').replace('enable', '');
        const targetSection = checkbox.parentElement.nextElementSibling;
        
        if (targetSection && (targetSection.classList.contains(`${targetId.toLowerCase()}-settings`) || 
            targetSection.classList.contains(`${targetId.replace(/([A-Z])/g, '-$1').toLowerCase()}-settings`))) {
            checkbox.addEventListener('change', () => {
                targetSection.style.display = checkbox.checked ? 'block' : 'none';
            });
        }
    });
}

/**
 * Setup Toolbar Controls
 */
function setupToolbarControls() {
    // Zoom controls
    document.querySelector('[data-action="zoom-in"]')?.addEventListener('click', () => {
        App.zoomLevel = Math.min(200, App.zoomLevel + 10);
        applyZoom();
    });
    
    document.querySelector('[data-action="zoom-out"]')?.addEventListener('click', () => {
        App.zoomLevel = Math.max(50, App.zoomLevel - 10);
        applyZoom();
    });
    
    document.querySelector('[data-action="reset-zoom"]')?.addEventListener('click', () => {
        App.zoomLevel = 100;
        applyZoom();
    });
    
    // Toggle controls
    document.querySelector('[data-action="toggle-grid"]')?.addEventListener('click', function() {
        this.classList.toggle('active');
        App.chartConfig.showGrid = !App.chartConfig.showGrid;
        updateChart();
    });
    
    document.querySelector('[data-action="toggle-legend"]')?.addEventListener('click', function() {
        this.classList.toggle('active');
        App.chartConfig.showLegend = !App.chartConfig.showLegend;
        updateChart();
    });
    
    document.querySelector('[data-action="toggle-tooltip"]')?.addEventListener('click', function() {
        this.classList.toggle('active');
        App.chartConfig.showTooltip = !App.chartConfig.showTooltip;
        updateChart();
    });
    
    // View mode buttons
    document.querySelectorAll('[data-view]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('[data-view].active')?.classList.remove('active');
            this.classList.add('active');
            switchViewMode(this.dataset.view);
        });
    });
    
    // Orientation select
    document.getElementById('chartOrientation')?.addEventListener('change', (e) => {
        App.chartConfig.orientation = e.target.value;
        updateChart();
    });
}

/**
 * Apply Zoom Level
 */
function applyZoom() {
    const container = document.getElementById('chartContainer');
    container.style.transform = `scale(${App.zoomLevel / 100})`;
    container.style.transformOrigin = 'center center';
}

/**
 * Switch View Mode
 */
function switchViewMode(mode) {
    const chartContainer = document.getElementById('chartContainer');
    const codeEditor = document.getElementById('codeEditor');
    
    switch (mode) {
        case 'chart':
            chartContainer.style.display = 'block';
            codeEditor.style.display = 'none';
            break;
        case 'code':
            chartContainer.style.display = 'none';
            codeEditor.style.display = 'block';
            updateCodeView();
            break;
        case 'split':
            chartContainer.style.display = 'block';
            chartContainer.style.width = '50%';
            codeEditor.style.display = 'block';
            codeEditor.style.width = '50%';
            updateCodeView();
            break;
    }
    
    // Resize chart after view change
    setTimeout(() => {
        App.chart?.resize();
    }, 100);
}

/**
 * Update Code View
 */
function updateCodeView() {
    const codeContent = document.getElementById('codeContent');
    const codeLanguage = document.getElementById('codeLanguage')?.value || 'javascript';
    
    if (!codeContent) return;
    
    let code = '';
    
    switch (codeLanguage) {
        case 'javascript':
            code = generateJavaScriptCode();
            break;
        case 'json':
            code = JSON.stringify(generateChartOption(), null, 2);
            break;
        case 'html':
            code = generateHTMLCode();
            break;
    }
    
    codeContent.value = code;
}

/**
 * Generate JavaScript Code
 */
function generateJavaScriptCode() {
    const option = generateChartOption();
    return `// Initialize ECharts instance
const chart = echarts.init(document.getElementById('chart'));

// Chart configuration
const option = ${JSON.stringify(option, null, 2)};

// Set chart option
chart.setOption(option);

// Make chart responsive
window.addEventListener('resize', () => {
    chart.resize();
});`;
}

/**
 * Generate HTML Code
 */
function generateHTMLCode() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${App.chartConfig.title}</title>
    <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
    <style>
        #chart {
            width: 100%;
            height: 600px;
        }
    </style>
</head>
<body>
    <div id="chart"></div>
    <script>
        ${generateJavaScriptCode()}
    </script>
</body>
</html>`;
}

/**
 * Setup Modal Controls
 */
function setupModalControls() {
    // Close modal buttons
    document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });
    
    // Click outside to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

/**
 * Show Templates Modal
 */
function showTemplates() {
    const modal = document.getElementById('templateModal');
    modal?.classList.add('active');
    loadTemplateGallery();
}

/**
 * Load Template Gallery
 */
function loadTemplateGallery() {
    const grid = document.querySelector('.template-grid');
    if (!grid) return;
    
    // Clear existing templates
    grid.innerHTML = '';
    
    // Add template cards
    getChartTemplates().forEach(template => {
        const card = createTemplateCard(template);
        grid.appendChild(card);
    });
}

/**
 * Create Template Card
 */
function createTemplateCard(template) {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
        <div class="template-preview">
            <img src="${template.preview}" alt="${template.name}">
        </div>
        <div class="template-info">
            <h4>${template.name}</h4>
            <p>${template.description}</p>
            <button class="btn-primary btn-sm" data-template-id="${template.id}">
                Use Template
            </button>
        </div>
    `;
    
    card.querySelector('button').addEventListener('click', () => {
        applyTemplate(template);
        document.getElementById('templateModal').classList.remove('active');
    });
    
    return card;
}

/**
 * Apply Template
 */
function applyTemplate(template) {
    App.currentChartType = template.type;
    App.chartData = template.data;
    App.chartConfig = { ...App.chartConfig, ...template.config };
    App.customColors = template.colors || App.customColors;
    
    // Update UI
    document.querySelector(`.chart-type-item[data-chart-type="${template.type}"]`)?.click();
    updateDataTable();
    updateChart();
    
    showToast('success', 'Template Applied', `${template.name} template has been applied successfully.`);
}

/**
 * Get Chart Templates
 */
function getChartTemplates() {
    return [
        {
            id: 'sales-dashboard',
            name: 'Sales Dashboard',
            description: 'Monthly sales performance with trend analysis',
            type: 'line',
            preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0Ij5TYWxlcyBEYXNoYm9hcmQ8L3RleHQ+PC9zdmc+',
            data: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                series: [
                    { name: 'Product A', data: [120, 132, 101, 134, 90, 230], type: 'line' },
                    { name: 'Product B', data: [220, 182, 191, 234, 290, 330], type: 'line' },
                    { name: 'Product C', data: [150, 232, 201, 154, 190, 330], type: 'line' }
                ]
            },
            config: {
                title: 'Sales Performance Dashboard',
                subtitle: 'Q1-Q2 2024',
                smooth: true
            },
            colors: ['#5470c6', '#91cc75', '#fac858']
        },
        {
            id: 'market-share',
            name: 'Market Share',
            description: 'Company market share distribution',
            type: 'pie',
            preview: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0Ij5NYXJrZXQgU2hhcmU8L3RleHQ+PC9zdmc+',
            data: {
                categories: ['Company A', 'Company B', 'Company C', 'Company D', 'Others'],
                series: [
                    { name: 'Market Share', data: [35, 28, 20, 12, 5], type: 'pie' }
                ]
            },
            config: {
                title: 'Market Share Analysis',
                subtitle: '2024',
                pieRadius: ['40%', '70%']
            },
            colors: ['#4f46e5', '#06b6d4', '#f59e0b', '#10b981', '#ef4444']
        }
    ];
}

/**
 * Update Data Table from App Data
 */
function updateDataTable() {
    const table = document.getElementById('dataTable');
    if (!table) return;
    
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');
    
    // Clear existing
    thead.innerHTML = '';
    tbody.innerHTML = '';
    
    // Add headers
    const categoryHeader = document.createElement('th');
    categoryHeader.contentEditable = true;
    categoryHeader.textContent = 'Category';
    thead.appendChild(categoryHeader);
    
    App.chartData.series.forEach(series => {
        const th = document.createElement('th');
        th.contentEditable = true;
        th.textContent = series.name;
        thead.appendChild(th);
    });
    
    // Add data rows
    App.chartData.categories.forEach((cat, index) => {
        const row = tbody.insertRow();
        
        const catCell = row.insertCell();
        catCell.contentEditable = true;
        catCell.textContent = cat;
        
        App.chartData.series.forEach(series => {
            const cell = row.insertCell();
            cell.contentEditable = true;
            cell.textContent = series.data[index] || 0;
        });
    });
}

/**
 * Show Export Modal
 */
function showExportModal() {
    const modal = document.getElementById('exportModal');
    modal?.classList.add('active');
}

/**
 * Setup Export Options
 */
function setupExportOptions() {
    document.querySelector('[data-action="confirm-export"]')?.addEventListener('click', () => {
        const format = document.querySelector('input[name="exportFormat"]:checked')?.value;
        exportChart(format);
        document.getElementById('exportModal').classList.remove('active');
    });
    
    document.querySelector('[data-action="cancel-export"]')?.addEventListener('click', () => {
        document.getElementById('exportModal').classList.remove('active');
    });
}

/**
 * Export Chart
 */
function exportChart(format) {
    switch (format) {
        case 'png':
        case 'jpg':
            exportAsImage(format);
            break;
        case 'svg':
            exportAsSVG();
            break;
        case 'pdf':
            exportAsPDF();
            break;
        case 'html':
            exportAsHTML();
            break;
        case 'json':
            exportAsJSON();
            break;
    }
}

/**
 * Export as Image
 */
function exportAsImage(format) {
    const url = App.chart.getDataURL({
        type: format,
        pixelRatio: 2,
        backgroundColor: document.getElementById('exportTransparent')?.checked ? 'transparent' : '#fff'
    });
    
    const link = document.createElement('a');
    link.download = `chart.${format}`;
    link.href = url;
    link.click();
    
    showToast('success', 'Export Successful', `Chart exported as ${format.toUpperCase()} image.`);
}

/**
 * Export as SVG
 */
function exportAsSVG() {
    const svg = App.chart.renderToSVGString();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'chart.svg';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('success', 'Export Successful', 'Chart exported as SVG.');
}

/**
 * Export as HTML
 */
function exportAsHTML() {
    const html = generateHTMLCode();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'chart.html';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('success', 'Export Successful', 'Chart exported as interactive HTML.');
}

/**
 * Export as JSON
 */
function exportAsJSON() {
    const config = {
        type: App.currentChartType,
        data: App.chartData,
        config: App.chartConfig,
        colors: App.customColors,
        option: generateChartOption()
    };
    
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = 'chart-config.json';
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('success', 'Export Successful', 'Chart configuration exported as JSON.');
}

/**
 * Export as PDF (requires additional library in production)
 */
function exportAsPDF() {
    // In production, you would use a library like jsPDF
    showToast('info', 'PDF Export', 'PDF export requires additional setup. Using image export instead.');
    exportAsImage('png');
}

/**
 * Toggle Dark Mode
 */
function toggleDarkMode() {
    App.isDarkMode = !App.isDarkMode;
    document.body.classList.toggle('dark-theme');
    
    const icon = document.querySelector('[data-action="toggle-theme"] i');
    if (icon) {
        icon.className = App.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Reinitialize chart with new theme
    const container = document.getElementById('chartContainer');
    App.chart.dispose();
    App.chart = echarts.init(container, App.isDarkMode ? 'dark' : null);
    updateChart();
    
    // Save preference
    localStorage.setItem('darkMode', App.isDarkMode);
}

/**
 * Toggle Fullscreen
 */
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.querySelector('[data-action="toggle-fullscreen"] i').className = 'fas fa-compress';
    } else {
        document.exitFullscreen();
        document.querySelector('[data-action="toggle-fullscreen"] i').className = 'fas fa-expand';
    }
}

/**
 * Show Toast Notification
 */
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'exclamation-circle' : 
                          type === 'warning' ? 'exclamation-triangle' : 
                          'info-circle'}"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Manual close
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.remove();
    });
}

/**
 * Undo Action
 */
function undo() {
    if (App.historyIndex > 0) {
        App.historyIndex--;
        restoreFromHistory(App.history[App.historyIndex]);
        showToast('info', 'Undo', 'Action undone');
    }
}

/**
 * Redo Action
 */
function redo() {
    if (App.historyIndex < App.history.length - 1) {
        App.historyIndex++;
        restoreFromHistory(App.history[App.historyIndex]);
        showToast('info', 'Redo', 'Action redone');
    }
}

/**
 * Save to History
 */
function saveToHistory() {
    const state = {
        type: App.currentChartType,
        data: JSON.parse(JSON.stringify(App.chartData)),
        config: JSON.parse(JSON.stringify(App.chartConfig)),
        colors: [...App.customColors]
    };
    
    // Remove future history if we're not at the end
    if (App.historyIndex < App.history.length - 1) {
        App.history = App.history.slice(0, App.historyIndex + 1);
    }
    
    App.history.push(state);
    App.historyIndex = App.history.length - 1;
    
    // Limit history size
    if (App.history.length > 50) {
        App.history.shift();
        App.historyIndex--;
    }
}

/**
 * Restore from History
 */
function restoreFromHistory(state) {
    App.currentChartType = state.type;
    App.chartData = JSON.parse(JSON.stringify(state.data));
    App.chartConfig = JSON.parse(JSON.stringify(state.config));
    App.customColors = [...state.colors];
    
    // Update UI
    document.querySelector(`.chart-type-item[data-chart-type="${state.type}"]`)?.click();
    updateDataTable();
    
    // Update chart without saving to history
    const option = generateChartOption();
    App.chart.setOption(option, true);
    updateChartStatus();
}

/**
 * Update Chart Status
 */
function updateChartStatus() {
    const info = document.getElementById('chartInfo');
    const lastUpdate = document.getElementById('lastUpdate');
    
    if (info) {
        const seriesCount = App.chartData.series.length;
        const dataPoints = App.chartData.categories.length;
        const chartTypeName = App.currentChartType.charAt(0).toUpperCase() + App.currentChartType.slice(1);
        info.textContent = `${chartTypeName} Chart - ${seriesCount} Series, ${dataPoints} Data Points`;
    }
    
    if (lastUpdate) {
        lastUpdate.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    }
}

/**
 * Initialize Keyboard Shortcuts
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Z: Undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            undo();
        }
        
        // Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y: Redo
        if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') ||
            ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
            e.preventDefault();
            redo();
        }
        
        // Ctrl/Cmd + S: Save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveChart();
        }
        
        // Ctrl/Cmd + O: Open
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            openFile();
        }
        
        // Ctrl/Cmd + E: Export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            showExportModal();
        }
        
        // Ctrl/Cmd + N: New Chart
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            newChart();
        }
        
        // F11: Fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
    });
}

/**
 * New Chart
 */
function newChart() {
    if (confirm('Create a new chart? Any unsaved changes will be lost.')) {
        // Reset to defaults
        App.currentChartType = 'line';
        App.chartData = {
            categories: ['Category 1', 'Category 2', 'Category 3'],
            series: [
                { name: 'Series 1', data: [100, 150, 120], type: 'line' }
            ]
        };
        App.chartConfig = {
            title: 'New Chart',
            subtitle: '',
            showLegend: true,
            showTooltip: true,
            showGrid: true,
            animation: true,
            animationDuration: 1000,
            animationEasing: 'cubicInOut'
        };
        
        updateDataTable();
        updateChart();
        showToast('success', 'New Chart', 'New chart created successfully.');
    }
}

/**
 * Save Chart
 */
function saveChart() {
    const chartData = {
        version: '2.0.0',
        timestamp: new Date().toISOString(),
        type: App.currentChartType,
        data: App.chartData,
        config: App.chartConfig,
        colors: App.customColors,
        theme: App.currentTheme
    };
    
    const json = JSON.stringify(chartData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `chart-${Date.now()}.json`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
    
    // Save to localStorage as well
    localStorage.setItem('chartforge_autosave', json);
    
    showToast('success', 'Chart Saved', 'Your chart has been saved successfully.');
}

/**
 * Open File
 */
function openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                loadChartData(data);
                showToast('success', 'File Loaded', 'Chart loaded successfully.');
            } catch (error) {
                showToast('error', 'Load Failed', 'Failed to load chart file.');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

/**
 * Load Chart Data
 */
function loadChartData(data) {
    App.currentChartType = data.type || 'line';
    App.chartData = data.data || App.chartData;
    App.chartConfig = { ...App.chartConfig, ...data.config };
    App.customColors = data.colors || App.customColors;
    App.currentTheme = data.theme || 'default';
    
    // Update UI
    document.querySelector(`.chart-type-item[data-chart-type="${App.currentChartType}"]`)?.click();
    updateDataTable();
    updateChart();
}

/**
 * Setup Auto Save
 */
function setupAutoSave() {
    // Auto-save every 30 seconds
    setInterval(() => {
        const chartData = {
            version: '2.0.0',
            timestamp: new Date().toISOString(),
            type: App.currentChartType,
            data: App.chartData,
            config: App.chartConfig,
            colors: App.customColors,
            theme: App.currentTheme
        };
        
        localStorage.setItem('chartforge_autosave', JSON.stringify(chartData));
    }, 30000);
}

/**
 * Check for Saved Work
 */
function checkForSavedWork() {
    const saved = localStorage.getItem('chartforge_autosave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const timestamp = new Date(data.timestamp);
            const timeAgo = Math.floor((Date.now() - timestamp) / 1000 / 60);
            
            if (timeAgo < 1440) { // Less than 24 hours old
                if (confirm(`Found auto-saved work from ${timeAgo} minutes ago. Would you like to restore it?`)) {
                    loadChartData(data);
                    showToast('success', 'Restored', 'Auto-saved work has been restored.');
                }
            }
        } catch (error) {
            console.error('Failed to load auto-save:', error);
        }
    }
}

/**
 * Initialize Tooltips
 */
function initializeTooltips() {
    // Add tooltips to buttons with title attributes
    document.querySelectorAll('[title]').forEach(element => {
        // Implementation would use a tooltip library in production
    });
}

/**
 * Setup Resize Observer
 */
function setupResizeObserver() {
    const container = document.getElementById('chartContainer');
    if (!container) return;
    
    const resizeObserver = new ResizeObserver(() => {
        App.chart?.resize();
    });
    
    resizeObserver.observe(container);
}

/**
 * Load User Preferences
 */
function loadUserPreferences() {
    const prefs = localStorage.getItem('chartforge_preferences');
    if (prefs) {
        try {
            const preferences = JSON.parse(prefs);
            // Apply preferences
            Object.assign(App.chartConfig, preferences);
        } catch (error) {
            console.error('Failed to load preferences:', error);
        }
    }
}

/**
 * Initialize Drag and Drop
 */
function initializeDragAndDrop() {
    const dropzone = document.getElementById('dropzone');
    if (!dropzone) return;
    
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileImport(files[0]);
        }
    });
}

/**
 * Handle File Import
 */
function handleFileImport(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    
    switch (extension) {
        case 'csv':
            importCSV(file);
            break;
        case 'json':
            importJSON(file);
            break;
        case 'xlsx':
        case 'xls':
            showToast('info', 'Excel Import', 'Excel import requires additional setup.');
            break;
        default:
            showToast('error', 'Invalid File', 'Please upload a CSV or JSON file.');
    }
}

/**
 * Import CSV File
 */
function importCSV(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        App.chartData.categories = [];
        App.chartData.series = headers.slice(1).map(h => ({ name: h, data: [], type: App.currentChartType }));
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(v => v.trim());
                App.chartData.categories.push(values[0]);
                
                for (let j = 1; j < values.length; j++) {
                    App.chartData.series[j - 1].data.push(parseFloat(values[j]) || 0);
                }
            }
        }
        
        updateDataTable();
        updateChart();
        showToast('success', 'Import Successful', 'CSV data imported successfully.');
    };
    reader.readAsText(file);
}

/**
 * Import JSON File
 */
function importJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.data) {
                // Chart configuration file
                loadChartData(data);
            } else if (Array.isArray(data)) {
                // Array of data
                importJSONArray(data);
            } else {
                showToast('error', 'Invalid Format', 'JSON file format not recognized.');
            }
        } catch (error) {
            showToast('error', 'Import Failed', 'Failed to parse JSON file.');
        }
    };
    reader.readAsText(file);
}

/**
 * Import JSON Array
 */
function importJSONArray(data) {
    if (data.length === 0) return;
    
    const keys = Object.keys(data[0]);
    App.chartData.categories = data.map(d => d[keys[0]]);
    App.chartData.series = keys.slice(1).map(key => ({
        name: key,
        data: data.map(d => d[key]),
        type: App.currentChartType
    }));
    
    updateDataTable();
    updateChart();
    showToast('success', 'Import Successful', 'JSON data imported successfully.');
}

/**
 * Handle Chart Click Events
 */
function handleChartClick(params) {
    console.log('Chart clicked:', params);
    // Add custom click handling here
}

/**
 * Handle Legend Change Events
 */
function handleLegendChange(params) {
    console.log('Legend changed:', params);
    // Add custom legend handling here
}

/**
 * Handle Data Zoom Events
 */
function handleDataZoom(params) {
    console.log('Data zoomed:', params);
    // Add custom zoom handling here
}

/**
 * Switch Data Tab
 */
function switchDataTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.data-source-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.data-source-tabs .tab-btn[data-tab="${tab}"]`)?.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tab}-data`)?.classList.add('active');
}

/**
 * Switch Customization Panel
 */
function switchCustomizationPanel(panel) {
    // Update tab buttons
    document.querySelectorAll('.custom-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.custom-tab[data-panel="${panel}"]`)?.classList.add('active');
    
    // Update panel content
    document.querySelectorAll('.panel-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`panel-${panel}`)?.classList.add('active');
}

/**
 * Setup Series Management
 */
function setupSeriesManagement() {
    // Add series button
    document.querySelector('[data-action="add-series"]')?.addEventListener('click', () => {
        addSeries();
    });
    
    // Series item events
    document.querySelectorAll('.series-item').forEach(item => {
        setupSeriesItemEvents(item);
    });
}

/**
 * Add Series
 */
function addSeries() {
    const seriesName = `Series ${App.chartData.series.length + 1}`;
    const seriesData = new Array(App.chartData.categories.length).fill(0);
    
    App.chartData.series.push({
        name: seriesName,
        data: seriesData,
        type: App.currentChartType
    });
    
    // Add to UI
    const seriesList = document.getElementById('seriesList');
    const seriesItem = createSeriesItem(seriesName, App.chartData.series.length - 1);
    seriesList.appendChild(seriesItem);
    
    // Update table and chart
    updateDataTable();
    updateChart();
}

/**
 * Create Series Item
 */
function createSeriesItem(name, index) {
    const item = document.createElement('div');
    item.className = 'series-item';
    item.innerHTML = `
        <div class="series-color" style="background: ${App.customColors[index % App.customColors.length]};"></div>
        <input type="text" value="${name}" class="series-name">
        <div class="series-actions">
            <button class="btn-icon-xs" data-action="toggle-series">
                <i class="fas fa-eye"></i>
            </button>
            <button class="btn-icon-xs" data-action="delete-series">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    setupSeriesItemEvents(item);
    return item;
}

/**
 * Setup Series Item Events
 */
function setupSeriesItemEvents(item) {
    // Series name change
    item.querySelector('.series-name')?.addEventListener('input', (e) => {
        const index = Array.from(item.parentElement.children).indexOf(item);
        if (App.chartData.series[index]) {
            App.chartData.series[index].name = e.target.value;
            updateChart();
        }
    });
    
    // Toggle series visibility
    item.querySelector('[data-action="toggle-series"]')?.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
        // Implementation for hiding/showing series
    });
    
    // Delete series
    item.querySelector('[data-action="delete-series"]')?.addEventListener('click', () => {
        if (App.chartData.series.length > 1) {
            const index = Array.from(item.parentElement.children).indexOf(item);
            App.chartData.series.splice(index, 1);
            item.remove();
            updateDataTable();
            updateChart();
        } else {
            showToast('warning', 'Cannot Delete', 'At least one series is required.');
        }
    });
}

/**
 * Setup Theme Selection
 */
function setupThemeSelection() {
    document.querySelectorAll('.theme-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.theme-item.active')?.classList.remove('active');
            this.classList.add('active');
            
            const theme = this.dataset.theme;
            applyTheme(theme);
        });
    });
}

/**
 * Apply Theme
 */
function applyTheme(theme) {
    App.currentTheme = theme;
    
    // Get theme colors
    const themeColors = getThemeColors(theme);
    if (themeColors) {
        App.customColors = themeColors;
        updateChart();
    }
}

/**
 * Get Theme Colors
 */
function getThemeColors(theme) {
    const themes = {
        'default': ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'],
        'dark': ['#4992ff', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9'],
        'vintage': ['#d87c7c', '#919e8b', '#d7ab82', '#6e7074', '#61a0a8'],
        'pastel': ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff']
    };
    
    return themes[theme] || themes['default'];
}

/**
 * Load Templates
 */
function loadTemplates() {
    // Load templates from storage or API
    App.templates = getChartTemplates();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}