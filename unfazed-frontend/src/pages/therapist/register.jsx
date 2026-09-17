import { useState } from "react";
import { toast } from "react-toastify";

function RegisterPage() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/therapists/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    slug,
                    email,
                    password,
                    specialization,
                   
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            console.log("Registration successful:", data);
            toast.success("Registration successful!");
            
            
            window.location.href = "/therapist/dashboard";
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-page">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="slug">Slug:</label>
                    <input type="text" id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="specialization">Specialization:</label>
                    <input type="text" id="specialization" name="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                </div>
                
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                <p>Already have an account?</p>
                <a href="/therapist/login">Login</a>
            </form>
        </div>
    );
}

export default RegisterPage;