import Form from "./components/Form";
import ThemeSwitcher from "./components/ThemeSwitcher";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="font-space-grotesk text-text bg-background min-h-dvh p-3 md:p-6 mx-auto max-w-7xl flex flex-col gap-y-5">
      <ThemeSwitcher />
      <header className="text-3xl text-center">Github Profile Finder</header>
      <Form />
      <UserProfile />
    </div>
  );
}

export default App;
