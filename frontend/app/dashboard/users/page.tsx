"use client"
import { PageHeader } from "@/components/layout/page-header"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/cards/status-badge"
import { DashboardLayout } from "@/components/dashboard-layout"


const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Auditor" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer" },
  { id: 4, name: "Sarah Brown", email: "sarah@example.com", role: "Admin" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", role: "Admin" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: string) => {
    setForm({ ...form, role: value })
  }

  const [error, setError] = useState<string | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          email: form.email,
          password: "123123",
          role: form.role.toLowerCase(),
        }),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Registration failed");
      }
      const resData = await res.json();
      setUsers([
        ...users,
        {
          id: resData.id,
          name: resData.name,
          email: resData.email,
          role: resData.role,
        },
      ]);
      setForm({ name: "", email: "", role: "Admin" });
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setErrorDialogOpen(true);
    }
  };

  return (
    <DashboardLayout title="Users">
      <div className="space-y-6">
        {/* Error Dialog */}
        <Dialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
          <DialogContent className="max-w-sm w-full p-0 rounded-xl">
            <DialogHeader className="flex flex-row items-center justify-between pt-4 pb-0 px-4 border-b sticky top-0 bg-background z-10">
              <DialogTitle className="text-lg font-semibold text-red-600">Error</DialogTitle>
            </DialogHeader>
            <div className="p-6">
              <p className="text-red-600">{error}</p>
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={() => setErrorDialogOpen(false)}>Close</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <PageHeader title="Users" description="Manage system users and their access">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-full p-0 rounded-xl">
              <DialogHeader className="flex flex-row items-center justify-between pt-4 pb-0 px-4 border-b sticky top-0 bg-background z-10">
                <DialogTitle className="text-lg font-semibold">Add User</DialogTitle>
              </DialogHeader>
              <form className="p-6 space-y-4" onSubmit={handleSubmit}>
                <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <Input name="email" placeholder="Email" value={form.email} onChange={handleChange} required type="email" />
                <Select value={form.role} onValueChange={handleRoleChange} name="role" required>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Auditor">Auditor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex justify-end gap-2 pt-2">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </PageHeader>

        <div className="px-6">
          <Breadcrumb items={[{ label: "Dashboard", href: "/dashboard" }, { label: "Users" }]} />
        </div>

        <div className="px-6">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-border hover:bg-secondary/30">
                  <TableHead className="text-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-foreground font-semibold">Email</TableHead>
                  <TableHead className="text-foreground font-semibold">Role</TableHead>
                  <TableHead className="text-right text-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-secondary/20">
                    <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{user.role}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
