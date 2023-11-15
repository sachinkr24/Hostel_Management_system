import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import WardenList from "../components/WardenList";

 

const HomePage = () => {
  // login user data
  const [wardens, setWardens] = useState([]);
///getAllwardens route in wardenRoutes
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllwardens",// sending data for verification to the the backend
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setWardens(res.data.data);
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
        {wardens && wardens.map((warden) => <WardenList warden={warden} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
