import "./App.css";
import { Avatar, Name } from "@paperclip-labs/whisk-sdk/identity";

function App() {
  const address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Avatar address={address} size={32} />
      <Name address={address} />
    </div>
  );
}

export default App;
