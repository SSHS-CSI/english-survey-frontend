const React = require("react");
const { useEffect } = React;
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");

const Survey = require("./survey.js");

const AppBar = require("@material-ui/core/AppBar").default;
const Button = require("@material-ui/core/Button").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const Typography = require("@material-ui/core/Typography").default;
const CssBaseline = require("@material-ui/core/CssBaseline").default;
const Container = require("@material-ui/core/Container").default;
const Grid = require("@material-ui/core/Grid").default;

const {
    movetoNextStudent,
    movetoPrevStudent,
    replaceResponse,
    fetchBegin,
    fetchStudentCountSuccess,
    fetchQuestionsSuccess,
    fetchResponsesSuccess,
    fetchFailure
} = require("./actions.js");

const {
    pushResponses,
    fetchResponses,
    fetchStudentCount,
    fetchQuestions
} = require("../../mock");

const useStyles = makeStyles(theme => ({
    surveyContainer: {
        marginTop: theme.spacing(2)
    },
    studentButton: {
        width: "100%"
    }
}));

const App = ({
    student,
    nextStudent,
    prevStudent,
    responses,
    fetchData,
    isLoading
}) => {
    useEffect(fetchData, []);
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Student #{student}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Container
                        maxWidth="xl"
                        className={classes.surveyContainer}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Survey location="left" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Survey location="right" />
                            </Grid>
                        </Grid>
                    </Container>
                    <Container maxWidth="sm">
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        prevStudent({ student, responses })
                                    }
                                    className={classes.studentButton}
                                    disabled={student === 0}
                                >
                                    Previous Student
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        nextStudent({ student, responses })
                                    }
                                    className={classes.studentButton}
                                >
                                    Next Student
                                </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )}
        </>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    responses: state.responses,
    isLoading: state.fetch.loadingStudentCount || state.fetch.loadingQuestions
});

const mapDispatchToProps = dispatch => ({
    fetchData: () => {
        dispatch(fetchBegin());
        dispatch(async () => {
            try {
                const [studentCount, questions, responses] = await Promise.all([
                    fetchStudentCount(),
                    fetchQuestions(),
                    fetchResponses()
                ]);
                dispatch(fetchStudentCountSuccess(studentCount));
                dispatch(fetchQuestionsSuccess(questions));
                dispatch(fetchResponsesSuccess(responses));
            } catch (error) {
                dispatch(fetchFailure(error));
            }
        });
    },
    nextStudent: data => {
        dispatch(movetoNextStudent());
    },
    prevStudent: data => {
        dispatch(movetoPrevStudent());
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
