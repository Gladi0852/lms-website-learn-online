import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import HomePage from "./Pages/HomePage.jsx";
import CoursePage from "./Pages/CoursePage.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AboutPage from "./Pages/AboutPage.jsx";
import Contact from "./Pages/Contact.jsx";
import TeacherPage from "./Pages/TeacherPage.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import { Provider } from "react-redux";
import learningStore from "./Store/index.js";
import UnProtectedRoute from "./routes/UnProtectedRoute.jsx";
import RoleProtectedRoute from "./routes/RoleProtectedRoute.jsx";
import DashBoard from "./Pages/DashBoard.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashBoardHome from "./Component/DashBoard/DashBoardHome.jsx";
import Wishlist from "./Component/DashBoard/Wishlist.jsx";
import UserCourses from "./Component/DashBoard/UserCourses.jsx";
import UserProfile from "./Component/DashBoard/UserProfile.jsx";
import ChangePassword from "./Component/DashBoard/ChangePassword.jsx";
import MyContent from "./Component/DashBoard/MyContent.jsx";
import CourseAdd from "./Component/DashBoard/CourseAdd.jsx";
import CourseDetails from "./Component/AddCourse/CourseDetails.jsx";
import AddCourse from "./Component/AddCourse/AddCourse.jsx";
import AddLecture from "./Component/AddCourse/AddLecture.jsx";
import Courses from "./Pages/Courses.jsx";
import IndividualCoursePage from "./Component/IndividualCoursePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/courses",
        element: <CoursePage />,
        children: [
          { path: "", element: <Courses /> },
          { path: ":courseID", element: <IndividualCoursePage /> },
        ],
      },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact-us", element: <Contact /> },
      {
        path: "/teacher",
        element: (
          <RoleProtectedRoute
            disallowedRoles={["Teacher"]}
            element={<TeacherPage />}
          />
        ),
      },
      { path: "/login", element: <UnProtectedRoute element={<Login />} /> },
      { path: "/signup", element: <UnProtectedRoute element={<SignUp />} /> },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<DashBoard />} />,
        children: [
          {
            path: "",
            element: <DashBoardHome />,
          },
          { path: "wishlist", element: <Wishlist /> },
          { path: "my-courses", element: <UserCourses /> },
          { path: "my-profile", element: <UserProfile /> },
          { path: "change-password", element: <ChangePassword /> },
          {
            path: "my-contents",
            element: (
              <RoleProtectedRoute
                disallowedRoles={["Student"]}
                element={<MyContent />}
              />
            ),
          },
        ],
      },
      {
        path: "/add-course",
        element: (
          <ProtectedRoute
            element={
              <RoleProtectedRoute
                disallowedRoles={["Student"]}
                element={<CourseAdd />}
              />
            }
          />
        ),
      },
      {
        path: "/add-course/:objectId",
        element: (
          <ProtectedRoute
            element={
              <RoleProtectedRoute
                disallowedRoles={["Student"]}
                element={<AddCourse />}
              />
            }
          />
        ),
        children: [
          { path: "", element: <CourseDetails /> },
          { path: "edit-chapter/:lectureId", element: <AddLecture /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={learningStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

{
  /* <PersistGate loading={null} persistor={persistor}></PersistGate> */
}
