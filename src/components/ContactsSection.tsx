import React from "react";
import Icon from "@/components/ui/icon";

const SEND_ORDER_URL =
  "https://functions.poehali.dev/d7c390f9-e07c-4535-bc59-e6c76ddddc5e";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Прайс", href: "#price" },
  { label: "Контакты", href: "#contacts" },
];

interface ContactsSectionProps {
  scrollTo: (href: string) => void;
}

const ContactsSection = ({ scrollTo }: ContactsSectionProps) => {
  const [form, setForm] = React.useState({
    name: "",
    phone: "",
    product: "",
    quantity: "",
    comment: "",
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  return (
    <>
      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-line" />
                <span className="font-roboto text-[#4a9e4a] uppercase text-sm tracking-widest">
                  Контакты
                </span>
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white uppercase mb-8">
                Оставьте
                <br />
                заявку
              </h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "Phone",
                    label: "Телефон",
                    val: "+7 (936) 555-95-44",
                  },
                  { icon: "Mail", label: "Email", val: "lesplita@mail.ru" },
                  { icon: "MapPin", label: "Адрес", val: "с. Царёво, вл. 2" },
                  {
                    icon: "Clock",
                    label: "Режим работы",
                    val: "Пн–Пт: 9:00–17:00, Сб: 9:00–15:00",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[#2d6e2d] flex items-center justify-center shrink-0 group-hover:bg-[#4a9e4a] transition-colors">
                      <Icon
                        name={c.icon}
                        fallback="Phone"
                        size={16}
                        className="text-white"
                      />
                    </div>
                    <div>
                      <div className="font-roboto text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                        {c.label}
                      </div>
                      <div className="font-roboto text-white text-sm">
                        {c.val}
                      </div>
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
                  <h3 className="font-oswald text-2xl text-white uppercase">
                    Заявка принята!
                  </h3>
                  <p className="font-roboto text-gray-400 text-sm">
                    Мы свяжемся с вами в течение 30 минут в рабочее время.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 border border-[#2d6e2d] text-[#4a9e4a] font-oswald px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#2d6e2d] hover:text-white transition-all"
                  >
                    Новая заявка
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-oswald text-2xl text-white uppercase mb-6 tracking-wider">
                    Форма заказа
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">
                          Ваше имя *
                        </label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Иван Иванов"
                          className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">
                          Телефон *
                        </label>
                        <input
                          required
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="+7 (___) ___-__-__"
                          className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        Продукция
                      </label>
                      <select
                        value={form.product}
                        onChange={(e) =>
                          setForm({ ...form, product: e.target.value })
                        }
                        className="w-full bg-[#0d0d0d] border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] transition-colors"
                      >
                        <option value="">Выберите продукцию</option>
                        <option>OSB-3</option>
                        <option>Фанера ФК</option>
                        <option>Фанера ФК шлифованная</option>
                        <option>Фанера ФСФ</option>
                        <option>Фанера ФСФ шлифованная</option>
                        <option>ДСП</option>
                        <option>ДВП оргалит</option>
                        <option>Фанера ламинированная</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        Количество (листов)
                      </label>
                      <input
                        value={form.quantity}
                        onChange={(e) =>
                          setForm({ ...form, quantity: e.target.value })
                        }
                        placeholder="Например: 100"
                        className="w-full bg-transparent border-2 border-[#2d6e2d] text-white font-roboto text-sm px-3 py-2.5 focus:outline-none focus:border-[#4a9e4a] placeholder-gray-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-roboto text-xs text-gray-400 uppercase tracking-wider block mb-1">
                        Комментарий
                      </label>
                      <textarea
                        value={form.comment}
                        onChange={(e) =>
                          setForm({ ...form, comment: e.target.value })
                        }
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
                      Нажимая кнопку, вы соглашаетесь с обработкой персональных
                      данных
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
          <span className="font-oswald text-white text-lg font-bold tracking-widest uppercase">
            СКЛАД1565
          </span>
          <span className="font-roboto text-gray-600 text-xs">
            © 2024 СКЛАД1565. Все права защищены.
          </span>
          <div className="flex gap-6">
            {navLinks.map((l) => (
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
    </>
  );
};

export default ContactsSection;