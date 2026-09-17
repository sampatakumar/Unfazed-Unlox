import { useState } from "react";
import { toast } from "react-toastify";
import "../../styles/login.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/api/therapists/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            console.log("Login successful:", data);
            toast.success("Login successful!");

            // Store JWT token
            localStorage.setItem("therapistToken", data.token);

            // Store therapist information if needed
            localStorage.setItem(
                "therapist",
                JSON.stringify(data.therapist)
            );

            // Example:
            window.location.href = "/therapist/dashboard";
            toast.success("Login successful!");

        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;