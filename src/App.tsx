import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import SearchForm from "./components/SearchForm";
import Loading from "./components/Loading";
import ListUser from "./components/ListUser";

const App: React.FC = () => {
  const { users, isLoadingUser, error } = useSelector(
    (state: RootState) => state.github
  );

  return (
    <div className="container-page">
      <div className="content-wrapper">
        <SearchForm />

        {error && <p className="text-error">{error}</p>}

        {isLoadingUser && !users.length && <Loading />}

        {!isLoadingUser && users.length > 0 && <ListUser />}
      </div>
    </div>
  );
};

export default App;
