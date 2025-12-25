import { useState } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import "./App.css";

function App() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-6 relative">
      {/* Decorative blobs (aria-hidden) */}
      <div className="blob blob--one" aria-hidden="true">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g transform="translate(300,300)">
            <path d="M120,-164C161,-132,190,-89,204,-41C218,7,216,60,192,101C168,142,122,170,74,189C26,208,-24,218,-69,201C-114,184,-154,140,-177,89C-200,38,-206,-21,-186,-71C-166,-121,-120,-163,-72,-187C-24,-211,26,-217,74,-206C122,-195,80,-195,120,-164Z" fill="#7dd3fc" />
          </g>
        </svg>
      </div>

      <div className="blob blob--two" aria-hidden="true">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g transform="translate(300,300)">
            <path d="M100,-130C138,-118,172,-92,191,-58C211,-24,215,16,201,47C188,79,157,101,123,122C89,142,53,160,12,166C-29,171,-72,163,-107,139C-142,115,-170,75,-191,30C-212,-15,-226,-65,-206,-101C-186,-137,-132,-158,-86,-171C-40,-183,5,-187,48,-181C91,-175,62,-142,100,-130Z" fill="#bfdbfe" />
          </g>
        </svg>
      </div>

      <div className="blob blob--three" aria-hidden="true">
        <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <g transform="translate(300,300)">
            <path d="M80,-110C110,-86,145,-66,160,-36C176,-6,171,28,151,58C131,88,97,111,60,128C23,145,-17,156,-59,150C-101,144,-145,120,-175,86C-205,52,-221,9,-206,-29C-191,-67,-146,-98,-102,-117C-58,-136,-29,-144,6,-154C41,-164,81,-179,80,-110Z" fill="#e0f2fe" />
          </g>
        </svg>
      </div>

      {/* Subtle particle SVG layer (aria-hidden) */}
      <svg className="particles" aria-hidden="true" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle className="particle p1" cx="10" cy="20" r="0.6" fill="#ffffff" fillOpacity="0.08" />
        <circle className="particle p2" cx="25" cy="12" r="0.9" fill="#e0f2fe" fillOpacity="0.06" />
        <circle className="particle p3" cx="80" cy="28" r="0.7" fill="#bfdbfe" fillOpacity="0.05" />
        <circle className="particle p4" cx="70" cy="75" r="1.2" fill="#7dd3fc" fillOpacity="0.04" />
        <circle className="particle p5" cx="40" cy="50" r="0.5" fill="#93c5fd" fillOpacity="0.06" />
        <circle className="particle p6" cx="55" cy="18" r="0.8" fill="#e0f2fe" fillOpacity="0.05" />
        <circle className="particle p7" cx="16" cy="72" r="0.9" fill="#f0f9ff" fillOpacity="0.04" />
        <circle className="particle p8" cx="88" cy="52" r="0.6" fill="#e6f4ff" fillOpacity="0.05" />
      </svg>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg card relative z-10">
        <main>
          <div className="transition-wrapper">
            <div key={isSignup ? "signup" : "login"} className="animate-form">
              {isSignup ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          <div className="text-center mt-4">
            {isSignup ? (
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  className="text-sky-600 hover:underline font-medium"
                  onClick={() => setIsSignup(false)}
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Don’t have an account?{" "}
                <button
                  className="text-sky-600 hover:underline font-medium"
                  onClick={() => setIsSignup(true)}
                >
                  Signup
                </button>
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
