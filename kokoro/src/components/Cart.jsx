function Cart(props) {
  return (
    <div className="overlay" onClick={props.onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-top">
          <h2>Корзина</h2>
          <button className="close" onClick={props.onClose}>
            ✕
          </button>
        </div>

        {props.cart.length === 0 && <p className="empty">Пока пусто</p>}

        {props.cart.map((c) => (
          <div className="cart-row" key={c.key}>
            <div className="cart-name">
              <b>{c.name}</b>
              {c.note !== "" && <small>{c.note}</small>}
              <span>{c.price * c.qty} сом</span>
            </div>
            <div className="qty">
              <button onClick={() => props.onChangeQty(c.key, -1)}>−</button>
              <span>{c.qty}</span>
              <button onClick={() => props.onChangeQty(c.key, 1)}>+</button>
            </div>
          </div>
        ))}

        {props.cart.length > 0 && (
          <div className="cart-bottom">
            <div className="total">Итого: {props.total} сом</div>
            <button className="add-btn" onClick={props.onOrder}>
              Оформить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;