const React = require("react");
const { useEffect } = React;
const { connect } = require("react-redux");
const {
    BrowserRouter: Router,
    Route,
    Switch,
    useHistory
} = require("react-router-dom");
const { makeStyles } = require("@material-ui/core/styles");
const { default: BlockUi } = require("react-block-ui");
require("react-block-ui/style.css");

const Admin = require("./admin.js");
const Login = require("./login.js");
const Title = require("./title.js");
const Questions = require("./questions.js");
const StudentNavigation = require("./student-navigation.js");
const Explanation = require("./explanation.js");

const AppBar = require("@material-ui/core/AppBar").default;
const Button = require("@material-ui/core/Button").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const Typography = require("@material-ui/core/Typography").default;
const CssBaseline = require("@material-ui/core/CssBaseline").default;
const CircularProgress = require("@material-ui/core/CircularProgress").default;

const {
    fetchBegin,
    fetchStudentCountSuccess,
    fetchQuestionsSuccess,
    fetchFailure
} = require("./actions.js");

const App = ({ isLoading, fetchData }) => {
    useEffect(fetchData, []);
    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        <Title />
                    </Typography>
                </Toolbar>
            </AppBar>
            <BlockUi blocking={isLoading} loader={<CircularProgress />}>
                <Switch>
                    <Route path="/admin">
                        <Admin />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/explanation">
                        <Explanation />
                    </Route>
                    <Route path="/">
                        <Questions />
                        <StudentNavigation />
                    </Route>
                </Switch>
            </BlockUi>
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
                const [
                    studentCountResponse,
                    questionsResponse
                ] = await Promise.all([
                    fetch("/survey/student-count"),
                    fetch("/survey/questions")
                ]);

                const [
                    { status: studentCountStatus, data: studentCount },
                    { status: questionsStatus, data: questions }
                ] = await Promise.all([
                    studentCountResponse.json(),
                    questionsResponse.json()
                ]);

                if(!studentCountStatus || !questionsStatus) {
                    throw new Error();
                }

                dispatch(fetchStudentCountSuccess(studentCount));
                dispatch(fetchQuestionsSuccess(questions));
            } catch (error) {
                dispatch(fetchFailure(error));
            }
        });
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
