import { useState } from "react";

function TherapistDashboard() {
    const [therapist] = useState(() => {
        try {
            const storedTherapist = localStorage.getItem("therapist");

            if (!storedTherapist) {
                return null;
            }

            return JSON.parse(storedTherapist);
        } catch (error) {
            console.error("Failed to parse therapist data:", error);

            localStorage.removeItem("therapist");

            return null;
        }
    });

    const handleLogout = () => {
        localStorage.removeItem("therapistToken");
        localStorage.removeItem("therapist");

        window.location.href = "/therapist/login";
    };

    return (
        <div>
            <h1>Therapist Dashboard</h1>

            {therapist ? (
                <div>
                    <h2>Welcome, {therapist.name}!</h2>

                    <p>
                        Email: {therapist.email}
                    </p>

                    <p>
                        Specialization: {therapist.specialization}
                    </p>
                </div>
            ) : (
                <p>
                    No therapist data found. Please log in again.
                </p>
            )}

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default TherapistDashboard;