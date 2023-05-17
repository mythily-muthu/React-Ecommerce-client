import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import UpperAnnouncement from "../components/UpperAnnouncement";
import LowerAnnouncement from "../components/LowerAnnouncement";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import Items from "../components/Items";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const MainContainer = styled.div`
  background-color: whitesmoke;
`;

const Home = () => {
  const user = useSelector((state) => state.user);
  const history = useNavigate();

  useEffect(() => {
    if (user?.currentUser) {
      // is admin or not ?
      if (user?.currentUser?.isAdmin) {
        history("/adminHome");
      } else history("/");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <MainContainer>
        <UpperAnnouncement />
        <Navbar />
        <LowerAnnouncement />
        <Slider />
        <Brands />
        <Items />
        <Newsletter />
        <Footer />
      </MainContainer>
    </div>
  );
};

export default Home;
