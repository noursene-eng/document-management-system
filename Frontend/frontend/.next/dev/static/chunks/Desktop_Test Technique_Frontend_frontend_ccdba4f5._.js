(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportsController",
    ()=>ReportsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@swc/helpers/esm/_decorate.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@nestjs/common'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@nestjs/swagger'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
class CreateReportDto {
    type;
    documentIds;
}
let ReportsController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
    ApiTags('reports'),
    Controller('reports')
], function(_initialize) {
    class ReportsController {
        reportsService;
        constructor(reportsService){
            this.reportsService = reportsService;
            _initialize(this);
        }
    }
    return {
        F: ReportsController,
        d: [
            {
                kind: "method",
                decorators: [
                    Post(),
                    ApiOperation({
                        summary: 'Crée une nouvelle demande de rapport'
                    }),
                    ApiBody({
                        type: CreateReportDto
                    })
                ],
                key: "createReport",
                value: async function createReport(
                @Body()
                createReportDto) {
                    const report = await this.reportsService.createReport(createReportDto.type, createReportDto.documentIds);
                    return report;
                }
            },
            {
                kind: "method",
                decorators: [
                    Post(':id/generate'),
                    ApiOperation({
                        summary: 'Génère un rapport (synchrone)'
                    })
                ],
                key: "generateReport",
                value: async function generateReport(
                @Param('id')
                id) {
                    return this.reportsService.generateReport(id);
                }
            },
            {
                kind: "method",
                decorators: [
                    Get(':id/stream'),
                    ApiOperation({
                        summary: 'Génère un rapport en streaming'
                    })
                ],
                key: "streamReport",
                value: async function streamReport(
                @Param('id')
                id, 
                @Res()
                res) {
                    res.setHeader('Content-Type', 'text/event-stream');
                    res.setHeader('Cache-Control', 'no-cache');
                    res.setHeader('Connection', 'keep-alive');
                    try {
                        for await (const chunk of this.reportsService.generateReportStream(id)){
                            res.write(`data: ${JSON.stringify({
                                chunk
                            })}\n\n`);
                        }
                        res.write(`data: ${JSON.stringify({
                            done: true
                        })}\n\n`);
                        res.end();
                    } catch (error) {
                        res.write(`data: ${JSON.stringify({
                            error: error.message
                        })}\n\n`);
                        res.end();
                    }
                }
            },
            {
                kind: "method",
                decorators: [
                    Get(),
                    ApiOperation({
                        summary: 'Récupère tous les rapports'
                    })
                ],
                key: "getAllReports",
                value: async function getAllReports() {
                    return this.reportsService.getAllReports();
                }
            },
            {
                kind: "method",
                decorators: [
                    Get(':id'),
                    ApiOperation({
                        summary: 'Récupère un rapport par son ID'
                    })
                ],
                key: "getReport",
                value: async function getReport(
                @Param('id')
                id) {
                    return this.reportsService.getReport(id);
                }
            },
            {
                kind: "method",
                decorators: [
                    Delete(':id'),
                    ApiOperation({
                        summary: 'Supprime un rapport'
                    })
                ],
                key: "deleteReport",
                value: async function deleteReport(
                @Param('id')
                id) {
                    this.reportsService.deleteReport(id);
                    return {
                        message: 'Rapport supprimé avec succès'
                    };
                }
            }
        ]
    };
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentList.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocketModule",
    ()=>WebSocketModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@swc/helpers/esm/_decorate.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@nestjs/common'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './websocket.gateway'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
let WebSocketModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
    Module({
        providers: [
            WebSocketGateway
        ],
        exports: [
            WebSocketGateway
        ]
    })
], function(_initialize) {
    class WebSocketModule {
        constructor(){
            _initialize(this);
        }
    }
    return {
        F: WebSocketModule,
        d: []
    };
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Test Technique/Frontend/frontend/components/ReportGenerator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocketGateway",
    ()=>WebSocketGateway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@swc/helpers/esm/_decorate.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@nestjs/websockets'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@nestjs/common'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
let WebSocketGateway = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])([
    WebSocketGateway({
        cors: {
            origin: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.CORS_ORIGIN || 'http://localhost:3000',
            credentials: true
        }
    })
], function(_initialize) {
    class WebSocketGateway {
        constructor(){
            _initialize(this);
        }
    }
    return {
        F: WebSocketGateway,
        d: [
            {
                kind: "field",
                decorators: [
                    WebSocketServer()
                ],
                key: "server",
                value: void 0
            },
            {
                kind: "field",
                key: "logger",
                value () {
                    return new Logger(WebSocketGateway.name);
                }
            },
            {
                kind: "method",
                key: "handleConnection",
                value: function handleConnection(client) {
                    this.logger.log(`Client connecté: ${client.id}`);
                }
            },
            {
                kind: "method",
                key: "handleDisconnect",
                value: function handleDisconnect(client) {
                    this.logger.log(`Client déconnecté: ${client.id}`);
                }
            },
            {
                kind: "method",
                key: /**
     * Émet une mise à jour de rapport à tous les clients
     */ "emitReportUpdate",
                value: function emitReportUpdate(report) {
                    this.server.emit('report:update', report);
                    this.logger.log(`Mise à jour du rapport ${report.id} envoyée`);
                }
            },
            {
                kind: "method",
                key: /**
     * Émet une mise à jour de document à tous les clients
     */ "emitDocumentUpdate",
                value: function emitDocumentUpdate(document) {
                    this.server.emit('document:update', document);
                    this.logger.log(`Mise à jour du document envoyée`);
                }
            }
        ]
    };
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentList.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$ReportGenerator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/components/ReportGenerator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
function Home() {
    _s();
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Connexion WebSocket pour les mises à jour en temps réel
            const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(("TURBOPACK compile-time value", "http://localhost:3001") || 'http://localhost:3001', {
                transports: [
                    'websocket'
                ]
            });
            newSocket.on('connect', {
                "Home.useEffect": ()=>{
                    console.log('Connecté au serveur WebSocket');
                }
            }["Home.useEffect"]);
            newSocket.on('report:update', {
                "Home.useEffect": (report)=>{
                    console.log('Mise à jour du rapport:', report);
                    queryClient.invalidateQueries({
                        queryKey: [
                            'reports'
                        ]
                    });
                }
            }["Home.useEffect"]);
            newSocket.on('document:update', {
                "Home.useEffect": (document)=>{
                    console.log('Mise à jour du document:', document);
                    queryClient.invalidateQueries({
                        queryKey: [
                            'documents'
                        ]
                    });
                }
            }["Home.useEffect"]);
            setSocket(newSocket);
            return ({
                "Home.useEffect": ()=>{
                    newSocket.close();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "bg-white shadow-sm border-b border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-gray-900",
                                children: "Gestion de Documents Juridiques et Financiers"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-gray-600",
                                children: "Upload, analyse et génération de rapports avec IA"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentList$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$ReportGenerator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "bg-white border-t border-gray-200 mt-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-gray-500 text-sm",
                            children: "Système de gestion de documents avec IA - Powered by Groq & MinIO"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(Home, "NvwYO9vJOwIMt5STdlMKfWhuxZw=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Test%20Technique_Frontend_frontend_ccdba4f5._.js.map