import { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
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
                username: username,
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
        <div>
            <h2>Logowanie</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
    );
}

export default LoginPage;