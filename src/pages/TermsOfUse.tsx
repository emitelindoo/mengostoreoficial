import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Termos de Uso</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Última atualização:</strong> 24 de fevereiro de 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site Mengão Store, você concorda com estes Termos de Uso. Se não concordar com algum dos termos, não utilize o site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Produtos</h2>
            <p>Todos os produtos vendidos são oficiais e de qualidade garantida. As imagens dos produtos são ilustrativas e podem apresentar variações de cor devido às configurações do seu monitor.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Preços e Pagamento</h2>
            <p>Os preços são em Reais (R$) e podem ser alterados sem aviso prévio. O pagamento é realizado via PIX, com confirmação instantânea.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Prazo de Entrega</h2>
            <p>Os produtos são enviados via <strong>SEDEX</strong> com frete grátis para todo o Brasil. O prazo estimado de entrega é de:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Sudeste:</strong> 3 a 5 dias úteis</li>
              <li><strong>Sul e Centro-Oeste:</strong> 5 a 7 dias úteis</li>
              <li><strong>Norte e Nordeste:</strong> 7 a 10 dias úteis</li>
            </ul>
            <p>O prazo começa a contar após a confirmação do pagamento. O código de rastreamento será enviado por e-mail.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Política de Troca e Devolução</h2>
            <p>Você tem até <strong>30 dias</strong> após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor. O produto deve estar em sua embalagem original e sem sinais de uso. Para solicitar, entre em contato pelo e-mail: <strong>loja@flamengo.com.br</strong></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Propriedade Intelectual</h2>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logotipos e design, é de propriedade da Mengão Store e protegido pelas leis de propriedade intelectual. É proibida a reprodução sem autorização.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Limitação de Responsabilidade</h2>
            <p>Não nos responsabilizamos por danos indiretos, incidentais ou consequentes decorrentes do uso do site ou da impossibilidade de usá-lo.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Foro</h2>
            <p>Fica eleito o foro da comarca do Rio de Janeiro/RJ para dirimir quaisquer questões relativas a estes Termos de Uso.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
