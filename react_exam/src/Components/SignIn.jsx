import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(storedUser)); 
      setLoggedInUser(storedUser); 
      navigate("/home");  
  };
  }
  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="signup-btn">Sign In</button>
        </form>

        {loggedInUser && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>

          </div>
        )}

        <div className="extra-links">
          <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;