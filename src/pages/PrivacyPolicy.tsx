import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">Política de Privacidade</h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p><strong>Última atualização:</strong> 24 de fevereiro de 2026</p>

          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Informações Coletadas</h2>
            <p>Coletamos informações pessoais que você nos fornece diretamente ao realizar uma compra, incluindo: nome completo, CPF, e-mail, telefone, endereço de entrega e dados de pagamento (processados de forma segura via PIX).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Uso das Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Processar e entregar seus pedidos</li>
              <li>Enviar atualizações sobre o status do pedido</li>
              <li>Oferecer suporte ao cliente</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. Compartilhamento de Dados</h2>
            <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para processar pagamentos, realizar entregas ou cumprir exigências legais.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Segurança</h2>
            <p>Adotamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Cookies e Rastreamento</h2>
            <p>Utilizamos cookies e tecnologias semelhantes (como o Meta Pixel) para melhorar a experiência de navegação, analisar o tráfego do site e personalizar anúncios. Você pode desativar cookies nas configurações do seu navegador.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Seus Direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Revogar consentimento a qualquer momento</li>
            </ul>
            <p>Para exercer seus direitos, entre em contato pelo e-mail: <strong>loja@flamengo.com.br</strong></p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Alterações nesta Política</h2>
            <p>Reservamo-nos o direito de atualizar esta política a qualquer momento. Recomendamos que você revise esta página periodicamente.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
