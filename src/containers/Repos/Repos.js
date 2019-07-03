import React from "react";
import { fetchUser } from "../../state/users/";
import { fetchRepos, fetchNextPage } from "../../state/repos/";
import { connect } from "react-redux";
import Search from "../../components/Search/Search";
import { getUserRepos } from "../../selectors";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  List: {
    backgroundColor: theme.palette.background.paper
  },
  ListItem: {
    minHeight: "55px"
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%"
  }
}));

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
  const classes = useStyles();
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
        <Grid className={classes.progress} item xs={12}>
          {isFetchingRepos && <CircularProgress />}
        </Grid>
        <Grid item xs={12}>
          <List dense>
            {isFetchingRepos === false &&
              !error &&
              userRepos.map(repo => (
                <Grid item key={repo.id}>
                  <ListItem className={classes.ListItem} divider={true}>
                    <ListItemText
                      primary={repo.name}
                      secondary={repo.description}
                    />
                  </ListItem>
                </Grid>
              ))}
          </List>
        </Grid>
        {error && <p className="error">Error: {error}</p>}
        {isFetchingRepos === false && userRepos.length > 0 &&
          !error &&
          reachedLastPage === false && (
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
