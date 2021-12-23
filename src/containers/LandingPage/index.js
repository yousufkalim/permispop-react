import React from "react";
import Hero from "../../components/Landing/Hero";
import Services from "../../components/Landing/Services";
import ContactUs from "../../components/Landing/ContactUs";
import Footer from "../../components/Landing/Footer";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Hero />
      <Services />
      <ContactUs />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
