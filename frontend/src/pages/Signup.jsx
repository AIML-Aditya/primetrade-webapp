import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authAPI"; // ✅ works now

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button>Signup</button>
    </form>
  );
}
