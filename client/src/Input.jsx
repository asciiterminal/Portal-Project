import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const ValidationTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "DarkBlue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#5F9EA0",
      },
    },
    "& label.Mui-focused": {
      color: "#5F9EA0",
    },
    "& input:valid + fieldset": {
      borderColor: "#6495ED",
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 1,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function Input(props) {
  const classes = useStyles();

  return (
    <div className="App">
      <ValidationTextField
        className={classes.margin}
        label={props.label}
        variant="outlined"
        type={props.type}
        onChange={props.onChange}
        ty
      />
    </div>
  );
}

export default Input;
