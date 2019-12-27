const React = require("react");
const { connect } = require("react-redux");
const { Route, Switch } = require("react-router-dom");

const Title = ({
    student
}) => (
    <Switch>
        <Route path="/admin">Administrator Page</Route>
        <Route path="/login">Login</Route>
        <Route path="/">
            Student #{student}
        </Route>
    </Switch>
);

const mapStateToProps = state => ({
    student: state.student
});

module.exports = connect(mapStateToProps)(Title);
