const React = require("react");
const { useState, useEffect } = require("react");
const { connect } = require("react-redux");
const { makeStyles, useTheme } = require("@material-ui/core/styles");
const { useHistory } = require("react-router-dom");
const { default: BlockUi } = require("react-block-ui");

const Paper = require("@material-ui/core/Paper").default;
const TextField = require("@material-ui/core/TextField").default;
const Typography = require("@material-ui/core/Typography").default;
const Button = require("@material-ui/core/Button").default;
const CircularProgress = require("@material-ui/core/CircularProgress").default;

const {
    loginSuccess
} = require("./actions.js");

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
        border: "1px solid black",
    },
    typography: {
        marginBottom: theme.spacing(4),
        textAlign: "center",
    },
    button: {
        display: "block",
        marginTop: theme.spacing(2),
    },
}));

function Login({ isAuthorized, loginSuccess }) {
    const classes = useStyles();
    const [inputId, setInputId] = useState("");
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let history = useHistory();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const response = await fetch("/auth/check");
            const json = await response.json();
            setIsLoading(false);

            if(json.isAdmin) {
                loginSuccess();
                history.push("/admin");
            } else if (json.status) {
                loginSuccess();
                history.push("/explanation");
            }
        })();
    }, []);

    const checkId = async () => {
        const response = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: inputId,
                password: inputId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        if(!json.status) {
            setHelperText("Wrong ID! Please try again.");
            setIsLoginFailed(true);
        } else if(json.isAdmin) {
            loginSuccess();
            history.push("/admin");
        } else {
            loginSuccess();
            history.push("/explanation");
        }
    };

    return (
        <BlockUi blocking={isLoading} loader={<CircularProgress />}>
            <Paper className={classes.root}>
                <Typography className={classes.typography}>
                    Please enter your ID
                </Typography>
                <TextField
                    label="ID"
                    variant="outlined"
                    value={inputId}
                    onChange={e => setInputId(e.target.value)}
                    error={isLoginFailed}
                    helperText={helperText}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={checkId}
                    className={classes.button}
                >
                    Login
                </Button>
            </Paper>
        </BlockUi>
    );
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized
});

const mapDispatchToProps = dispatch => ({
    loginSuccess: () => dispatch(loginSuccess())
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);
