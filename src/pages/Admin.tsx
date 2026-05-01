import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PRICE_URL = "https://functions.poehali.dev/29d70dcb-46e1-4a15-b050-9a8523af6c85";

interface PriceItem {
  id: number;
  name: string;
  unit: string;
  price: string;
  sort_order: number;
}

interface PriceCategory {
  id: number;
  name: string;
  sort_order: number;
  items: PriceItem[];
}

const api = (action: string, token: string, body?: object) =>
  fetch(PRICE_URL, {
    method: action === "get" ? "GET" : "POST",
    headers: { "Content-Type": "application/json", "X-Admin-Token": token },
    body: action !== "get" ? JSON.stringify({ action, ...body }) : undefined,
  }).then((r) => r.json());

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || "");
  const [tokenInput, setTokenInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [categories, setCategories] = useState<PriceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState<PriceItem | null>(null);
  const [editCat, setEditCat] = useState<PriceCategory | null>(null);
  const [newItemCatId, setNewItemCatId] = useState<number | null>(null);
  const [newCatName, setNewCatName] = useState("");
  const [newItem, setNewItem] = useState({ name: "", unit: "лист", price: "" });
  const [saving, setSaving] = useState(false);

  const loadPrice = async (t: string) => {
    setLoading(true);
    const data = await api("get", t);
    setLoading(false);
    if (data.categories) {
      setCategories(data.categories);
      setAuthed(true);
      localStorage.setItem("admin_token", t);
    }
  };

  useEffect(() => {
    if (token) loadPrice(token);
  }, []);

  const login = async () => {
    await loadPrice(tokenInput);
    setToken(tokenInput);
  };

  const saveItem = async () => {
    if (!editItem) return;
    setSaving(true);
    await api("update_item", token, { id: editItem.id, name: editItem.name, unit: editItem.unit, price: editItem.price });
    setEditItem(null);
    await loadPrice(token);
    setSaving(false);
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Удалить позицию?")) return;
    setSaving(true);
    await api("delete_item", token, { id });
    await loadPrice(token);
    setSaving(false);
  };

  const addItem = async (catId: number) => {
    if (!newItem.name || !newItem.price) return;
    setSaving(true);
    await api("add_item", token, { category_id: catId, ...newItem });
    setNewItemCatId(null);
    setNewItem({ name: "", unit: "лист", price: "" });
    await loadPrice(token);
    setSaving(false);
  };

  const saveCat = async () => {
    if (!editCat) return;
    setSaving(true);
    await api("update_category", token, { id: editCat.id, name: editCat.name });
    setEditCat(null);
    await loadPrice(token);
    setSaving(false);
  };

  const addCategory = async () => {
    if (!newCatName) return;
    setSaving(true);
    await api("add_category", token, { name: newCatName });
    setNewCatName("");
    await loadPrice(token);
    setSaving(false);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-4">
        <div className="bg-white border-2 border-[#0d0d0d] p-8 w-full max-w-sm">
          <div className="bg-[#1a3d1a] px-4 py-3 mb-6 -mx-8 -mt-8">
            <h1 className="font-oswald text-white text-lg font-bold tracking-widest uppercase text-center">
              АДМИН-ПАНЕЛЬ
            </h1>
          </div>
          <p className="text-[#444] text-sm mb-4 font-roboto">Введите пароль для входа:</p>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Пароль"
            className="w-full border-2 border-[#ccc] px-3 py-2 text-sm font-roboto mb-4 focus:outline-none focus:border-[#2d6e2d]"
          />
          <button
            onClick={login}
            className="w-full bg-[#2d6e2d] text-white font-oswald py-3 uppercase tracking-widest text-sm hover:bg-[#4a9e4a] transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <nav className="bg-[#0d0d0d] border-b-2 border-[#2d6e2d] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/" className="text-[#aaa] hover:text-white transition-colors">
            <Icon name="ArrowLeft" size={18} />
          </a>
          <span className="font-oswald text-white text-lg font-bold tracking-widest uppercase">
            Управление прайсом
          </span>
        </div>
        <button onClick={logout} className="text-[#aaa] hover:text-white transition-colors text-sm font-roboto flex items-center gap-1">
          <Icon name="LogOut" size={16} />
          Выйти
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {loading && <p className="text-center text-[#666] font-roboto">Загрузка...</p>}

        {categories.map((cat) => (
          <div key={cat.id} className="mb-8 bg-white border-2 border-[#0d0d0d]">
            <div className="bg-[#1a3d1a] px-4 py-3 flex items-center justify-between">
              {editCat?.id === cat.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    value={editCat.name}
                    onChange={(e) => setEditCat({ ...editCat, name: e.target.value })}
                    className="flex-1 bg-transparent border-b border-white text-white font-oswald text-base outline-none"
                  />
                  <button onClick={saveCat} disabled={saving} className="text-green-300 hover:text-white transition-colors">
                    <Icon name="Check" size={18} />
                  </button>
                  <button onClick={() => setEditCat(null)} className="text-[#aaa] hover:text-white transition-colors">
                    <Icon name="X" size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-oswald text-white text-base font-bold tracking-widest uppercase">{cat.name}</h2>
                  <button onClick={() => setEditCat(cat)} className="text-[#aaa] hover:text-white transition-colors">
                    <Icon name="Pencil" size={16} />
                  </button>
                </>
              )}
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e0e0e0] bg-[#f5f3ef]">
                  <th className="text-left px-4 py-2 text-xs uppercase tracking-widest text-[#666] font-roboto">Наименование</th>
                  <th className="text-left px-4 py-2 text-xs uppercase tracking-widest text-[#666] font-roboto w-20">Ед.</th>
                  <th className="text-left px-4 py-2 text-xs uppercase tracking-widest text-[#666] font-roboto w-28">Цена, ₽</th>
                  <th className="w-20"></th>
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item) => (
                  <tr key={item.id} className="border-b border-[#f0f0f0]">
                    {editItem?.id === item.id ? (
                      <>
                        <td className="px-4 py-2">
                          <input
                            value={editItem.name}
                            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                            className="w-full border border-[#ccc] px-2 py-1 text-sm font-roboto focus:outline-none focus:border-[#2d6e2d]"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={editItem.unit}
                            onChange={(e) => setEditItem({ ...editItem, unit: e.target.value })}
                            className="w-full border border-[#ccc] px-2 py-1 text-sm font-roboto focus:outline-none focus:border-[#2d6e2d]"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            value={editItem.price}
                            onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                            className="w-full border border-[#ccc] px-2 py-1 text-sm font-roboto focus:outline-none focus:border-[#2d6e2d]"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button onClick={saveItem} disabled={saving} className="text-green-600 hover:text-green-800">
                              <Icon name="Check" size={16} />
                            </button>
                            <button onClick={() => setEditItem(null)} className="text-[#aaa] hover:text-[#333]">
                              <Icon name="X" size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2 text-sm font-roboto text-[#0d0d0d]">{item.name}</td>
                        <td className="px-4 py-2 text-sm font-roboto text-[#666]">{item.unit}</td>
                        <td className="px-4 py-2 text-sm font-roboto font-bold text-[#2d6e2d]">{item.price} ₽</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button onClick={() => setEditItem(item)} className="text-[#999] hover:text-[#333] transition-colors">
                              <Icon name="Pencil" size={15} />
                            </button>
                            <button onClick={() => deleteItem(item.id)} className="text-[#999] hover:text-red-600 transition-colors">
                              <Icon name="Trash2" size={15} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}

                {newItemCatId === cat.id ? (
                  <tr className="border-b border-[#f0f0f0] bg-[#f9fff9]">
                    <td className="px-4 py-2">
                      <input
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        placeholder="Название позиции"
                        className="w-full border border-[#2d6e2d] px-2 py-1 text-sm font-roboto focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={newItem.unit}
                        onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                        placeholder="лист"
                        className="w-full border border-[#2d6e2d] px-2 py-1 text-sm font-roboto focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        placeholder="0"
                        className="w-full border border-[#2d6e2d] px-2 py-1 text-sm font-roboto focus:outline-none"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <button onClick={() => addItem(cat.id)} disabled={saving} className="text-green-600 hover:text-green-800">
                          <Icon name="Check" size={16} />
                        </button>
                        <button onClick={() => setNewItemCatId(null)} className="text-[#aaa] hover:text-[#333]">
                          <Icon name="X" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-2">
                      <button
                        onClick={() => { setNewItemCatId(cat.id); setNewItem({ name: "", unit: "лист", price: "" }); }}
                        className="text-[#2d6e2d] hover:text-[#4a9e4a] text-sm font-roboto flex items-center gap-1 transition-colors"
                      >
                        <Icon name="Plus" size={15} />
                        Добавить позицию
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

        <div className="bg-white border-2 border-dashed border-[#ccc] p-5">
          <p className="text-sm font-roboto text-[#666] mb-3">Новая категория:</p>
          <div className="flex gap-2">
            <input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory()}
              placeholder="Название категории"
              className="flex-1 border-2 border-[#ccc] px-3 py-2 text-sm font-roboto focus:outline-none focus:border-[#2d6e2d]"
            />
            <button
              onClick={addCategory}
              disabled={saving || !newCatName}
              className="bg-[#2d6e2d] text-white font-oswald px-5 py-2 uppercase tracking-widest text-sm hover:bg-[#4a9e4a] transition-colors disabled:opacity-50"
            >
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}