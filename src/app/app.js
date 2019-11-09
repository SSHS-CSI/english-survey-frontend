const React = require("react");
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");

const Objective = require("./objective.js");
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
    replaceResponse
} = require("./actions.js");

const { pushToAPI, getFromAPI } = require("../../mock");

const useStyles = makeStyles(theme => ({
    surveyContainer: {
        marginTop: theme.spacing(2)
    },
    studentButton: {
        width: "100%"
    }
}));

const App = ({ student, nextStudent, prevStudent, response }) => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Student #{student}</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" className={classes.surveyContainer}>
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
                            onClick={() => prevStudent({ student, response })}
                            className={classes.studentButton}
                            disabled={student === 0}
                        >
                            Previous Student
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            onClick={() => nextStudent({ student, response })}
                            className={classes.studentButton}
                        >
                            Next Student
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    response: state.response
});

const mapDispatchToProps = dispatch => ({
    nextStudent: data => {
        dispatch(movetoNextStudent());
        dispatch(async () => {
            await pushToAPI(data);
        });
        dispatch(async () =>
            dispatch(
                replaceResponse((await getFromAPI(data.student + 1)).response)
            )
        );
    },
    prevStudent: data => {
        dispatch(movetoPrevStudent());
        dispatch(async () => {
            await pushToAPI(data);
        });
        dispatch(async () =>
            dispatch(
                replaceResponse((await getFromAPI(data.student - 1)).response)
            )
        );
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
