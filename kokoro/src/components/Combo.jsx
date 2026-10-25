import { useState } from "react";
import { COMBO, SAUCES } from "../data.js";

function Combo(props) {
  let [sauce1, setSauce1] = useState(SAUCES[0]);
  let [sauce2, setSauce2] = useState(SAUCES[1]);
  let [sauce3, setSauce3] = useState(SAUCES[2]);

  function addCombo() {
    let note = "Соусы: " + sauce1 + ", " + sauce2 + ", " + sauce3;
    props.onAdd(COMBO, note);
  }

  return (
    <section className="section" id="combo">
      <h2>Комбо</h2>
      <div className="combo">
        <div className="combo-info">
          <h3>{COMBO.name}</h3>
          <ul>
            {COMBO.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="combo-price">{COMBO.price} сом</div>
        </div>
        <div className="combo-order">
          <p className="combo-title">Выбери 3 соуса</p>
          <select value={sauce1} onChange={(e) => setSauce1(e.target.value)}>
            {SAUCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={sauce2} onChange={(e) => setSauce2(e.target.value)}>
            {SAUCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select value={sauce3} onChange={(e) => setSauce3(e.target.value)}>
            {SAUCES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <button className="add-btn" onClick={addCombo}>
            Добавить комбо
          </button>
        </div>
      </div>
    </section>
  );
}

export default Combo;