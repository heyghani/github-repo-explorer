import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/githubSlice";
import { AppDispatch, RootState } from "../store/store";

const SearchForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
  const [submittedUsername, setSubmittedUsername] = useState<string | null>(
    null
  );
  const { users, isLoadingUser, error } = useSelector(
    (state: RootState) => state.github
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(fetchUsers(search));
      setSubmittedUsername(search);
    }
  };

  return (
    <form id="form-user" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        type="submit"
        className={` ${
          isLoadingUser ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-600"
        }`}
        disabled={isLoadingUser || !search.trim()}
      >
        {isLoadingUser ? "Searching..." : "Search"}
      </button>

      {submittedUsername && !isLoadingUser && !error && (
        <p className="text-gray-400">
          {users.length
            ? `Showing users for "${submittedUsername}"`
            : `No users found for "${submittedUsername}"`}
        </p>
      )}
    </form>
  );
};

export default SearchForm;
