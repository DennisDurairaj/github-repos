import React, { useState } from "react";
import { TextField, Button, Grid, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  searchInput: {
    display: 'flex',
    flexGrow: 1
  }
}));

function Search({ onSubmit }) {
  const [search, setSearch] = useState("");
  const classes = useStyles();

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" spacing={1}>
        <Grid xs={11} item>
          <TextField
            id="search"
            label="Search for a user's repositories"
            className={classes.searchInput}
            value={search}
            onChange={handleChange}
            margin="normal"
            autoFocus
            InputProps={{
              startAdornment: <SearchIcon position="start" />
            }}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Search;
