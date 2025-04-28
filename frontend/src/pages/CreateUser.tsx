import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function CreateUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Imię jest wymagane";
    if (!surname.trim()) newErrors.surname = "Nazwisko jest wymagane";
    if (!email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Nieprawidłowy format email";
    }
    if (!password) {
      newErrors.password = "Hasło jest wymagane";
    } else if (password.length < 8) {
      newErrors.password = "Hasło musi mieć co najmniej 8 znaków";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage("");
      return;
    }

    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      alert("Rejestracja zakończona sukcesem.");
      setTimeout(() => {
        navigate("/login");
      }, 1000); // Przekioerowanie do strony logowania
    } else {
      const data = await response.json();
      setMessage(data.message || "Wystąpił błąd podczas rejestracji.");
    }
  };

  return (
    <Layout>
      <div>
        <h2>Rejestracja</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Imię</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="surname">Nazwisko</label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {errors.surname && <p>{errors.surname}</p>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          {message && <div style={{ color: "red" }}>{message}</div>}
          <button type="submit">Zarejestruj się</button>
        </form>
      </div>
    </Layout>
  );
}

export default CreateUser;
