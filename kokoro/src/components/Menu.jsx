import { MENU } from "../data.js";

function Menu(props) {
  return (
    <section className="section">
      <h2>Меню</h2>
      <div className="grid">
        {MENU.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-emoji">{item.emoji}</div>
            <h3>{item.name}</h3>
            <div className="card-price">{item.price} сом</div>
            <button className="add-btn" onClick={() => props.onAdd(item)}>
              Добавить
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;