const React = require("react");
const { connect } = require("react-redux");
const { Route, Switch } = require("react-router-dom");

const Title = ({
    student
}) => (
    <Switch>
        <Route path="/survey">
            Student #{student}
        </Route>
        <Route path="/">Login</Route>
    </Switch>
);

const mapStateToProps = state => ({
    student: state.student,
    isLoading: state.fetch.loadingStudentCount || state.fetch.loadingQuestions
});

module.exports = connect(mapStateToProps)(Title);
