"use client";

import { useEffect, useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState("sign-in");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("AuthPage Mounted");
    const timer = setTimeout(() => setMode("sign-in"), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!loginEmail || !loginPassword) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      console.log("Attempting Login for:", loginEmail);
      const userCred = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("Sign In Successful:", userCred.user.email);

      if (loginEmail === ADMIN_EMAIL) {
        router.push("/Admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login Error:", err.message);
      alert("Login failed: " + err.message);
    }
  };

  const handleSignUp = async () => {
    if (!regName || !regEmail || !regPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (regPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      console.log("Attempting Registration for:", regEmail);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        regEmail,
        regPassword
      );
      await updateProfile(userCredential.user, { displayName: regName });
      console.log("Registration Successful:", userCredential.user.email);
      router.push("/");
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div
      id="container"
      className={clsx(
        "relative min-h-screen overflow-hidden transition-all duration-700 bg-[url('/gallery2.jpg')] bg-cover bg-center",
        mode === "sign-in" ? "sign-in" : "sign-up"
      )}
    >
      {mounted && (
        <div
          className="absolute top-0 right-0 h-screen w-[300vw] bg-gradient-to-r from-red-400/50 to-red-400/50 z-10 shadow-lg rounded-br-[50vw] rounded-tl-[50vw] transition-transform duration-1000 hidden md:block"
          style={{
            transform:
              mode === "sign-in"
                ? "translateX(0)"
                : mode === "sign-up"
                ? "translateX(100%)"
                : "translateX(35%)",
            right: mode === "sign-in" || mode === "sign-up" ? "50%" : "0",
          }}
        ></div>
      )}

      {/* Forms Row */}
      <div className="flex flex-col md:flex-row h-screen relative z-20 justify-center items-center md:items-stretch">
        {/* Sign Up Form */}
        <div
          className={clsx(
            "w-full md:w-1/2 flex flex-col justify-center items-center h-screen md:h-auto transition-transform duration-1000",
            mode === "sign-in" && "hidden md:flex md:scale-0",
            mode === "sign-up" && "flex md:scale-100"
          )}
        >
          <div className="p-6 bg-white rounded-2xl w-11/12 max-w-md shadow-lg">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                onClick={handleSignUp}
                className="w-full py-3 rounded-md bg-red-400 text-white text-lg font-medium hover:bg-red-500 transition"
              >
                Sign Up
              </button>
              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <b
                  onClick={() => setMode("sign-in")}
                  className="text-red-500 cursor-pointer"
                >
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div
          className={clsx(
            "w-full md:w-1/2 flex flex-col justify-center items-center h-screen md:h-auto transition-transform duration-1000",
            mode === "sign-up" && "hidden md:flex md:scale-0",
            mode === "sign-in" && "flex md:scale-100"
          )}
        >
          <div className="p-6 bg-white rounded-2xl w-11/12 max-w-md shadow-lg">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 rounded-md bg-gray-100 outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-3 rounded-md bg-red-400 text-white text-lg font-medium hover:bg-red-500 transition"
              >
                Sign In
              </button>
              <p className="text-sm text-center mt-4">Forgot password?</p>
              <p className="text-sm text-center mt-2">
                Don&apos;t have an account?{" "}
                <b
                  onClick={() => setMode("sign-up")}
                  className="text-red-500 cursor-pointer"
                >
                  Sign up here
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full hidden md:flex pointer-events-none z-30">
        <div className="w-1/2 flex flex-col justify-center items-center text-white">
          <h2
            className={clsx(
              "text-3xl font-bold transition-transform duration-700 uppercase",
              mode === "sign-in" ? "translate-x-0" : "-translate-x-[270%]"
            )}
          >
            Welcome To Slim
          </h2>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center text-white">
          <h2
            className={clsx(
              "text-3xl font-bold transition-transform duration-700",
              mode === "sign-up" ? "translate-x-0" : "translate-x-[270%]"
            )}
          >
            Join With Us
          </h2>
        </div>
      </div>
    </div>
  );
}
