// NoticeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import "../styles/NoticeForm.css";

const NoticeForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title,
      content,
    };

    try {
      dispatch(showLoading());
      const res = await axios.post('api/v1/notice/postNotice', formData);
      dispatch(hideLoading());
      console.log(res);
      if (res.data.success) {
        message.success('Notice pinned Successfully');
        nav('/notice');
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  return (
    <Layout>
      < div className="main"> 
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <button type="submit">Submit</button>
      </form>
      </div>
      <div className= "Footer" >
        Copyrights reserved to Binary Hustlers
        </div >
    </Layout>
  );
};

export default NoticeForm;
