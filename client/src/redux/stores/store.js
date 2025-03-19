import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk"; // sửa lại cú pháp import của thunk
import rootReducer from "../reducers/index";

// Cấu hình redux-persist
const persistConfig = {
    key: "root", // Tên key của dữ liệu trong storage
    storage, // Lưu trữ vào localStorage (hoặc sessionStorage)
};

// Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persistedReducer và applyMiddleware để sử dụng redux-thunk
const store = createStore(
    persistedReducer, // Sử dụng persistedReducer thay cho rootReducer
    applyMiddleware(thunk)
);

// Tạo persistor
const persistor = persistStore(store);

export { store, persistor }; // Export store và persistor để sử dụng trong ứng dụng
