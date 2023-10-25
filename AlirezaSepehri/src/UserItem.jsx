import ContactIcon from "./contactIcon";

export default function UserItem({
  contact,
  selected,
  styleSelected,
  lastChat,
}) {
  return (
    <div
      onClick={selected}
      className={
        `flex hover:bg-[#30323e5b] mb-2 text-[#ababb3] w-11/12 mx-auto text-sm 
         leading-6 rounded-2xl py-2 px-3 shadow-sm cursor-pointer overflow-hidden ` +
        styleSelected
      }
    >
      <ContactIcon name={contact.name} />
      <div className="w-2/3 flex-1">
        <p className="text-sm text-slate-200">{contact.name}</p>
        <div className="flex justify-between">
          <p className="text-[10px] w-2/3 h-5 overflow-ellipsis font-medium text-slate-500">
            {lastChat ? lastChat.text : "پیامی وجود ندارد"}
          </p>
          <p className="w-1/3 text-xs text-slate-500 ">
            {lastChat && lastChat.date.toLocaleString("fa")}
          </p>
        </div>
      </div>
    </div>
  );
}
