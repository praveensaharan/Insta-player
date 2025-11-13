import { useState, useEffect } from 'react';
import contentData from '../data/content.json';

export const useContent = () => {
  const [content, setContent] = useState(contentData);

  // You can add dynamic content loading here if needed
  useEffect(() => {
    // Future: Load from API or external source
    setContent(contentData);
  }, []);

  return content;
};