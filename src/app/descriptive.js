const React = require("react");
const propTypes = require('prop-types');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Card = require('@material-ui/core/Card').default;
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

function descriptive({ questionIndex, content, ...props }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <>
            <CardContent>
                <Typography>
                    {questionIndex}. {content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardactions}>
                <TextField
                    multiline
                    fullWidth
                    className={classes.textField}
                    margin="none"
                    variant="outlined"
                />
            </CardActions>
        </>
    );
}

module.exports = descriptive;