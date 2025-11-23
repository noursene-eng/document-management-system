'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportsApi, documentsApi, Report } from '@/lib/api';
import { FileText, Sparkles, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

const reportTypes = {
  synthesis: {
    label: 'Synthèse Globale',
    description: 'Résumé complet et structuré des documents',
    icon: <FileText className="h-6 w-6" />,
  },
  competitive_analysis: {
    label: 'Analyse Concurrentielle',
    description: 'Analyse approfondie de la concurrence',
    icon: <Sparkles className="h-6 w-6" />,
  },
  business_plan: {
    label: 'Business Plan',
    description: 'Plan d\'affaires complet et professionnel',
    icon: <FileText className="h-6 w-6" />,
  },
};

const statusIcons = {
  ready: <Clock className="h-4 w-4 text-yellow-500" />,
  in_progress: <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusLabels = {
  ready: 'Prêt',
  in_progress: 'En cours',
  completed: 'Terminé',
  error: 'Erreur',
};

export default function ReportGenerator() {
  const [selectedType, setSelectedType] = useState<'synthesis' | 'competitive_analysis' | 'business_plan'>('synthesis');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: documents } = useQuery({
    queryKey: ['documents'],
    queryFn: documentsApi.getAll,
  });

  const { data: reports } = useQuery({
    queryKey: ['reports'],
    queryFn: reportsApi.getAll,
    refetchInterval: 2000,
  });

  const createReportMutation = useMutation({
    mutationFn: async (data: { type: string; documentIds: string[] }) => {
      console.log('Creating report with:', { type: data.type, documentIds: data.documentIds });
      
      if (!data.type) {
        throw new Error('Le type de rapport est requis');
      }
      
      const report = await reportsApi.create(data.type as any, data.documentIds);
      await reportsApi.generate(report.id);
      return report;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setSelectedDocuments([]);
      alert('Rapport créé et génération démarrée !');
    },
    onError: (error: any) => {
      alert(`Erreur: ${error.message}`);
    },
  });

  const processedDocuments = documents?.filter((d) => d.status === 'processed') || [];

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId],
    );
  };

  const handleGenerate = () => {
    if (selectedDocuments.length === 0) {
      alert('Veuillez sélectionner au moins un document traité');
      return;
    }
    if (!selectedType) {
      alert('Veuillez sélectionner un type de rapport');
      return;
    }
    createReportMutation.mutate({
      type: selectedType,
      documentIds: selectedDocuments,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Générer un Rapport IA</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Type de rapport
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(reportTypes).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedType(key as any)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedType === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-gray-700">
                  {config.icon}
                  <span className="font-semibold">{config.label}</span>
                </div>
                <p className="text-sm text-gray-600">{config.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Documents à analyser (sélectionner au moins un document traité)
          </label>
          {processedDocuments.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Aucun document traité disponible. Veuillez d'abord uploader et traiter des documents.
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
              {processedDocuments.map((doc) => (
                <label
                  key={doc.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(doc.id)}
                    onChange={() => handleDocumentToggle(doc.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{doc.originalName}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleGenerate}
          disabled={selectedDocuments.length === 0 || createReportMutation.isPending}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {createReportMutation.isPending ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Génération en cours...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Générer le Rapport
            </>
          )}
        </button>
      </div>

      {reports && reports.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Rapports Générés</h3>
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ReportCard({ report }: { report: Report }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {statusIcons[report.status]}
            <h4 className="font-semibold text-gray-800">
              {reportTypes[report.type]?.label || report.type}
            </h4>
            <span className="text-sm text-gray-500">
              ({report.documentIds.length} document{report.documentIds.length > 1 ? 's' : ''})
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <span>{statusLabels[report.status]}</span>
            <span>
              {new Date(report.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          {report.error && (
            <p className="text-sm text-red-600 mb-2">Erreur: {report.error}</p>
          )}
          {report.status === 'completed' && report.content && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? 'Masquer' : 'Afficher'} le rapport
            </button>
          )}
        </div>
      </div>
      {isExpanded && report.content && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
            {report.content}
          </pre>
        </div>
      )}
    </div>
  );
}