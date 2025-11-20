import React, { useState, useRef } from "react";
import { useCart } from "../data/CartContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase";

const AuthModal = () => {
  const { isModalopen, modalopen, setisModalopen, hanldelogin, modalclose } =
    useCart();
  const [login, setlogin] = useState(true);

  const [message, setMessage] = useState("");
  const Email = useRef(null);
  const Password = useRef(null);
  const Name = useRef(null);

  if (!isModalopen) return null;
  function handlelogin() {
    if (login === true) {
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
          modalopen();
          hanldelogin();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + "-" + errorMessage);
          console.log(errorCode, errorMessage);
        });
    } else {
      const auth = getAuth();
      createUserWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...

          setlogin(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setMessage(errorCode + "-" + errorMessage);
          // ..
        });
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-sm p-6 rounded-xl shadow-2xl bg-white/20 backdrop-blur-xl border border-white/30 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => {
            modalclose();
          }}
          className="cursor-pointer absolute bg-amber-400 top-3 right-3 text-white/80 hover:text-white text-xl"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
          {login ? "Login" : "Create Account"}
        </h2>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          {!login && (
            <input
              ref={Name}
              type="text"
              placeholder="Full Name"
              className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-[#FF6B00] outline-none"
            />
          )}

          <input
            ref={Email}
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-[#FF6B00] outline-none"
          />

          <input
            ref={Password}
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-[#FF6B00] outline-none"
          />
          <p>{message}</p>
          <button
            onClick={() => handlelogin()}
            className="mt-2 bg-[#FF6B00] text-white p-3 rounded-lg font-semibold hover:bg-[#e65c00] shadow-lg shadow-[#FF6B0035] transition"
          >
            {login ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Switch toggle */}
        <p className="text-center text-sm text-white/80 mt-4">
          {login ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setlogin(!login)}
            className="text-[#FF6B00] font-semibold ml-1 hover:underline"
          >
            {login ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
