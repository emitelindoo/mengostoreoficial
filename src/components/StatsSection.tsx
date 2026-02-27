const stats = [
  { value: "10K+", label: "Clientes" },
  { value: "4.9", label: "Avaliação" },
  { value: "7 dias", label: "Entrega" },
  { value: "100%", label: "Qualidade" },
];

const StatsSection = () => {
  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-display tracking-wider text-primary mb-0.5">
                {stat.value}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
