import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Package, LogOut, Clock, CheckCircle, Truck, ChevronRight, User } from "lucide-react";
import Header from "@/components/Header";

interface Order {
  id: string;
  order_code: string;
  status: string;
  total: number;
  created_at: string;
  tracking_code: string | null;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending_payment: { label: "Aguardando Pagamento", color: "text-yellow-400", icon: Clock },
  paid: { label: "Pagamento Confirmado", color: "text-emerald-400", icon: CheckCircle },
  processing: { label: "Em Preparação", color: "text-blue-400", icon: Package },
  shipped: { label: "Enviado", color: "text-purple-400", icon: Truck },
  delivered: { label: "Entregue", color: "text-emerald-500", icon: CheckCircle },
  cancelled: { label: "Cancelado", color: "text-red-400", icon: Clock },
};

const formatCurrency = (v: number) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`;

const MinhaConta = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_email", currentUser.email?.toLowerCase())
      .order("created_at", { ascending: false });

    setOrders((data as Order[]) || []);
    setLoading(false);
  }, [navigate]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold">Minha Conta</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>

          <h2 className="font-display font-bold text-lg mb-4">Meus Pedidos</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum pedido encontrado.</p>
              <Link to="/" className="text-primary hover:underline text-sm mt-2 inline-block">Ir às compras →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const st = STATUS_MAP[order.status] || STATUS_MAP.pending_payment;
                const Icon = st.icon;
                return (
                  <Link
                    key={order.id}
                    to={`/rastrear?code=${order.order_code}`}
                    className="block bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display font-bold text-sm">Pedido #{order.order_code}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(order.created_at).toLocaleDateString("pt-BR")} · {formatCurrency(order.total)}
                        </p>
                        <div className={`flex items-center gap-1.5 mt-1.5 text-xs font-semibold ${st.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {st.label}
                        </div>
                        {order.tracking_code && (
                          <p className="text-xs text-muted-foreground mt-1">🚚 {order.tracking_code}</p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MinhaConta;
