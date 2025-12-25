import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [final, setFinal] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === false) {
          setError(data.message)
        } else {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true)
          setFinal("Login success")
        }
      })
      .catch(error => setError(error.message))

  };

  return (
    <>
      {isLoggedIn ? (
        <div className="text-center text-sky-700 font-semibold">{final}</div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label htmlFor="login-email" className="sr-only">Email</label>
              <input
                id="login-email"
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
              <label htmlFor="login-password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  aria-required="true"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-400 input-animated"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {error && <p role="alert" aria-live="assertive" className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 button-animated"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default LoginForm;
