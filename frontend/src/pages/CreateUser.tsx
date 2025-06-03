import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/Login.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);

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
      <div className="login-container">
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
          <div style={{ margin: "1em 0" }}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={rulesAccepted}
                onChange={e => setRulesAccepted(e.target.checked)}
                style={{ marginRight: "0.5em" }}
              />
              Akceptuję{" "}
              <button
                type="button"
                style={{
                  background: "none",
                  border: "none",
                  color: "#1976d2",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginLeft: "0.2em",
                  padding: 0,
                  fontSize: "1em"
                }}
                onClick={() => setShowRules(true)}
              >
                regulamin
              </button>
            </label>
            {errors.accepted && <p>{errors.accepted}</p>}
          </div>
          {message && <div style={{ color: "red" }}>{message}</div>}
          <button type="submit">Zarejestruj się</button>
        </form>
        {showRules && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={() => setShowRules(false)}
          >
            <div
              style={{
                background: "#fff",
                color: "#222",
                padding: "2em",
                borderRadius: "8px",
                maxWidth: "400px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                position: "relative",
              }}
              onClick={e => e.stopPropagation()}
            >
              <h3>Regulamin sklepu</h3>
              <ol>
                <li>Zakupy mogą robić tylko zarejestrowani użytkownicy.</li>
                <li>Podane dane muszą być prawdziwe.</li>
                <li>Zwroty i reklamacje przyjmujemy do 14 dni od zakupu.</li>
                <li>Nie udostępniamy danych osobom trzecim.</li>
                <li>Wszelkie pytania prosimy kierować na adres email sklepu.</li>
              </ol>
              <button
                style={{
                  marginTop: "1em",
                  background: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5em 1.5em",
                  cursor: "pointer",
                  fontSize: "1em"
                }}
                onClick={() => setShowRules(false)}
              >
                Zamknij
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default CreateUser;
