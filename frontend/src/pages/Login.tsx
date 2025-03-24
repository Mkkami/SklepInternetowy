import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwt', data.token);  // Przechowuj token w localStorage
            alert('Zalogowano pomyślnie');
        } else {
            setError('Błędne dane logowania');
        }
    };

    return (
        <Layout>
        <div>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Hasło</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
        </Layout>
    );
}

export default LoginPage;