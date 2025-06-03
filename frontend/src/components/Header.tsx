import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import cartIcon from "../assets/cart.svg";
import userIcon from "../assets/account.svg";
import homeIcon from "../assets/home.svg";
import { checkToken, checkTokenWithoutRedirecting, getRolesFromToken } from "../services/Token";

const Header = () => {
  const [user, setUser] = useState<{ name: string; surname: string } | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchToken() {
        setToken(await checkTokenWithoutRedirecting());
    }
    fetchToken();
  });
  useEffect(() => {
    if (token) {
      const roles = getRolesFromToken(token);
      setRoles(roles);
      setIsAdmin(roles.includes("ROLE_ADMIN"));
    }
  }, [token]);

  return (
    <nav className="navbar">
        <Link to="/">
          <img src={homeIcon} className="home-icon" alt="Home" />
        </Link>
        {isAdmin && <Link to="/create-product">Nowy produkt</Link>}
        <div className="profile-items">
          <Link to="/login" id="login-icon">
            <img src={userIcon} className="account-icon" alt="Account" />
          </Link>
          {token && (
            <Link to="/cart">
              <img src={cartIcon} className="shopping-cart-icon" alt="Cart" />
            </Link>
          )}
        </div>
    </nav>
  );
};

export default Header;
