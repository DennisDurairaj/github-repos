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
  ListItemSecondaryAction,
  CircularProgress,
  Paper,
  Link,
  Button,
  Breadcrumbs,
  Typography,
  makeStyles
} from "@material-ui/core";
import Octicon from "react-component-octicons";

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
  },
  subTitle: {
    maxWidth: "80%"
  },
  paper: {
    padding: theme.spacing(2, 2)
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
          <Paper className={classes.paper}>
            <Search onSubmit={handleSubmit} />
          </Paper>
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
                      primary={
                        <Link
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer">
                          {repo.name}
                        </Link>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          component="p"
                          color="textSecondary"
                          className={classes.subTitle}>
                          {repo.description}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Breadcrumbs aria-label="Breadcrumb">
                        <Typography
                          color="textSecondary"
                          className={classes.link}>
                          <Octicon name="star" /> {repo.stargazers_count}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          className={classes.link}>
                          <Octicon name="git-branch" /> {repo.forks_count}
                        </Typography>
                        {repo.language && (
                          <Typography
                            color="textSecondary"
                            className={classes.link}>
                            {repo.language}
                          </Typography>
                        )}
                      </Breadcrumbs>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              ))}
          </List>
        </Grid>
        {error && (
          <Grid container justify="center">
            <Typography className="error" component="h1">
                Error: {error}
            </Typography>
          </Grid>
        )}
        {isFetchingRepos === false &&
          userRepos.length > 0 &&
          !error &&
          reachedLastPage === false && (
            <Grid container justify="center">
              <Button color="primary" onClick={nextPage}>
                Load more
              </Button>
            </Grid>
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
