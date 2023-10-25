import { useRef } from "react";

const message = {
  mobile: "شماره موبایل وارد شده نامعتبر است!",
  username: "نام کاربری حداقل شامل 3 کاراکتر باشد!",
  password: "رمز عبور حداقل باید شامل 8 کاراکتر باشد!",
  confirm: "تکرار رمز عبور مطابقت ندارد!",
};

export default function Inputitem({
  id,
  type,
  title,
  maxlength,
  setInput,
  status,
}) {
  const messageRef = useRef(null);
  return (
    <div className="my-6 md:my-4">
      <label htmlFor={id} className="w-full block text-right text-sm">
        {title} :
        {id !== "username" && (
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500"></span>
        )}
      </label>
      <div className="relative border-b-[1px] border-b-slate-200">
        <input
          id={id}
          type={type}
          className="w-full outline-none bg-white"
          maxLength={maxlength}
          onInput={(event) => {
            messageRef.current.style.visibility = "visible";
            setInput(event.target.value);
          }}
        />
      </div>
      <p
        ref={messageRef}
        className="text-[10px] min-h-[15px] text-red-500 invisible"
      >
        {!status && message[id]}
      </p>
    </div>
  );
}
