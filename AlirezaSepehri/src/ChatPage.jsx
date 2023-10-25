import farawin from "farawin";
import SideBar from "./SideBar";
import ContentBox from "./ContentBox";
import { useEffect, useRef, useState } from "react";

export default function ChatPage() {
  const [contactList, setContactList] = useState(null);
  const [selectedContact, setSelectedContact] = useState("");
  const [chatList, setChatList] = useState(null);

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
            (message) =>
              message.sender == localStorage.username ||
              message.receiver == localStorage.username
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    });
    let a = setInterval(() => {
      farawin.getChats().then((response) => {
        setChatList(
          response.chatList
            .filter(
              (message) =>
                message.sender == localStorage.username ||
                message.receiver == localStorage.username
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
    <div className="box_shadow flex w-9/12 h-[90vh] bg-[#20232a] text-white rounded-2xl pt-6 pb-1 mx-3">
      <SideBar
        contacts={contactList}
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <ContentBox
        setContacts={setContactList}
        selectedContact={selectedContact}
        chats={chatList}
        setChats={setChatList}
      />
    </div>
  );
}
