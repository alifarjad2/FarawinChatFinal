import ChatPage from "./ChatPage";
import FormAuth from "./FormAuth";

function App() {
  return (
    <div
      className="select-none flex justify-center items-center py-10 min-h-full h-max"
      style={{
        background: `url(
        https://colorlib.com/etc/lf/Login_v4/images/bg-01.jpg
      )`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%  100%",
      }}
    >
      {localStorage.username && <ChatPage />}
      {!localStorage.username && <FormAuth />}
    </div>
  );
}

export default App;
