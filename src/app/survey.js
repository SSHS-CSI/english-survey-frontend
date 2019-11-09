const React = require("react");
const { useEffect } = React;
const { connect } = require("react-redux");
const { makeStyles, useTheme } = require("@material-ui/core/styles");

const { fetchFromAPI } = require("../../mock");

const Card = require("@material-ui/core/Card").default;

const {
    fetchQuestionsBegin,
    fetchQuestionsFailure,
    fetchQuestionsSuccess,
    updateResponse
} = require("./actions.js");
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
    response: state.response
});

const mapDispatchToProps = dispatch => ({
    fetchQuestions: () => {
        dispatch(fetchQuestionsBegin());
        dispatch(async () => {
            dispatch(fetchQuestionsSuccess(await fetchFromAPI()));
        });
    },
    updateResponse: (value, index, location) =>
        dispatch(updateResponse(value, index, location))
});

function Survey({
    questions,
    response,
    location,
    updateResponse,
    fetchQuestions
}) {
    useEffect(() => {
        fetchQuestions();
    }, []);
    const classes = useStyles();
    return (
        <Card>
            <ol className={classes.orderedList}>
                {questions.map(({ type, ...question }, index) => {
                    const QuestionComponent =
                        type === "objective" ? Objective : Descriptive;
                    return (
                        <QuestionComponent
                            key={`survey-${type}-${index}`}
                            question={question}
                            response={response[index][location]}
                            updateResponse={value =>
                                updateResponse(value, index, location)
                            }
                        />
                    );
                })}
            </ol>
        </Card>
    );
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Survey);
