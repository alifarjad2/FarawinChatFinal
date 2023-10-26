import farawin from "farawin";
import SideBar from "./SideBar";
import ContentBox from "./ContentBox";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [contactList, setContactList] = useState(null);
  const [selectedContact, setSelectedContact] = useState("");
  const [chatList, setChatList] = useState(null);
  const [widthSidbar, setWidth] = useState('w-0')

  useEffect(() => {
    farawin.getContacts().then((response) => {
      setContactList(
        response.contactList.filter(
          (response) => response.ref == localStorage.username
        )
      );
    });
    let a = setInterval(() => {
      farawin.getContacts().then((response) => {
        setContactList(
          response.contactList.filter(
            (response) => response.ref == localStorage.username
          )
        );
      });
    }, 10000);
    return () => {
      clearInterval(a);
    };
  }, []);

  useEffect(() => {
    farawin.getChats().then((response) => {
      setChatList(
        response.chatList
          .filter(
            (chat) =>
              chat.sender == localStorage.username ||
              chat.receiver == localStorage.username
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    });
    let a = setInterval(() => {
      farawin.getChats().then((response) => {
        setChatList(
          response.chatList
            .filter(
              (chat) =>
                chat.sender == localStorage.username ||
                chat.receiver == localStorage.username
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        );
      });
    }, 500000);
    return () => {
      clearInterval(a);
    };
  }, []);

  return (
    <div className="box_shadow relative flex w-9/12 h-[90vh] bg-[#20232a] overflow-hidden text-white rounded-2xl pt-6 pb-1 mx-3">
      <SideBar
        contacts={contactList}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
        chatList={chatList}
        widthSidbar={widthSidbar}
      />
      <ContentBox
        setContacts={setContactList}
        selectedContact={selectedContact}
        chats={chatList?.filter(
          (chat) =>
            chat.receiver == selectedContact.username ||
            chat.sender == selectedContact.username
        )}
        setChats={setChatList}
        setWidth={setWidth}
      />
    </div>
  );
}
