import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, logOut } from "../../services/authService";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/decks/create");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
  };

  return (
    <div>
      <h2>Login</h2>
      {user ? (
        <div>
          <p>Bem-vindo, {user.displayName}</p>
          <button onClick={handleLogout}>
            Sair
          </button>
        </div>
      ) : (
        <button onClick={handleLogin}>
          Login com Google
        </button>
      )}
    </div>
  );
};

export default Login;
