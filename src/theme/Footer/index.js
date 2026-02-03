import React from 'react';
import Link from '@docusaurus/Link';

function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Branding Section */}
          <div className="footer-branding">
            <a href="https://conncastlestudios.com" className="footer-logo-link" target="_blank" rel="noopener noreferrer">
              <img
                src="/img/branding/conn-castle-logo.svg"
                alt="Conn Castle Studios"
                className="footer-conn-castle-logo"
              />
            </a>
            <p className="footer-description">
              Brought to you by Conn Castle Studios. Where innovation meets creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links-column">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/docs">Docs</Link></li>
              <li><Link to="/install">Install</Link></li>
              <li><Link to="/security">Security</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links-column">
            <h3 className="footer-column-title">Resources</h3>
            <ul className="footer-links-list">
              <li><Link to="/changelog">Changelog</Link></li>
              <li><a href="https://github.com/conn-castle/agent-layer" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://github.com/conn-castle/agent-layer/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <img
              src="/img/branding/logo.svg"
              alt="Agent Layer"
              className="footer-al-logo"
            />
            <span>&copy; {new Date().getFullYear()} Conn Castle Studios. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
