/**
 * ChartForge Pro - Advanced Data Manager
 * Comprehensive data handling, analysis, and AI features
 */

class DataManager {
    constructor() {
        this.datasets = new Map();
        this.activeDataset = null;
        this.dataConnectors = new Map();
        this.transformations = [];
        this.aiModels = new Map();
        this.cache = new Map();
        this.validators = new Map();
        this.aggregators = new Map();
        this.initializeDataManager();
    }

    /**
     * Initialize Data Manager
     */
    initializeDataManager() {
        this.registerDataConnectors();
        this.registerValidators();
        this.registerAggregators();
        this.initializeAIModels();
        this.setupDataSync();
        console.log('Advanced Data Manager initialized');
    }

    /**
     * Register data connectors for various sources
     */
    registerDataConnectors() {
        // CSV Connector
        this.dataConnectors.set('csv', {
            name: 'CSV Connector',
            parse: this.parseCSV.bind(this),
            export: this.exportCSV.bind(this),
            validate: this.validateCSV.bind(this)
        });

        // JSON Connector
        this.dataConnectors.set('json', {
            name: 'JSON Connector',
            parse: this.parseJSON.bind(this),
            export: this.exportJSON.bind(this),
            validate: this.validateJSON.bind(this)
        });

        // Excel Connector
        this.dataConnectors.set('excel', {
            name: 'Excel Connector',
            parse: this.parseExcel.bind(this),
            export: this.exportExcel.bind(this),
            validate: this.validateExcel.bind(this)
        });

        // SQL Connector
        this.dataConnectors.set('sql', {
            name: 'SQL Connector',
            connect: this.connectSQL.bind(this),
            query: this.querySQL.bind(this),
            disconnect: this.disconnectSQL.bind(this)
        });

        // API Connector
        this.dataConnectors.set('api', {
            name: 'API Connector',
            fetch: this.fetchAPI.bind(this),
            post: this.postAPI.bind(this),
            stream: this.streamAPI.bind(this)
        });

        // WebSocket Connector
        this.dataConnectors.set('websocket', {
            name: 'WebSocket Connector',
            connect: this.connectWebSocket.bind(this),
            subscribe: this.subscribeWebSocket.bind(this),
            disconnect: this.disconnectWebSocket.bind(this)
        });

        // GraphQL Connector
        this.dataConnectors.set('graphql', {
            name: 'GraphQL Connector',
            query: this.queryGraphQL.bind(this),
            mutation: this.mutationGraphQL.bind(this),
            subscription: this.subscriptionGraphQL.bind(this)
        });

        // Firebase Connector
        this.dataConnectors.set('firebase', {
            name: 'Firebase Connector',
            connect: this.connectFirebase.bind(this),
            realtime: this.realtimeFirebase.bind(this),
            disconnect: this.disconnectFirebase.bind(this)
        });
    }

    /**
     * Parse CSV data
     */
    parseCSV(csvString, options = {}) {
        const {
            delimiter = ',',
            headers = true,
            skipRows = 0,
            encoding = 'UTF-8',
            dateFormat = 'YYYY-MM-DD',
            numberFormat = 'en-US'
        } = options;

        const lines = csvString.split('\n').slice(skipRows);
        const result = {
            headers: [],
            data: [],
            metadata: {
                rowCount: 0,
                columnCount: 0,
                dataTypes: [],
                statistics: {}
            }
        };

        if (lines.length === 0) return result;

        // Parse headers
        if (headers) {
            result.headers = this.parseCSVLine(lines[0], delimiter);
            result.metadata.columnCount = result.headers.length;
            lines.shift();
        }

        // Parse data
        lines.forEach(line => {
            if (line.trim()) {
                const row = this.parseCSVLine(line, delimiter);
                result.data.push(row);
            }
        });

        result.metadata.rowCount = result.data.length;

        // Detect data types
        result.metadata.dataTypes = this.detectDataTypes(result.data);

        // Calculate statistics
        result.metadata.statistics = this.calculateStatistics(result.data, result.metadata.dataTypes);

        return result;
    }

