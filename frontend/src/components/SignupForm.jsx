import { useState } from "react";

function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [final, setFinal] = useState("")
    const [isSignedUp, setIsSignUp] = useState(false)

    const passwordAuthontication = (e) => {

        if (password.length < 8) {
            setError("Password is minmum 8 character")
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one capital letter");
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one small letter");
            return;
        }

        if (!/[0-9]/.test(password)) {
            setError("Password must contain at least one number");
            return;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            setError("Password must contain at least one Special Character");
            return;
        }

        if (/\s/.test(password)) {
            setError("Password should not contain spaces");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        const isValid = passwordAuthontication()

        if (!isValid) return;

        setError("");

        fetch('http://localhost:8000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success == false) {
                    setError(data.message)
                } else {
                    setIsSignUp(true)
                    setFinal("SignUp success")
                    console.log({name, email})
                }
            })
            .catch(error => setError(error.message))
    };

    return (
        <>
            {
                isSignedUp ?
                    <div>
                        {final}
                    </div> :
                    <div>
                        <h2 className="text-2xl font-semibold text-center mb-6">
                            Create Account
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full mb-3 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                            />

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            {error && (
                                <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
                            )}

                            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                                Sign Up
                            </button>
                        </form>
                    </div>
            }
        </>
    );
}

export default SignupForm;