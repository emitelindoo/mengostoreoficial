import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Contato</h1>

        <p className="text-muted-foreground mb-10">
          Tem alguma dúvida, sugestão ou precisa de ajuda com seu pedido? Entre em contato conosco pelos canais abaixo. Responderemos o mais rápido possível!
        </p>

        <div className="grid gap-6">
          <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
            <Mail className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">E-mail</h2>
              <a href="mailto:contato@mengostore.com" className="text-primary hover:underline">
                contato@mengostore.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
            <Clock className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">Horário de Atendimento</h2>
              <p className="text-muted-foreground">Segunda a sexta, das 9h às 18h (horário de Brasília)</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card">
            <MapPin className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-foreground mb-1">Endereço</h2>
              <p className="text-muted-foreground">Rio de Janeiro - RJ, Brasil</p>
            </div>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-lg border border-border bg-secondary/30">
          <h2 className="font-semibold text-foreground mb-2">Prazo de Resposta</h2>
          <p className="text-muted-foreground text-sm">
            Respondemos todas as mensagens em até <strong>24 horas úteis</strong>. Para trocas e devoluções, informe o número do seu pedido no e-mail para agilizar o atendimento.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
