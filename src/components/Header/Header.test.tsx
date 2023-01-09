import { render, fireEvent, screen } from "@testing-library/react";
import Header from "./Header";
import { ThemeContextProvider } from "../../context/ThemeContext";

describe("Header component with theme button", () => {
  it("renders the button", () => {
    render(
      <ThemeContextProvider>
        <Header />
      </ThemeContextProvider>
    );
    const button = screen.getByRole("themeButton");
    expect(button).toBeInTheDocument();
  });

  it("toggles the theme when the theme button is clicked", () => {
    render(
      <ThemeContextProvider>
        <Header />
      </ThemeContextProvider>
    );
    const button = screen.getByRole("themeButton");
    fireEvent.click(button);
    expect(button).toHaveTextContent("Dark Mode");
  });
});
