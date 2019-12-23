const React = require("react");
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");
const { default: produce } = require("immer");

const Card = require("@material-ui/core/Card").default;

const { updateResponse } = require("./actions.js");
const Objective = require("./objective.js");
const Descriptive = require("./descriptive.js");

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
    questions: state.fetch.questions,
    response: state.responses[state.student],
    student: state.student
});

const mapDispatchToProps = dispatch => ({
    updateResponse: (response, student) => {
        dispatch(updateResponse(response, student));
    }
});

const Survey = ({ questions, response, location, student, updateResponse }) => {
    const classes = useStyles();
    return (
        <Card>
            <ol className={classes.orderedList}>
                {questions.map(({ type, ...question }, index) => {
                    const QuestionComponent =
                        type === "objective" ? Objective : Descriptive;
                    return (
                        response ?
                            <QuestionComponent
                                key={`survey-${location}-${type}-${index}`}
                                question={question}
                                value={response[index][location]}
                                onChange={value => {
                                    const newResponse = produce(
                                        response,
                                        response => {
                                            response[index][location] = value;
                                        }
                                    );
                                    updateResponse(newResponse, student);
                                }}
                            /> : null
                    );
                })}
            </ol>
        </Card>
    );
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Survey);
