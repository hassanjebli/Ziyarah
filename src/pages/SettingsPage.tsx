
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Shield, Globe } from "lucide-react";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Paramètres mis à jour",
      description: "Les modifications ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">
            Gérez les paramètres de votre application
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Général
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Sécurité
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'agence</CardTitle>
              <CardDescription>
                Mettez à jour les informations de votre agence de voyage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="agency-name">Nom de l'agence</Label>
                  <Input id="agency-name" placeholder="Votre agence de voyage" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency-email">Email</Label>
                  <Input id="agency-email" type="email" placeholder="contact@agence.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency-phone">Téléphone</Label>
                  <Input id="agency-phone" placeholder="+212 600000000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency-address">Adresse</Label>
                  <Input id="agency-address" placeholder="Adresse de l'agence" />
                </div>
              </div>
              <Button onClick={handleSave}>Enregistrer les modifications</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Langue et région</CardTitle>
              <CardDescription>
                Configurez la langue et les paramètres régionaux
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Format de la date</Label>
                  <p className="text-sm text-muted-foreground">DD/MM/YYYY</p>
                </div>
                <Button variant="outline">Modifier</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Devise</Label>
                  <p className="text-sm text-muted-foreground">MAD (Dirham marocain)</p>
                </div>
                <Button variant="outline">Modifier</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notification</CardTitle>
              <CardDescription>
                Configurez vos préférences de notification par email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Notifications de réservation</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications pour les nouvelles réservations
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Rappels de paiement</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications pour les paiements en attente
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Mises à jour des visas</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevoir des notifications pour les mises à jour de visa
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité du compte</CardTitle>
              <CardDescription>
                Gérez la sécurité de votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Activer l'authentification à deux facteurs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Gérer les sessions actives
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
