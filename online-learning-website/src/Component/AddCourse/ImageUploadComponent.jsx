import React, { useContext } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FiCameraOff } from "react-icons/fi";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";

// const base_url = "http://localhost:8080";
const base_url = "https://lms-backend-1-je3i.onrender.com";

const ImageUploadComponent = ({
  title,
  name,
  imageUrl,
  setImageUrl,
  setCourseInfo,
  isEditing,
  handleImageDeleteClick,
  type,
}) => {
  const { handleSaveClick, handleEditClick, handleCancelButton } =
    useContext(AddCourseContext);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setCourseInfo((prev) => ({
      ...prev,
      courseImage: url, // Assuming 'courseImage' is the property in courseInfo for storing the image URL
    }));
    handleSaveClick(name, file, type);
    event.target.value = null;
  };
  const isServerImage = imageUrl && !imageUrl.startsWith("blob:");
  return (
    <div className="image-upload-component bg-gray-200 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-base md:text-lg font-bold">{title}</h4>
        {isEditing ? (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => handleCancelButton(name)}
          >
            <p className="font-medium text-sm md:text-base">Cancel</p>
          </button>
        ) : imageUrl ? (
          <button
            className="text-lg bg-[#00ffff] font-medium px-3 py-2 rounded-lg"
            onClick={handleImageDeleteClick}
          >
            Delete
          </button>
        ) : (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => handleEditClick(name)}
          >
            <MdEdit />
            <p className="font-medium text-sm md:text-base">Add Image</p>
          </button>
        )}
      </div>
      {!imageUrl && (
        <div className="upload-section bg-gray-300 w-full h-[40vw] lg:h-[20vw] flex justify-center items-center rounded-lg">
          {isEditing ? (
            <label className="flex items-center gap-2 cursor-pointer text-blue-500">
              <MdPhotoCamera className="text-2xl z-50" />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <FiCameraOff className="text-5xl text-gray-200" />
          )}
        </div>
      )}
      {imageUrl && (
        <div className="bg-gray-300 w-full h-[40vw] lg:h-[20vw] rounded-lg">
          <img
            src={
              isServerImage ? `${base_url}/CourseImages/${imageUrl}` : imageUrl
            }
            alt="Course Image"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;
