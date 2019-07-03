import React from "react";
import { fetchUser } from "../../state/users/";
import { fetchRepos, fetchNextPage } from "../../state/repos/";
import { connect } from "react-redux";
import Search from "../../components/Search/Search";
import { getUserRepos } from "../../selectors";
import { Grid } from "@material-ui/core";

function Home({
  fetchUser,
  fetchRepos,
  fetchNextPage,
  isFetchingRepos,
  userRepos,
  page,
  reachedLastPage,
  error
}) {
  const handleSubmit = search => {
    fetchUser(search);
  };

  const nextPage = () => {
    fetchNextPage(page + 1);
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Search onSubmit={handleSubmit} />
        </Grid>

        {error && <p className="error">Error: {error}</p>}
        <ul>
        {isFetchingRepos === false &&
          !error &&
          userRepos.map(repo => <li key={repo.id}>{repo.name}</li>)}
      </ul>
      {userRepos.length > 0 && !error && reachedLastPage === false && (
        <button onClick={nextPage}>Load more</button>
      )}
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => ({
  userRepos: getUserRepos(state, ownProps),
  isFetchingRepos: state.repoReducer.isFetching,
  page: state.repoReducer.currentPage,
  reachedLastPage: state.repoReducer.reachedLastPage,
  error: state.userReducer.error
});

const mapDispatchToProps = {
  fetchUser,
  fetchRepos,
  fetchNextPage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
