import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        if (response.ok) {
            setMessage('Utworzono użytkownika');
            setTimeout(() => {
                navigate('/');
            }, 1000); // Przekioerowanie do home po 1 sek
        } else {
           // setMessage('Błąd podczas tworzenia użytkownika');
            const errorData = await response.json(); // Dodaj tę linię, aby uzyskać więcej informacji o błędzie
            setMessage(`Błąd podczas tworzenia użytkownika: ${errorData.message || 'Nieznany błąd'}`);
        }
    };

    return (
        <div>
            <h2>Utwórz użytkownika</h2>
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
                {message && <div style={{ color: 'red' }}>{message}</div>}
                <button type="submit">Utwórz użytkownika</button>
            </form>
        </div>
    );
}

export default CreateUser;