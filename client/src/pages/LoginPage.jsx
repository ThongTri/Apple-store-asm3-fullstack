import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { onLogin } from "../store";
import img from "../imgs/banner1.jpg";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleCreateAccount() {
    navigate("/register");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    dispatch(onLogin(data.data.user));
    setEmail("");
    setPassword("");
    alert("Login successful!");

    navigate("/");
  }
  return (
    <div
      className="w-full h-screen bg-contain flex items-center justify-center"
      style={{ backgroundImage: `url(${img})` }}>
      <form
        action=""
        className="flex flex-col w-[450px] bg-white"
        onSubmit={handleSubmit}>
        <h1 className="text-[40px] italic capitalize text-center py-8">
          sign in
        </h1>
        <input
          type="email"
          placeholder="Email"
          className="mx-8 py-4 px-2 outline-none border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mx-8 py-4 px-2 outline-none border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black py-4 text-white uppercase mx-8">
          sign in
        </button>
        <p className="text-center py-10 text-gray-500">
          Create an account?{" "}
          <button
            type="button"
            className="text-blue-600"
            onClick={handleCreateAccount}>
            Click
          </button>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
