import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
    const [user, setUser] = useState<{ name: string; surname: string } | null>(null);

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
            <a><Link to="/">Home</Link></a>
            {user ? (
                <a><Link to="/profile">Witaj {user.name} {user.surname}</Link></a>
            ) : (
                <a><Link to="/login">Login</Link></a>
            )}
        </nav>
    );
};

export default Header;
