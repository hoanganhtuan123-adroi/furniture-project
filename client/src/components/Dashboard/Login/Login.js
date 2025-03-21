import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { login } from "../../../redux/actions/actionLogin";
import "./Login.css";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await dispatch(login(email, password));
    //         navigate("/dashboard/products");
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    return (
        <>
            <div className="bg-login flex justify-center items-center h-screen bg-slate-400"></div>
            <div className="bg-white absolute top-0 left-0 right-0 translate-y-[30%] z-10 p-8 rounded-lg shadow-md w-96 container mx-auto">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form action="" method="post">
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm text-gray-700 text-[18px] font-medium"
                        >
                            Username
                        </label>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 text-[18px]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        />
                    </div>
                    <button
                        // onClick={(e) => {
                        //     handleLogin(e);
                        // }}
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    <Link to={"/register"}> Not registered? </Link>
                </p>
            </div>
        </>
    );
}

export default Login;
