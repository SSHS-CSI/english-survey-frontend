const React = require("react");
const { useState } = React;
const { default: useInterval } = require("@use-it/interval");
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");

const Button = require("@material-ui/core/Button").default;
const Container = require("@material-ui/core/Container").default;
const Grid = require("@material-ui/core/Grid").default;
const Hidden = require("@material-ui/core/Hidden").default;
const CircularProgress = require("@material-ui/core/CircularProgress").default;

const {
    movetoNextStudent,
    movetoPrevStudent,
    saveResponse
} = require("./actions.js");

const useStyles = makeStyles(theme => ({
    surveyContainer: {
        marginTop: theme.spacing(2)
    },
    studentButton: {
        width: "100%"
    },
    saveButton: {
        height: 36
    },
    saveProgress: {
        marginRight: theme.spacing(1)
    }
}));

const StudentNavigation = ({
    student,
    studentCount,
    nextStudent,
    prevStudent,
    responses,
    shouldSaveResponse,
    dispatchSaveResponse
}) => {
    const classes = useStyles();
    const [isSaving, setIsSaving] = useState(false);
    const StudentButton = ({ className, ...props }) => (
        <Button
            variant="contained"
            className={`${classes.studentButton} ${className || ""}`}
            {...props}
        />
    );

    const saveResponse = async () => {
        console.log("saveResponse");
        console.log(responses);
        if(!shouldSaveResponse) {
            console.log("shouldSaveResponse = ", shouldSaveResponse);
            return;
        }
        setIsSaving(true);
        dispatchSaveResponse();
        const responseResponse = await fetch("/survey/response", {
            method: "POST",
            body: JSON.stringify({
                data: responses[student],
                pageNum: student
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const repsonseResult = await responseResponse.json();
        setIsSaving(false);
        console.log(repsonseResult);
    };

    useInterval(saveResponse, 6000);

    return (
        <Container>
            <Grid container spacing={2} justify="center">
                <Hidden xsDown>
                    <Grid item sm={2} />
                </Hidden>
                <Grid item xs={12} sm={4}>
                    <StudentButton
                        onClick={() => {
                            saveResponse();
                            prevStudent({ student, responses });
                        }}
                        disabled={student === 0}
                    >
                        Previous Student
                    </StudentButton>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <StudentButton
                        onClick={() => {
                            saveResponse();
                            nextStudent({ student, responses });
                        }}
                        disabled={student === studentCount - 1}
                    >
                        Next Student
                    </StudentButton>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <StudentButton disabled={!shouldSaveResponse} onClick={saveResponse} className={isSaving && classes.saveButton}>
                        {!isSaving ? "Save Response" : 
                         <>
                             <CircularProgress size={16} className={classes.saveProgress} />
                             Saving...
                         </>
                        }
                    </StudentButton>
                </Grid>
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    responses: state.responses,
    studentCount: state.fetch.count,
    shouldSaveResponse: state.shouldSaveResponse
});

const mapDispatchToProps = dispatch => ({
    nextStudent: () => {
        dispatch(movetoNextStudent());
    },
    prevStudent: () => {
        dispatch(movetoPrevStudent());
    },
    dispatchSaveResponse: () => {
        dispatch(saveResponse());
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(StudentNavigation);
