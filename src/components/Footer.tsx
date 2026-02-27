import { Shield, Truck, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import logoAuraFut from "@/assets/logo-aura-fut.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50"
      style={{
        background: "linear-gradient(180deg, hsl(0 0% 96%) 0%, hsl(220 15% 92%) 100%)"
      }}
    >
      <div className="py-10 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <img src={logoAuraFut} alt="Aura Fut Brasil" className="h-12 w-auto mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Camisas de futebol com qualidade premium. Entrega rápida para todo o Brasil via SEDEX. Frete grátis acima de 3 itens.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-widest mb-3 text-foreground">NAVEGAÇÃO</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/politica-de-privacidade" className="hover:text-primary transition-colors">Privacidade</Link></li>
              <li><Link to="/termos-de-uso" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
              <li><Link to="/prazo-de-entrega" className="hover:text-primary transition-colors">Entrega</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm tracking-widest mb-3 text-foreground">CONTATO</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>contato@aurafut.com</li>
              <li>Brasil</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl mt-8 pt-6 border-t border-border/50">
          <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2025 AURA FUT — Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
