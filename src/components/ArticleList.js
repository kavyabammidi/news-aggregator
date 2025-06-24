import React from 'react';
import ArticleCard from './ArticleCard';


const ArticleList = ({ articles, toggleBookmark, bookmarks, setModalArticle }) => (
  <div className="article-list">
    {articles.length === 0 ? (
      <p>No articles found.</p>
    ) : (
      articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          isBookmarked={!!bookmarks.find(b => b.id === article.id)}
          toggleBookmark={toggleBookmark}
          setModalArticle={setModalArticle}
        />
      ))
    )}
  </div>
);

export default ArticleList; 