    /**
     * Parse CSV line handling quoted values
     */
    parseCSVLine(line, delimiter) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === delimiter && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current.trim());
        return result;
    }

    /**
     * Export data to CSV
     */
    exportCSV(data, options = {}) {
        const {
            headers = true,
            delimiter = ',',
            lineBreak = '\n',
            quote = '"',
            escapeQuote = '""'
        } = options;

        let csv = '';

        // Add headers
        if (headers && data.headers) {
            csv += data.headers.map(h => this.escapeCSVValue(h, quote, escapeQuote)).join(delimiter) + lineBreak;
        }

        // Add data
        data.data.forEach(row => {
            csv += row.map(val => this.escapeCSVValue(val, quote, escapeQuote)).join(delimiter) + lineBreak;
        });

        return csv;
    }

    /**
     * Escape CSV value
     */
    escapeCSVValue(value, quote, escapeQuote) {
        if (value === null || value === undefined) return '';
        
        const stringValue = String(value);
        
        if (stringValue.includes(',') || stringValue.includes(quote) || stringValue.includes('\n')) {
            return quote + stringValue.replace(new RegExp(quote, 'g'), escapeQuote) + quote;
        }
        
        return stringValue;
    }

    /**
     * Validate CSV data
     */
    validateCSV(data) {
        const errors = [];
        const warnings = [];

        // Check for empty data
        if (!data || !data.data || data.data.length === 0) {
            errors.push('No data found');
            return { valid: false, errors, warnings };
        }

        // Check for consistent column count
        const columnCount = data.headers ? data.headers.length : data.data[0].length;
        data.data.forEach((row, index) => {
            if (row.length !== columnCount) {
                warnings.push(`Row ${index + 1} has ${row.length} columns, expected ${columnCount}`);
            }
        });

        // Check for data type consistency
        const dataTypes = this.detectDataTypes(data.data);
        dataTypes.forEach((type, colIndex) => {
            if (type === 'mixed') {
                warnings.push(`Column ${colIndex + 1} has mixed data types`);
            }
        });

        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * Parse JSON data
     */
    parseJSON(jsonString, options = {}) {
        const {
            path = null,
            flatten = false,
            normalize = false
        } = options;

        try {
            let data = JSON.parse(jsonString);

            // Navigate to specific path if provided
            if (path) {
                const pathParts = path.split('.');
                for (const part of pathParts) {
                    data = data[part];
                    if (data === undefined) {
                        throw new Error(`Path ${path} not found in JSON`);
                    }
                }
            }

            // Flatten nested structure if requested
            if (flatten) {
                data = this.flattenJSON(data);
            }

            // Normalize data structure
            if (normalize) {
                data = this.normalizeJSON(data);
            }

            return {
                data,
                metadata: {
                    type: Array.isArray(data) ? 'array' : 'object',
                    count: Array.isArray(data) ? data.length : Object.keys(data).length,
                    structure: this.analyzeJSONStructure(data)
                }
            };
        } catch (error) {
            throw new Error(`Failed to parse JSON: ${error.message}`);
        }
    }

    /**
     * Flatten JSON structure
     */
    flattenJSON(obj, prefix = '', result = {}) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    this.flattenJSON(obj[key], newKey, result);
                } else {
                    result[newKey] = obj[key];
                }
            }
        }
        return result;
    }

    /**
     * Normalize JSON data
     */
    normalizeJSON(data) {
        if (Array.isArray(data)) {
            // Normalize array of objects
            const keys = new Set();
            data.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    Object.keys(item).forEach(key => keys.add(key));
                }
            });

            return data.map(item => {
                const normalized = {};
                keys.forEach(key => {
                    normalized[key] = item[key] !== undefined ? item[key] : null;
                });
                return normalized;
            });
        } else if (typeof data === 'object' && data !== null) {
            // Convert object to array format
            return Object.entries(data).map(([key, value]) => ({
                key,
                value
            }));
        }

        return data;
    }

    /**
     * Analyze JSON structure
     */
    analyzeJSONStructure(data, depth = 0, maxDepth = 10) {
        if (depth > maxDepth) return { type: 'deep', depth };

        const structure = {
            type: Array.isArray(data) ? 'array' : typeof data,
            depth
        };

        if (Array.isArray(data)) {
            structure.length = data.length;
            if (data.length > 0) {
                structure.items = this.analyzeJSONStructure(data[0], depth + 1, maxDepth);
            }
        } else if (typeof data === 'object' && data !== null) {
            structure.properties = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    structure.properties[key] = this.analyzeJSONStructure(data[key], depth + 1, maxDepth);
                }
            }
        }

        return structure;
    }

    /**
     * Export data to JSON
     */
    exportJSON(data, options = {}) {
        const {
            pretty = true,
            indent = 2,
            replacer = null
        } = options;

        return JSON.stringify(data, replacer, pretty ? indent : 0);
    }

    /**
     * Validate JSON data
     */
    validateJSON(data, schema = null) {
        const errors = [];
        const warnings = [];

        if (!data) {
            errors.push('No data provided');
            return { valid: false, errors, warnings };
        }

        // Validate against schema if provided
        if (schema) {
            const schemaErrors = this.validateJSONSchema(data, schema);
            errors.push(...schemaErrors);
        }

        // Check for common issues
        if (typeof data === 'object' && data !== null) {
            // Check for circular references
            try {
                JSON.stringify(data);
            } catch (error) {
                if (error.message.includes('circular')) {
                    errors.push('Data contains circular references');
                }
            }

            // Check for undefined values
            const checkUndefined = (obj, path = '') => {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const currentPath = path ? `${path}.${key}` : key;
                        if (obj[key] === undefined) {
                            warnings.push(`Undefined value at ${currentPath}`);
                        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                            checkUndefined(obj[key], currentPath);
                        }
                    }
                }
            };
            checkUndefined(data);
        }

        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }

    /**
     * Validate JSON against schema
     */
    validateJSONSchema(data, schema) {
        const errors = [];

        const validate = (value, schemaObj, path = '') => {
            // Check type
            if (schemaObj.type) {
                const actualType = Array.isArray(value) ? 'array' : typeof value;
                if (actualType !== schemaObj.type) {
                    errors.push(`Type mismatch at ${path}: expected ${schemaObj.type}, got ${actualType}`);
                }
            }

            // Check required properties
            if (schemaObj.required && typeof value === 'object' && value !== null) {
                schemaObj.required.forEach(prop => {
                    if (!(prop in value)) {
                        errors.push(`Missing required property: ${path ? `${path}.${prop}` : prop}`);
                    }
                });
            }

            // Check properties
            if (schemaObj.properties && typeof value === 'object' && value !== null) {
                for (const prop in schemaObj.properties) {
                    if (prop in value) {
                        validate(value[prop], schemaObj.properties[prop], path ? `${path}.${prop}` : prop);
                    }
                }
            }

            // Check array items
            if (schemaObj.items && Array.isArray(value)) {
                value.forEach((item, index) => {
                    validate(item, schemaObj.items, `${path}[${index}]`);
                });
            }

            // Check minimum/maximum for numbers
            if (typeof value === 'number') {
                if (schemaObj.minimum !== undefined && value < schemaObj.minimum) {
                    errors.push(`Value at ${path} is below minimum: ${value} < ${schemaObj.minimum}`);
                }
                if (schemaObj.maximum !== undefined && value > schemaObj.maximum) {
                    errors.push(`Value at ${path} is above maximum: ${value} > ${schemaObj.maximum}`);
                }
            }

            // Check string patterns
            if (typeof value === 'string' && schemaObj.pattern) {
                const regex = new RegExp(schemaObj.pattern);
                if (!regex.test(value)) {
                    errors.push(`Value at ${path} does not match pattern: ${schemaObj.pattern}`);
                }
            }
        };

        validate(data, schema);
        return errors;
    }

    /**
     * Parse Excel data (simplified - would need library in production)
     */
    parseExcel(buffer, options = {}) {
        const {
            sheet = 0,
            range = null,
            headers = true
        } = options;

        // This is a simplified implementation
        // In production, you would use a library like xlsx or exceljs
        console.log('Excel parsing would require a library like xlsx');
        
        return {
            data: [],
            metadata: {
                sheets: [],
                format: 'xlsx'
            }
        };
    }

    /**
     * Export to Excel (simplified)
     */
    exportExcel(data, options = {}) {
        // This would require a library in production
        console.log('Excel export would require a library like xlsx');
        return null;
    }

    /**
     * Validate Excel data
     */
    validateExcel(data) {
        return this.validateCSV(data); // Similar validation logic
    }

    /**
     * Connect to SQL database
     */
    async connectSQL(config) {
        const {
            type = 'mysql',
            host,
            port,
            database,
            username,
            password,
            ssl = false
        } = config;

        // This would connect to actual database in production
        console.log(`Connecting to ${type} database at ${host}:${port}`);
        
        return {
            connectionId: `sql_${Date.now()}`,
            status: 'connected'
        };
    }

    /**
     * Query SQL database
     */
    async querySQL(connectionId, query, params = []) {
        // This would execute actual query in production
        console.log(`Executing query: ${query}`);
        
        return {
            rows: [],
            fields: [],
            affectedRows: 0
        };
    }

    /**
     * Disconnect from SQL database
     */
    async disconnectSQL(connectionId) {
        console.log(`Disconnecting from SQL: ${connectionId}`);
        return { status: 'disconnected' };
    }

    /**
     * Fetch data from API
     */
    async fetchAPI(url, options = {}) {
        const {
            method = 'GET',
            headers = {},
            params = {},
            timeout = 30000,
            retries = 3,
            cache = true
        } = options;

        // Check cache
        const cacheKey = `${method}:${url}:${JSON.stringify(params)}`;
        if (cache && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < timeout) {
                return cached.data;
            }
        }

        // Build URL with params
        const urlObj = new URL(url);
        Object.keys(params).forEach(key => {
            urlObj.searchParams.append(key, params[key]);
        });

        // Fetch with retries
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), timeout);

                const response = await fetch(urlObj.toString(), {
                    method,
                    headers,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                // Cache result
                if (cache) {
                    this.cache.set(cacheKey, {
                        data,
                        timestamp: Date.now()
                    });
                }

                return data;
            } catch (error) {
                lastError = error;
                if (i < retries - 1) {
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                }
            }
        }

        throw lastError;
    }

    /**
     * Post data to API
     */
    async postAPI(url, data, options = {}) {
        return this.fetchAPI(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
    }

    /**
     * Stream data from API
     */
    async streamAPI(url, onData, options = {}) {
        const response = await fetch(url, options);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            onData(chunk);
        }
    }

    /**
     * Connect to WebSocket
     */
    connectWebSocket(url, options = {}) {
        const {
            protocols = [],
            reconnect = true,
            reconnectInterval = 5000,
            maxReconnects = 10
        } = options;

        const ws = new WebSocket(url, protocols);
        const connectionId = `ws_${Date.now()}`;

        const connection = {
            id: connectionId,
            ws,
            reconnects: 0,
            listeners: new Map()
        };

        ws.onopen = () => {
            console.log(`WebSocket connected: ${connectionId}`);
            connection.reconnects = 0;
        };

        ws.onclose = () => {
            console.log(`WebSocket closed: ${connectionId}`);
            
            if (reconnect && connection.reconnects < maxReconnects) {
                connection.reconnects++;
                setTimeout(() => {
                    this.reconnectWebSocket(connection, url, protocols);
                }, reconnectInterval);
            }
        };

        ws.onerror = (error) => {
            console.error(`WebSocket error: ${error}`);
        };

        ws.onmessage = (event) => {
            connection.listeners.forEach(listener => {
                listener(event.data);
            });
        };

        this.dataConnectors.set(connectionId, connection);
        return connectionId;
    }

    /**
     * Subscribe to WebSocket messages
     */
    subscribeWebSocket(connectionId, listener) {
        const connection = this.dataConnectors.get(connectionId);
        if (connection) {
            const listenerId = `listener_${Date.now()}`;
            connection.listeners.set(listenerId, listener);
            return () => connection.listeners.delete(listenerId);
        }
        return null;
    }

    /**
     * Disconnect WebSocket
     */
    disconnectWebSocket(connectionId) {
        const connection = this.dataConnectors.get(connectionId);
        if (connection) {
            connection.ws.close();
            this.dataConnectors.delete(connectionId);
        }
    }

    /**
     * Reconnect WebSocket
     */
    reconnectWebSocket(connection, url, protocols) {
        const newWs = new WebSocket(url, protocols);
        
        newWs.onopen = connection.ws.onopen;
        newWs.onclose = connection.ws.onclose;
        newWs.onerror = connection.ws.onerror;
        newWs.onmessage = connection.ws.onmessage;
        
        connection.ws = newWs;
    }

    /**
     * Query GraphQL endpoint
     */
    async queryGraphQL(endpoint, query, variables = {}, options = {}) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify({
                query,
                variables
            })
        });

        const result = await response.json();

        if (result.errors) {
            throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        return result.data;
    }

    /**
     * GraphQL mutation
     */
    async mutationGraphQL(endpoint, mutation, variables = {}, options = {}) {
        return this.queryGraphQL(endpoint, mutation, variables, options);
    }

    /**
     * GraphQL subscription
     */
    subscriptionGraphQL(endpoint, subscription, variables = {}, onData) {
        // This would require a WebSocket connection with GraphQL subscription protocol
        console.log('GraphQL subscriptions would require additional setup');
        return null;
    }

    /**
     * Connect to Firebase
     */
    connectFirebase(config) {
        // This would connect to Firebase in production
        console.log('Firebase connection would require Firebase SDK');
        return `firebase_${Date.now()}`;
    }

    /**
     * Firebase realtime updates
     */
    realtimeFirebase(connectionId, path, onData) {
        // This would set up Firebase realtime listeners
        console.log('Firebase realtime would require Firebase SDK');
        return null;
    }

    /**
     * Disconnect from Firebase
     */
    disconnectFirebase(connectionId) {
        console.log(`Disconnecting from Firebase: ${connectionId}`);
    }

    /**
     * Register validators
     */
    registerValidators() {
        // Email validator
        this.validators.set('email', {
            name: 'Email Validator',
            validate: (value) => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(value);
            }
        });

        // URL validator
        this.validators.set('url', {
            name: 'URL Validator',
            validate: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            }
        });

        // Date validator
        this.validators.set('date', {
            name: 'Date Validator',
            validate: (value) => {
                const date = new Date(value);
                return !isNaN(date.getTime());
            }
        });

        // Number validator
        this.validators.set('number', {
            name: 'Number Validator',
            validate: (value) => {
                return !isNaN(parseFloat(value)) && isFinite(value);
            }
        });

        // Range validator
        this.validators.set('range', {
            name: 'Range Validator',
            validate: (value, min, max) => {
                const num = parseFloat(value);
                return !isNaN(num) && num >= min && num <= max;
            }
        });

        // Pattern validator
        this.validators.set('pattern', {
            name: 'Pattern Validator',
            validate: (value, pattern) => {
                const regex = new RegExp(pattern);
                return regex.test(value);
            }
        });

        // Custom validator
        this.validators.set('custom', {
            name: 'Custom Validator',
            validate: (value, validatorFn) => {
                return validatorFn(value);
            }
        });
    }

    /**
     * Register aggregators
     */
    registerAggregators() {
        // Sum aggregator
        this.aggregators.set('sum', {
            name: 'Sum',
            aggregate: (values) => {
                return values.reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
            }
        });

        // Average aggregator
        this.aggregators.set('average', {
            name: 'Average',
            aggregate: (values) => {
                const sum = this.aggregators.get('sum').aggregate(values);
                return sum / values.length;
            }
        });

        // Median aggregator
        this.aggregators.set('median', {
            name: 'Median',
            aggregate: (values) => {
                const sorted = values.map(v => parseFloat(v) || 0).sort((a, b) => a - b);
                const mid = Math.floor(sorted.length / 2);
                return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
            }
        });

        // Mode aggregator
        this.aggregators.set('mode', {
            name: 'Mode',
            aggregate: (values) => {
                const frequency = {};
                let maxFreq = 0;
                let mode = null;

                values.forEach(val => {
                    frequency[val] = (frequency[val] || 0) + 1;
                    if (frequency[val] > maxFreq) {
                        maxFreq = frequency[val];
                        mode = val;
                    }
                });

                return mode;
            }
        });

        // Min aggregator
        this.aggregators.set('min', {
            name: 'Minimum',
            aggregate: (values) => {
                return Math.min(...values.map(v => parseFloat(v) || Infinity));
            }
        });

        // Max aggregator
        this.aggregators.set('max', {
            name: 'Maximum',
            aggregate: (values) => {
                return Math.max(...values.map(v => parseFloat(v) || -Infinity));
            }
        });

        // Count aggregator
        this.aggregators.set('count', {
            name: 'Count',
            aggregate: (values) => {
                return values.length;
            }
        });

        // Count distinct aggregator
        this.aggregators.set('countDistinct', {
            name: 'Count Distinct',
            aggregate: (values) => {
                return new Set(values).size;
            }
        });

        // Standard deviation aggregator
        this.aggregators.set('stdDev', {
            name: 'Standard Deviation',
            aggregate: (values) => {
                const avg = this.aggregators.get('average').aggregate(values);
                const squaredDiffs = values.map(v => Math.pow((parseFloat(v) || 0) - avg, 2));
                const avgSquaredDiff = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
                return Math.sqrt(avgSquaredDiff);
            }
        });

        // Variance aggregator
        this.aggregators.set('variance', {
            name: 'Variance',
            aggregate: (values) => {
                const stdDev = this.aggregators.get('stdDev').aggregate(values);
                return stdDev * stdDev;
            }
        });

        // Percentile aggregator
        this.aggregators.set('percentile', {
            name: 'Percentile',
            aggregate: (values, percentile = 50) => {
                const sorted = values.map(v => parseFloat(v) || 0).sort((a, b) => a - b);
                const index = (percentile / 100) * (sorted.length - 1);
                const lower = Math.floor(index);
                const upper = Math.ceil(index);
                const weight = index % 1;
                
                if (lower === upper) {
                    return sorted[lower];
                }
                
                return sorted[lower] * (1 - weight) + sorted[upper] * weight;
            }
        });

        // Concatenate aggregator
        this.aggregators.set('concatenate', {
            name: 'Concatenate',
            aggregate: (values, separator = ', ') => {
                return values.join(separator);
            }
        });
    }

    /**
     * Initialize AI models
     */
    initializeAIModels() {
        // Anomaly Detection Model
        this.aiModels.set('anomalyDetection', {
            name: 'Anomaly Detection',
            model: new AnomalyDetectionModel(),
            predict: (data) => this.aiModels.get('anomalyDetection').model.detect(data)
        });

        // Forecasting Model
        this.aiModels.set('forecasting', {
            name: 'Time Series Forecasting',
            model: new ForecastingModel(),
            predict: (data, periods) => this.aiModels.get('forecasting').model.forecast(data, periods)
        });

        // Clustering Model
        this.aiModels.set('clustering', {
            name: 'Data Clustering',
            model: new ClusteringModel(),
            predict: (data, k) => this.aiModels.get('clustering').model.cluster(data, k)
        });

        // Pattern Recognition Model
        this.aiModels.set('patternRecognition', {
            name: 'Pattern Recognition',
            model: new PatternRecognitionModel(),
            predict: (data) => this.aiModels.get('patternRecognition').model.recognize(data)
        });

        // Natural Language Processing
        this.aiModels.set('nlp', {
            name: 'Natural Language Processing',
            model: new NLPModel(),
            predict: (text) => this.aiModels.get('nlp').model.analyze(text)
        });
    }

    /**
     * Setup data synchronization
     */
    setupDataSync() {
        this.syncConfig = {
            enabled: false,
            interval: 5000,
            sources: new Map(),
            handlers: new Map()
        };

        // Start sync loop
        setInterval(() => {
            if (this.syncConfig.enabled) {
                this.performDataSync();
            }
        }, this.syncConfig.interval);
    }

    /**
     * Perform data synchronization
     */
    async performDataSync() {
        for (const [sourceId, source] of this.syncConfig.sources) {
            try {
                const newData = await source.fetch();
                const handlers = this.syncConfig.handlers.get(sourceId) || [];
                
                handlers.forEach(handler => {
                    handler(newData);
                });
            } catch (error) {
                console.error(`Sync error for source ${sourceId}:`, error);
            }
        }
    }

    /**
     * Detect data types
     */
    detectDataTypes(data) {
        if (!data || data.length === 0) return [];

        const columnCount = data[0].length;
        const types = [];

        for (let col = 0; col < columnCount; col++) {
            const columnData = data.map(row => row[col]).filter(val => val !== null && val !== undefined && val !== '');
            
            if (columnData.length === 0) {
                types.push('empty');
                continue;
            }

            const detectedTypes = new Set();

            columnData.forEach(value => {
                if (this.validators.get('number').validate(value)) {
                    detectedTypes.add('number');
                } else if (this.validators.get('date').validate(value)) {
                    detectedTypes.add('date');
                } else if (typeof value === 'boolean') {
                    detectedTypes.add('boolean');
                } else {
                    detectedTypes.add('string');
                }
            });

            if (detectedTypes.size === 1) {
                types.push(Array.from(detectedTypes)[0]);
            } else {
                types.push('mixed');
            }
        }

        return types;
    }

    /**
     * Calculate statistics for data
     */
    calculateStatistics(data, dataTypes) {
        const stats = {};

        dataTypes.forEach((type, colIndex) => {
            const columnData = data.map(row => row[colIndex]).filter(val => val !== null && val !== undefined && val !== '');
            
            stats[`column_${colIndex}`] = {
                type,
                count: columnData.length,
                missing: data.length - columnData.length
            };

            if (type === 'number') {
                const numbers = columnData.map(v => parseFloat(v)).filter(n => !isNaN(n));
                
                if (numbers.length > 0) {
                    stats[`column_${colIndex}`].min = this.aggregators.get('min').aggregate(numbers);
                    stats[`column_${colIndex}`].max = this.aggregators.get('max').aggregate(numbers);
                    stats[`column_${colIndex}`].mean = this.aggregators.get('average').aggregate(numbers);
                    stats[`column_${colIndex}`].median = this.aggregators.get('median').aggregate(numbers);
                    stats[`column_${colIndex}`].stdDev = this.aggregators.get('stdDev').aggregate(numbers);
                    stats[`column_${colIndex}`].q1 = this.aggregators.get('percentile').aggregate(numbers, 25);
                    stats[`column_${colIndex}`].q3 = this.aggregators.get('percentile').aggregate(numbers, 75);
                }
            } else if (type === 'string') {
                stats[`column_${colIndex}`].unique = this.aggregators.get('countDistinct').aggregate(columnData);
                stats[`column_${colIndex}`].mode = this.aggregators.get('mode').aggregate(columnData);
                stats[`column_${colIndex}`].minLength = Math.min(...columnData.map(s => s.length));
                stats[`column_${colIndex}`].maxLength = Math.max(...columnData.map(s => s.length));
                stats[`column_${colIndex}`].avgLength = columnData.reduce((sum, s) => sum + s.length, 0) / columnData.length;
            } else if (type === 'date') {
                const dates = columnData.map(d => new Date(d)).filter(d => !isNaN(d.getTime()));
                
                if (dates.length > 0) {
                    const timestamps = dates.map(d => d.getTime());
                    stats[`column_${colIndex}`].earliest = new Date(Math.min(...timestamps));
                    stats[`column_${colIndex}`].latest = new Date(Math.max(...timestamps));
                    stats[`column_${colIndex}`].range = stats[`column_${colIndex}`].latest - stats[`column_${colIndex}`].earliest;
                }
            }
        });

        return stats;
    }

    /**
     * Transform data
     */
    transformData(data, transformations) {
        let result = data;

        transformations.forEach(transform => {
            switch (transform.type) {
                case 'filter':
                    result = this.filterData(result, transform.condition);
                    break;
                case 'sort':
                    result = this.sortData(result, transform.column, transform.order);
                    break;
                case 'group':
                    result = this.groupData(result, transform.by, transform.aggregations);
                    break;
                case 'pivot':
                    result = this.pivotData(result, transform.rows, transform.columns, transform.values);
                    break;
                case 'join':
                    result = this.joinData(result, transform.withData, transform.on, transform.type);
                    break;
                case 'calculate':
                    result = this.calculateField(result, transform.field, transform.expression);
                    break;
                case 'reshape':
                    result = this.reshapeData(result, transform.from, transform.to);
                    break;
                case 'sample':
                    result = this.sampleData(result, transform.size, transform.method);
                    break;
            }
        });

        return result;
    }

    /**
     * Filter data
     */
    filterData(data, condition) {
        return data.filter(row => {
            return this.evaluateCondition(row, condition);
        });
    }

    /**
     * Evaluate condition
     */
    evaluateCondition(row, condition) {
        switch (condition.operator) {
            case 'equals':
                return row[condition.field] === condition.value;
            case 'notEquals':
                return row[condition.field] !== condition.value;
            case 'contains':
                return String(row[condition.field]).includes(condition.value);
            case 'startsWith':
                return String(row[condition.field]).startsWith(condition.value);
            case 'endsWith':
                return String(row[condition.field]).endsWith(condition.value);
            case 'greaterThan':
                return parseFloat(row[condition.field]) > parseFloat(condition.value);
            case 'lessThan':
                return parseFloat(row[condition.field]) < parseFloat(condition.value);
            case 'between':
                const val = parseFloat(row[condition.field]);
                return val >= parseFloat(condition.min) && val <= parseFloat(condition.max);
            case 'in':
                return condition.values.includes(row[condition.field]);
            case 'notIn':
                return !condition.values.includes(row[condition.field]);
            case 'isNull':
                return row[condition.field] === null || row[condition.field] === undefined;
            case 'isNotNull':
                return row[condition.field] !== null && row[condition.field] !== undefined;
            case 'and':
                return condition.conditions.every(c => this.evaluateCondition(row, c));
            case 'or':
                return condition.conditions.some(c => this.evaluateCondition(row, c));
            case 'not':
                return !this.evaluateCondition(row, condition.condition);
            default:
                return true;
        }
    }

    /**
     * Sort data
     */
    sortData(data, column, order = 'asc') {
        return [...data].sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];

            if (aVal === null || aVal === undefined) return order === 'asc' ? 1 : -1;
            if (bVal === null || bVal === undefined) return order === 'asc' ? -1 : 1;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return order === 'asc' ? aVal - bVal : bVal - aVal;
            }

            const aStr = String(aVal);
            const bStr = String(bVal);
            return order === 'asc' ? 
                aStr.localeCompare(bStr) : 
                bStr.localeCompare(aStr);
        });
    }

    /**
     * Group data
     */
    groupData(data, groupBy, aggregations) {
        const groups = {};

        data.forEach(row => {
            const key = groupBy.map(field => row[field]).join('|');
            
            if (!groups[key]) {
                groups[key] = {
                    key,
                    rows: []
                };
                groupBy.forEach(field => {
                    groups[key][field] = row[field];
                });
            }
            
            groups[key].rows.push(row);
        });

        // Apply aggregations
        return Object.values(groups).map(group => {
            const result = {};
            
            // Add group fields
            groupBy.forEach(field => {
                result[field] = group[field];
            });

            // Apply aggregations
            aggregations.forEach(agg => {
                const values = group.rows.map(row => row[agg.field]);
                const aggregator = this.aggregators.get(agg.function);
                
                if (aggregator) {
                    result[agg.alias || `${agg.function}_${agg.field}`] = aggregator.aggregate(values);
                }
            });

            return result;
        });
    }

    /**
     * Pivot data
     */
    pivotData(data, rows, columns, values) {
        const pivot = {};
        const columnValues = new Set();

        data.forEach(row => {
            const rowKey = rows.map(field => row[field]).join('|');
            const colKey = columns.map(field => row[field]).join('|');
            
            columnValues.add(colKey);

            if (!pivot[rowKey]) {
                pivot[rowKey] = {};
                rows.forEach(field => {
                    pivot[rowKey][field] = row[field];
                });
            }

            values.forEach(val => {
                const key = `${colKey}_${val.field}`;
                
                if (!pivot[rowKey][key]) {
                    pivot[rowKey][key] = [];
                }
                
                pivot[rowKey][key].push(row[val.field]);
            });
        });

        // Apply aggregations
        const result = [];
        
        for (const rowKey in pivot) {
            const row = pivot[rowKey];
            const resultRow = {};
            
            // Add row fields
            rows.forEach(field => {
                resultRow[field] = row[field];
            });

            // Add pivoted values
            columnValues.forEach(colKey => {
                values.forEach(val => {
                    const key = `${colKey}_${val.field}`;
                    const aggregator = this.aggregators.get(val.aggregation || 'sum');
                    
                    if (row[key] && aggregator) {
                        resultRow[key] = aggregator.aggregate(row[key]);
                    } else {
                        resultRow[key] = null;
                    }
                });
            });

            result.push(resultRow);
        }

        return result;
    }

    /**
     * Join data
     */
    joinData(leftData, rightData, on, type = 'inner') {
        const result = [];

        switch (type) {
            case 'inner':
                leftData.forEach(leftRow => {
                    rightData.forEach(rightRow => {
                        if (this.matchJoinCondition(leftRow, rightRow, on)) {
                            result.push({ ...leftRow, ...rightRow });
                        }
                    });
                });
                break;

            case 'left':
                leftData.forEach(leftRow => {
                    const matches = rightData.filter(rightRow => 
                        this.matchJoinCondition(leftRow, rightRow, on)
                    );
                    
                    if (matches.length > 0) {
                        matches.forEach(rightRow => {
                            result.push({ ...leftRow, ...rightRow });
                        });
                    } else {
                        result.push(leftRow);
                    }
                });
                break;

            case 'right':
                rightData.forEach(rightRow => {
                    const matches = leftData.filter(leftRow => 
                        this.matchJoinCondition(leftRow, rightRow, on)
                    );
                    
                    if (matches.length > 0) {
                        matches.forEach(leftRow => {
                            result.push({ ...leftRow, ...rightRow });
                        });
                    } else {
                        result.push(rightRow);
                    }
                });
                break;

            case 'outer':
                // Add all inner joins
                leftData.forEach(leftRow => {
                    rightData.forEach(rightRow => {
                        if (this.matchJoinCondition(leftRow, rightRow, on)) {
                            result.push({ ...leftRow, ...rightRow });
                        }
                    });
                });

                // Add unmatched left rows
                leftData.forEach(leftRow => {
                    const hasMatch = rightData.some(rightRow => 
                        this.matchJoinCondition(leftRow, rightRow, on)
                    );
                    if (!hasMatch) {
                        result.push(leftRow);
                    }
                });

                // Add unmatched right rows
                rightData.forEach(rightRow => {
                    const hasMatch = leftData.some(leftRow => 
                        this.matchJoinCondition(leftRow, rightRow, on)
                    );
                    if (!hasMatch) {
                        result.push(rightRow);
                    }
                });
                break;
        }

        return result;
    }

    /**
     * Match join condition
     */
    matchJoinCondition(leftRow, rightRow, on) {
        if (typeof on === 'string') {
            return leftRow[on] === rightRow[on];
        } else if (Array.isArray(on)) {
            return on.every(field => leftRow[field] === rightRow[field]);
        } else if (typeof on === 'object') {
            return leftRow[on.left] === rightRow[on.right];
        }
        return false;
    }

    /**
     * Calculate field
     */
    calculateField(data, fieldName, expression) {
        return data.map(row => {
            const result = { ...row };
            result[fieldName] = this.evaluateExpression(expression, row);
            return result;
        });
    }

    /**
     * Evaluate expression
     */
    evaluateExpression(expression, context) {
        // Simple expression evaluator
        // In production, you would use a proper expression parser
        try {
            const func = new Function(...Object.keys(context), `return ${expression}`);
            return func(...Object.values(context));
        } catch (error) {
            console.error('Expression evaluation error:', error);
            return null;
        }
    }

    /**
     * Reshape data
     */
    reshapeData(data, from, to) {
        switch (`${from}-${to}`) {
            case 'wide-long':
                return this.wideToLong(data);
            case 'long-wide':
                return this.longToWide(data);
            case 'nested-flat':
                return this.nestedToFlat(data);
            case 'flat-nested':
                return this.flatToNested(data);
            default:
                return data;
        }
    }

    /**
     * Convert wide format to long format
     */
    wideToLong(data) {
        const result = [];
        
        data.forEach(row => {
            const idVars = {};
            const valueVars = {};
            
            for (const key in row) {
                if (key.startsWith('id_')) {
                    idVars[key] = row[key];
                } else {
                    valueVars[key] = row[key];
                }
            }
            
            for (const varName in valueVars) {
                result.push({
                    ...idVars,
                    variable: varName,
                    value: valueVars[varName]
                });
            }
        });
        
        return result;
    }

    /**
     * Convert long format to wide format
     */
    longToWide(data) {
        const result = {};
        
        data.forEach(row => {
            const key = Object.keys(row)
                .filter(k => k !== 'variable' && k !== 'value')
                .map(k => row[k])
                .join('|');
            
            if (!result[key]) {
                result[key] = {};
                Object.keys(row).forEach(k => {
                    if (k !== 'variable' && k !== 'value') {
                        result[key][k] = row[k];
                    }
                });
            }
            
            result[key][row.variable] = row.value;
        });
        
        return Object.values(result);
    }

    /**
     * Convert nested to flat structure
     */
    nestedToFlat(data) {
        const result = [];
        
        const flatten = (obj, prefix = '') => {
            const flat = {};
            
            for (const key in obj) {
                const newKey = prefix ? `${prefix}_${key}` : key;
                
                if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                    Object.assign(flat, flatten(obj[key], newKey));
                } else {
                    flat[newKey] = obj[key];
                }
            }
            
            return flat;
        };
        
        if (Array.isArray(data)) {
            data.forEach(item => {
                result.push(flatten(item));
            });
        } else {
            result.push(flatten(data));
        }
        
        return result;
    }

    /**
     * Convert flat to nested structure
     */
    flatToNested(data) {
        const result = [];
        
        const nest = (flat) => {
            const nested = {};
            
            for (const key in flat) {
                const parts = key.split('_');
                let current = nested;
                
                for (let i = 0; i < parts.length - 1; i++) {
                    if (!current[parts[i]]) {
                        current[parts[i]] = {};
                    }
                    current = current[parts[i]];
                }
                
                current[parts[parts.length - 1]] = flat[key];
            }
            
            return nested;
        };
        
        if (Array.isArray(data)) {
            data.forEach(item => {
                result.push(nest(item));
            });
        } else {
            result.push(nest(data));
        }
        
        return result;
    }

    /**
     * Sample data
     */
    sampleData(data, size, method = 'random') {
        switch (method) {
            case 'random':
                return this.randomSample(data, size);
            case 'systematic':
                return this.systematicSample(data, size);
            case 'stratified':
                return this.stratifiedSample(data, size);
            case 'cluster':
                return this.clusterSample(data, size);
            default:
                return data.slice(0, size);
        }
    }

    /**
     * Random sample
     */
    randomSample(data, size) {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, size);
    }

    /**
     * Systematic sample
     */
    systematicSample(data, size) {
        const interval = Math.floor(data.length / size);
        const result = [];
        
        for (let i = 0; i < data.length && result.length < size; i += interval) {
            result.push(data[i]);
        }
        
        return result;
    }

    /**
     * Stratified sample
     */
    stratifiedSample(data, size) {
        // Group data by first categorical column
        const groups = {};
        
        data.forEach(row => {
            const key = row[Object.keys(row)[0]];
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(row);
        });
        
        const result = [];
        const groupCount = Object.keys(groups).length;
        const sizePerGroup = Math.floor(size / groupCount);
        
        for (const key in groups) {
            const groupSample = this.randomSample(groups[key], sizePerGroup);
            result.push(...groupSample);
        }
        
        return result;
    }

    /**
     * Cluster sample
     */
    clusterSample(data, size) {
        const clusterSize = Math.ceil(Math.sqrt(data.length));
        const clusters = [];
        
        for (let i = 0; i < data.length; i += clusterSize) {
            clusters.push(data.slice(i, i + clusterSize));
        }
        
        const selectedClusters = this.randomSample(clusters, Math.ceil(size / clusterSize));
        const result = [];
        
        selectedClusters.forEach(cluster => {
            result.push(...cluster);
        });
        
        return result.slice(0, size);
    }

    /**
     * Create dataset
     */
    createDataset(name, data, metadata = {}) {
        const datasetId = `dataset_${Date.now()}`;
        
        const dataset = {
            id: datasetId,
            name,
            data,
            metadata: {
                ...metadata,
                created: new Date(),
                modified: new Date(),
                rowCount: data.length,
                columnCount: data[0] ? Object.keys(data[0]).length : 0
            },
            transformations: [],
            validations: [],
            indexes: new Map()
        };
        
        this.datasets.set(datasetId, dataset);
        this.activeDataset = datasetId;
        
        // Create indexes for faster queries
        this.createIndexes(dataset);
        
        return datasetId;
    }

    /**
     * Create indexes for dataset
     */
    createIndexes(dataset) {
        if (!dataset.data || dataset.data.length === 0) return;
        
        // Create index for each column
        const columns = Object.keys(dataset.data[0]);
        
        columns.forEach(column => {
            const index = new Map();
            
            dataset.data.forEach((row, rowIndex) => {
                const value = row[column];
                
                if (!index.has(value)) {
                    index.set(value, []);
                }
                
                index.get(value).push(rowIndex);
            });
            
            dataset.indexes.set(column, index);
        });
    }

    /**
     * Query dataset using indexes
     */
    queryDataset(datasetId, query) {
        const dataset = this.datasets.get(datasetId);
        if (!dataset) return [];
        
        // Use indexes for efficient querying
        if (query.field && dataset.indexes.has(query.field)) {
            const index = dataset.indexes.get(query.field);
            const rowIndexes = index.get(query.value) || [];
            return rowIndexes.map(i => dataset.data[i]);
        }
        
        // Fall back to linear search
        return this.filterData(dataset.data, query);
    }

    /**
     * Get dataset
     */
    getDataset(datasetId) {
        return this.datasets.get(datasetId);
    }

    /**
     * Update dataset
     */
    updateDataset(datasetId, updates) {
        const dataset = this.datasets.get(datasetId);
        if (!dataset) return false;
        
        Object.assign(dataset, updates);
        dataset.metadata.modified = new Date();
        
        // Rebuild indexes if data changed
        if (updates.data) {
            this.createIndexes(dataset);
        }
        
        return true;
    }

    /**
     * Delete dataset
     */
    deleteDataset(datasetId) {
        return this.datasets.delete(datasetId);
    }

    /**
     * List datasets
     */
    listDatasets() {
        return Array.from(this.datasets.values()).map(ds => ({
            id: ds.id,
            name: ds.name,
            rowCount: ds.metadata.rowCount,
            columnCount: ds.metadata.columnCount,
            created: ds.metadata.created,
            modified: ds.metadata.modified
        }));
    }
}

