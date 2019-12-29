const React = require("react");
const { useEffect } = React;
const { connect } = require("react-redux");
const { BrowserRouter: Router, Route } = require("react-router-dom");
const { makeStyles } = require("@material-ui/core/styles");

const Survey = require("./survey.js");

const Button = require("@material-ui/core/Button").default;
const Container = require("@material-ui/core/Container").default;
const Grid = require("@material-ui/core/Grid").default;

const useStyles = makeStyles(theme => ({
    surveyContainer: {
        marginTop: theme.spacing(2)
    }
}));

const Questions = ({
}) => {
    const classes = useStyles();
    return (
        <Container className={classes.surveyContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Survey location="left" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Survey location="right" />
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    responses: state.responses,
});

module.exports = connect(mapStateToProps)(Questions);
