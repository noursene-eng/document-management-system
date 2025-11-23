module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentUpload.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportsController",
    ()=>ReportsController
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@swc/helpers/esm/_decorate.js [app-ssr] (ecmascript)");
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
let ReportsController = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])([
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
}),
"[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocketModule",
    ()=>WebSocketModule
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@swc/helpers/esm/_decorate.js [app-ssr] (ecmascript)");
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
let WebSocketModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])([
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
}),
"[project]/Desktop/Test Technique/Frontend/frontend/components/ReportGenerator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WebSocketGateway",
    ()=>WebSocketGateway
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@swc/helpers/esm/_decorate.js [app-ssr] (ecmascript)");
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
let WebSocketGateway = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_decorate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["_"])([
    WebSocketGateway({
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentUpload.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/components/DocumentList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$ReportGenerator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/components/ReportGenerator.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Test Technique/Frontend/frontend/node_modules/socket.io-client/build/esm-debug/index.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
;
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
function Home() {
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Connexion WebSocket pour les mises à jour en temps réel
        const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2d$debug$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(("TURBOPACK compile-time value", "http://localhost:3001") || 'http://localhost:3001', {
            transports: [
                'websocket'
            ]
        });
        newSocket.on('connect', ()=>{
            console.log('Connecté au serveur WebSocket');
        });
        newSocket.on('report:update', (report)=>{
            console.log('Mise à jour du rapport:', report);
            queryClient.invalidateQueries({
                queryKey: [
                    'reports'
                ]
            });
        });
        newSocket.on('document:update', (document)=>{
            console.log('Mise à jour du document:', document);
            queryClient.invalidateQueries({
                queryKey: [
                    'documents'
                ]
            });
        });
        setSocket(newSocket);
        return ()=>{
            newSocket.close();
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "bg-white shadow-sm border-b border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-gray-900",
                                children: "Gestion de Documents Juridiques et Financiers"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentUpload$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$DocumentList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Test Technique/Frontend/frontend/app/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$components$2f$ReportGenerator$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "bg-white border-t border-gray-200 mt-12",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Test__Technique$2f$Frontend$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__620d3da1._.js.map