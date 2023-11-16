// src/components/NoticeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get('api/v1/notice/getNotice')
      .then(response => setNotices(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <Layout>
      <h2>Notice Board</h2>
      <ul>
        {notices.map(notice => (
          <li key={notice._id}>
            <h3>{notice.title}</h3>
            <p>Date: {new Date(notice.date).toLocaleString()}</p>
            <p>{notice.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default NoticeList;
