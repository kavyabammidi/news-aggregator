import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <h2>About News Aggregator</h2>
      <p>
        <strong>News Aggregator</strong> is a modern web application that delivers the latest news headlines from various categories like Technology, Business, Health, Sports, and more — all in one place.
      </p>
      <p>
        The platform fetches real-time data from the <a href="https://newsapi.org/" target="_blank" rel="noreferrer">NewsAPI</a> and presents it in a clean, responsive interface. Users can search for articles, filter by category, switch between dark and light themes, and even bookmark articles for later reading.
      </p>
      <p>
        Whether you're an avid reader or someone looking for a simple way to stay informed, News Aggregator simplifies how you consume news online.
      </p>
      <p>
        This project was built using <strong>React</strong>, and it demonstrates features like:
        <ul>
          <li>Dynamic routing with <code>react-router-dom</code></li>
          <li>Persistent bookmarks using <code>localStorage</code></li>
          <li>Dark mode toggle with theme preference saving</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </p>

      <Link to="/" className="back-home-btn">← Back to Home</Link>
    </div>
  );
};

export default About;
