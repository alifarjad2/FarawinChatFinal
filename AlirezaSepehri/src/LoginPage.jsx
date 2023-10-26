import farawin from "farawin";
import { useState, useRef } from "react";
import Inputitem from "./inputItem";

export default function LoginPage() {
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messageRef = useRef(null);

  let mobileValid = () => {
    if (!farawin.mobileRegex.test(mobile)) return false;
    return true;
  };
  let passwordValid = () => {
    if (password.length < 8) return false;
    return true;
  };

  let buttonValid = () => {
    if (passwordValid() && mobileValid()) return true;
    return false;
  };

  return (
    <div className="w-full">
      <Inputitem
        id="mobile"
        type="text"
        title="شماره موبایل"
        maxlength={11}
        setInput={setmobile}
        status={mobileValid()}
      />
      <Inputitem
        id="password"
        type="password"
        title="رمز عبور"
        setInput={setPassword}
        status={passwordValid()}
      />

      <a
        href="blank"
        className="block m-auto text-[12px] text-teal-500 cursor-pointer relative bottom-5"
      >
        رمز عبور را فراموش کرده ام
      </a>

      <div className="relative my-10">
        <button
          className={
            buttonValid() && !isLoading
              ? "box_shadow mt-6 text-white py-3 rounded-3xl w-full cursor-pointer opacity-[0.7] hover:opacity-90 bg-gradient-to-r from-[#00dbde] to-[#fc00ff] hover:from-[#fc00ff] hover:to-[#00dbde]"
              : "box_shadow mt-6 text-white py-3 rounded-3xl w-full opacity-[0.42] cursor-not-allowed bg-gradient-to-r from-[#00dbde] to-[#fc00ff]"
          }
          style={{
            background:
              "-webkit-linear-gradient(right,#00dbde 20%,#fc00ff,#00dbde 20%,#fc00ff)",
          }}
          onClick={() => {
            if (buttonValid()) {
              setIsLoading(true);
              farawin.testLogin(mobile, password, (response) => {
                const success = response.code == "200";
                if (success) {
                  localStorage.username = mobile;
                  location.reload();
                }
                messageRef.current.textContent = response.message;
                setIsLoading(false);
              });
            }
          }}
        >
          <div
            role="status"
            className={
              isLoading
                ? "absolute top-[50%] inline-block m-auto text-center"
                : "hidden"
            }
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 animate-spin fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          ورود
        </button>
        <p ref={messageRef} className="absolute top-0 right-0 text-xs text-red-500"></p>
      </div>
    </div>
  );
}   
