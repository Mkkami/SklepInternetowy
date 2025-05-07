import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import cartIcon from "../assets/shopping-cart.svg";
import userIcon from "../assets/account.svg";

const Header = () => {
  const [user, setUser] = useState<{ name: string; surname: string } | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid token");
          }
          return response.json();
        })
        .then((data) => {
          setUser({ name: data.name, surname: data.surname });
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  return (
    <nav className="navbar">
        <Link to="/">Home</Link>
      {user ? (
          <Link to="/profile">
            Witaj {user.name} {user.surname}
          </Link>
      ) : (
          <Link to="/login" id="login-icon">
            <img src={userIcon} className="account-icon" alt="Account" />
          </Link>
      )}
        <Link to="/cart">
          <img src={cartIcon} className="shopping-cart-icon" alt="Cart" />
        </Link>
    </nav>
  );
};

export default Header;
