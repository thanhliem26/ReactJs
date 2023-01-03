import React from "react";
import HeaderHome from './Header';
import Section from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import './Homepage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
    return (
        <>
        <HeaderHome />
        <Section />
        <MedicalFacility />
        <OutstandingDoctor />
        <HandBook />
        <About />
        <div className="home_footer">
            <p>&copy;2023 Thanh Liem Education. <a href="#">More information, please visit my facebook</a></p>
        </div>
        </>
    )
}

export default HomePage;