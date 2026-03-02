import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  product_name: string;
  size: string | null;
  quantity: number;
  unit_price: number;
  custom_name: string | null;
  custom_number: string | null;
}

interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_email: string;
  status: string;
  total: number;
  shipping: number;
  tracking_code: string | null;
  notes: string | null;
  created_at: string;
  address_city: string | null;
  address_state: string | null;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending_payment: { label: "Aguardando Pagamento", color: "text-yellow-400", icon: Clock },
  paid: { label: "Pagamento Confirmado", color: "text-emerald-400", icon: CheckCircle },
  processing: { label: "Em Preparação", color: "text-blue-400", icon: Package },
  shipped: { label: "Enviado", color: "text-purple-400", icon: Truck },
  delivered: { label: "Entregue", color: "text-emerald-500", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "text-red-400", icon: Clock },
};

const STATUS_STEPS = ["pending_payment", "paid", "processing", "shipped", "delivered"];

const formatCurrency = (v: number) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("code") || "");
  const [orders, setOrders] = useState<Order[]>([]);
  const [items, setItems] = useState<Record<string, OrderItem[]>>({});
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setSelectedOrder(null);

    const trimmed = query.trim();
    const isEmail = trimmed.includes("@");

    let q = supabase.from("orders").select("*").order("created_at", { ascending: false });

    if (isEmail) {
      q = q.eq("customer_email", trimmed.toLowerCase());
    } else {
      q = q.eq("order_code", trimmed.toUpperCase());
    }

    const { data } = await q;
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("code")) handleSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadItems = async (orderId: string) => {
    if (items[orderId]) return;
    const { data } = await supabase.from("order_items").select("*").eq("order_id", orderId);
    setItems((prev) => ({ ...prev, [orderId]: (data as OrderItem[]) || [] }));
  };

  const selectOrder = (order: Order) => {
    setSelectedOrder(order);
    loadItems(order.id);
  };

  const currentStepIndex = selectedOrder ? STATUS_STEPS.indexOf(selectedOrder.status) : -1;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Rastrear Pedido</h1>
            <p className="text-muted-foreground text-sm">Digite seu e-mail ou código do pedido</p>
          </div>

          <div className="flex gap-2 mb-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Email ou código do pedido (ex: ABC123)"
              className="flex-1 px-4 py-3 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              Buscar
            </button>
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {searched && !loading && orders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum pedido encontrado.</p>
              <p className="text-xs mt-1">Verifique o e-mail ou código digitado.</p>
            </div>
          )}

          {!selectedOrder && orders.length > 0 && (
            <div className="space-y-3">
              {orders.map((order) => {
                const st = STATUS_MAP[order.status] || STATUS_MAP.pending_payment;
                const Icon = st.icon;
                return (
                  <button
                    key={order.id}
                    onClick={() => selectOrder(order)}
                    className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/50 transition-colors text-left"
                  >
                    <div>
                      <p className="font-display font-bold text-sm">Pedido #{order.order_code}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(order.created_at).toLocaleDateString("pt-BR")} · {formatCurrency(order.total)}
                      </p>
                      <div className={`flex items-center gap-1.5 mt-1.5 text-xs font-semibold ${st.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {st.label}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          )}

          {selectedOrder && (
            <div className="animate-fade-in">
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1"
              >
                ← Voltar aos pedidos
              </button>

              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display font-bold text-lg">Pedido #{selectedOrder.order_code}</h2>
                    <p className="text-xs text-muted-foreground">
                      {new Date(selectedOrder.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm font-semibold ${STATUS_MAP[selectedOrder.status]?.color}`}>
                    {(() => { const Icon = STATUS_MAP[selectedOrder.status]?.icon || Clock; return <Icon className="w-4 h-4" />; })()}
                    {STATUS_MAP[selectedOrder.status]?.label}
                  </div>
                </div>

                {/* Progress bar */}
                {selectedOrder.status !== "cancelled" && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      {STATUS_STEPS.map((s, i) => {
                        const active = i <= currentStepIndex;
                        const st = STATUS_MAP[s];
                        const Icon = st.icon;
                        return (
                          <div key={s} className="flex flex-col items-center flex-1">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className={`text-[10px] mt-1 text-center ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                              {st.label.split(" ")[0]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(5, (currentStepIndex / (STATUS_STEPS.length - 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {selectedOrder.tracking_code && (
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Código de Rastreio</p>
                      <p className="font-mono font-bold text-sm text-foreground">{selectedOrder.tracking_code}</p>
                    </div>
                  </div>
                )}

                {selectedOrder.notes && (
                  <div className="bg-secondary/30 rounded-xl p-4 mb-6">
                    <p className="text-xs text-muted-foreground mb-1">Observações</p>
                    <p className="text-sm text-foreground">{selectedOrder.notes}</p>
                  </div>
                )}

                {selectedOrder.address_city && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedOrder.address_city}/{selectedOrder.address_state}
                  </div>
                )}

                {/* Items */}
                {items[selectedOrder.id] && (
                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">Itens do Pedido</p>
                    <div className="space-y-2">
                      {items[selectedOrder.id].map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-semibold">{item.product_name}</span>
                            {item.size && <span className="text-muted-foreground ml-2">Tam: {item.size}</span>}
                            {item.custom_name && <span className="text-muted-foreground ml-2">Nome: {item.custom_name}</span>}
                            {item.custom_number && <span className="text-muted-foreground ml-1">#{item.custom_number}</span>}
                            <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                          </div>
                          <span className="font-bold text-primary">{formatCurrency(item.unit_price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border mt-4 pt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrackOrder;
