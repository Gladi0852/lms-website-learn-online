import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import axios from "axios";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const ContactForm = () => {
  const form = useRef();
  const [phoneError, setPhoneError] = useState("");

  const validatePhoneNumber = (number) => {
    const phoneNumber = parsePhoneNumberFromString(number, "IN"); // Specify your country code here
    if (!phoneNumber || !phoneNumber.isValid()) {
      return "Invalid phone number";
    }
    return "";
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const phoneNumber = formData.get("phone_number");
    const email = formData.get("user_email");
    const validationPhoneError = validatePhoneNumber(phoneNumber);
    if (!validationPhoneError) {
      setPhoneError("");
      emailjs
        .sendForm("service_1t12n5j", "template_fvksgyw", form.current, {
          publicKey: "8Cr_kGWYx9JXUhNVZ",
        })
        .then(
          async () => {
            const name = formData.get("user_name");
            e.target.reset();
            await axios.post(`${base_url}/api/send-email`, {
              email,
              name,
            });
          },
          (error) => {
            console.log("FAILED...", error.text);
            alert("Error : ", error.text);
          }
        );
    } else {
      setPhoneError(validationPhoneError);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="relative max-w-[40rem] w-full border p-8 rounded-2xl border-[#00ffff]"
      >
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-5">
          <input
            type="text"
            required
            name="user_name"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Full Name
          </label>
        </div>
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-5">
          <input
            type="email"
            required
            name="user_email"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Email
          </label>
        </div>
        <div className="input-box relative w-full h-[50px] border-b-2 border-[#00ffff] mb-5">
          <input
            type="tel"
            required
            name="phone_number"
            className="w-full h-full bg-transparent border-none outline-none"
          />
          <label className="absolute top-[50%] left-0 translate-y-[-50%] pointer-events-none transition-all text-lg font-medium">
            Phone Number
          </label>
        </div>
        <div className="input-box relative w-full h-[10rem] mb-5">
          <label className="block mb-2  text-lg font-medium">Message</label>
          <textarea
            required
            name="message"
            className="w-full h-full bg-transparent outline-none border-2 border-[#00ffff] p-1"
          />
        </div>
        {phoneError && (
          <div className="">
            <h1 className="text-red-500 mt-10">{phoneError}</h1>
          </div>
        )}
        <motion.input
          type="submit"
          value="Send"
          className="w-full border-2 mt-10 py-3 rounded-full cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#00ffff] text-black font-medium text-center"
          whileHover={{ scale: 0.9 }}
        />
      </form>
    </div>
  );
};

export default ContactForm;
