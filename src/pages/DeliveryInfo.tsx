import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, Clock, Package, MapPin } from "lucide-react";

const DeliveryInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Prazo de Entrega</h1>

        <p className="text-muted-foreground mb-10">
          Enviamos para todo o Brasil com <strong className="text-foreground">frete grátis via SEDEX</strong>. Prazo de entrega: <strong className="text-foreground">7 dias úteis</strong> para qualquer região do Brasil.
        </p>

        <div className="flex items-center gap-4 p-5 rounded-lg border border-border bg-card mb-10">
          <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-foreground">Todo o Brasil</p>
            <p className="text-xs text-muted-foreground">Todas as capitais e regiões</p>
          </div>
          <span className="text-sm font-bold text-primary whitespace-nowrap">7 dias úteis</span>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">Quando o prazo começa a contar?</h2>
              <p className="text-muted-foreground text-sm">O prazo de entrega é contado a partir da <strong>confirmação do pagamento via PIX</strong>. Pagamentos confirmados após as 17h ou em finais de semana serão processados no próximo dia útil.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">Código de Rastreamento</h2>
              <p className="text-muted-foreground text-sm">Após o envio, você receberá o <strong>código de rastreamento por e-mail</strong> para acompanhar sua encomenda em tempo real.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Truck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">Frete Grátis</h2>
              <p className="text-muted-foreground text-sm">Todas as compras possuem <strong>frete grátis via SEDEX</strong> para qualquer lugar do Brasil. Sem valor mínimo de compra.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DeliveryInfo;
