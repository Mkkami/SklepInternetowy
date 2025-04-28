import { useNavigate } from 'react-router-dom';

export async function checkToken(navigate: ReturnType<typeof useNavigate>): Promise<string | null> {
    let access_token = localStorage.getItem("access_token");

    if (access_token) {
        return access_token;
    }

    const refresh_token = localStorage.getItem("refresh_token");

    if (!refresh_token) {
        console.log("No refresh token, redirecting to login");
        navigate("/login");
        return null;
    }

    try {
        const response = await fetch("http://localhost:8080/token/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refresh_token}`,
            },
        });

        if (!response.ok) {
            console.log("Failed to refresh token");
            navigate("/login");
            return null;
        }

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        return data.access_token;
    } catch (error) {
        console.log("Error refreshing token:", error);
        navigate("/login");
        return null;
    }
}