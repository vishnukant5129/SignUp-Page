import { useState } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        
        {isSignup ? <SignupForm /> : <LoginForm />}

        <div className="text-center mt-4">
          {isSignup ? (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignup(false)}
              >
                Login
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Don’t have an account?{" "}
              <button
                className="text-blue-500 hover:underline"
                onClick={() => setIsSignup(true)}
              >
                Signup
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
