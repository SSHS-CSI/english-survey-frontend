const React = require("react");
const propTypes = require('prop-types');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Slider = require('@material-ui/core/Slider').default;
const Card = require('@material-ui/core/Card').default;
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

function Objective({ questionIndex, content, selectCount, ...props }) {
    const classes = useStyles();
    const theme = useTheme();

    const marks = [];
    for (let i = 0; i < selectCount; i++) {
        marks.push({value: i+1, label: `${i + 1}`});
    }
    let value;

    return (
        <>
            <CardContent>
                <Typography>
                    {questionIndex}. {content}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardactions}>
                <Slider
                    value={value}
                    getAriaValueText={value => `${value}`}
                    step={null}
                    marks={marks}
                    valueLabelDisplay="auto"
                    min={1}
                    max={selectCount}
                />
            </CardActions>
        </>
    );
}

Objective.propTypes = {
    questionIndex: propTypes.number.isRequired,
    content: propTypes.string,
    selectCount: propTypes.number.isRequired
}

module.exports = Objective;