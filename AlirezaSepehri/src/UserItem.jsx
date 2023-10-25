import ContactIcon from "./contactIcon";

export default function UserItem({ contact, selected, styleSelected }) {
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
        <div className="flex justify-between">
          <span className="text-sm text-slate-200">{contact.name}</span>
          <span className="text-xs text-slate-500">4m</span>
        </div>
        <p className="text-[10px] w-11/12 h-5 overflow-ellipsis font-medium text-slate-500">
          سلام خوبی چه خبر؟ پروژه را به کجا رسوندی؟ سلام خوبی چه خبر ؟ پروژه را
          به کجا رسوندی؟
        </p>
      </div>
    </div>
  );
}
