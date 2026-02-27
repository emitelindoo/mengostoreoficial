import { ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider text-gradient-aura leading-none">
            AURA FUT
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#produtos" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium">
            Produtos
          </a>
          <Link to="/prazo-de-entrega" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium">
            Entrega
          </Link>
          <Link to="/contato" className="text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider font-medium">
            Contato
          </Link>
        </nav>

        <Link to="/carrinho" className="relative p-2 text-foreground hover:text-primary transition-colors">
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold min-w-[18px] h-[18px]">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
