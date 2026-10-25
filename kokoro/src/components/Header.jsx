function Header(props) {
  return (
    <header className="header">
      <div className="logo">KOKORO</div>
      <button className="cart-btn" onClick={props.onOpenCart}>
        🛒 Корзина
        {props.count > 0 && <span className="badge">{props.count}</span>}
      </button>
    </header>
  );
}

export default Header;