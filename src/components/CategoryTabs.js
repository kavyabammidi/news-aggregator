import React, { useRef } from 'react';

const categories = ['All', 'Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

const CategoryTabs = ({ category, setCategory }) => {
  const tabRefs = useRef([]);

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % categories.length;
      tabRefs.current[next].focus();
      setCategory(categories[next]);
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + categories.length) % categories.length;
      tabRefs.current[prev].focus();
      setCategory(categories[prev]);
    }
  };

  return (
    <nav className="category-tabs" role="tablist" aria-label="Article Categories">
      {categories.map((cat, idx) => (
        <button
          key={cat}
          ref={el => tabRefs.current[idx] = el}
          className={`tab-btn${category === cat ? ' active' : ''}`}
          role="tab"
          aria-selected={category === cat}
          tabIndex={category === cat ? 0 : -1}
          onClick={() => setCategory(cat)}
          onKeyDown={e => handleKeyDown(e, idx)}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
};

export default CategoryTabs; 