/**
 * AI Model Classes (Simplified implementations)
 */

class AnomalyDetectionModel {
    detect(data) {
        // Simplified anomaly detection using statistical methods
        const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
        const stdDev = Math.sqrt(
            data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
        );
        
        const threshold = 2; // 2 standard deviations
        
        return data.map((value, index) => ({
            index,
            value,
            isAnomaly: Math.abs(value - mean) > threshold * stdDev,
            score: Math.abs(value - mean) / stdDev
        }));
    }
}

class ForecastingModel {
    forecast(data, periods) {
        // Simple linear trend forecasting
        const n = data.length;
        const xSum = (n * (n - 1)) / 2;
        const ySum = data.reduce((sum, val) => sum + val, 0);
        const xySum = data.reduce((sum, val, i) => sum + val * i, 0);
        const xSquaredSum = (n * (n - 1) * (2 * n - 1)) / 6;
        
        const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
        const intercept = (ySum - slope * xSum) / n;
        
        const forecast = [];
        for (let i = 0; i < periods; i++) {
            forecast.push(slope * (n + i) + intercept);
        }
        
        return forecast;
    }
}

class ClusteringModel {
    cluster(data, k) {
        // Simple k-means clustering
        const clusters = [];
        const centroids = [];
        
        // Initialize random centroids
        for (let i = 0; i < k; i++) {
            centroids.push(data[Math.floor(Math.random() * data.length)]);
        }
        
        // Assign points to clusters
        data.forEach(point => {
            let minDist = Infinity;
            let cluster = 0;
            
            centroids.forEach((centroid, i) => {
                const dist = this.distance(point, centroid);
                if (dist < minDist) {
                    minDist = dist;
                    cluster = i;
                }
            });
            
            if (!clusters[cluster]) {
                clusters[cluster] = [];
            }
            clusters[cluster].push(point);
        });
        
        return clusters;
    }
    
