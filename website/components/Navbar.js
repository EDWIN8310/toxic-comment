'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Categories', href: '#labels' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Metrics', href: '#metrics' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#" className={styles.logo} onClick={(e) => handleLinkClick(e, 'body')}>
          <span className={styles.logoIcon}>🛡️</span>
          <span className={styles.logoText}>
            Toxi<span className={styles.logoHighlight}>Guard</span>
          </span>
          <span className={styles.logoBadge}>AI</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button */}
        <div className={styles.navActions}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
            title="View Source on GitHub"
            aria-label="GitHub Repository"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </a>
          <a
            href="#demo"
            className={styles.ctaButton}
            onClick={(e) => handleLinkClick(e, '#demo')}
          >
            <span>Try Live Demo</span>
            <span className={styles.ctaArrow}>→</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={styles.mobileNavLink}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className={styles.mobileDrawerAction}>
            <a
              href="#demo"
              className={styles.mobileCtaBtn}
              onClick={(e) => handleLinkClick(e, '#demo')}
            >
              Try Live Demo →
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
