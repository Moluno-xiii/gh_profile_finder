import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark" | "red" | "blue";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    document.documentElement.className = `theme-${localTheme}`;
    console.log(localTheme);
    console.log(theme);
  }, [theme]);

  const handleTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    setTheme(value);
    setIsDropDownOpen(false);
  };

  return (
    <div className="flex flex-col gap-y-5 justify-center">
      <button
        onClick={() => setIsDropDownOpen((state) => !state)}
        className="cursor-pointer bg-secondary hover:rotate-180 transition-all duration-500 self-end"
      >
        icon
      </button>
      {isDropDownOpen && (
        <div className="flex flex-col gap-y-3 capitalize max-w-sm items-center justify-centers">
          <button className="" onClick={() => handleTheme("light")}>
            Light Theme
          </button>
          <button className="" onClick={() => handleTheme("dark")}>
            Dark Theme
          </button>
          <button className="" onClick={() => handleTheme("red")}>
            Red Theme
          </button>
          <button className="" onClick={() => handleTheme("blue")}>
            Blue Theme
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
