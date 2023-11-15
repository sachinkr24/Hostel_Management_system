import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import Input from "antd/es/input/Input";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [wardens, setwardens] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
 
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/warden/getwardenById",
        { wardenId: params.wardenId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setwardens(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availability",
        { wardenId: params.wardenId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
 
  const handleBooking = async () => {
    try {
        
        if(!date && !time){
            return alert("Date & Time required")
        }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          wardenId: params.wardenId,
          userId: user._id,
          wardenInfo: wardens,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h3>Comaplaint Page</h3>
      <div className="container m-2">
        {wardens && (
          <div>
            <h4>
              Dr.{wardens.firstName} {wardens.lastName}
            </h4>
            <h4>Hostel : {wardens.fees}</h4>
            <h4>
              Timings : {wardens.timings && wardens.timings[0]} -{" "}
              {wardens.timings && wardens.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) =>{

                  setIsAvailable(false)
                  setDate(moment(value).format("DD-MM-YYYY"))

                }
                }
              />
              
              <TimePicker
                format="HH:mm"
                className="m-2"
                onChange={(value) => {
                    setIsAvailable(false)
                  setTime(moment(value).format("HH:mm"));
                }}
              />

            <Input type="text" placeholder="Write Your complaint" />




              <button className="btn btn-primary mt-2" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
               Submit
               </button>
             
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;