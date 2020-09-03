const React = require("react");
const { connect } = require("react-redux");
const { Route, Switch } = require("react-router-dom");

const Title = ({
    student
}) => {
    let titleString;
    if (student < 3)
        titleString = `Sample #${student + 1}`;
    else
        titleString = `Student #${student - 2}`;
    
    return (
        <Switch>
            <Route path="/admin">Administrator Page</Route>
            <Route path="/login">Login</Route>
            <Route path="/explanation">Explanation</Route>
            <Route path="/signup">Sign Up</Route>
            <Route path="/">
                {titleString}
            </Route>
        </Switch>
    );
}

const mapStateToProps = state => ({
    student: state.student
});

module.exports = connect(mapStateToProps)(Title);
