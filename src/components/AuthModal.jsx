import React, { useState, useRef } from "react";
import { useCart } from "../data/CartContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { RxCross1 } from "react-icons/rx";
// import app from "../firebase";
import { app } from "../firebase";

const AuthModal = () => {
  const {
    isModalopen,
    modalopen,
    setisModalopen,
    hanldelogin,
    modalclose,
    setisuserlogged,
    isuserlogged,
  } = useCart();
  const [login, setlogin] = useState(true);

  const [message, setMessage] = useState("");
  const [signupmsg, setsignupmsg] = useState("");
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
          setisuserlogged(user.email);
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
          setsignupmsg(
            "You have Successfully created account. Please login now"
          );
          setMessage("");
          Email.current.value = "";
          Password.current.value = "";
          Name.current.value = "";
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
        <button
          onClick={() => {
            modalclose();
            setMessage("");
            setsignupmsg("");
          }}
          className="cursor-pointer absolute  top-3 right-3  hover:text-white text-xl"
        >
          <RxCross1 />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-md">
          {login ? "Login" : "Create Account"}
        </h2>
        {signupmsg && (
          <div className="mb-4 p-4 rounded-lg bg-green-500/20 border border-green-400/50 ">
            <p className="text-green-100 text-sm font-semibold text-center leading-relaxed">
              ✓ {signupmsg}
            </p>
          </div>
        )}

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
          {message && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-400/50">
              <p className="text-red-100 text-sm font-semibold text-center">
                ✗ {message}
              </p>
            </div>
          )}
          <button
            onClick={() => handlelogin()}
            className="mt-2 bg-[#FF6B00] cursor-pointer text-white p-3 rounded-lg font-semibold hover:bg-[#e65c00] shadow-lg shadow-[#FF6B0035] transition"
          >
            {login ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-white/80 mt-4 ">
          {login ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setlogin(!login);
              setsignupmsg("");
              setMessage("");
            }}
            className="text-[#FF6B00] font-semibold ml-1 hover:underline cursor-pointer"
          >
            {login ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
