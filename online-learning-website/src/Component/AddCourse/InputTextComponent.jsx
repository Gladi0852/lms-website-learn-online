import React, { useContext } from "react";
import { MdEdit } from "react-icons/md";
import { AddCourseContext } from "../../Store/ContextFiles/addCourse-store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const InputTextComponent = ({
  title,
  name,
  isEditing,
  inputBoxValue,
  setInputBoxValue,
  showData,
  textBox,
  type,
}) => {
  const { handleSaveClick, handleEditClick, handleCancelButton } =
    useContext(AddCourseContext);
  const handleSave = () => {
    handleSaveClick(name, inputBoxValue, type);
  };
  // const htmlToPlainText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent || "";
  // };
  return (
    <div className="bg-gray-200 p-5 rounded-lg">
      <div className="flex justify-between mb-3">
        <h4 className="text-base md:text-lg font-bold">{title}</h4>
        {isEditing ? (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => handleCancelButton(name)}
          >
            <p className="font-medium">Cancel</p>
          </button>
        ) : (
          <button
            className="flex items-center gap-2 text-lg"
            onClick={() => handleEditClick(name)}
          >
            <MdEdit />
            <p className="font-medium text-sm md:text-base">Edit title</p>
          </button>
        )}
      </div>
      {isEditing ? (
        <div>
          {textBox === "input" ? (
            <input
              type="text"
              value={inputBoxValue}
              onChange={(e) => setInputBoxValue(e.target.value)}
              className="border rounded-lg p-2 w-full text-lg"
            />
          ) : (
            <ReactQuill
              theme="snow"
              value={inputBoxValue}
              onChange={(content, delta, source, editor) =>
                setInputBoxValue(content)
              }
            />
          )}
          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 text-lg rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          {showData ? (
            textBox === "input" ? (
              <h4 className="text-lg">{showData}</h4>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: showData }} />
            )
          ) : (
            <h4 className="text-lg text-gray-500 italic">No description</h4>
          )}
        </>
      )}
    </div>
  );
};

export default InputTextComponent;
