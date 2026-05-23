import Icon from "@/components/ui/icon";

interface PriceItem {
  id: number;
  name: string;
  unit: string;
  price: string;
}

interface PriceCategory {
  id: number;
  name: string;
  items: PriceItem[];
}

interface PriceSectionProps {
  priceData: PriceCategory[];
  scrollTo: (href: string) => void;
}

const PriceSection = ({ priceData, scrollTo }: PriceSectionProps) => {
  return (
    <section id="price" className="py-24 bg-[#f5f3ef]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="section-line" />
          <span className="font-roboto text-[#2d6e2d] uppercase text-sm tracking-widest">
            Актуальные цены
          </span>
        </div>
        <h2 className="font-oswald text-4xl md:text-5xl font-bold text-[#0d0d0d] uppercase mb-3">
          Прайс-лист
        </h2>
        <p className="font-roboto text-gray-500 mb-10">
          Цены указаны за единицу товара.
        </p>

        <div className="space-y-8">
          {priceData.map((cat) => (
            <div
              key={cat.id}
              className="border-2 border-[#0d0d0d] overflow-hidden"
            >
              <div className="bg-[#0d0d0d] px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 bg-[#4a9e4a]" />
                <span className="font-oswald text-white text-lg uppercase tracking-wider">
                  {cat.name}
                </span>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#0d0d0d] bg-[#1a3d1a]">
                    <th className="font-oswald text-left px-6 py-3 text-white text-sm uppercase tracking-wider">
                      Наименование
                    </th>
                    <th className="font-oswald text-center px-4 py-3 text-white text-sm uppercase tracking-wider">
                      Ед.
                    </th>
                    <th className="font-oswald text-right px-6 py-3 text-[#4a9e4a] text-sm uppercase tracking-wider">
                      Цена, ₽
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map((item, i) => (
                    <tr
                      key={item.id}
                      className={`border-b border-[#0d0d0d]/20 hover:bg-[#e8f0e8] transition-colors ${i % 2 === 0 ? "bg-white" : "bg-[#f5f3ef]"}`}
                    >
                      <td className="font-roboto px-6 py-4 text-[#0d0d0d] text-sm">
                        {item.name}
                      </td>
                      <td className="font-roboto px-4 py-4 text-gray-500 text-sm text-center">
                        {item.unit}
                      </td>
                      <td className="font-oswald px-6 py-4 text-right text-[#1a3d1a] font-bold text-base">
                        {item.price} ₽
                      </td>
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
            <span className="font-roboto text-sm">
              Цены действительны до конца месяца. Уточняйте наличие при заказе.
            </span>
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
  );
};

export default PriceSection;
