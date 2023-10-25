export default function MassageItem({ message, type }) {
  console.log(message);
  if (type == "sender")
    return (
      <div className="flex flex-row-reverse">
        <div className="space-y-1">
          <p className="bg-sky-300 rounded-2xl py-2 px-3 text-xs leading-6 mb-1">
            {message.text}
            <span dir="ltr" className="block text-xs text-left text-slate-500">
              {message.date}
            </span>
          </p>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-row">
        <div className="space-y-1">
          <p className="bg-red-300 rounded-2xl py-2 px-3 text-xs leading-6 mb-1">
            {message.text}
            <span dir="ltr" className="block text-xs text-left text-slate-500">
              {message.date}
            </span>
          </p>
        </div>
      </div>
    );
}
