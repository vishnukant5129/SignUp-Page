import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const [final, setFinal] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)


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
      {
        isLoggedIn ?
          <div>
            {final}
          </div>
          :
          <div>
            <h2 className="text-2xl font-semibold text-center mb-10">
              Login
            </h2>

            <form onSubmit={handleLogin}>
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
                className="w-full mb-4 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
              )}

              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                Login
              </button>
            </form>
          </div>
      }
    </>
  );
}

export default LoginForm;
