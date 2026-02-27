import tabelaMedidas from "@/assets/tabela-medidas.png";

const SizeChartBanner = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-display tracking-wider leading-none">
              TABELA DE MEDIDAS
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
              Encontre seu tamanho ideal
            </p>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-border/50">
          <img
            src={tabelaMedidas}
            alt="Tabela de Medidas"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default SizeChartBanner;
