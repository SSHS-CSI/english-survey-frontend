const React = require("react");
const MuiSlider = require("@material-ui/core/Slider").default;
const FormHelperText = require("@material-ui/core/FormHelperText").default;
const { makeStyles } = require("@material-ui/core/styles");

let useStyles = makeStyles(theme => ({
    root: {
        '&$error': {
            color: theme.palette.error.main
        }
    },
    helperText: {
        marginTop: -6
    },
    error: {}
}));

function Slider({ error, helperText, ...props }) {
    const classes = useStyles();
    return (
        <>
            <MuiSlider className={error ? classes.error : ""}
                       classes={{ root: classes.root }} {...props} />
            <FormHelperText className={classes.helperText} error={error}>
                {helperText}
            </FormHelperText>
        </>
    );
}

module.exports = Slider;
