'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DocumentUpload from '@/components/DocumentUpload';
import DocumentList from '@/components/DocumentList';
import ReportGenerator from '@/components/ReportGenerator';
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connexion WebSocket pour les mises à jour en temps réel
    const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('Connecté au serveur WebSocket');
    });

    newSocket.on('report:update', (report) => {
      console.log('Mise à jour du rapport:', report);
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    });

    newSocket.on('document:update', (document) => {
      console.log('Mise à jour du document:', document);
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion de Documents Juridiques et Financiers
            </h1>
            <p className="mt-2 text-gray-600">
              Upload, analyse et génération de rapports avec IA
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Section Upload */}
            <section>
              <DocumentUpload />
            </section>

            {/* Section Documents */}
            <section>
              <DocumentList />
            </section>

            {/* Section Génération de Rapports */}
            <section>
              <ReportGenerator />
            </section>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500 text-sm">
              Système de gestion de documents avec IA - Powered by Groq & MinIO
            </p>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}
