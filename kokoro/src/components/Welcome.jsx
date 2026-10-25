import { ADDRESS } from "../data.js";

function Welcome() {
  return (
    <section className="hero">
      <div className="hero-wing">🍗</div>
      <h1>Хрустящие крылышки</h1>
      <p>Горячие, острые, с соусами на любой вкус</p>
      <a className="hero-btn" href="#combo">
        Смотреть комбо
      </a>
      <div className="hero-address">📍 {ADDRESS}</div>
    </section>
  );
}

export default Welcome;
