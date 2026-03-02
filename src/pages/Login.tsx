import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Loader2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/minha-conta";
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = "w-full px-4 py-3.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(error.message === "User already registered" ? "Este email já possui conta. Faça login." : error.message);
      } else {
        toast.success("Conta criada com sucesso!");
        navigate(redirectTo);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Email ou senha incorretos.");
      } else {
        toast.success("Login realizado!");
        navigate(redirectTo);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold">{isSignUp ? "Criar Conta" : "Entrar"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? "Crie sua conta para acompanhar seus pedidos" : "Acesse sua conta para ver seus pedidos"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Senha</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Aguarde...</> : isSignUp ? "Criar Conta" : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isSignUp ? "Já tem conta?" : "Não tem conta?"}{" "}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline font-semibold">
              {isSignUp ? "Fazer login" : "Criar conta"}
            </button>
          </p>

          <div className="text-center mt-6">
            <Link to="/rastrear" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Ou rastreie sem conta usando seu email →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
