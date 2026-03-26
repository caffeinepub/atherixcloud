import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Plus, Tag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { VPSPlan, VPSPlanInput } from "../backend.d";
import { useActor } from "../hooks/useActor";

function generateId() {
  return `plan-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type TabType = "plans" | "categories";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();

  const [activeTab, setActiveTab] = useState<TabType>("plans");
  const [plans, setPlans] = useState<VPSPlan[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingCats, setLoadingCats] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<VPSPlan | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [deletingCat, setDeletingCat] = useState<string | null>(null);

  const [form, setForm] = useState<{
    name: string;
    category: string;
    price: string;
    ram: string;
    cores: string;
    storage: string;
    features: string;
  }>({
    name: "",
    category: "",
    price: "",
    ram: "",
    cores: "",
    storage: "",
    features: "",
  });

  useEffect(() => {
    if (localStorage.getItem("atherix_admin_auth") !== "true") {
      navigate({ to: "/admin" });
    }
  }, [navigate]);

  const loadPlans = useCallback(async () => {
    if (!actor) return;
    setLoadingPlans(true);
    try {
      const data = await actor.getVPSPlans();
      setPlans(data);
    } catch {
      toast.error("Failed to load plans");
    } finally {
      setLoadingPlans(false);
    }
  }, [actor]);

  const loadCategories = useCallback(async () => {
    if (!actor) return;
    setLoadingCats(true);
    try {
      const data = await actor.getCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoadingCats(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) {
      loadPlans();
      loadCategories();
    }
  }, [actor, isFetching, loadPlans, loadCategories]);

  function openAdd() {
    setEditingPlan(null);
    setForm({
      name: "",
      category: categories[0] ?? "",
      price: "",
      ram: "",
      cores: "",
      storage: "",
      features: "",
    });
    setDialogOpen(true);
  }

  function openEdit(plan: VPSPlan) {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      category: plan.category,
      price: plan.price.toString(),
      ram: plan.ram,
      cores: plan.cores,
      storage:
        plan.features.find(
          (f) =>
            f.toLowerCase().includes("nvme") ||
            f.toLowerCase().includes("storage"),
        ) ?? "",
      features: plan.features.join(", "),
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!actor) return;
    setSaving(true);
    try {
      const featuresArr = form.features
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (editingPlan) {
        const updated: VPSPlan = {
          id: editingPlan.id,
          name: form.name,
          category: form.category,
          price: BigInt(Math.round(Number(form.price))),
          ram: form.ram,
          cores: form.cores,
          features: featuresArr,
        };
        const ok = await actor.updateVPSPlan(editingPlan.id, updated);
        if (ok) {
          toast.success("Plan updated");
          setDialogOpen(false);
          await loadPlans();
        } else {
          toast.error("Update failed");
        }
      } else {
        const input: VPSPlanInput = {
          id: generateId(),
          name: form.name,
          category: form.category,
          price: BigInt(Math.round(Number(form.price))),
          ram: form.ram,
          cores: form.cores,
          features: featuresArr,
        };
        await actor.addVPSPlan(input);
        toast.success("Plan added");
        setDialogOpen(false);
        await loadPlans();
      }
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!actor) return;
    setDeletingId(id);
    try {
      const ok = await actor.deleteVPSPlan(id);
      if (ok) {
        toast.success("Plan deleted");
        await loadPlans();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleAddCategory() {
    if (!actor || !newCatName.trim()) return;
    setAddingCat(true);
    try {
      const ok = await actor.addCategory(newCatName.trim());
      if (ok) {
        toast.success("Category added");
        setNewCatName("");
        await loadCategories();
      } else {
        toast.error("Category already exists");
      }
    } catch {
      toast.error("Failed to add category");
    } finally {
      setAddingCat(false);
    }
  }

  async function handleDeleteCategory(name: string) {
    if (!actor) return;
    setDeletingCat(name);
    try {
      const ok = await actor.deleteCategory(name);
      if (ok) {
        toast.success("Category deleted");
        await loadCategories();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Failed to delete category");
    } finally {
      setDeletingCat(null);
    }
  }

  function handleLogout() {
    localStorage.removeItem("atherix_admin_auth");
    navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.014_265)] text-[oklch(0.92_0.02_265)]">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.20 0.025 250 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(0.20 0.025 250 / 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[oklch(0.20_0.025_250/0.5)] bg-[oklch(0.09_0.014_265/0.9)] backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <img src="/assets/logo.webp" alt="ENDERNET" className="h-7 w-auto" />
          <span className="font-display font-bold text-base text-[oklch(0.95_0.02_265)]">
            ENDERNET
          </span>
          <Badge className="bg-[oklch(0.84_0.20_191/0.12)] text-[oklch(0.84_0.20_191)] border-[oklch(0.84_0.20_191/0.3)] text-xs">
            Admin Panel
          </Badge>
        </div>
        <Button
          data-ocid="admin.secondary_button"
          onClick={handleLogout}
          variant="outline"
          className="border-[oklch(0.28_0.03_250/0.6)] text-[oklch(0.65_0.04_265)] hover:text-[oklch(0.92_0.02_265)] hover:border-[oklch(0.65_0.22_29/0.6)] hover:bg-[oklch(0.65_0.22_29/0.08)] transition-all duration-200 text-sm"
        >
          Logout
        </Button>
      </motion.header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-display font-bold text-3xl text-[oklch(0.95_0.02_265)] mb-1">
            VPS Plan Manager
          </h1>
          <p className="text-[oklch(0.55_0.03_265)] text-sm">
            Add, edit, or remove VPS hosting plans and categories.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Total Plans", value: plans.length },
            { label: "Categories", value: categories.length },
            {
              label: "Plans per Category",
              value:
                categories.length > 0
                  ? (plans.length / categories.length).toFixed(1)
                  : "0",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[oklch(0.20_0.025_250/0.5)] bg-[oklch(0.10_0.014_255/0.6)] px-5 py-4"
            >
              <div className="text-2xl font-bold text-[oklch(0.84_0.20_191)]">
                {stat.value}
              </div>
              <div className="text-xs text-[oklch(0.50_0.03_265)] mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-[oklch(0.10_0.014_255/0.6)] border border-[oklch(0.20_0.025_250/0.4)] w-fit">
          {(
            [
              { id: "plans", label: "VPS Plans" },
              { id: "categories", label: "Categories" },
            ] as { id: TabType; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[oklch(0.84_0.20_191)] text-[oklch(0.07_0.014_265)] shadow"
                  : "text-[oklch(0.60_0.03_265)] hover:text-[oklch(0.88_0.02_265)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-[oklch(0.20_0.025_250/0.5)] bg-[oklch(0.09_0.014_265/0.7)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.20_0.025_250/0.4)]">
              <h2 className="font-semibold text-[oklch(0.88_0.02_265)] text-sm">
                All Plans{" "}
                {loadingPlans && (
                  <span className="text-[oklch(0.50_0.03_265)] font-normal">
                    Loading...
                  </span>
                )}
              </h2>
              <Button
                data-ocid="admin.primary_button"
                onClick={openAdd}
                className="bg-[oklch(0.84_0.20_191)] hover:bg-[oklch(0.78_0.22_191)] text-[oklch(0.07_0.014_265)] font-semibold text-sm rounded-lg px-4 py-2 hover:shadow-[0_0_16px_oklch(0.84_0.20_191/0.4)] transition-all duration-200"
              >
                + Add Plan
              </Button>
            </div>

            {loadingPlans ? (
              <div className="flex items-center justify-center py-16 text-[oklch(0.50_0.03_265)]">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Loading plans...
              </div>
            ) : plans.length === 0 ? (
              <div className="text-center py-16 text-[oklch(0.50_0.03_265)]">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-sm">
                  No plans yet. Click "+ Add Plan" to create one.
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-[oklch(0.20_0.025_250/0.3)] hover:bg-transparent">
                    {[
                      "Name",
                      "Category",
                      "RAM",
                      "Cores",
                      "Price",
                      "Features",
                      "Actions",
                    ].map((h) => (
                      <TableHead
                        key={h}
                        className="text-[oklch(0.55_0.03_265)] text-xs font-semibold uppercase tracking-wider"
                      >
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan, i) => (
                    <TableRow
                      key={plan.id}
                      data-ocid={`admin.item.${i + 1}`}
                      className="border-[oklch(0.20_0.025_250/0.2)] hover:bg-[oklch(0.12_0.016_255/0.4)] transition-colors"
                    >
                      <TableCell className="font-medium text-[oklch(0.88_0.02_265)] text-sm">
                        {plan.name}
                      </TableCell>
                      <TableCell>
                        <Badge className="text-xs bg-[oklch(0.84_0.20_191/0.12)] text-[oklch(0.84_0.20_191)] border-[oklch(0.84_0.20_191/0.3)]">
                          {plan.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[oklch(0.70_0.03_265)] text-sm">
                        {plan.ram}
                      </TableCell>
                      <TableCell className="text-[oklch(0.70_0.03_265)] text-sm">
                        {plan.cores}
                      </TableCell>
                      <TableCell className="text-[oklch(0.84_0.20_60)] font-semibold text-sm">
                        ₹{plan.price.toString()}
                      </TableCell>
                      <TableCell className="text-[oklch(0.55_0.03_265)] text-xs max-w-[200px] truncate">
                        {plan.features.slice(0, 3).join(", ")}
                        {plan.features.length > 3 &&
                          ` +${plan.features.length - 3} more`}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            data-ocid={`admin.edit_button.${i + 1}`}
                            size="sm"
                            variant="outline"
                            onClick={() => openEdit(plan)}
                            className="border-[oklch(0.28_0.03_250/0.5)] text-[oklch(0.65_0.04_265)] hover:text-[oklch(0.84_0.20_191)] hover:border-[oklch(0.84_0.20_191/0.4)] text-xs h-7 px-3"
                          >
                            Edit
                          </Button>
                          <Button
                            data-ocid={`admin.delete_button.${i + 1}`}
                            size="sm"
                            variant="outline"
                            disabled={deletingId === plan.id}
                            onClick={() => handleDelete(plan.id)}
                            className="border-[oklch(0.28_0.03_250/0.5)] text-[oklch(0.65_0.04_265)] hover:text-[oklch(0.65_0.22_29)] hover:border-[oklch(0.65_0.22_29/0.4)] text-xs h-7 px-3"
                          >
                            {deletingId === plan.id ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </motion.div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Add new category */}
            <div className="rounded-2xl border border-[oklch(0.20_0.025_250/0.5)] bg-[oklch(0.09_0.014_265/0.7)] p-6">
              <h2 className="font-semibold text-[oklch(0.88_0.02_265)] text-sm mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[oklch(0.84_0.20_191)]" />
                Add New Category
              </h2>
              <div className="flex gap-3">
                <Input
                  data-ocid="admin.input"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  placeholder="e.g. Dedicated Servers"
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm flex-1"
                />
                <Button
                  data-ocid="admin.primary_button"
                  onClick={handleAddCategory}
                  disabled={addingCat || !newCatName.trim()}
                  className="bg-[oklch(0.84_0.20_191)] hover:bg-[oklch(0.78_0.22_191)] text-[oklch(0.07_0.014_265)] font-semibold text-sm px-5"
                >
                  {addingCat ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>

            {/* Categories list */}
            <div className="rounded-2xl border border-[oklch(0.20_0.025_250/0.5)] bg-[oklch(0.09_0.014_265/0.7)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[oklch(0.20_0.025_250/0.4)]">
                <h2 className="font-semibold text-[oklch(0.88_0.02_265)] text-sm flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[oklch(0.84_0.20_191)]" />
                  Existing Categories
                </h2>
              </div>
              {loadingCats ? (
                <div className="flex items-center justify-center py-10 text-[oklch(0.50_0.03_265)]">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </div>
              ) : categories.length === 0 ? (
                <div className="text-center py-10 text-[oklch(0.50_0.03_265)] text-sm">
                  No categories yet.
                </div>
              ) : (
                <div className="divide-y divide-[oklch(0.20_0.025_250/0.2)]">
                  {categories.map((cat, i) => (
                    <div
                      key={cat}
                      data-ocid={`admin.category.${i + 1}`}
                      className="flex items-center justify-between px-6 py-4 hover:bg-[oklch(0.12_0.016_255/0.4)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Tag className="w-4 h-4 text-[oklch(0.55_0.03_265)]" />
                        <span className="text-sm font-medium text-[oklch(0.88_0.02_265)]">
                          {cat}
                        </span>
                        <span className="text-xs text-[oklch(0.45_0.02_265)]">
                          {plans.filter((p) => p.category === cat).length} plans
                        </span>
                      </div>
                      <Button
                        data-ocid={`admin.delete_category.${i + 1}`}
                        size="sm"
                        variant="outline"
                        disabled={deletingCat === cat}
                        onClick={() => handleDeleteCategory(cat)}
                        className="border-[oklch(0.28_0.03_250/0.5)] text-[oklch(0.65_0.04_265)] hover:text-[oklch(0.65_0.22_29)] hover:border-[oklch(0.65_0.22_29/0.4)] text-xs h-7 px-3 gap-1.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        {deletingCat === cat ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* Add/Edit Plan Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-ocid="admin.dialog"
          className="bg-[oklch(0.10_0.014_255)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] max-w-lg"
        >
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-[oklch(0.95_0.02_265)]">
              {editingPlan ? "Edit Plan" : "Add New Plan"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-2">
                <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                  Plan Name
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. 32 GB Indian Node"
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm"
                />
              </div>
              <div className="space-y-1.5 col-span-2">
                <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
                >
                  <SelectTrigger
                    data-ocid="admin.select"
                    className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[oklch(0.12_0.016_255)] border-[oklch(0.24_0.025_250/0.5)]">
                    {categories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-[oklch(0.88_0.02_265)]"
                      >
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                  Price (₹/month)
                </Label>
                <Input
                  data-ocid="admin.input"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, price: e.target.value }))
                  }
                  placeholder="90"
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                  RAM
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.ram}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, ram: e.target.value }))
                  }
                  placeholder="16 GB"
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                  Cores
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.cores}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cores: e.target.value }))
                  }
                  placeholder="4"
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                  Storage
                </Label>
                <Input
                  data-ocid="admin.input"
                  value={form.storage}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, storage: e.target.value }))
                  }
                  placeholder="100 GB NVMe"
                  className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[oklch(0.70_0.04_265)] text-xs">
                Features{" "}
                <span className="text-[oklch(0.45_0.02_265)]">
                  (comma-separated)
                </span>
              </Label>
              <Textarea
                data-ocid="admin.textarea"
                value={form.features}
                onChange={(e) =>
                  setForm((f) => ({ ...f, features: e.target.value }))
                }
                placeholder="Full Root Access, DDoS Protection, NVMe Storage"
                className="bg-[oklch(0.12_0.016_255/0.8)] border-[oklch(0.24_0.025_250/0.5)] text-[oklch(0.92_0.02_265)] text-sm resize-none"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              data-ocid="admin.cancel_button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-[oklch(0.28_0.03_250/0.5)] text-[oklch(0.65_0.04_265)] hover:text-[oklch(0.92_0.02_265)]"
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.save_button"
              onClick={handleSave}
              disabled={saving || !form.name || !form.price}
              className="bg-[oklch(0.84_0.20_191)] hover:bg-[oklch(0.78_0.22_191)] text-[oklch(0.07_0.014_265)] font-semibold hover:shadow-[0_0_14px_oklch(0.84_0.20_191/0.4)] transition-all duration-200"
            >
              {saving ? "Saving..." : editingPlan ? "Save Changes" : "Add Plan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
