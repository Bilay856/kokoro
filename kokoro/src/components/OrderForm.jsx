import { useState } from "react";

function OrderForm(props) {
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [comment, setComment] = useState("");
  let [sending, setSending] = useState(false);
  let [done, setDone] = useState(false);
  let [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSending(true);

    let res = await props.onSend({
      name: name,
      phone: phone,
      address: address,
      comment: comment,
    });

    if (res.ok) {
      setDone(true);
      setName("");
      setPhone("");
      setAddress("");
      setComment("");
    } else {
      setError(res.error);
    }
    setSending(false);
  }

  return (
    <div className="overlay" onClick={props.onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-top">
          <h2>Оформление</h2>
          <button className="close" onClick={props.onClose}>
            ✕
          </button>
        </div>

        {done ? (
          <div className="done">
            <div className="done-icon">✅</div>
            <p>Заказ принят! Мы скоро вам позвоним.</p>
            <button className="add-btn" onClick={props.onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              placeholder="Телефон"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <textarea
              placeholder="Комментарий (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="total">Итого: {props.total} сом</div>
            {error !== "" && <p className="error">{error}</p>}
            <button className="add-btn" type="submit" disabled={sending}>
              {sending ? "Отправляю..." : "Заказать"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default OrderForm;