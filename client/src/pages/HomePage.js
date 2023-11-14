import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import wardenList from "../components/wardenList";
const HomePage = () => {
  // login user data
  const[wardens,setwardens] = useState([])
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllwardens",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if(res.data.success){
        setwardens(res.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);



  
  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Row>
        {wardens && wardens.map((warden) => <wardenList warden={warden} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;