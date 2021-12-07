import React from "react";
import ContactUs from "../../components/Landing/ContactUs";
import Hero from "../../components/Landing/Hero";
import Services from "../../components/Landing/Services";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Hero />
      <ContactUs />
      <Services />
    </React.Fragment>
  );
};

export default LandingPage;
