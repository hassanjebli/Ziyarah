import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Client {
  id: string;
  name: string;
  passport: string;
  cin: string;
  phone: string;
  email: string;
  tripType: string;
  paymentStatus: string;
  visaStatus: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  passport: z.string().min(5, {
    message: "Passport must be at least 5 characters.",
  }),
  cin: z.string().min(5, {
    message: "CIN must be at least 5 characters.",
  }),
  phone: z.string().min(5, {
    message: "Phone must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  tripType: z.enum(["Local", "International"]),
  paymentStatus: z.enum(["Paid", "Unpaid", "Pending"]),
  visaStatus: z.enum(["Required", "Not Required", "In Process"]),
});

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      passport: "",
      cin: "",
      phone: "",
      email: "",
      tripType: "Local",
      paymentStatus: "Unpaid",
      visaStatus: "Not Required",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newClient: Client = {
      id: crypto.randomUUID(),
      name: values.name,
      passport: values.passport,
      cin: values.cin,
      phone: values.phone,
      email: values.email,
      tripType: values.tripType,
      paymentStatus: values.paymentStatus,
      visaStatus: values.visaStatus,
    };
    setClients((prev) => [...prev, newClient]);
    setOpen(false);
    form.reset();
    toast({
      title: "Client added successfully.",
      description: "Your client has been added.",
    });
  }

  return (
    <div>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">
              Manage your travel agency clients
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Add Client</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Client</DialogTitle>
                <DialogDescription>
                  Add a new client to your travel agency.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Client Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the client's name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport</FormLabel>
                        <FormControl>
                          <Input placeholder="Passport" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the client's passport number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CIN</FormLabel>
                        <FormControl>
                          <Input placeholder="CIN" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the client's CIN.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the client's phone number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is the client's email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tripType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trip Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a trip type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Local">Local</SelectItem>
                            <SelectItem value="International">
                              International
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is the client's trip type.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a payment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is the client's payment status.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="visaStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visa Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a visa status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Required">Required</SelectItem>
                            <SelectItem value="Not Required">
                              Not Required
                            </SelectItem>
                            <SelectItem value="In Process">In Process</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is the client's visa status.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Add Client</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Clients List</CardTitle>
            <CardDescription>
              Here you can see all your travel agency clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead>Passport</TableHead>
                  <TableHead>CIN</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Trip Type</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Visa Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.passport}</TableCell>
                    <TableCell>{client.cin}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.tripType}</TableCell>
                    <TableCell>{client.paymentStatus}</TableCell>
                    <TableCell>{client.visaStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientsPage;
