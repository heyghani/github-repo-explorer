import { screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import githubReducer from "../../store/githubSlice";
import { renderWithProviders } from "../../utils/test-utils";
import SearchForm from "../../components/SearchForm";

describe("SearchForm Component", () => {
  test("updates input value on change", () => {
    renderWithProviders(<SearchForm />);

    const input = screen.getByPlaceholderText("Enter username");
    fireEvent.change(input, { target: { value: "heyghani" } });

    expect((input as HTMLInputElement).value).toBe("heyghani");
  });

  test("does not dispatch action with empty input", () => {
    const mockDispatch = jest.fn();
    const mockStore = configureStore({
      reducer: { github: githubReducer },
    });

    jest.spyOn(mockStore, "dispatch").mockImplementation(mockDispatch);

    renderWithProviders(
      <Provider store={mockStore}>
        <SearchForm />
      </Provider>
    );

    const button = screen.getByText("Search");
    fireEvent.click(button);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test("displays loading state when searching", () => {
    renderWithProviders(<SearchForm />, {
      preloadedState: {
        github: { isLoadingUser: true, users: [], repositories: {} },
      },
    });

    expect(screen.getByText("Searching...")).toBeInTheDocument();
  });
});
