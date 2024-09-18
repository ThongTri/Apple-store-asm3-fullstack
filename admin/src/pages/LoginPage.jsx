import { useContext, useRef } from "react";
import myContext from "../context";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const email = useRef();
  const password = useRef();
  const { setUser, setIsLogin } = useContext(myContext);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      const res = await fetch("http://localhost:5000/user/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUser(data.data.user);
      setIsLogin(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[500px] m-auto justify-center items-center mt-[100px] gap-2">
      <h2 className="text-[32px] capitalize font-semibold pb-10">login</h2>
      <input
        type="text"
        className="w-1/2 outline-none py-2 px-4 border  border-black"
        placeholder="email"
        ref={email}
        required
      />
      <input
        type="password"
        className="w-1/2 outline-none py-2 px-4 border border-black"
        placeholder="Password"
        ref={password}
        required
      />
      <button
        type="submit"
        className="w-1/2 text-gray-100 bg-blue-700 border-none capitalize px-4 py-2 place-self-auto">
        Login
      </button>
    </form>
  );
}

export default LoginPage;
