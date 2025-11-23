'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi, Document } from '@/lib/api';
import { FileText, Trash2, CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const statusIcons = {
  pending: <Clock className="h-4 w-4 text-yellow-500" />,
  processing: <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />,
  processed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusLabels = {
  pending: 'En attente',
  processing: 'En traitement',
  processed: 'Traité',
  error: 'Erreur',
};

export default function DocumentList() {
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: documentsApi.getAll,
    refetchInterval: 3000, // Rafraîchir toutes les 3 secondes
  });

  const deleteMutation = useMutation({
    mutationFn: documentsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FileText className="mx-auto h-12 w-12 mb-4 text-gray-400" />
        <p>Aucun document uploadé</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Documents</h2>
      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">{doc.originalName}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    {statusIcons[doc.status]}
                    {statusLabels[doc.status]}
                  </span>
                  <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                  <span>
                    {format(new Date(doc.uploadedAt), 'dd MMM yyyy HH:mm', { locale: fr })}
                  </span>
                </div>
                {doc.error && (
                  <p className="text-sm text-red-600 mt-2">Erreur: {doc.error}</p>
                )}
              </div>
              <button
                onClick={() => deleteMutation.mutate(doc.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

