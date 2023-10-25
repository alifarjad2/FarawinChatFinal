import farawin from "farawin";
import IconAttach from "./assets/attach.png";
import IconMenuHmbg from "./assets/menu-vertical32.png";
import IconAddUser from "./assets/plus.png";
import IconEditUser from "./assets/pencil.png";
import IconExit from "./assets/power-button.png";
import ContactIcon from "./contactIcon";
import MassageItem from "./MassageItem";
import { useState, useRef } from "react";
import AddContact from "./AddContact";
import EditContact from "./EditContact";

export default function ContentBox({
  setContacts,
  selectedContact,
  chats,
  setChats,
}) {
  
  const [addBox, setAddbox] = useState(false);
  const [editBox, setEditbox] = useState(false);
  const [myMessage, setMymessage] = useState("");

  let ref = useRef();
  console.log(selectedContact);
  return (
    <div className="flex-1 px-3">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-1">
          <h4 className="pr-2 flex flex-1 text-stone-300">
            {selectedContact && <ContactIcon name={selectedContact.name} />}
            <div>
              <span className="block">{selectedContact.name}</span>
              <span className="text-xs relative bottom-1">
                {selectedContact.username}
              </span>
            </div>
          </h4>
          <div className="flex h-full items-start">
            {selectedContact && (
              <img
                className="cursor-pointer ml-3 w-6"
                src={IconEditUser}
                onClick={() => setEditbox(true)}
                alt="edit_icon"
              />
            )}
            <img
              className="cursor-pointer ml-3 w-6"
              src={IconAddUser}
              onClick={() => setAddbox(true)}
              alt="add_icon"
            />
            <img
              className="cursor-pointer ml-3 w-6"
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
              src={IconExit}
              alt="exit_icon"
            />
            <img
              className="lg:hidden ml-2 h-5 cursor-pointer relative z-10 mt-[2px]"
              src={IconMenuHmbg}
              alt="menu_icon"
            />
          </div>
        </div>

        <div className=" flex-1 overflow-y-scroll">
          {selectedContact ? (
            <div>
              {chats.length != 0 ? (
                chats.map((row) => {
                  if (row.sender == selectedContact.username)
                    return (
                      <MassageItem
                        key={row.date}
                        message={row}
                        type="receiver"
                      />
                    );
                  else if (row.receiver == selectedContact.username)
                    return (
                      <MassageItem key={row.date} message={row} type="sender" />
                    );
                })
              ) : (
                <div className="text-slate-500 text-sm flex justify-center mt-20">
                  پیامی وجود ندارد!
                </div>
              )}
            </div>
          ) : (
            <div className="text-slate-500 text-sm flex justify-center mt-20">
              "هنوز مخاطبی انتخاب نشده"
            </div>
          )}
        </div>

        <div className="text-xs text-slate-400 mt-1">
          {selectedContact ? (
            <div className="group relative w-11/12 mx-auto mb-1">
              <img
                className="absolute w-4 right-4 top-[14px] text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                src={IconAttach}
                alt=""
              />
              <input
                ref={ref}
                className="bg-transparent hover:bg-[#30323e] focus:bg-[#30323e] text-[#ababb3] placeholder-slate-400 block focus:outline-none appearance-none w-full text-sm leading-6 rounded-2xl py-3 pr-10 shadow-sm"
                type="text"
                aria-label="Filter projects"
                placeholder="پیغام شما ..."
                onInput={(event) => setMymessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.code == "Enter") {
                    farawin.testAddChat(
                      selectedContact.username,
                      myMessage,
                      (response) => {
                        if (response.code == 200) {
                          ref.current.value = "";
                          farawin.getChats((response1) => {
                            setChats(
                              response1.chatList.filter(
                                (message) =>
                                  message.sender == localStorage.username ||
                                  message.receiver == localStorage.username
                              )
                            );
                          });
                        }
                      }
                    );
                  }
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {addBox && <AddContact setAddbox={setAddbox} setContacts={setContacts} />}
      {editBox && (
        <EditContact
          setEditbox={setEditbox}
          selectedContact={selectedContact}
          setContacts={setContacts}
        />
      )}
    </div>
  );
}
