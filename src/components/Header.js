import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ search, setSearch, setShowBookmarks, darkMode, setDarkMode,setCategory }) => (
  <header className="header">
    {/* Left: Logo and About */}
    <div className="logo-container">
      <Link
  to="/"
  className="logo-link"
  onClick={() => {
  setCategory('All');
  setSearch('');
}} // ✅ Set category to All/General
  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
>
  <div className="logo-icon">NA</div>
  <h1 className="app-title">News Aggregator</h1>
</Link>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `about-link ${isActive ? 'active-about' : ''}`
        }
      >
        About
      </NavLink>
    </div>

    {/* Middle: Search + Theme */}
    <div className="search-container">
      {/* Input + Clear Button Wrapper */}
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search articles..."
          aria-label="Search articles"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="clear-btn"
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        className="darkmode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>

    {/* Right: Bookmarks */}
    <button
      className="bookmark-btn"
      aria-label="Show bookmarks"
      onClick={() => setShowBookmarks(true)}
    >
      Bookmarks
    </button>
  </header>
);

export default Header;
