import React from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Link,
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
  subTitle: {
    maxWidth: "80%"
  }
}));

function Listing({ isFetching, list, error }) {
  const classes = useStyles();

  return (
    <List dense>
      {isFetching === false &&
        !error &&
        list.map(item => (
          <Grid item key={item.id}>
            <ListItem className={classes.ListItem} divider={true}>
              <ListItemText
                primary={
                  <Link href={item.html_url} target="_blank" rel="noreferrer">
                    {item.name}
                  </Link>
                }
                secondary={
                  <Typography
                    variant="body2"
                    component="p"
                    color="textSecondary"
                    className={classes.subTitle}>
                    {item.description}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Breadcrumbs aria-label="Breadcrumb">
                  <Typography color="textSecondary" className={classes.link}>
                    <Octicon name="star" /> {item.stargazers_count}
                  </Typography>
                  <Typography color="textSecondary" className={classes.link}>
                    <Octicon name="git-branch" /> {item.forks_count}
                  </Typography>
                  {item.language && (
                    <Typography color="textSecondary" className={classes.link}>
                      {item.language}
                    </Typography>
                  )}
                </Breadcrumbs>
              </ListItemSecondaryAction>
            </ListItem>
          </Grid>
        ))}
    </List>
  );
}

export default Listing;