    distance(a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            return Math.sqrt(
                a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
            );
        }
        return Math.abs(a - b);
    }
}

class PatternRecognitionModel {
    recognize(data) {
        const patterns = [];
        
        // Detect trends
        const trend = this.detectTrend(data);
        if (trend) patterns.push(trend);
        
        // Detect seasonality
        const seasonality = this.detectSeasonality(data);
        if (seasonality) patterns.push(seasonality);
        
        // Detect cycles
        const cycles = this.detectCycles(data);
        if (cycles) patterns.push(cycles);
        
        return patterns;
    }
    
    detectTrend(data) {
        // Simple trend detection
        const firstHalf = data.slice(0, Math.floor(data.length / 2));
        const secondHalf = data.slice(Math.floor(data.length / 2));
        
        const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
        
        if (secondAvg > firstAvg * 1.1) {
            return { type: 'trend', direction: 'increasing', strength: (secondAvg - firstAvg) / firstAvg };
        } else if (secondAvg < firstAvg * 0.9) {
            return { type: 'trend', direction: 'decreasing', strength: (firstAvg - secondAvg) / firstAvg };
        }
        
        return null;
    }
    
    detectSeasonality(data) {
        // Simple seasonality detection
        const periods = [7, 12, 30, 365]; // Common seasonal periods
        
        for (const period of periods) {
            if (data.length >= period * 2) {
                const seasonal = [];
                
                for (let i = 0; i < period; i++) {
                    const values = [];
                    for (let j = i; j < data.length; j += period) {
                        values.push(data[j]);
                    }
                    seasonal.push(values.reduce((sum, val) => sum + val, 0) / values.length);
                }
                
                // Check if seasonal pattern is significant
                const variance = seasonal.reduce((sum, val, i, arr) => {
                    const mean = arr.reduce((s, v) => s + v, 0) / arr.length;
                    return sum + Math.pow(val - mean, 2);
                }, 0) / seasonal.length;
                
                if (variance > 0.1) {
                    return { type: 'seasonality', period, pattern: seasonal };
                }
            }
        }
        
        return null;
    }
    
