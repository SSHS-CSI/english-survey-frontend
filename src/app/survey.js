const React = require("react");
const { connect } = require('react-redux');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Card = require('@material-ui/core/Card').default;

const { updateResponse } = require('./actions.js');
const Objective = require('./objective.js');
const Descriptive = require('./descriptive.js');

const useStyles = makeStyles(theme => ({
    orderedList: {
        listStyleType: "none",
        counterReset: "item",
        "& li .MuiCardContent-root": {
            position: "relative",
            counterIncrement: "item",
            "&::before": {
                position: "absolute",
                left: -theme.spacing(),
                ...theme.typography.body1,
                content: "counter(item)'.'"
            }
        }
    }
}));

const mapStateToProps = state => ({
    data: state.response
})

const mapDispatchToProps = dispatch => ({
    updateResponse: index => (_, value) => dispatch(updateResponse(value, index))
})

function Survey({ data, updateResponse }) {
    const classes = useStyles();
    return (
        <Card>
            <ol className={classes.orderedList}>
                {data.map(({ type, content, selectCount }, index) => {
                    return (type === 'objective') ?
                    <Objective key={`survey-${type}-${index}`} data={data[index]} updateResponse={updateResponse(index)} index={index} />
                    : <Descriptive key={`survey-${type}-${index}`} data={data[index]} updateResponse={updateResponse(index)} index={index} />
                })}
            </ol>
        </Card>
    );
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Survey)
