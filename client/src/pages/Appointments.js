import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'

import { useDispatch} from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from 'moment';
import { Table } from 'antd';

const Appointments = () => {
    const [appointments,setAppointments]=useState([])
    const dispatch = useDispatch();
    const getAppointments = async()=>{

        try {
            dispatch(showLoading)
        const res = await axios.get(
            "/api/v1/user/user-appointments",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading)
          if (res.data.success) {
            setAppointments(res.data.data)
          
          }
        } catch (error) {
            dispatch(hideLoading)
          console.log(error);
        }
      };
      useEffect(() => {
        getAppointments();
        //eslint-disable-next-line
      }, []);
      const columns = [
        {
          title: "ID",
          dataIndex: "_id",
        },
        // {
        //   title: "Name",
        //   dataIndex: "name",
        //   render: (text, record) => (
        //     <span>
        //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        //     </span>
        //   ),
        // },
        // {
        //   title: "Phone",
        //   dataIndex: "phone",
        //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
        // },
        {
          title: "Date & Time",
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
              {moment(record.time).format("HH:mm")}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
      ];
    
      return (
        <Layout>
          <h1>Appointments Lists</h1>
          <Table columns={columns} dataSource={appointments} />
        </Layout>
      );
    };
    
    export default Appointments;