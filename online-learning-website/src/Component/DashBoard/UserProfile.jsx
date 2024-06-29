import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAction } from "../../Store/Slices/userInfoSlice";
import axios from "axios";
import demoImg from "../../assets/user-icon.webp";

const UserProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "LFO - Dashboard-Profile";
  }, []);
  const { name, email, gender, phone_number, about, role, designation } =
    useSelector((store) => store.userInfo);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone_number: "",
    about: "",
    designation: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  useEffect(() => {
    setFormData({
      name: name || "",
      gender: gender || "",
      phone_number: phone_number || "",
      about: about || "",
      designation: designation || "",
    });
  }, [name, gender, phone_number, about, designation]);
  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const handleChangePhoto = (e) => {
    setProfilePhoto(e.target.files[0]);
  };
  const validatePhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };
  const handleBasicDetailsChange = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      try {
        const response = await axios.patch(
          "http://localhost:8080/auth/basic-details",
          {
            name: formData.name,
            gender: formData.gender,
            phone_number: formData.phone_number,
            about: formData.about,
            role: role,
            ...(role === "Teacher" && { designation: formData.designation }),
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(
            userInfoAction.setBasicDetails({
              name: formData.name,
              gender: formData.gender,
              phone_number: formData.phone_number,
              about: formData.about,
              ...(role === "Teacher" && { designation: formData.designation }),
            })
          );
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSaveImage = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");
    const imageData = new FormData();
    imageData.append("image", profilePhoto);
    if (userToken) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/upload-profile-photo",
          imageData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          dispatch(
            userInfoAction.setProfilePhoto({
              photo: response.data.photo,
            })
          );
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        e.target.reset();
      }
    }
  };
  return (
    <div>
      <DashboardHeader
        heading="Your Profile"
        subHead="Add or change information about yourself"
      />
      <div className="flex flex-col items-center border border-t-0 border-[#00ffff] py-10 gap-10">
        <form
          className="max-w-[40rem] w-full px-5"
          onSubmit={handleBasicDetailsChange}
        >
          <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10 border-b-2 w-fit">
            Basic Details
          </h3>

          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full border-2 rounded-lg p-2 text-xl mt-2"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              Email
            </label>
            <input
              type="email"
              className="w-full border-2 rounded-lg p-2 text-xl mt-2 bg-gray-200 cursor-none"
              value={email}
              readOnly
            />
          </div>
          {role === "Teacher" && (
            <div className="mb-8">
              <label className="pointer-events-none text-lg font-medium">
                Designation (eg: Web Developer, Database Engineer, Graphic
                Designer, Software Developer, etc)
              </label>
              <input
                type="text"
                required
                className="w-full border-2 rounded-lg p-2 text-xl mt-2"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full border-2 rounded-lg p-2 text-xl mt-2"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              required
              className={`w-full border-2 rounded-lg p-2 text-xl mt-2 ${
                validatePhoneNumber(formData.phone_number)
                  ? "border-gray-300"
                  : "border-red-500"
              }`}
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            {!validatePhoneNumber(formData.phone_number) && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid phone number.
              </p>
            )}
          </div>
          <div className="mb-8">
            <label className="pointer-events-none text-lg font-medium">
              About
            </label>
            <textarea
              className="w-full border-2 rounded-lg p-2 text-xl mt-2"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              rows={8}
              maxLength={500}
            />
          </div>
          <div className="flex justify-center">
            <motion.input
              type="submit"
              value="Save"
              className="w-fit border-2 mt-10 py-3 px-5 rounded-xl cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#00ffff] text-black font-medium text-center"
              whileHover={{ scale: 0.9 }}
            />
          </div>
        </form>
        <div className="w-[90%] h-[1px] bg-[#202020]"></div>
        <form className="max-w-[40rem] w-full px-5" onSubmit={handleSaveImage}>
          <h3 className="text-lg font-medium md:text-xl lg:text-2xl mb-10 border-b-2 w-fit">
            Update Profile Photo
          </h3>

          <div className="w-full border bg-gray-200 flex justify-center items-center py-5">
            <img
              src={profilePhoto ? URL.createObjectURL(profilePhoto) : demoImg}
              className="w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] lg:w-[25vw] lg:h-[25vw] xl:w-[20vw] xl:h-[20vw] object-cover object-center rounded-full"
            />
          </div>

          <div className="flex justify-center mt-10">
            <input
              type="file"
              accept="image/*"
              name="photo_file"
              required
              onChange={handleChangePhoto}
            />
          </div>

          <div className="flex justify-center">
            <motion.input
              type="submit"
              value="Save"
              className="w-fit border-2 mt-10 py-3 px-5 rounded-xl cursor-pointer text-base md:text-lg xl:text-xl inline-block bg-[#00ffff] text-black font-medium text-center"
              whileHover={{ scale: 0.9 }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
