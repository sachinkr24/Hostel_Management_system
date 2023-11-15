// // Notice.js

// import React from 'react';
// import Layout from '../components/Layout';
// import FileUpload from '../components/FileUpload';

// function Notice() {
//   return (
//     <Layout>
//       <h1>Notice Board</h1>
//       <FileUpload />
//       {/* Add a component or table to display notices if needed */}
//     </Layout>
//   );
// }

// export default Notice;



import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Table, Button, Space } from 'antd';

function Notice() {
  // State to manage notices
  const [notices, setNotices] = useState([]);

  // File input reference
  let fileInputRef = React.createRef();

  // Function to handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (file) {
      // Assuming you have a title for the notice
      const title = prompt('Enter notice title:');
      
      // Create a new notice object with upload time
      const uploadTime = new Date().toLocaleString();
      const newNotice = { title, file, uploadTime };

      // Update the notices state
      setNotices([...notices, newNotice]);
    }
  };

  // Function to handle file download
  const handleFileDownload = (file) => {
    // Implement your download logic here, for example using a library like FileSaver.js
    // For simplicity, I'll just log a message
    console.log(`Downloading file: ${file.name}`);
  };

  // Table columns
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Upload Time',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleFileDownload(record.file)}>Download</a>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Notice Board</h1>
      {/* File upload form */}
      <form>
        <label>
          Choose File:
          <input type="file" ref={fileInputRef} />
        </label>
        <Button type="primary" onClick={handleFileUpload}>
          Upload
        </Button>
      </form>

      {/* Notices table */}
      <Table dataSource={notices} columns={columns} />
    </Layout>
  );
}

export default Notice;
