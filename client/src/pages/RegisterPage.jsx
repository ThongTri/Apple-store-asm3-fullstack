import { useNavigate } from "react-router-dom";
import { useState } from "react";

import img from "../imgs/banner1.jpg";
import { useDispatch } from "react-redux";
import { signupSuccess } from "../store";

function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogin() {
    navigate("/login");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = { fullName, email, phoneNumber };
    const res = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newUser, password }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    dispatch(signupSuccess(newUser));
    alert(`Hi ${fullName}, welcome to our store!`);

    //Reset
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    navigate("/");
  }
  return (
    <div
      className="w-full h-screen bg-contain flex items-center justify-center"
      style={{ backgroundImage: `url(${img})` }}>
      <form
        action=""
        className="flex flex-col rounded-lg w-[450px] bg-white shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)]"
        onSubmit={handleSubmit}>
        <h1 className="text-[40px] italic capitalize text-center py-8">
          sign up
        </h1>
        <input
          type="text"
          placeholder="Full Name"
          className="mx-8 py-4 px-2 outline-none border"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="mx-8 py-4 px-2 outline-none border"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mx-8 py-4 px-2 outline-none border"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          className="mx-8 py-4 px-2 outline-none border"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black py-4 text-white uppercase mx-8">
          sign up
        </button>
        <p className="text-center py-10 text-gray-600">
          Login?{" "}
          <button className="text-blue-500" type="button" onClick={handleLogin}>
            Click
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
