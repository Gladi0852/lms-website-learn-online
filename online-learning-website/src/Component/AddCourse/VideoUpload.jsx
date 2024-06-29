import React, { useContext, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaVideoSlash } from "react-icons/fa";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";

const VideoUpload = ({
  title,
  name,
  isEditing,
  videoUrl,
  setVideoUrl,
  deleteVideo,
  type,
}) => {
  const { handleCancelButton, handleEditClick, handleSaveClick } =
    useContext(AddCourseContext);
  const [videoFile, setVideoFile] = useState();
  const [loading, setLoading] = useState(false);
  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    // console.log("uploading");
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    const response = await handleSaveClick(name, file, type);
    // console.log(response);
    if (response === "Upload") {
      setLoading(false);
    } else {
      console.log("error");
    }
    event.target.value = null;
  };
  const isServerVideo = videoUrl && !videoUrl.startsWith("blob:");
  return (
    <div className="bg-gray-200 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-base md:text-lg font-bold">{title}</h4>
        {isEditing ? (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => handleCancelButton(name)}
          >
            <p className="font-medium text-sm md:text-base">Cancel</p>
          </button>
        ) : videoUrl ? (
          <button
            className="text-lg bg-[#00ffff] font-medium px-3 py-2 rounded-lg"
            onClick={deleteVideo}
          >
            Delete
          </button>
        ) : (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => handleEditClick(name)}
          >
            <MdEdit />
            <p className="font-medium text-sm md:text-base">Add Video</p>
          </button>
        )}
      </div>
      {!videoUrl && (
        <div className="upload-section bg-gray-300 w-full h-[40vw] lg:h-[20vw] flex justify-center items-center rounded-lg">
          {isEditing ? (
            <label className="flex items-center gap-2 cursor-pointer text-blue-500">
              <FaVideo className="text-2xl z-50" />
              <span>Upload Video (.MP4 is supported)</span>
              <input
                type="file"
                accept=".mp4, .mkv, video/*"
                className="hidden"
                onChange={handleVideoUpload}
              />
            </label>
          ) : (
            <FaVideoSlash className="text-5xl text-gray-200" />
          )}
        </div>
      )}
      {videoUrl &&
        (loading ? (
          <div className="w-full h-[20vh] flex justify-center items-center text-4xl">
            Loding...
          </div>
        ) : (
          <div className="bg-gray-300 w-full rounded-lg">
            <video preload="auto" controls className="w-full">
              {isServerVideo ? (
                <source
                  src={`http://localhost:8080/CourseVideos/${videoUrl}`}
                />
              ) : (
                <source src={videoUrl} type={videoFile.type} />
              )}
              Your browser does not support the video tag.
            </video>
            {isServerVideo && (
              <p>If Video hasn't loaded please wait or Refresh screen</p>
            )}
          </div>
        ))}
    </div>
  );
};

export default VideoUpload;
