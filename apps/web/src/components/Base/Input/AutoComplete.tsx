//@ts-nocheck
import {
  Box,
  ListItem,
  Autocomplete as MuiAutocomplete,
  TextField,
  Theme,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activityItem: { fontSize: 14, padding: "3px", direction: "ltr" },
}));

const AutoComplete = ({ activityInputValue, finalActivities, onChange }) => {
  const classes = useStyles();

  return (
    <>
      <MuiAutocomplete
        getOptionLabel={(activity) => activity.headerContent}
        groupBy={(activity) => activity.header}
        inputValue={activityInputValue}
        options={finalActivities}
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label={"activities"} />
        )}
        renderOption={({ headerContent, ...props }, { inputValue }) => {
          const matches = match(headerContent, inputValue);
          const parts = parse(headerContent, matches);

          return (
            <Tooltip placement="top" title={headerContent}>
              <ListItem className={classes.activityItem} {...props}>
                <Box dir="ltr">
                  {parts.map((part, index) => (
                    <Box.Span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </Box.Span>
                  ))}
                </Box>
              </ListItem>
            </Tooltip>
          );
        }}
        size="small"
        style={{ width: 300 }}
        onInputChange={(_e, value) => onChange(value)}
      />
    </>
  );
};

export default AutoComplete;

// import { matchSorter } from 'match-sorter';

// const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);

// <Autocomplete filterOptions={filterOptions} />;
