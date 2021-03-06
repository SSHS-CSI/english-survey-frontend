const React = require("react");

const { useState, useEffect } = React;
const { connect } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { makeStyles } = require("@material-ui/core/styles");

const Survey = require("./survey.js");

const Container = require("@material-ui/core/Container").default;
const Grid = require("@material-ui/core/Grid").default;

const {
    fetchResponsesSuccess,
    loginSuccess
} = require("./actions.js");

const useStyles = makeStyles(theme => ({
    surveyContainer: {
        marginTop: theme.spacing(2)
    }
}));

let randomNums = [];

const Questions = ({ student, studentCount, fetchResponse, random }) => {
    const history = useHistory();
    useEffect(() => fetchResponse(history), []);
    const classes = useStyles();
    if (randomNums.length == 0) {
        for (let i = 0; i < studentCount; i++) {
            randomNums.push(Math.random());
        }
    }
    const locations = (randomNums[student] > 0.5) ? ["left", "right"] : ["right", "left"];
    return (
        <Container className={classes.surveyContainer}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Survey location={locations[0]} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Survey location={locations[1]} />
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    studentCount: state.fetch.count,
    responses: state.responses,
});

const mapDispatchToProps = dispatch => ({
    fetchResponse: history => {
        dispatch(async () => {
            const responseResponse = await fetch("/survey/response");
            if(responseResponse.status === 401) {
                history.push("/login");
                return;
            } else if (responseResponse.status === 404) {
                dispatch(loginSuccess());
                history.push("/admin");
                return;
            }

            const responseResult = await responseResponse.json();
            dispatch(fetchResponsesSuccess(responseResult.data));
        });
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Questions);
