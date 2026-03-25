export function Footer() {
  return (
    <div id="footer" className="footer">
      {/* Social icons */}
      <a
        href="https://www.instagram.com/aiki_center/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon instagram"
      >
        <i className="fa fa-instagram" />
      </a>
      <a
        href="https://www.facebook.com/AikiCenterItalia/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon facebook"
      >
        <i className="fa fa-facebook" />
      </a>
      <a
        href="https://maps.app.goo.gl/Ly7DBD3EJPYQCWtZ7"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon maps"
      >
        <i className="fa fa-map-marker" />
      </a>
      <a
        href="https://wa.me/3483556535"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon whatsapp"
      >
        <i className="fa fa-whatsapp" />
      </a>
      <a
        href="mailto:info@aikicenter.it"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon mail"
      >
        <i className="fa fa-envelope" />
      </a>

      {/* Copyright */}
      <div className="copyright">
        <p>
          © AIKI CENTER ETS – ETS senza scopo di lucro. Attività riservate a
          Soci e Tesserati CSEN in regola. Info:{" "}
          <a href="mailto:info@aikicenter.it">info@aikicenter.it</a>
        </p>
        <p>
          Sito a fini esclusivamente informativi e culturali, non commerciali.{" "}
          <a
            href="https://www.iubenda.com/privacy-policy/64126769"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>{" "}
          &amp;{" "}
          <a
            href="https://www.iubenda.com/privacy-policy/64126769/cookie-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cookies
          </a>
          ,{" "}
          <a href="/termini-e-condizioni" target="_blank" rel="noopener noreferrer">
            Termini e Condizioni
          </a>
          .
        </p>
      </div>
    </div>
  );
}