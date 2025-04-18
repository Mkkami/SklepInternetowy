import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    sub: string;
    roles?: string[];
    exp: number;
}

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Błąd podczas logowania');
            }

            const accessToken = response.headers.get("access_token");
            const refreshToken = response.headers.get("refresh_token");

            if (!accessToken) {
                throw new Error('Brak tokenu w odpowiedzi');
            }

            const decoded: DecodedToken = jwtDecode(accessToken);

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken || '');
            localStorage.setItem("user", JSON.stringify({
                email: decoded.sub,
                roles: decoded.roles || [],
            }));

            navigate('/'); // Przekierowanie do strony głównej

        }catch (err) {
            setError(err instanceof Error ? err.message : 'Wystąpił błąd');
            console.error('Błąd podczas logowania:', error);
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
        <div className="login-container">
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                <button type="submit" disabled={isLoading}>Zaloguj się</button>
                <button type="button" disabled={isLoading} onClick={() => navigate('/register')}>Utwórz konto</button>
            </form>
        </div>
        </Layout>
    );
}

export default LoginPage;