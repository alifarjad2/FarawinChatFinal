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
      <div className="w-2/3 flex-1 overflow-hidden">
        <p className="text-sm text-slate-200">{contact.name}</p>
        <div className="flex justify-between">
          <p className="text-[10px] flex-1 h-5 overflow-ellipsis font-medium text-slate-500">
            {lastChat ? lastChat.text : "پیامی وجود ندارد"}
          </p>
          <p className="w-max text-[10px] text-slate-500 text-left">
            {lastChat &&
              ((new Date() - new Date(lastChat?.date)) / 1000 >= 1
                ? (new Date() - new Date(lastChat?.date)) / 1000 < 60
                  ? `${Math.ceil(
                      (new Date() - new Date(lastChat?.date)) / 1000
                    )} ثانیه قبل`
                  : Math.ceil(
                      (new Date() - new Date(lastChat?.date)) / (1000 * 60)
                    ) < 60
                  ? `${Math.ceil(
                      (new Date() - new Date(lastChat?.date)) / (1000 * 60)
                    )} دقیقه قبل`
                  : Math.ceil(
                      (new Date() - new Date(lastChat?.date)) / (1000 * 60 * 60)
                    ) < 24
                  ? `${Math.ceil(
                      (new Date() - new Date(lastChat?.date)) / (1000 * 60 * 60)
                    )} ساعت قبل`
                  : Math.ceil(
                      (new Date() - new Date(lastChat?.date)) /
                        (1000 * 60 * 60 * 24)
                    ) == 1
                  ? `دیروز`
                  : `${new Date(lastChat?.date).toLocaleString("fa-ir", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}`
                : `Just Now`)}
            {/* {lastChat && lastChat.date.toLocaleString("fa")} */}
          </p>
        </div>
      </div>
    </div>
  );
}
