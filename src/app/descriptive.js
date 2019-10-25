const React = require("react");
const PropTypes = require('prop-types');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const CardActions = require('@material-ui/core/CardActions').default;
const CardContent = require('@material-ui/core/CardContent').default;
const Typography = require('@material-ui/core/Typography').default;
const TextField = require('@material-ui/core/TextField').default;

const useStyles = makeStyles(theme => ({
    textField: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    cardactions: {
        paddingTop: 0,
    }
}))

function Descriptive({ data, updateResponse, index }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <CardContent>
                <Typography>
                    {index + 1}. {data.content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardactions}>
                <TextField
                    multiline
                    fullWidth
                    value={data.response}
                    onChange={updateResponse}
                    className={classes.textField}
                    margin="none"
                    variant="outlined"
                />
            </CardActions>
        </>
    );
}

Descriptive.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string,
        updateResponse: PropTypes.string
    }),
    index: PropTypes.number.isRequired
}

module.exports = Descriptive;