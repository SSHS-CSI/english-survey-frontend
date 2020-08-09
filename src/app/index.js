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
const SignUp = require("./signup.js");

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
    fetchFailure,
    logoutSuccess
} = require("./actions.js");

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    },
    box: {
        border: "1px solid black",
        margin: "20px",
        marginLeft: "10%",
        padding: "15px",
        width: "60%",
        fontSize: "15px",
    }
});

const App = ({ isLoading, fetchData, isAuthorized, logoutSuccess }) => {
    const classes = useStyles();
    useEffect(fetchData, []);
    const history = useHistory();
    return (
        <>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Title />
                    </Typography>
                    {isAuthorized && <Button color="inherit" onClick={async () => {
                        await fetch("/auth/logout", {
                            method: "POST"
                        });
                        logoutSuccess();
                        history.push("/login");
                    }}>Logout</Button>}
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
                    <Route path="/signup">
                        <SignUp />
                    </Route>
                    <Route path="/">
                        <Questions />
                        <StudentNavigation />
                        <div className={classes.box}>
                            <div style={{ textAlign: "center"}}>How to Judge Comprehensibility?</div>
                            <p>1. Incomprehensible speech means that the speaker to whom you listened to was hard to understand / required a lot of effort to understand / made it difficult to grasp the meaning / was unclear in the given context.</p>
                            <p>2. If the speech was clear / easy to understand / required little effort to understand / made it simple to grasp the meaning, the speaker is highly comprehensible.</p>
                        </div>
                        <img src="/static/ex.jpg" style={{
                            float: "right",
                            width: "100%",
                            maxWidth: 320,
                            marginTop: "-210px",
                            marginRight: "80px",
                        }}></img>
                        <div className={classes.box}>
                            <div style={{ textAlign: "center"}}>How to Judge Fluency?</div>
                            <p>1. <span style={{ color: "rgb(255,0,0)"}}>speech rate</span></p>
                            <p>2. <span style={{ color: "rgb(255,0,0)"}}>hesitation</span> (① numbers and length of unfilled or non-lexical filled pauses such as ah-, uhm-, uh-, ② repetitions, ③ self-corrections)</p>
                            <p>3. <span style={{ color: "rgb(255,0,0)"}}>formulaic sequences or ‘chunks.’</span></p>
                        </div>
                    </Route>
                </Switch>
            </BlockUi>
        </>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    responses: state.responses,
    isLoading: state.fetch.loadingStudentCount || state.fetch.loadingQuestions,
    isAuthorized: state.isAuthorized
});

const mapDispatchToProps = dispatch => ({
    logoutSuccess: () => dispatch(logoutSuccess()),
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
