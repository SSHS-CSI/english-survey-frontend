const React = require("react");
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");
const { default: produce } = require("immer");

const Card = require("@material-ui/core/Card").default;

const { updateResponse, editResponse } = require("./actions.js");
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
    },
    editResponse: () => dispatch(editResponse())
});

const Survey = ({ questions, response, location, student, updateResponse, editResponse }) => {
    const classes = useStyles();
    return (
        <Card>
            <ol className={classes.orderedList}>
                <audio
                    controls
                    src={`/static/audio/student.${student + 1}.${location == "left" ? "pre" : "post"}.m4a`}>
                </audio>
                {questions.map(({ type, ...question }, index) => {
                    const QuestionComponent =
                          type === "objective" ? Objective : Descriptive;
                    return (
                        <QuestionComponent
                            key={`survey-${location}-${type}-${index}`}
                            question={question}
                            value={response ? response[index][location] : type === "objective" ? 0 : ""}
                            onChange={value => {
                                editResponse();
                                const newResponse = produce(
                                    response,
                                    response => {
                                        response[index][location] = value;
                                    }
                                );
                                updateResponse(newResponse, student);
                            }}
                        />
                    );
                })}
            </ol>
        </Card>
    );
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Survey);
