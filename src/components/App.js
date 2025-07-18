import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import CategoryTabs from './CategoryTabs';
import FilterBar from './FilterBar';
import ArticleList from './ArticleList';
import BookmarkPanel from './BookmarkPanel';
import ArticleModal from './ArticleModal';
import Footer from './Footer';
import About from './About';
import Loader from './Loader';
import '../data/App.css';
const categoryToTopic = {
  'Breaking-News': 'breakingnews',
  'Business': 'business',
  'Entertainment': 'entertainment',
  'General': 'general',  // fallback
  'Health': 'health',
  'Science': 'science',
  'Sports': 'sports',
  'Technology': 'technology',
  'World': 'world',
  'Nation': 'nation'
};


const App = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [category, setCategory] = useState('General');
  const [search, setSearch] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [modalArticle, setModalArticle] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const fetchArticles = async () => {
  setLoading(true);
  setError(null);

  try {
  const topicParam = categoryToTopic[category] || 'breakingnews';

  const response = await fetch(`/.netlify/functions/getNews?category=${topicParam}`);
  const data = await response.json();




    if (data.articles) {
      setArticles(
        data.articles.map((a, idx) => ({
          id: idx + '-' + (a.title || ''),
          title: a.title,
          snippet: a.description,
          content: a.content,
          image: a.image,
          url: a.url,
          category: a.source?.name || category,
        }))
      );
    } else {
      setArticles([]);
    }
  } catch (err) {
    setError('Failed to fetch articles.');
  }

  setLoading(false);
};

    fetchArticles();
  }, [category]);

  useEffect(() => {
    let filtered = articles;
    if (search) {
      filtered = filtered.filter(a => a.title?.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredArticles(filtered);
  }, [articles, search]);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleBookmark = (article) => {
    const updated = bookmarks.find(b => b.id === article.id)
      ? bookmarks.filter(b => b.id !== article.id)
      : [...bookmarks, article];
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <Header
  search={search}
  setSearch={setSearch}
  setShowBookmarks={setShowBookmarks}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  setCategory={setCategory}   // ✅ Add this line
/>

        <Routes>
          <Route path="/" element={
            <>
              <CategoryTabs category={category} setCategory={setCategory} />
              <FilterBar setSearch={setSearch} />
              {loading ? (
                <Loader />

              ) : error ? (
                <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>
              ) : (
                <ArticleList
                  articles={filteredArticles}
                  toggleBookmark={toggleBookmark}
                  bookmarks={bookmarks}
                  setModalArticle={setModalArticle}
                />
              )}
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
        {showBookmarks && (
          <BookmarkPanel
            bookmarks={bookmarks}
            toggleBookmark={toggleBookmark}
            setModalArticle={setModalArticle}
            setShowBookmarks={setShowBookmarks}
          />
        )}
        {modalArticle && <ArticleModal article={modalArticle} onClose={() => setModalArticle(null)} />}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
