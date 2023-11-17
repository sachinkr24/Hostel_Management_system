// src/components/NoticeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import '../styles/NoticeList.css'; 

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('api/v1/notice/getNotice')
      .then(response => {
        setNotices(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="notice-board">
        <h2 className="notice-board-title">Notice Board</h2>

        {loading && <p>Loading notices...</p>}

        {error && <p className="error-message">Error loading notices. Please try again later.</p>}

        {!loading && !error && (
          <ul className="notice-list">
            {notices.map(notice => (
              <li key={notice._id} className="notice-item">
                <h3 className="notice-title">{notice.title}</h3>
                <p className="notice-date">Date: {new Date(notice.date).toLocaleString()}</p>
                <p className="notice-content">{notice.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default NoticeList;
