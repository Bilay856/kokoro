import { useState } from "react";
import Header from "./components/Header.jsx";
import Welcome from "./components/Welcome.jsx";
import Combo from "./components/Combo.jsx";
import Menu from "./components/Menu.jsx";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import OrderForm from "./components/OrderForm.jsx";

const TG_TOKEN = "8512752197:AAEDhwx47SOS7_1claNtCydOyk9wscCEIns";
const TG_CHAT_ID = "7078221995";

function App() {
  let [cart, setCart] = useState([]);
  let [cartOpen, setCartOpen] = useState(false);
  let [formOpen, setFormOpen] = useState(false);

  function addToCart(item, note) {
    let key = item.id + "|" + (note || "");
    let found = cart.find((c) => c.key === key);

    if (found) {
      let res = cart.map((c) => {
        if (c.key === key) {
          return { ...c, qty: c.qty + 1 };
        }
        return c;
      });
      setCart(res);
    } else {
      let res = [
        ...cart,
        { key: key, name: item.name, price: item.price, qty: 1, note: note || "" },
      ];
      setCart(res);
    }
  }

  function changeQty(key, delta) {
    let res = [];
    for (let i = 0; i < cart.length; i++) {
      let c = cart[i];
      if (c.key === key) {
        let newQty = c.qty + delta;
        if (newQty > 0) {
          res.push({ ...c, qty: newQty });
        }
      } else {
        res.push(c);
      }
    }
    setCart(res);
  }

  let total = 0;
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price * cart[i].qty;
    count = count + cart[i].qty;
  }

  function openForm() {
    setCartOpen(false);
    setFormOpen(true);
  }

  async function sendOrder(form) {
    let text = "🍗 Новый заказ Kokoro\n\n";
    text = text + "Имя: " + form.name + "\n";
    text = text + "Телефон: " + form.phone + "\n";
    text = text + "Адрес: " + form.address + "\n";
    if (form.comment.trim() !== "") {
      text = text + "Комментарий: " + form.comment + "\n";
    }
    text = text + "\nЗаказ:\n";
    for (let i = 0; i < cart.length; i++) {
      let c = cart[i];
      text = text + (i + 1) + ". " + c.name + " x" + c.qty + " = " + c.price * c.qty + " сом\n";
      if (c.note !== "") {
        text = text + "   (" + c.note + ")\n";
      }
    }
    text = text + "\nИтого: " + total + " сом";

    try {
      let response = await fetch("https://api.telegram.org/bot" + TG_TOKEN + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TG_CHAT_ID, text: text }),
      });
      let data = await response.json();

      if (data.ok) {
        setCart([]);
        return { ok: true, error: "" };
      }
      return { ok: false, error: "Не удалось отправить заказ, попробуйте ещё раз" };
    } catch (err) {
      return { ok: false, error: "Нет связи, попробуйте ещё раз" };
    }
  }

  return (
    <div className="app">
      <Header count={count} onOpenCart={() => setCartOpen(true)} />
      <Welcome />
      <Combo onAdd={addToCart} />
      <Menu onAdd={addToCart} />
      <Footer />

      {cartOpen && (
        <Cart
          cart={cart}
          total={total}
          onClose={() => setCartOpen(false)}
          onChangeQty={changeQty}
          onOrder={openForm}
        />
      )}

      {formOpen && (
        <OrderForm total={total} onClose={() => setFormOpen(false)} onSend={sendOrder} />
      )}
    </div>
  );
}

export default App;