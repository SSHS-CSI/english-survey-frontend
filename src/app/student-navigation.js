const React = require("react");
const { connect } = require("react-redux");
const { makeStyles } = require("@material-ui/core/styles");

const Button = require("@material-ui/core/Button").default;
const Container = require("@material-ui/core/Container").default;
const Grid = require("@material-ui/core/Grid").default;

const {
    movetoNextStudent,
    movetoPrevStudent
} = require("./actions.js");

const useStyles = makeStyles(theme => ({
    surveyContainer: {
        marginTop: theme.spacing(2)
    },
    studentButton: {
        width: "100%"
    }
}));

const StudentNavigation = ({
    student,
    studentCount,
    nextStudent,
    prevStudent,
    responses
}) => {
    const classes = useStyles();
    const StudentButton = ({ ...props }) => (
        <Button
            variant="contained"
            className={classes.studentButton}
            {...props}
        />
    );

    const saveResponse = async () => {
        console.log("saveResponse");
        console.log(responses);
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
        console.log(repsonseResult);
    };

    return (
        <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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
            </Grid>
        </Container>
    );
};

const mapStateToProps = state => ({
    student: state.student,
    responses: state.responses,
    studentCount: state.fetch.count
});

const mapDispatchToProps = dispatch => ({
    nextStudent: () => {
        dispatch(movetoNextStudent());
    },
    prevStudent: () => {
        dispatch(movetoPrevStudent());
    }
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(StudentNavigation);
