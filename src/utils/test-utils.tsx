import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import githubReducer, { GitHubState } from "../store/githubSlice";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      github: { users: [], repositories: {} },
    },
    store = configureStore({
      reducer: { github: githubReducer },
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState?: { github: GitHubState };
    store?: ReturnType<typeof configureStore>;
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
