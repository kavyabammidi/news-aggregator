import React from 'react';

const ArticleCard = ({ article, isBookmarked, toggleBookmark, setModalArticle }) => (
  <div className="article-card" onClick={() => setModalArticle(article)}>
    <img src={article.image} alt={article.title} className="article-image" />
    <div className="article-content">
      <h2>{article.title}</h2>
      <p>{article.snippet}</p>
      <button
        className={`bookmark-btn${isBookmarked ? ' bookmarked' : ''}`}
        onClick={e => {
          e.stopPropagation();
          toggleBookmark(article);
        }}
      >
        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
      </button>
    </div>
  </div>
);

export default ArticleCard; 