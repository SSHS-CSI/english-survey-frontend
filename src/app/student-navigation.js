const React = require("react");
const { useState } = React;
const { default: useInterval } = require("@use-it/interval");
const { useHistory } = require("react-router-dom");
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");

const Button = require("@material-ui/core/Button").default;
const Container = require("@material-ui/core/Container").default;
const Grid = require("@material-ui/core/Grid").default;
const Snackbar = require("@material-ui/core/Snackbar").default;
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
    const history = useHistory();
    const [isSaving, setIsSaving] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const StudentButton = ({ className, ...props }) => (
        <Button
            variant="contained"
            className={`${classes.studentButton} ${className || ""}`}
            {...props}
        />
    );

    const saveResponse = async () => {
        if(!shouldSaveResponse) {
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
    };

    useInterval(saveResponse, 6000);

    return (
        <Container>
            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)} message="The survey is finished! You may safely close this window. You can come and edit your response any time." />
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={2}>
                    <StudentButton onClick={() => history.push("/explanation")}>
                        Explanation
                    </StudentButton>
                </Grid>
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
                        onClick={async () => {
                            await saveResponse();
                            if(student === studentCount - 1) {
                                setIsSnackbarOpen(true);
                            } else {
                                nextStudent({ student, responses });
                            }
                        }}
                    >
                        {student === studentCount - 1 ? "Finish Survey!" : "Next Student"}
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
