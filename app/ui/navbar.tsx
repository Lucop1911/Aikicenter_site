/* eslint-disable @next/next/no-img-element */
export function Navbar() {
  const links = [
    { href: "/",           label: "Home" },
    { href: "/chi-siamo",  label: "Chi Siamo" },
    { href: "/corsi",      label: "Corsi" },
    { href: "/",           label: "Orari" },
    { href: "/istruttori", label: "Istruttori" },
  ];

  return (
    <nav> 
      <input id="nav-toggle" type="checkbox" />

      <div className="logo">
        <img src="/images/testo_logo_bianco.png" alt="logo testuale aikicenter" />
      </div>

      <ul className="links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      <label htmlFor="nav-toggle" className="icon-burger">
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </label>
    </nav>
  );
}