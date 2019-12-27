const React = require("react");
const { useState } = require("react");
const { makeStyles, useTheme } = require("@material-ui/core/styles");
const { useHistory, Link } = require("react-router-dom");

const Paper = require("@material-ui/core/Paper").default;
const TextField = require("@material-ui/core/TextField").default;
const Typography = require("@material-ui/core/Typography").default;
const Button = require("@material-ui/core/Button").default;

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

function Login() {
    const classes = useStyles();
    const [inputId, setInputId] = useState("");
    const [isLoginFailed, setIsLoginFailed] = useState(false);
    const [helperText, setHelperText] = useState("");

    let history = useHistory();

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

        if (json.status) {
            history.push("/");
        } else {
            setHelperText("Wrong ID! Please try again.");
            setIsLoginFailed(true);
        }
    };

    return (
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
            <Link to="/admin">Admin</Link>
        </Paper>
    );
}

module.exports = Login;
