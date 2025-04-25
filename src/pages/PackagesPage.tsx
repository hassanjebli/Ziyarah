
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
import { Search, Plus, Eye, Edit, Trash, Package } from 'lucide-react';
import { PackageForm } from '@/components/packages/PackageForm';
import { Package as PackageType } from '@/types/package';

// Mock package data
const packages: PackageType[] = [
  {
    id: '1',
    name: 'Hajj Standard 2024',
    type: 'Hajj',
    duration: 15,
    startDate: '2024-06-15',
    endDate: '2024-06-30',
    price: 25000,
    capacity: 50,
    description: 'Package Hajj standard pour 15 jours',
    status: 'Available',
  },
  {
    id: '2',
    name: 'Umrah Deluxe 2024',
    type: 'Umrah',
    duration: 10,
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    price: 15000,
    capacity: 30,
    description: 'Package Umrah deluxe pour 10 jours',
    status: 'Full',
  },
];

const PackagesPage = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | undefined>(
    undefined
  );

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      search === '' ||
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.description.toLowerCase().includes(search.toLowerCase());

    const matchesType = !typeFilter || pkg.type === typeFilter;
    const matchesStatus = !statusFilter || pkg.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600';
      case 'Full':
        return 'text-amber-500';
      case 'Completed':
        return 'text-blue-600';
      default:
        return '';
    }
  };

  const handleAddPackage = () => {
    setSelectedPackage(undefined);
    setIsFormOpen(true);
  };

  const handleEditPackage = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Packages</h2>
          <p className="text-muted-foreground">
            Gérez vos packages de voyage et leurs détails
          </p>
        </div>
        <Button
          className="bg-ptams-blue hover:bg-ptams-blue/90"
          onClick={handleAddPackage}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nouveau package
        </Button>
      </div>

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Hajj">Hajj</SelectItem>
                  <SelectItem value="Umrah">Umrah</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="Available">Disponible</SelectItem>
                  <SelectItem value="Full">Complet</SelectItem>
                  <SelectItem value="Completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-muted-foreground"
                    >
                      Aucun package trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>{pkg.type}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          Du: {new Date(pkg.startDate).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Au: {new Date(pkg.endDate).toLocaleDateString('fr-FR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        {pkg.price.toLocaleString('fr-FR')} MAD
                      </TableCell>
                      <TableCell>{pkg.capacity} places</TableCell>
                      <TableCell>
                        <span className={getStatusColor(pkg.status)}>
                          {pkg.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditPackage(pkg)}
                          >
                            <Edit className="h-4 w-4" />
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

      <PackageForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        initialData={selectedPackage}
      />
    </div>
  );
};

export default PackagesPage;
