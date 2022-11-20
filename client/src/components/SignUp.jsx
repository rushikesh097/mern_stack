import React, { useState } from "react";
import axios from "axios";
import { LINK, FILL_ALL_DATA, PATTERN, INVALID_EMAIL  } from "../Data";

const SignUp = ({ setOnHome, setId, setLogin, setText }) => {
  const [msg, setMsg] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    isValid: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setMsg("");
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addUser = (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.password === "") {
      setIsValid(false);
      setMsg(FILL_ALL_DATA);
      return;
    }
    else if(PATTERN.test(user.email)){
      axios
      .post(`${LINK}adduser`, {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        setOnHome(true);
        setId(response.data.insertId);
        setUser((prev) => ({ ...prev, isValid: true }));
      })
      .catch((err) => {
        setIsValid(false);
        setMsg(err.message);
      });
      return;
    }
    setIsValid(false);
    setMsg(INVALID_EMAIL);
  };

  return (
    <div>
      <div className="flex justify-center mt-20">
        <div className="w-30 sm:w-80 lg:w-96">
          <form className="bg-indigo-200 shadow-2xl shadow-indigo-500 rounded-md px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-indigo-900 text-sm font-bold mb-2"
                htmlFor="=name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-900"
                type={"text"}
                name={"name"}
                onChange={handleChange}
                id="name"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-indigo-900 text-sm font-bold mb-2"
                htmlFor="email"
              >
                E-Mail
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-900"
                type={"email"}
                name={"email"}
                onChange={handleChange}
                id="email"
                placeholder="E-Mail"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-indigo-900 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-indigo-900"
                id="password"
                type={"password"}
                name={"password"}
                onChange={handleChange}
                placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">
                {!isValid ? msg : ""}
              </p>
            </div>

            <div
              className="flex items-center gap-2
            sm:gap-0 justify-between"
            >
              <button
                className="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={addUser}
              >
                Sign Up
              </button>
              <a
                className="inline-block align-baseline font-bold text-indigo-900
                sm:text-sm
                sm:ml-1
                hover:text-indigo-700 cursor-pointer text-xs"
                onClick={() => {
                  setText("Sign Up");
                  setLogin((login) => !login);
                }}
              >
                Already have account ?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
