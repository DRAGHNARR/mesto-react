import headLogo from "../images/head/__logo/head__logo.svg";

function Header() {
  return (
    <header className="head page__head">
      <img src={headLogo} alt="Место" className="head__logo"/>
    </header>
  );
}

export default Header;
