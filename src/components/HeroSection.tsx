import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/15824cac-ee6d-4ea7-a6e7-df15a6b79380/files/39487ced-4825-4429-9ab8-82457e933d30.jpg";

const features = [
  {
    icon: "Truck",
    title: "Быстрая доставка",
    desc: "Доставим на объект в течение 1–2 дней по городу Красноармейск и области",
  },
  {
    icon: "Package",
    title: "Оптом и в розницу",
    desc: "Работаем с физлицами, строителями и крупными подрядчиками",
  },
  {
    icon: "ShieldCheck",
    title: "Сертифицированная продукция",
    desc: "Вся продукция соответствует ГОСТ и имеет сертификаты качества",
  },
  {
    icon: "Banknote",
    title: "Честные цены",
    desc: "Прямые поставки без посредников — цена ниже рынка",
  },
];

interface HeroSectionProps {
  scrollTo: (href: string) => void;
}

const HeroSection = ({ scrollTo }: HeroSectionProps) => {
  return (
    <>
      {/* HERO */}
      <section
        id="hero"
        className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center animate-fade-in"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/90 via-[#0d0d0d]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <div className="section-line" />
              <span className="font-roboto text-[#4a9e4a] uppercase text-sm tracking-widest">
                Оптом и в розницу
              </span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up-delay uppercase">
              OSB плиты
              <br />
              <span className="text-[#4a9e4a]">&amp;</span> Фанера
            </h1>
            <p className="font-roboto text-gray-300 text-lg md:text-xl mb-10 leading-relaxed animate-fade-up-delay2">
              Прямые поставки. Сертифицированная продукция.
              <br />
              Доставка по городу и области за 1–2 дня.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up-delay2">
              <button
                onClick={() => scrollTo("#price")}
                className="bg-[#2d6e2d] text-white font-oswald px-8 py-4 uppercase tracking-wider text-base hover:bg-[#4a9e4a] transition-all border border-[#4a9e4a]"
              >
                Смотреть цены
              </button>
              <button
                onClick={() => scrollTo("#contacts")}
                className="border-2 border-white text-white font-oswald px-8 py-4 uppercase tracking-wider text-base hover:border-[#4a9e4a] hover:text-[#4a9e4a] transition-all"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#0d0d0d]/80 backdrop-blur-sm border-t border-[#2d6e2d]">
          <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-3 divide-x divide-[#2d6e2d]">
            {[
              { value: "20+", label: "лет на рынке" },
              { value: "1000+", label: "клиентов" },
              { value: "1-2 день", label: "срок доставки" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="font-oswald text-2xl font-bold text-[#4a9e4a]">
                  {s.value}
                </div>
                <div className="font-roboto text-gray-400 text-xs uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-24 bg-white border-b-2 border-[#0d0d0d]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-line" />
                <span className="font-roboto text-[#2d6e2d] uppercase text-sm tracking-widest">
                  О компании
                </span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0d0d0d] uppercase mb-6">
                Надёжный
                <br />
                поставщик
                <br />
                стройматериалов
              </h2>
              <p className="font-roboto text-gray-600 text-base leading-relaxed mb-4">
                Более 20 лет мы занимаемся поставками OSB плит и фанеры для
                частных застройщиков, строительных компаний и производственных
                предприятий.
              </p>
              <p className="font-roboto text-gray-600 text-base leading-relaxed mb-8">
                Работаем напрямую с производителями — это позволяет держать цены
                ниже рыночных и гарантировать качество каждой партии товара.
              </p>
              <button
                onClick={() => scrollTo("#contacts")}
                className="inline-flex items-center gap-2 bg-[#0d0d0d] text-white font-oswald px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#2d6e2d] transition-colors"
              >
                Связаться с нами
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="border-2 border-[#0d0d0d] p-5 hover:border-[#2d6e2d] hover:bg-[#f5f3ef] transition-all group"
                >
                  <div className="w-10 h-10 bg-[#2d6e2d] flex items-center justify-center mb-3 group-hover:bg-[#0d0d0d] transition-colors">
                    <Icon
                      name={f.icon}
                      fallback="Package"
                      size={18}
                      className="text-white"
                    />
                  </div>
                  <h3 className="font-oswald text-sm font-semibold uppercase tracking-wide text-[#0d0d0d] mb-1">
                    {f.title}
                  </h3>
                  <p className="font-roboto text-xs text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
