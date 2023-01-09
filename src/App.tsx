import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { useThemeContext } from "./hooks/useThemeContext";

function App() {
  const { isDark } = useThemeContext();
  return (
    <div className={`flex min-h-screen flex-col ${isDark ? "dark" : null}`}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
