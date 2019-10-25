const React = require("react");
const PropTypes = require('prop-types');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Slider = require('@material-ui/core/Slider').default;
const CardActions = require('@material-ui/core/CardActions').default;
const CardContent = require('@material-ui/core/CardContent').default;
const Typography = require('@material-ui/core/Typography').default;

const useStyles = makeStyles(theme => ({
    cardactions: {
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: 0,
    }
}))

function Objective({ data, updateResponse, index }) {
    const classes = useStyles();
    const theme = useTheme();

    const marks = [];
    for (let i = 0; i < data.selectCount; i++) {
        marks.push({value: i+1, label: `${i + 1}`});
    }

    return (
        <>
            <CardContent>
                <Typography>
                    {index + 1}. {data.content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardactions}>
                <Slider
                    defaultValue={1}
                    value={data.response}
                    onChange={updateResponse}
                    getAriaValueText={value => `${value}`}
                    step={null}
                    marks={marks}
                    valueLabelDisplay="auto"
                    min={1}
                    max={data.selectCount}
                />
            </CardActions>
        </>
    );
}

Objective.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string,
        updateResponse: PropTypes.number.isRequired,
        selectCount: PropTypes.number.isRequired
    }),
    index: PropTypes.number.isRequired
}

module.exports = Objective;