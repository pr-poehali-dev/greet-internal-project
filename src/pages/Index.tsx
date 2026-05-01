import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/15824cac-ee6d-4ea7-a6e7-df15a6b79380/files/39487ced-4825-4429-9ab8-82457e933d30.jpg";
const SEND_ORDER_URL = "https://functions.poehali.dev/d7c390f9-e07c-4535-bc59-e6c76ddddc5e";

const priceData = [
  {
    category: "OSB плиты",
    items: [
      { name: "OSB-3, 9 мм (2440×1220)", unit: "лист", price: "790" },
      { name: "OSB-3, 12 мм (2440×1220)", unit: "лист", price: "980" },
      { name: "OSB-3, 15 мм (2440×1220)", unit: "лист", price: "1 190" },
      { name: "OSB-3, 18 мм (2440×1220)", unit: "лист", price: "1 420" },
    ],
  },
  {
    category: "Фанера",
    items: [
      { name: "Фанера ФК, 6 мм (1525×1525)", unit: "лист", price: "680" },
      { name: "Фанера ФК, 10 мм (1525×1525)", unit: "лист", price: "1 050" },
      { name: "Фанера ФСФ, 12 мм (1220×2440)", unit: "лист", price: "1 280" },
      { name: "Фанера ФСФ, 18 мм (1525×1525)", unit: "лист", price: "1 750" },
      { name: "Фанера ламинированная, 18 мм", unit: "лист", price: "2 100" },
    ],
  },
];

const features = [
  { icon: "Truck", title: "Быстрая доставка", desc: "Доставим на объект в течение 1–2 дней по городу и области" },
  { icon: "Package", title: "Оптом и в розницу", desc: "Работаем с физлицами, строителями и крупными подрядчиками" },
  { icon: "ShieldCheck", title: "Сертифицированная продукция", desc: "Вся продукция соответствует ГОСТ и имеет сертификаты качества" },
  { icon: "Banknote", title: "Честные цены", desc: "Прямые поставки без посредников — цена ниже рынка" },
];

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Прайс", href: "#price" },
  { label: "Контакты", href: "#contacts" },
];