    detectCycles(data) {
        // Simple cycle detection using autocorrelation
        const maxLag = Math.min(data.length / 2, 50);
        const correlations = [];
        
        for (let lag = 1; lag < maxLag; lag++) {
            const correlation = this.autocorrelation(data, lag);
            correlations.push({ lag, correlation });
        }
        
        // Find peaks in autocorrelation
        const peaks = correlations.filter((c, i) => {
            if (i === 0 || i === correlations.length - 1) return false;
            return c.correlation > correlations[i - 1].correlation &&
                   c.correlation > correlations[i + 1].correlation &&
                   c.correlation > 0.5;
        });
        
        if (peaks.length > 0) {
            return { type: 'cycles', periods: peaks.map(p => p.lag) };
        }
        
        return null;
    }
    
    autocorrelation(data, lag) {
        const n = data.length - lag;
        const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
        
        let numerator = 0;
        let denominator = 0;
        
        for (let i = 0; i < n; i++) {
            numerator += (data[i] - mean) * (data[i + lag] - mean);
        }
        
        for (let i = 0; i < data.length; i++) {
            denominator += Math.pow(data[i] - mean, 2);
        }
        
        return numerator / denominator;
    }
}

class NLPModel {
    analyze(text) {
        // Simple NLP analysis
        const words = text.toLowerCase().split(/\s+/);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        
        return {
            wordCount: words.length,
            sentenceCount: sentences.length,
            avgWordLength: words.reduce((sum, w) => sum + w.length, 0) / words.length,
            avgSentenceLength: words.length / sentences.length,
            sentiment: this.analyzeSentiment(text),
            keywords: this.extractKeywords(words),
            readability: this.calculateReadability(text)
        };
    }
    
