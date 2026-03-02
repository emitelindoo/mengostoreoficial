import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Package, LogOut, Search, ChevronDown, Truck, Clock,
  CheckCircle, XCircle, Eye, Save, Loader2, RefreshCw,
  ShoppingBag, DollarSign, TrendingUp
} from "lucide-react";

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  tracking_code: string | null;
  notes: string | null;
  transaction_id: string | null;
  created_at: string;
  address_street: string | null;
  address_number: string | null;
  address_complement: string | null;
  address_neighborhood: string | null;
  address_city: string | null;
  address_state: string | null;
  address_cep: string | null;
}

interface OrderItem {
  id: string;
  product_name: string;
  size: string | null;
  quantity: number;
  unit_price: number;
  custom_name: string | null;
  custom_number: string | null;
}

const STATUS_OPTIONS = [
  { value: "pending_payment", label: "Aguardando Pagamento", color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
  { value: "paid", label: "Pago", color: "bg-emerald-500/20 text-emerald-400", icon: CheckCircle },
  { value: "processing", label: "Em Preparação", color: "bg-blue-500/20 text-blue-400", icon: Package },
  { value: "shipped", label: "Enviado", color: "bg-purple-500/20 text-purple-400", icon: Truck },
  { value: "delivered", label: "Entregue", color: "bg-emerald-600/20 text-emerald-500", icon: CheckCircle },
  { value: "cancelled", label: "Cancelado", color: "bg-red-500/20 text-red-400", icon: XCircle },
];

const formatCurrency = (v: number) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Record<string, OrderItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editTracking, setEditTracking] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const checkAdmin = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate("/admin-login"); return; }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      toast.error("Acesso negado.");
      await supabase.auth.signOut();
      navigate("/admin-login");
    }
  }, [navigate]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAdmin().then(fetchOrders);
  }, [checkAdmin, fetchOrders]);

  const loadItems = async (orderId: string) => {
    if (items[orderId]) return;
    const { data } = await supabase.from("order_items").select("*").eq("order_id", orderId);
    setItems((prev) => ({ ...prev, [orderId]: (data as OrderItem[]) || [] }));
  };

  const openOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditTracking(order.tracking_code || "");
    setEditNotes(order.notes || "");
    setEditStatus(order.status);
    loadItems(order.id);
  };

  const handleSave = async () => {
    if (!selectedOrder) return;
    setSaving(true);

    const { error } = await supabase
      .from("orders")
      .update({
        status: editStatus as any,
        tracking_code: editTracking || null,
        notes: editNotes || null,
      })
      .eq("id", selectedOrder.id);

    if (error) {
      toast.error("Erro ao salvar.");
    } else {
      toast.success("Pedido atualizado!");
      setSelectedOrder({ ...selectedOrder, status: editStatus, tracking_code: editTracking, notes: editNotes });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === selectedOrder.id
            ? { ...o, status: editStatus, tracking_code: editTracking, notes: editNotes }
            : o
        )
      );
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.order_code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = orders.filter((o) => o.status !== "cancelled" && o.status !== "pending_payment").reduce((s, o) => s + Number(o.total), 0);
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.status !== "cancelled" && o.status !== "pending_payment").length;

  const inputClass = "w-full px-3 py-2.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-display text-xl tracking-wider text-gradient-aura">AURA FUT ADMIN</span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Pedidos</p>
              <p className="text-xl font-display font-bold">{totalOrders}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Receita</p>
              <p className="text-xl font-display font-bold">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pedidos Pagos</p>
              <p className="text-xl font-display font-bold">{paidOrders}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código, nome ou email..."
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">Todos os Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <button onClick={fetchOrders} className="px-4 py-2.5 bg-secondary border border-border rounded-xl text-sm flex items-center gap-2 hover:bg-secondary/80 transition-colors">
            <RefreshCw className="w-4 h-4" /> Atualizar
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders list */}
            <div className={`${selectedOrder ? "lg:col-span-1" : "lg:col-span-3"} space-y-2 max-h-[70vh] overflow-y-auto pr-1`}>
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Nenhum pedido encontrado.</p>
              )}
              {filtered.map((order) => {
                const st = STATUS_OPTIONS.find((s) => s.value === order.status) || STATUS_OPTIONS[0];
                const Icon = st.icon;
                const isSelected = selectedOrder?.id === order.id;
                return (
                  <button
                    key={order.id}
                    onClick={() => openOrder(order)}
                    className={`w-full bg-card border rounded-xl p-4 text-left hover:border-primary/50 transition-colors ${isSelected ? "border-primary" : "border-border"}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm">#{order.order_code}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${st.color}`}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-xs text-foreground">{order.customer_name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-muted-foreground">{new Date(order.created_at).toLocaleDateString("pt-BR")}</span>
                      <span className="text-xs font-bold text-primary">{formatCurrency(order.total)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Order detail */}
            {selectedOrder && (
              <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 sticky top-20 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-lg">Pedido #{selectedOrder.order_code}</h2>
                  <button onClick={() => setSelectedOrder(null)} className="text-xs text-muted-foreground hover:text-foreground">✕ Fechar</button>
                </div>

                {/* Customer info */}
                <div className="bg-secondary/30 rounded-xl p-4 mb-4 space-y-1">
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <p className="text-sm font-semibold">{selectedOrder.customer_name}</p>
                  <p className="text-xs text-muted-foreground">{selectedOrder.customer_email} · {selectedOrder.customer_phone}</p>
                  {selectedOrder.address_street && (
                    <p className="text-xs text-muted-foreground mt-2">
                      📍 {selectedOrder.address_street}, {selectedOrder.address_number}
                      {selectedOrder.address_complement ? ` - ${selectedOrder.address_complement}` : ""}
                      , {selectedOrder.address_neighborhood}, {selectedOrder.address_city}/{selectedOrder.address_state} - CEP {selectedOrder.address_cep}
                    </p>
                  )}
                </div>

                {/* Items */}
                {items[selectedOrder.id] && (
                  <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Itens</p>
                    <div className="space-y-2">
                      {items[selectedOrder.id].map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div>
                            <span>{item.product_name}</span>
                            {item.size && <span className="text-muted-foreground ml-1">({item.size})</span>}
                            {item.custom_name && <span className="text-muted-foreground ml-1">- {item.custom_name}</span>}
                            {item.custom_number && <span className="text-muted-foreground"> #{item.custom_number}</span>}
                            <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                          </div>
                          <span className="font-bold">{formatCurrency(item.unit_price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-3 pt-2 space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(selectedOrder.subtotal)}</span></div>
                      {Number(selectedOrder.discount) > 0 && <div className="flex justify-between"><span className="text-green-400">Desconto</span><span className="text-green-400">-{formatCurrency(selectedOrder.discount)}</span></div>}
                      <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span>{Number(selectedOrder.shipping) === 0 ? "Grátis" : formatCurrency(selectedOrder.shipping)}</span></div>
                      <div className="flex justify-between font-bold text-sm border-t border-border pt-1"><span>Total</span><span className="text-primary">{formatCurrency(selectedOrder.total)}</span></div>
                    </div>
                  </div>
                )}

                {/* Editable fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className={inputClass}>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Código de Rastreio</label>
                    <input
                      value={editTracking}
                      onChange={(e) => setEditTracking(e.target.value)}
                      placeholder="Ex: BR123456789XX"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Observações</label>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      placeholder="Notas internas sobre o pedido..."
                      rows={3}
                      className={inputClass + " resize-none"}
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Salvando...</> : <><Save className="w-4 h-4" /> Salvar Alterações</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
