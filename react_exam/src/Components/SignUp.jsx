import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(newUser));

    
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    navigate("/home"); 
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <div className="extra-links">
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;