    analyzeSentiment(text) {
        // Very simple sentiment analysis
        const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'best'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'poor', 'disappointing'];
        
        const words = text.toLowerCase().split(/\s+/);
        let score = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score++;
            if (negativeWords.includes(word)) score--;
        });
        
        if (score > 0) return { sentiment: 'positive', score };
        if (score < 0) return { sentiment: 'negative', score };
        return { sentiment: 'neutral', score };
    }
    
    extractKeywords(words) {
        // Simple keyword extraction based on frequency
        const frequency = {};
        const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'as', 'is', 'was', 'are', 'were'];
        
        words.forEach(word => {
            if (!stopWords.includes(word) && word.length > 2) {
                frequency[word] = (frequency[word] || 0) + 1;
            }
        });
        
        return Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([word, count]) => ({ word, count }));
    }
    
    calculateReadability(text) {
        // Flesch Reading Ease score
        const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
        const words = text.split(/\s+/).length;
        const syllables = text.split(/\s+/).reduce((sum, word) => sum + this.countSyllables(word), 0);
        
        const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
        
        let level;
        if (score >= 90) level = 'Very Easy';
        else if (score >= 80) level = 'Easy';
        else if (score >= 70) level = 'Fairly Easy';
        else if (score >= 60) level = 'Standard';
        else if (score >= 50) level = 'Fairly Difficult';
        else if (score >= 30) level = 'Difficult';
        else level = 'Very Difficult';
        
        return { score, level };
    }
    
    countSyllables(word) {
        // Simple syllable counting
        word = word.toLowerCase();
        let count = 0;
        const vowels = 'aeiouy';
        let previousWasVowel = false;
        
        for (let i = 0; i < word.length; i++) {
            const isVowel = vowels.includes(word[i]);
            if (isVowel && !previousWasVowel) {
                count++;
            }
            previousWasVowel = isVowel;
        }
        
        // Adjust for silent e
        if (word.endsWith('e')) count--;
        
        // Ensure at least one syllable
        if (count === 0) count = 1;
        
        return count;
    }
}

// Export DataManager
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
} else {
    window.DataManager = DataManager;
}