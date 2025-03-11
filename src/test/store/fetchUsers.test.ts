import { configureStore } from "@reduxjs/toolkit";
import githubReducer, { fetchUsers } from "../../store/githubSlice";

global.fetch = jest.fn();

describe("fetchUsers integration test", () => {
  let store: ReturnType<typeof createTestStore>;

  const createTestStore = () =>
    configureStore({
      reducer: { github: githubReducer },
    });

  beforeEach(() => {
    store = createTestStore();
    jest.clearAllMocks();
  });

  test("fetchUsers updates state with API response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: async () => ({
        items: [{ id: 1, login: "heyghani" }],
      }),
      ok: true,
    });

    await store.dispatch(fetchUsers("heyghani"));

    const state = store.getState().github;

    expect(state.users).toMatchObject([{ id: 53455334, login: "heyghani" }]);
    expect(state.isLoadingUser).toBe(false);
  });

  test("fetchUsers handles empty user", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    await store.dispatch(fetchUsers("Should return no user"));

    const state = store.getState().github;

    expect(state.users).toEqual([]);
    expect(state.isLoadingUser).toBe(false);
  });
});
