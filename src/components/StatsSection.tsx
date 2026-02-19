const stats = [
  { value: "10K+", label: "Clientes Satisfeitos" },
  { value: "4.9", label: "Avaliação Média" },
  { value: "24h", label: "Entrega Expressa" },
  { value: "100%", label: "Produtos Oficiais" },
];

const StatsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
