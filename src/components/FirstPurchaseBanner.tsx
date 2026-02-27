import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";

const FirstPurchaseBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const purchased = localStorage.getItem("aura_purchased");
    const dismissed = sessionStorage.getItem("aura_banner_dismissed");
    if (!purchased && !dismissed) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("aura_banner_dismissed", "1");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={handleClose}>
      <div
        className="relative bg-card border border-primary/30 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <Gift className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">10% OFF</h2>
        <p className="text-muted-foreground text-sm mb-1">na sua primeira compra!</p>
        <p className="text-xs text-muted-foreground mb-6">Desconto aplicado automaticamente no carrinho 🎉</p>
        <button
          onClick={handleClose}
          className="w-full py-3 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-base tracking-wider rounded-lg transition-colors"
        >
          APROVEITAR AGORA
        </button>
      </div>
    </div>
  );
};

export default FirstPurchaseBanner;
