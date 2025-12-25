import { useState } from "react";

function SignupForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [final, setFinal] = useState("")
    const [isSignedUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

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
            {isSignedUp ? (
                <div className="text-center text-sky-700 font-semibold">{final}</div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold text-center mb-4">Create Account</h2>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Name"
                                required
                                aria-required="true"
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 input-animated"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                aria-required="true"
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 input-animated"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    aria-required="true"
                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 input-animated"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-600 hover:text-slate-800"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    required
                                    aria-required="true"
                                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 input-animated"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(v => !v)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-600 hover:text-slate-800"
                                    aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                                >
                                    {showConfirm ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p role="alert" aria-live="assertive" className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 button-animated"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignupForm;