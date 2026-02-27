import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const categories = [
  { label: "Lançamentos 2026", to: "/categoria/lancamentos-2026" },
  { label: "Brasileirão", to: "/categoria/brasileirao" },
  { label: "Seleções", to: "/categoria/selecoes" },
  { label: "Champions", to: "/categoria/champions" },
  { label: "Todos os Produtos", to: "/categoria/todos" },
];

const Header = () => {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-gradient-aura leading-none">
            AURA FUT
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {categories.map((cat) => (
            <Link
              key={cat.to}
              to={cat.to}
              className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium"
            >
              {cat.label}
            </Link>
          ))}
          <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium">
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/carrinho" className="relative p-2 text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold min-w-[18px] h-[18px]">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.to}
                to={cat.to}
                onClick={() => setMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium text-sm py-1"
              >
                {cat.label}
              </Link>
            ))}
            <Link
              to="/contato"
              onClick={() => setMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium text-sm py-1"
            >
              Contato
            </Link>
            <Link
              to="/prazo-de-entrega"
              onClick={() => setMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium text-sm py-1"
            >
              Entrega
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
