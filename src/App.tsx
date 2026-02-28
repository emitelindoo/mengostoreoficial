import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CartProvider } from "@/context/CartContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import WhatsAppButton from "./components/WhatsAppButton";

const ProductPage = lazy(() => import("./pages/ProductPage"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const Contact = lazy(() => import("./pages/Contact"));
const DeliveryInfo = lazy(() => import("./pages/DeliveryInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/produto/:id" element={<ProductPage />} />
              <Route path="/categoria/:slug" element={<CategoryPage />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/termos-de-uso" element={<TermsOfUse />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/prazo-de-entrega" element={<DeliveryInfo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
