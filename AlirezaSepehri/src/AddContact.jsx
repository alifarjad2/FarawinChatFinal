import farawin from "farawin";
import { useState, useRef } from "react";

export default function AddContact({ setAddbox, setContacts }) {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [successAdd, setSuccessAdd] = useState(false);
  let mobileValid = () => {
    if (!farawin.mobileRegex.test(mobile)) return false;
    return true;
  };

  let nameValid = () => {
    if (name.length < 3) return false;
    return true;
  };

  let ref = useRef();
  return (
    <div
      onClick={(e) => {
        setAddbox(false);
      }}
      className={`flex fixed justify-center items-center top-0 left-0 right-0 bottom-0
         bg-[#00000088] backdrop-blur-sm z-20 shadow-slate-200 shadow-md`}
    >
      <div
        className="relative box_shadow w-80 h-fit bg-slate-200 rounded-3xl p-4 pb-9 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 left-3 w-5"
          onClick={() => setAddbox(false)}
        >
          <svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
        <header className="text-xl font-semibold">افزودن مخاطب جدید</header>
        <div className="my-10">
          <div className="w-full mt-4">
            <label
              className="w-full block mb-1 mr-1 text-right text-xs after:content-['*'] after:ml-0.5 after:text-red-500"
              htmlFor="mobile"
            >
              شماره موبایل :
            </label>
            <input
              autoFocus
              type="text"
              maxLength={11}
              id="mobile"
              className="w-full p-2 outline-none bg-white rounded-xl border-x border-y focus:shadow-inner border-slate-400"
              onInput={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="w-full mt-4">
            <label
              className="w-full block mb-1 mr-1 text-right text-xs"
              htmlFor="name"
            >
              نام مخاطب :
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 outline-none bg-white rounded-xl border-x border-y focus:shadow-inner border-slate-400"
              onInput={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="relative">
          <p
            ref={ref}
            className={`absolute top-[-15px] right-2 text-xs ${
              successAdd ? "text-green-500" : "text-red-500"
            } mb-2`}
          ></p>
          <button
            className={`w-full text-center bg-gray-500 border-[1px] 
          py-2 rounded-xl text-slate-100 shadow-sm ${
            !mobileValid() || !nameValid() ? "cursor-not-allowed" : ""
          } rounded-lg mt-2 ${
              !mobileValid() || !nameValid() ? "opacity-50" : ""
            } ${
              mobileValid() && nameValid() ? "hover:bg-gray-600" : ""
            } transition-[all,2s]`}
            onClick={() => {
              if (mobileValid() && nameValid()) {
                farawin.testAddContact(mobile, name, (response) => {
                  ref.current.textContent = response.message;
                  if (response.code == 200) {
                    farawin.getContacts((response1) => {
                      setContacts(
                        response1.contactList.filter(
                          (response1) => response1.ref == localStorage.username
                        )
                      );
                    });
                    setSuccessAdd(true);
                  } else {
                    setSuccessAdd(false);
                  }
                });
              }
            }}
          >
            اضافه گردد
          </button>
        </div>
      </div>
    </div>
  );
}