const Index = () => {
  const [form, setForm] = useState({ name: "", phone: "", product: "", quantity: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef]">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] border-b-2 border-[#2d6e2d]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span className="font-oswald text-white text-xl font-bold tracking-widest uppercase">
            ЛесПлита
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-roboto text-sm text-gray-300 hover:text-[#4a9e4a] transition-colors uppercase tracking-wider"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-[#2d6e2d] text-white font-oswald px-5 py-2 text-sm uppercase tracking-wider hover:bg-[#4a9e4a] transition-colors border border-[#4a9e4a]"
            >
              Заказать
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-[#2d6e2d] px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left font-roboto text-gray-300 hover:text-[#4a9e4a] uppercase tracking-wider text-sm"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
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
              <span className="font-roboto text-[#4a9e4a] uppercase text-sm tracking-widest">Оптом и в розницу</span>
            </div>
            <h1 className="font-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up-delay uppercase">
              OSB плиты<br />
              <span className="text-[#4a9e4a]">&amp;</span> Фанера
            </h1>
            <p className="font-roboto text-gray-300 text-lg md:text-xl mb-10 leading-relaxed animate-fade-up-delay2">
              Прямые поставки. Сертифицированная продукция.<br />
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
              { value: "10+", label: "лет на рынке" },
              { value: "500+", label: "клиентов" },
              { value: "1 день", label: "срок доставки" },
            ].map((s) => (
              <div key={s.label} className="text-center px-4">
                <div className="font-oswald text-2xl font-bold text-[#4a9e4a]">{s.value}</div>
                <div className="font-roboto text-gray-400 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white border-b-2 border-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-line" />
                <span className="font-roboto text-[#2d6e2d] uppercase text-sm tracking-widest">О компании</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0d0d0d] uppercase mb-6">
                Надёжный<br />поставщик<br />стройматериалов
              </h2>
              <p className="font-roboto text-gray-600 text-base leading-relaxed mb-4">
                Более 10 лет мы занимаемся поставками OSB плит и фанеры для частных застройщиков, строительных компаний и производственных предприятий.
              </p>
              <p className="font-roboto text-gray-600 text-base leading-relaxed mb-8">
                Работаем напрямую с производителями — это позволяет держать цены ниже рыночных и гарантировать качество каждой партии товара.
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
                <div key={f.title} className="border-2 border-[#0d0d0d] p-5 hover:border-[#2d6e2d] hover:bg-[#f5f3ef] transition-all group">
                  <div className="w-10 h-10 bg-[#2d6e2d] flex items-center justify-center mb-3 group-hover:bg-[#0d0d0d] transition-colors">
                    <Icon name={f.icon} fallback="Package" size={18} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-sm font-semibold uppercase tracking-wide text-[#0d0d0d] mb-1">{f.title}</h3>
                  <p className="font-roboto text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 bg-[#f5f3ef]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="section-line" />
            <span className="font-roboto text-[#2d6e2d] uppercase text-sm tracking-widest">Актуальные цены</span>
          </div>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0d0d0d] uppercase mb-3">
            Прайс-лист
          </h2>
          <p className="font-roboto text-gray-500 mb-10">Цены указаны за единицу товара. При заказе от 50 листов — скидка 7%.</p>

          <div className="space-y-8">
            {priceData.map((cat) => (
              <div key={cat.category} className="border-2 border-[#0d0d0d] overflow-hidden">
                <div className="bg-[#0d0d0d] px-6 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#4a9e4a]" />
                  <span className="font-oswald text-white text-lg uppercase tracking-wider">{cat.category}</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-[#0d0d0d] bg-[#1a3d1a]">
                      <th className="font-oswald text-left px-6 py-3 text-white text-sm uppercase tracking-wider">Наименование</th>
                      <th className="font-oswald text-center px-4 py-3 text-white text-sm uppercase tracking-wider">Ед.</th>
                      <th className="font-oswald text-right px-6 py-3 text-[#4a9e4a] text-sm uppercase tracking-wider">Цена, ₽</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((item, i) => (
                      <tr
                        key={item.name}
                        className={`border-b border-[#0d0d0d]/20 hover:bg-[#e8f0e8] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#f5f3ef]"}`}
                      >
                        <td className="font-roboto px-6 py-4 text-[#0d0d0d] text-sm">{item.name}</td>
                        <td className="font-roboto px-4 py-4 text-gray-500 text-sm text-center">{item.unit}</td>
                        <td className="font-oswald px-6 py-4 text-right text-[#1a3d1a] font-bold text-base">{item.price} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#1a3d1a] border-2 border-[#0d0d0d] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-white">
              <Icon name="Info" size={18} className="text-[#4a9e4a] shrink-0" />
              <span className="font-roboto text-sm">Цены действительны до конца месяца. Уточняйте наличие при заказе.</span>
            </div>
            <button
              onClick={() => scrollTo("#contacts")}
              className="bg-[#4a9e4a] text-white font-oswald px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#2d6e2d] transition-colors whitespace-nowrap border border-white"
            >
              Запросить оптовую цену
            </button>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-line" />
                <span className="font-roboto text-[#4a9e4a] uppercase text-sm tracking-widest">Контакты</span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase mb-8">
                Оставьте<br />заявку
              </h2>
              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", val: "+7 (900) 000-00-00" },
                  { icon: "Mail", label: "Email", val: "info@lesplita.ru" },
                  { icon: "MapPin", label: "Адрес", val: "г. Москва, ул. Складская, 1" },
                  { icon: "Clock", label: "Режим работы", val: "Пн–Пт: 8:00–18:00, Сб: 9:00–15:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[#2d6e2d] flex items-center justify-center shrink-0 group-hover:bg-[#4a9e4a] transition-colors">
                      <Icon name={c.icon} fallback="Phone" size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="font-roboto text-gray-500 text-xs uppercase tracking-wider mb-0.5">{c.label}</div>
                      <div className="font-roboto text-white text-sm">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-[#2d6e2d] p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                  <div className="w-16 h-16 bg-[#2d6e2d] flex items-center justify-center">
                    <Icon name="Check" size={32} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-2xl text-white uppercase">Заявка принята!</h3>
                  <p className="font-roboto text-gray-400 text-sm">Мы свяжемся с вами в течение 30 минут в рабочее время.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 border border-[#2d6e2d] text-[#4a9e4a] font-oswald px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#2d6e2d] hover:text-white transition-all"
                  >
                    Новая заявка
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-oswald text-2xl text-white uppercase mb-6 tracking-wider">Форма заказа</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">Ваше имя *</label>
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Иван Иванов"
                          className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">Телефон *</label>
                        <input
                          required
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">Продукция</label>
                      <select
                        value={form.product}
                        onChange={e => setForm({ ...form, product: e.target.value })}
                        className="w-full bg-[#0d0d0d] border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] transition-colors"
                      >
                        <option value="">Выберите продукцию</option>
                        <option>OSB-3, 9 мм</option>
                        <option>OSB-3, 12 мм</option>
                        <option>OSB-3, 15 мм</option>
                        <option>OSB-3, 18 мм</option>
                        <option>Фанера ФК, 6 мм</option>
                        <option>Фанера ФК, 10 мм</option>
                        <option>Фанера ФСФ, 12 мм</option>
                        <option>Фанера ФСФ, 18 мм</option>
                        <option>Фанера ламинированная, 18 мм</option>
                        <option>Нужен подбор</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">Количество (листов)</label>
                      <input
                        value={form.quantity}
                        onChange={e => setForm({ ...form, quantity: e.target.value })}
                        placeholder="Например: 100"
                        className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">Комментарий</label>
                      <textarea
                        value={form.comment}
                        onChange={e => setForm({ ...form, comment: e.target.value })}
                        placeholder="Размеры, адрес доставки, удобное время..."
                        rows={3}
                        className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#2d6e2d] text-white font-oswald py-4 uppercase tracking-widest text-base hover:bg-[#4a9e4a] transition-colors border border-[#4a9e4a] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Отправляем..." : "Отправить заявку"}
                    </button>
                    <p className="font-roboto text-gray-600 text-xs text-center">
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t-2 border-[#2d6e2d] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-oswald text-white text-lg font-bold tracking-widest uppercase">ЛесПлита</span>
          <span className="font-roboto text-gray-600 text-xs">© 2024 ЛесПлита. Все права защищены.</span>
          <div className="flex gap-6">
            {navLinks.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-roboto text-gray-500 hover:text-[#4a9e4a] text-xs uppercase tracking-wider transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;