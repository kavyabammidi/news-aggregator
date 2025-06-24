import React, { useEffect, useRef } from 'react';

const BookmarkPanel = ({ bookmarks, toggleBookmark, setModalArticle, setShowBookmarks }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) panelRef.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowBookmarks(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setShowBookmarks]);

  return (
    <div className="bookmark-panel" role="complementary" aria-label="Bookmarked Articles" tabIndex="-1" ref={panelRef}>
      <button className="close-btn" aria-label="Close bookmarks panel" onClick={() => setShowBookmarks(false)}>&times;</button>
      <h2>Bookmarked Articles</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map(article => (
          <div key={article.id} className="bookmark-item" onClick={() => setModalArticle(article)}>
            <span>{article.title}</span>
            <button
              className="remove-btn"
              aria-label={`Remove bookmark for ${article.title}`}
              onClick={e => {
                e.stopPropagation();
                toggleBookmark(article);
              }}
            >Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookmarkPanel; 