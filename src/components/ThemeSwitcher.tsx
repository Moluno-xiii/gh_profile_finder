import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark" | "red" | "blue";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    document.documentElement.className = `theme-${localTheme}`;
  }, [theme]);

  const handleTheme = (value: Theme) => {
    localStorage.setItem("theme", value);
    setTheme(value);
    setIsDropDownOpen(false);
  };

  return (
    <div className="flex text-text flex-col gap-y-5 justify-center">
      <button
        onClick={() => setIsDropDownOpen((state) => !state)}
        className="btn hover:rotate-180  self-end"
      >
        change theme
      </button>
      {isDropDownOpen && (
        <div className="flex flex-col gap-y-3 capitalize max-w-sm items-center justify-centers">
          <button className="btn" onClick={() => handleTheme("light")}>
            Light Theme
          </button>
          <button className="btn" onClick={() => handleTheme("dark")}>
            Dark Theme
          </button>
          <button className="btn" onClick={() => handleTheme("red")}>
            Red Theme
          </button>
          <button className="btn" onClick={() => handleTheme("blue")}>
            Blue Theme
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
