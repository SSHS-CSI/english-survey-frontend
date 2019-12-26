const React = require("react");
const { useEffect } = React;
const { connect } = require("react-redux");
const { BrowserRouter: Router, Route, Switch } = require("react-router-dom");
const { makeStyles } = require("@material-ui/core/styles");

const Login = require("./login.js");
const Title = require("./title.js");
const Questions = require("./questions.js");
const StudentNavigation = require("./student-navigation.js");

const AppBar = require("@material-ui/core/AppBar").default;
const Button = require("@material-ui/core/Button").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const Typography = require("@material-ui/core/Typography").default;
const CssBaseline = require("@material-ui/core/CssBaseline").default;

const {
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

const App = ({
    student,
    isLoading,
    fetchData
}) => {
    useEffect(fetchData, []);
    return (
        <Router>
            <CssBaseline />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                <Title />
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route path="/survey">
                            <Questions />
                            <StudentNavigation />
                        </Route>
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </>
            )}
        </Router>
    );
};

const mapStateToProps = state => ({
    student: state.student,
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
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
