import { screen, waitFor, renderHook, fireEvent } from "@testing-library/react";
import { ProductsContextProvider } from "../../context/ProductsContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { useProductsContext } from "../../hooks/useProductsContext";
import { ModalContextProvider } from "../../context/ModalContext";
import App from "../../App";
import { ThemeContextProvider } from "../../context/ThemeContext";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();
const wrapper = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ProductsContextProvider>
        <ModalContextProvider>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </ModalContextProvider>
      </ProductsContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe("Products component", () => {
  it("display loader", async () => {
    const { result } = renderHook(
      () => {
        useProductsContext();
      },
      { wrapper }
    );

    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
  });

  it("show data from api", async () => {
    const { result } = renderHook(() => useProductsContext(), { wrapper });
    await waitFor(async () => {
      const items = await screen.findAllByLabelText("apiItemId");
      expect(items[0]).toHaveAttribute("role", "apiItem-1");
    });
  });

  it("show filtered data", async () => {
    const { result } = renderHook(() => useProductsContext(), { wrapper });

    const input = screen.getByPlaceholderText("Find by id");
    fireEvent.change(input, { target: { value: 2 } });
    await waitFor(() => {
      const item = screen.getByRole("apiItem-" + 2);
      expect(item).toBeInTheDocument();
    });
  });

  it("pagination - show item from second page", async () => {
    const { result } = renderHook(() => useProductsContext(), { wrapper });

    const nextBtn = screen.getByText("next page");
    const prevBtn = screen.getByText("previous page");
    userEvent.click(nextBtn);
    userEvent.click(prevBtn);

    await waitFor(async () => {
      const item = await screen.findByRole("apiItem-" + 2);
      expect(item).toBeInTheDocument();
    });
  });
});
