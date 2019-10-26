const React = require("react");
const { makeStyles } = require('@material-ui/core/styles');

const Objective = require("./objective.js");
const Survey = require("./survey.js");

const Grid = require("@material-ui/core/Grid").default;

const App = () => (
    <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <Survey />
        </Grid>
        <Grid item xs={12} md={6}>
            <Survey />
        </Grid>
    </Grid>
)

module.exports = App;