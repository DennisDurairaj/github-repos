import React from 'react';
import { connect } from 'react-redux';
import { makeGetUserRepos } from '../../selectors';
import List from '../../components/List/List';
import Loading from '../../components/Loading/Loading';

function Repos({ repos, isFetching }) {
  console.log(repos);
  return (
    <React.Fragment>
      {repos && repos.length > 0 ? (
        repos.map(repo => <p key={repo.id}>{repo.name}</p>)
      ) : (
        <p>Enter username</p>
      )}
      {isFetching && <p>Loading...</p>}
    </React.Fragment>
  );
}

const makeMapStateToProps = () => {
  const getUserRepos = makeGetUserRepos();
  const mapStateToProps = (state, ownProps) => {
    return {
      isFetching: state.fetching.isFetching,
      currentUser: state.entitiesReducer.currentUser,
      repos: getUserRepos(state, ownProps)
    };
  };
  return mapStateToProps;
};

export default connect(
  makeMapStateToProps,
  null
)(Repos);
