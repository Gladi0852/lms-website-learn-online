import { configureStore } from "@reduxjs/toolkit";
import loginStatusSlice from "./Slices/loginStatusSlice";
import userInfoSlice from "./Slices/userInfoSlice";

const learningStore = configureStore({
  reducer: {
    loginStatus: loginStatusSlice.reducer,
    userInfo: userInfoSlice.reducer,
  },
});

export default learningStore;

//when want to persist state even after reloading
// import { configureStore } from "@reduxjs/toolkit";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
// import loginStatusSlice from "./Slices/loginStatusSlice";
// import userInfoSlice from "./Slices/userInfoSlice";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   stateReconciler: autoMergeLevel2, // Merge two-level deep objects
//   blacklist: ["auth"], // auth state will not be persisted
// };
// const authPersistConfig = {
//   key: "auth",
//   storage,
//   stateReconciler: autoMergeLevel2,
// };
// const rootReducer = combineReducers({
//   loginStatus: persistReducer(authPersistConfig, loginStatusSlice.reducer),
//   userInfo: persistReducer(authPersistConfig, userInfoSlice.reducer),
// });

// // const persistConfig = {
// //   key: "root",
// //   storage,
// // };
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// const learningStore = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// const persistor = persistStore(learningStore);

// export { learningStore, persistor };

//using only react redux
// import { createStore } from "redux";

// const INITIAL_VALUE = {
//   loading: false,
//   isAuthenticated: false,
//   name: "",
//   email: "",
// };

// const loginReducer = async (store = INITIAL_VALUE, action) => {
//   if (action.type === "LOGIN") {
//     console.log(
//       "Called ",
//       action.payload.email,
//       " - ",
//       Number(action.payload.password)
//     );
//   }
//   return store;
// };

// const loginStore = createStore(loginReducer);
