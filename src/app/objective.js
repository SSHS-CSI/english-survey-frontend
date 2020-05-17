const React = require("react");
const { makeStyles } = require("@material-ui/core/styles");

const CardActions = require("@material-ui/core/CardActions").default;
const CardContent = require("@material-ui/core/CardContent").default;
const Typography = require("@material-ui/core/Typography").default;

const Slider = require("./slider.js");

const useStyles = makeStyles(theme => ({
    cardActions: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: 0
    }
}));

function Objective({ question, value, onChange }) {
    const classes = useStyles();
    return (
        <li>
            <CardContent>
                <Typography>{question.content}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Slider
                    value={value}
                    marks={[...Array(question.selectCount).keys()].map(i => ({
                        value: i + 1,
                        label: `${i + 1}`
                    }))}
                    min={1}
                    max={question.selectCount}
                    defaultValue={1}
                    onChange={(_, value) => onChange(value)}
                />
            </CardActions>
        </li>
    );
}

module.exports = Objective;
