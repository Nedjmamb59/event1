import Button from "../../components/Button";
import Logo from "../../components/Logo";
import "./style.scss";

// Fonction de gestion du clic pour le bouton Contact
const handleContactClick = () => {
  window.document.location.hash = "#contact";
};

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services">Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe">Notre équipe</a>
      </li>
    </ul>
    <Button title="Contact" onClick={handleContactClick}>
      Contact
    </Button>
  </nav>
);

export default Menu;