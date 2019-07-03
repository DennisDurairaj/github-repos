import React from 'react';
// import { fetchRepos } from "../../state/entities/index";
import { fetchUser } from '../../state/users/';
import { fetchRepos, fetchNextPage } from '../../state/repos/';
import { connect } from 'react-redux';
import Search from '../../components/Search/Search';
// import Repos from "../Repos/Repos";
// import List from "../../components/List/List";
import { getUserRepos } from '../../selectors';

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
      <Search onSubmit={handleSubmit} />
      {error && <p>Error: {error}</p>}
      {isFetchingRepos === false && !error &&
        userRepos.map(repo => <p key={repo.id}>{repo.name}</p>)}
      {userRepos.length > 0 && !error && reachedLastPage === false && (
        <button onClick={nextPage}>Load more</button>
      )}
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
