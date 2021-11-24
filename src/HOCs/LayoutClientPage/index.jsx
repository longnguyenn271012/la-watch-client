import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchMe } from "../../store/action/auth";

const LayoutClientPage = (props) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const userId = localStorage.getItem("USERID");

  //   if (userId) dispatch(fetchMe(userId));
  // }, [dispatch]);

  return (
    <div className=" h-100">
      <div className="">
        <div>
          <Header />
        </div>
        <div>{props.children}</div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LayoutClientPage;
