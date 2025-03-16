import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function CreateUser() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
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
                name: name,
                surname: surname,
                email: email,
                password: password
            })
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            setMessage(data.message);
            setTimeout(() => {
                navigate('/');
            }, 1000); // Przekioerowanie do home po 1 sek
        } else {
            const data = await response.json();
            setMessage(data.message);
        }
    };

    return (
        <Layout>
        <div>
            <h2>Utwórz użytkownika</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Imię</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="surname">Nazwisko</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
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
        </Layout>
    );
}

export default CreateUser;