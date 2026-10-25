import { ADDRESS } from "../data.js";

function Footer() {
  return (
    <footer className="footer">
      <div className="logo">KOKORO</div>
      <p>📍 {ADDRESS}</p>
    </footer>
  );
}

export default Footer;