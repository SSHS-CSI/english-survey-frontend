const React = require("react");
const PropTypes = require("prop-types");
const { makeStyles, useTheme } = require("@material-ui/core/styles");

const CardActions = require("@material-ui/core/CardActions").default;
const CardContent = require("@material-ui/core/CardContent").default;
const Typography = require("@material-ui/core/Typography").default;
const TextField = require("@material-ui/core/TextField").default;

const useStyles = makeStyles(theme => ({
    textField: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    cardActions: {
        paddingTop: 0,
    }
}))

function Descriptive({ data, updateResponse, ...props }) {
    const classes = useStyles();
    return (
        <li>
            <CardContent>
                <Typography>
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <TextField
                    multiline
                    fullWidth
                    value={data.response}
                    onChange={e => updateResponse(e.target.value)}
                    className={classes.textField}
                    margin="none"
                    variant="outlined"
                />
            </CardActions>
        </li>
    );
}

module.exports = Descriptive;