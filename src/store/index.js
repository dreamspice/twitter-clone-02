// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const reducer = combineReducers({
//   login: login,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// export const storePersistor = createStore(persistedReducer);
// export const persistor = persistStore(store);

// Redux
// import { createSlice, configureStore } from "@reduxjs/toolkit";

// const initialAuthState = {
//   currentUser: null,
//   isLogin: localStorage.getItem("isLogin"),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialAuthState,
//   reducers: {
//     login(state) {
//       localStorage.setItem("isLogin", "true");
//       state.isLogin = true;
//     },
//     setCurrentUser(state, action) {
//       state.currentUser = action.payload;
//     },
//     logout(state) {
//       localStorage.setItem("isLogin", "false");
//       state.isLogin = false;
//     },
//   },
// });

// const initialPostsState = { posts: null, error: null };

// const postsSlice = createSlice({
//   name: "posts",
//   initialState: initialPostsState,
//   reducers: {
//     setPosts(state, action) {
//       state.posts = action.payload;
//     },
//     setError(state, action) {
//       state.error = action.payload;
//     },
//   },
// });

// const store = configureStore({
//   reducer: { auth: authSlice.reducer, posts: postsSlice.reducer },
// });

// export const authActions = authSlice.actions;
// export const postsActions = postsSlice.actions;
// export default store;

//////////////////

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLogin: localStorage.getItem("isLogin"),
  },
  reducers: {
    login(state) {
      localStorage.setItem("isLogin", "true");
      state.isLogin = true;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      localStorage.setItem("isLogin", "false");
      state.isLogin = false;
    },
  },
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: null, error: null },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  posts: postsSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export const authActions = authSlice.actions;
export const postsActions = postsSlice.actions;
export { store, persistor };
