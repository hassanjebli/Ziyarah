
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, FileText, Download, Trash } from 'lucide-react';
import { Document } from '@/types/document';

// Mock documents data
const documents: Document[] = [
  {
    id: '1',
    name: 'Passport_Ahmed.pdf',
    type: 'passport',
    size: 1024576, // 1MB
    uploadedAt: '2024-04-20T10:00:00Z',
    clientId: '1',
    url: '/documents/passport.pdf',
  },
  {
    id: '2',
    name: 'Visa_Sara.pdf',
    type: 'visa',
    size: 2048576, // 2MB
    uploadedAt: '2024-04-19T15:30:00Z',
    clientId: '2',
    url: '/documents/visa.pdf',
  },
];

const DocumentsPage = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = search === '' || doc.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = !typeFilter || typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        <p className="text-muted-foreground">
          Gérez vos documents et fichiers importants
        </p>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom de document..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type de document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="passport">Passeport</SelectItem>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="contract">Contrat</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Date d'ajout</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Aucun document trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {doc.name}
                      </TableCell>
                      <TableCell className="capitalize">{doc.type}</TableCell>
                      <TableCell>{formatFileSize(doc.size)}</TableCell>
                      <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentsPage;
