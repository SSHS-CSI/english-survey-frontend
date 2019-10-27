const React = require("react");
const { makeStyles, useTheme } = require("@material-ui/core/styles");

const Slider = require("@material-ui/core/Slider").default;
const CardActions = require("@material-ui/core/CardActions").default;
const CardContent = require("@material-ui/core/CardContent").default;
const Typography = require("@material-ui/core/Typography").default;

const useStyles = makeStyles(theme => ({
    cardActions: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: 0,
    }
}))


function Objective({ data, updateResponse, ...props }) {
    const classes = useStyles();
    const marks = [...Array(data.selectCount).keys()].map(i => ({ value: i + 1, label: `${i + 1}` }));
    let value;

    return (
        <li>
            <CardContent>
                <Typography>
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Slider value={data.response} marks={marks} min={1} max={data.selectCount} defaultValue={1} onChange={(_, value) => updateResponse(value)} />
            </CardActions>
        </li>
    );
}

module.exports = Objective;