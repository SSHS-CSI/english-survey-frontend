const React = require("react");
const { useEffect } = React;
const { connect } = require("react-redux");
const { makeStyles, useTheme } = require("@material-ui/core/styles");

const fetchFromAPI = require("../../mock");

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
    data: state.fetch.questions
});

const mapDispatchToProps = dispatch => ({
    fetchQuestions: () => {
        dispatch(fetchQuestionsBegin());
        dispatch(async () => {
            dispatch(fetchQuestionsSuccess(await fetchFromAPI()));
        });
    },
    updateResponse: (value, index) => dispatch(updateResponse(value, index))
});

function Survey({ data, updateResponse, fetchQuestions }) {
    useEffect(() => {
        fetchQuestions();
    }, []);
    const classes = useStyles();
    return (
        <Card>
            <ol className={classes.orderedList}>
                {data.map(({ type, content, selectCount }, index) => {
                    const QuestionComponent =
                        type === "objective" ? Objective : Descriptive;
                    return (
                        <QuestionComponent
                            key={`survey-${type}-${index}`}
                            data={data[index]}
                            updateResponse={value =>
                                updateResponse(value, index)
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
