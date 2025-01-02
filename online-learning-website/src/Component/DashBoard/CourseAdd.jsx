import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const base_url = "https://lms-backend-1-je3i.onrender.com";
// const base_url = "http://localhost:8080";

const CourseAdd = () => {
  useEffect(() => {
    document.title = "LFO - Create Course";
  }, []);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState(() => {
    const savedCategories = sessionStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setError("");
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setError("");
  };
  const handleContinueButton = async (e) => {
    if (title && category) {
      const userToken = localStorage.getItem("userToken");
      if (userToken) {
        try {
          const response = await axios.post(
            `${base_url}/draftCourses/`,
            { title: title, category: category },
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          if (response.status === 200) {
            navigate(`/add-course/${response.data.id}`);
          }
        } catch (error) {
          if (error.response.status === 400) {
            setError(error.response.data.message);
          }
          console.log(error);
        }
      }
    } else {
      setError("Title and Category Must");
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${base_url}/course/getAllCategory`);
        setCategories(response.data);
        sessionStorage.setItem("categories", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);
  return (
    <div className="w-full h-[90vh] flex justify-center items-center px-10 sm:px-20 xl:px-[10rem]">
      <div className="max-w-[50rem] w-full flex flex-col gap-10 p-5 xl:p-10 bg-[#00ffff]">
        <div>
          <h1 className="text-3xl font-bold md:text-4xl 2xl:text-5xl">
            Name your course
          </h1>
          <p className="text-lg md:text-xl 2xl:text-2xl font-light leading-5 mt-2">
            What would you like to name your course? Don't worry, you can always
            change this later, but not the category.
          </p>
        </div>
        <div>
          <label className="pointer-events-none text-lg md:text-xl 2xl:text-2xl font-medium">
            Course title
          </label>
          <input
            type="text"
            placeholder="e.g. 'Advanced Web Development'"
            value={title}
            required
            onChange={handleTitleChange}
            className="w-full border-2 rounded-lg p-1 text-lg mt-2 md:text-xl 2xl:p-2"
          />
        </div>
        <div>
          <label className="pointer-events-none text-lg md:text-xl 2xl:text-2xl font-medium">
            Category (If not have, contact us)
          </label>
          <select
            className="w-full border-2 rounded-lg p-1 text-lg mt-2 md:text-xl 2xl:p-2"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <div className="">
            <h1 className="text-white bg-red-500 pl-5">{error}</h1>
          </div>
        )}
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <motion.button
            className="w-fit px-5 py-2 rounded-lg bg-gray-300 text-lg font-semibold 2xl:text-xl 2xl:py-3 cursor-pointer"
            whileHover={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </motion.button>
          <motion.button
            className="w-fit px-5 py-2 rounded-lg bg-black text-[#00ffff] text-lg font-semibold 2xl:text-xl 2xl:py-3"
            whileHover={{ scale: 1.1 }}
            onClick={handleContinueButton}
          >
            Continue
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CourseAdd;
