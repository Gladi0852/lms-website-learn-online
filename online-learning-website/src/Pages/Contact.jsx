import React, { useEffect } from "react";
import contactBanner from "../assets/contact-banner.jpg";
import ContactForm from "../Component/ContactForm";
// import EmailForm from "./Contact-Page/EmailForm";
import BannerPage from "../Component/BannerPage";

const Contact = () => {
  useEffect(() => {
    document.title = "LFO - Contact us";
  }, []);
  const offices = [
    {
      id: 1,
      img: "https://media.timeout.com/images/105241451/image.jpg",
      name: "Mumbai, MH",
    },
    {
      id: 2,
      img: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
      name: "Delhi, IN",
    },
    {
      id: 3,
      img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/62000/62727-Victoria-Memorial.jpg?impolicy=fcrop&w=900&h=386&q=mediumHigh",
      name: "Kolkata, WB",
    },
    {
      id: 4,
      img: "https://cityfurnish.com/blog/wp-content/uploads/2023/07/charminar-getty-min-1024x768.jpeg",
      name: "Hyderabad, TG",
    },
  ];
  return (
    <div id="contact-us" className="w-full">
      <BannerPage
        heading="Connecting people with knowledge"
        desc="We're looking for enthusiastic, talented individuals to join our growing team and be part of our journey. If you're interested, we'd love to hear from you."
        bg_image={contactBanner}
      />
      <div id="contactCenter" className="px-10 sm:px-20 xl:px-[10rem]">
        <h1 className="text-center text-4xl font-medium">Our Offices</h1>
        <div className="w-full flex flex-wrap justify-between gap-y-4 py-8 xl:gap-y-0">
          {offices.map((office) => (
            <div
              key={office.id}
              className="border w-[48%] h-[38vw] xl:w-[24%] xl:h-[20vw] rounded-3xl bg-cover bg-center flex items-end justify-center p-2"
              style={{ backgroundImage: `url(${office.img})` }}
            >
              <h4 className="text-white text-xl md:text-2xl md:font-medium 2xl:text-3xl">
                {office.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div
        id="contactForm"
        className="px-10 sm:px-20 xl:px-[10rem] w-full my-10"
      >
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
