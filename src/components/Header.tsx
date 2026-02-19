import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import logoFlamengo from "@/assets/logo-flamengo.png";

const Header = () => {
  const { itemCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoFlamengo} alt="Flamengo" className="w-8 h-8 object-contain" />
          <span className="font-display text-xl font-bold tracking-wider text-primary">
            SHOP MENGÃO
          </span>
        </Link>
        <Link to="/carrinho" className="relative p-2 text-foreground hover:text-primary transition-colors">
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
