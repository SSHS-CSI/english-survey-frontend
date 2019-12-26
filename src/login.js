const React = require("react");
const { useState } = require("react");
const { makeStyles, useTheme } = require("@material-ui/core/styles");
const { useHistory } = require("react-router-dom");

const Paper = require("@material-ui/core/Paper").default;
const TextField = require("@material-ui/core/TextField").default;
const Typography = require("@material-ui/core/Typography").default;
const Button = require("@material-ui/core/Button").default;
const AppBar = require("@material-ui/core/AppBar").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const CssBaseline = require("@material-ui/core/CssBaseline").default;

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
    const [helpertext, setHelpertext] = useState("");

    let history = useHistory();

    const checkId = async () => {
        const response = await fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: "sshs-csi",
                password: inputId
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(json => {
            if (json.status) {
                console.log(json);
                history.push("/survey")
            } else {
                setHelpertext("Wrong ID! Please try again.");
                setIsLoginFailed(true);
            }
        });

    }
    
    return (
        <div>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Login Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper className={classes.root}>
                <Typography className={classes.typography}>
                    Please enter your ID
                </Typography>
                <TextField
                    id="outlined-id-input"
                    label="ID"
                    type="id"
                    autoComplete="current-id"
                    variant="outlined"
                    value={inputId}
                    onChange={e => setInputId(e.target.value)}
                    error={isLoginFailed}
                    helperText={helpertext}
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
        </div>
    );
}

module.exports = Login;