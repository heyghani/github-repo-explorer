import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import ListUser from "../../components/ListUser";

describe("ListUser Component", () => {
  test("renders user list", () => {
    renderWithProviders(<ListUser />, {
      preloadedState: {
        github: {
          users: [{ id: 53455334, login: "heyghani" }],
          repositories: {},
        },
      },
    });

    expect(screen.getByText("heyghani")).toBeInTheDocument();
  });

  test("expands user details on click", () => {
    renderWithProviders(<ListUser />, {
      preloadedState: {
        github: {
          users: [{ id: 53455334, login: "heyghani" }],
          repositories: {},
        },
      },
    });

    const userElement = screen.getByText("heyghani");
    fireEvent.click(userElement);

    expect(screen.getByText("Loading repositories...")).toBeInTheDocument();
  });

  test("displays repositories when available", () => {
    renderWithProviders(<ListUser />, {
      preloadedState: {
        github: {
          users: [{ id: 53455334, login: "heyghani" }],
          repositories: {
            heyghani: [
              {
                id: 1,
                name: "my-repo",
                description: "Test repository",
                stargazers_count: 5,
              },
            ],
          },
        },
      },
    });

    const userElement = screen.getByText("heyghani");
    fireEvent.click(userElement);

    expect(screen.getByText("my-repo")).toBeInTheDocument();
    expect(screen.getByText("Test repository")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
