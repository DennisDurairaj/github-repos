import React from "react";
// import { fetchRepos } from "../../state/entities/index";
import { fetchUser } from "../../state/users/";
import { fetchRepos } from "../../state/repos/";
import { connect } from "react-redux";
import Search from "../../components/Search/Search";
// import Repos from "../Repos/Repos";
// import List from "../../components/List/List";
import { getUserRepos } from "../../selectors";

function Home({ fetchUser, fetchRepos, isFetchingRepos, userRepos }) {
  const handleSubmit = search => {
    fetchUser(search);
    fetchRepos(search);
  };

  return (
    <React.Fragment>
      <Search onSubmit={handleSubmit} />
      {isFetchingRepos === false && userRepos.map(repo => <p>{repo.name}</p>)}
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => ({
  userRepos: getUserRepos(state, ownProps),
  isFetchingRepos: state.repoReducer.isFetching
});

const mapDispatchToProps = {
  fetchUser,
  fetchRepos
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
