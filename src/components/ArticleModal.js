import React, { useEffect, useRef } from 'react';

const ArticleModal = ({ article, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus the modal when opened
    if (modalRef.current) modalRef.current.focus();
    // ESC to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      // Trap focus
      if (e.key === 'Tab') {
        const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={article.title} tabIndex="-1" ref={modalRef}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" aria-label="Close modal" onClick={onClose} autoFocus>&times;</button>
        <img src={article.image} alt={article.title} className="modal-image" />
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    </div>
  );
};

export default ArticleModal; 