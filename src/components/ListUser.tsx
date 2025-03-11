import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchRepositories } from "../store/githubSlice";
import { MdExpandMore, MdStar } from "react-icons/md";

const ListUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, repositories, isLoadingRepo } = useSelector(
    (state: RootState) => state.github
  );
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const handleUserClick = (username: string) => {
    if (expandedUser === username) {
      setExpandedUser(null);
    } else {
      setExpandedUser(username);
      if (!repositories[username]) {
        dispatch(fetchRepositories(username));
      }
    }
  };

  const StarIcon = MdStar as unknown as React.FC<{ className?: string }>;
  const ExpandMoreIcon = MdExpandMore as unknown as React.FC<{
    className?: string;
  }>;

  return (
    <>
      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <div
              className="container-list"
              onClick={() => handleUserClick(user.login)}
            >
              <span className="font-semibold">{user.login}</span>
              <span
                className={`icon-wrapper ${
                  expandedUser === user.login ? "rotate-180" : ""
                }`}
              >
                <ExpandMoreIcon className="text-icon" />
              </span>
            </div>

            <div
              className={`transition-all duration-300 ${
                expandedUser === user.login ? "opacity-100" : "opacity-0"
              }`}
            >
              {expandedUser === user.login && (
                <div className="mt-2 pl-3">
                  {isLoadingRepo ? (
                    <p className="text-loading">Loading repositories...</p>
                  ) : repositories[user.login]?.length > 0 ? (
                    <ul className="transition-opacity duration-300">
                      {repositories[user.login].map((repo) => (
                        <li key={repo.id} className="container-repos">
                          <div>
                            <p className="text-title">{repo.name}</p>
                            <p className="text-desc">
                              {repo.description || "No description available."}
                            </p>
                          </div>
                          <div className="star-wrapper">
                            <span>{repo.stargazers_count}</span>
                            <StarIcon className="text-lg" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-not-found">No repositories found.</p>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListUser;
