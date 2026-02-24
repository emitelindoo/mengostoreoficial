import { Shield, Truck, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      {/* Trust badges */}
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <p className="text-center text-xl font-display font-bold text-primary mb-2">
            Veste a Nação
          </p>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Seja parte da maior torcida do Brasil. Compre agora e receba em casa com frete grátis!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Compra Segura", desc: "Pagamento 100% protegido via PIX" },
              { icon: Truck, title: "Frete Grátis SEDEX", desc: "Envio para todo o Brasil" },
              { icon: RefreshCw, title: "Troca Fácil", desc: "30 dias para trocar" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 justify-center">
                <item.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold text-lg text-primary mb-3">
              Mengão Store Oficial
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Loja oficial de produtos do Clube de Regatas do Flamengo. Produtos originais, qualidade garantida e entrega para todo o Brasil.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-3">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/politica-de-privacidade" className="hover:text-primary transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
              <li><Link to="/prazo-de-entrega" className="hover:text-primary transition-colors">Prazo de Entrega</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>loja@flamengo.com.br</li>
              <li>Gávea, Rio de Janeiro - RJ</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl mt-8 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © 2025 Clube de Regatas do Flamengo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
