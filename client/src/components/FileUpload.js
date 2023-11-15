// import React, { useState } from 'react';
// import { Button, Input, message, Table,  } from 'antd';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [title, setTitle] = useState('');
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
//       formData.append('title', title);

//       const response = await axios.post("/api/v1/user/upload", formData);

//       const uploadedFile = {
//         key: response.data.filename,
//         title,
//         downloadLink: `/api/v1/user/download/${response.data.filename}`,
//         uploadedTime: new Date().toLocaleString(),
//       };

//       setUploadedFiles([...uploadedFiles, uploadedFile]);
//       message.success('File uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       message.error('Error uploading file');
//     }
//   };

//   const columns = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//     },
//     {
//       title: 'Download',
//       dataIndex: 'downloadLink',
//       key: 'downloadLink',
//       render: (text) => <a href={text} download>Download</a>,
//     },
//     {
//       title: 'Uploaded Time',
//       dataIndex: 'uploadedTime',
//       key: 'uploadedTime',
//     },
//   ];

//   return (
//     <div>
//       <Input type="file" onChange={handleFileChange} />
//       <Input placeholder="Title" value={title} onChange={handleTitleChange} />
//       <Button type="primary" onClick={handleUpload}>
//         Upload
//       </Button>
//       {uploadedFiles.length > 0 && (
//         <Table dataSource={uploadedFiles} columns={columns} />
//       )}
//     </div>
//   );
// };

// export default FileUpload;



