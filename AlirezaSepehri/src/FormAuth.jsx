import farawin from "farawin";
import { useState } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";

export default function FormAuth() {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <div className="box_shadow md:py-16 md:w-[546px] min-h-max md:px-[100px] w-fit py-10 px-[40px] bg-white rounded-lg">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-3xl mb-7 text-center font-semibold hover:animate-pulse text-stone-700">
          {isLoginPage ? "ورود" : "ثبت نام"}
        </h2>
        {isLoginPage && <LoginPage />}
        {!isLoginPage && <RegisterPage />}
        <span
          className="block m-auto text-[12px] text-teal-500 cursor-pointer"
          onClick={() => {
            setIsLoginPage(!isLoginPage);
          }}
        >
          {isLoginPage ? "برو به ثبت نام" : "قبلا ثبت نام کرده ام"}
        </span>
      </div>
    </div>
  );
}
