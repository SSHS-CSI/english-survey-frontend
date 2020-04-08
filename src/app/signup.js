const React = require("react");
const { useState, useEffect } = require("react");
const { connect } = require("react-redux");
const { makeStyles, useTheme } = require("@material-ui/core/styles");
const { useHistory } = require("react-router-dom");
const { default: BlockUi } = require("react-block-ui");

const FormControl = require("@material-ui/core/FormControl").default;
const Paper = require("@material-ui/core/Paper").default;
const InputLabel = require("@material-ui/core/InputLabel").default;
const Select = require("@material-ui/core/Select").default;
const MenuItem = require("@material-ui/core/MenuItem").default;
const TextField = require("@material-ui/core/TextField").default;
const Typography = require("@material-ui/core/Typography").default;
const Button = require("@material-ui/core/Button").default;
const CircularProgress = require("@material-ui/core/CircularProgress").default;

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        width: "40%",
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
    formControl: {
        '& .MuiFormControl-root': {
            display: "block",
            marginTop: theme.spacing(4),
        }
    }
}));

function SignUp() {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState("");
    const [type, setType] = useState("");
    const [years, setYears] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const errorText = "Something got wrong :( Please fill in the blank, or check your answer is validate";
    
    let N = 30;
    const yearsTemplate = Array.apply(null, {length: N}).map(Number.call, Number);
    
    let history = useHistory();

    const Register = () => {
        let isOkaytoFetch = true;
        
        if (!username || username == "") {
            isOkaytoFetch = false;
        }
        if (gender == "" || (gender != "M" && gender != "F")) {
            isOkaytoFetch = false;
        }
        if (!type || type == "") {
            isOkaytoFetch = false;
        }
        if (type != "student" && (!years || !Number.isInteger(years) || (years <= 0 && years >= 31))) {
            isOkaytoFetch = false;
        }

        if (isOkaytoFetch) {
     	    fetch("/auth/register", {
	        method: "POST",
	        body: JSON.stringify({
		    username: username,
                    password: username,
                    type: type,
                    years: years,
		    gender: gender
	        }),
	        headers: {
		    "Content-Type": "application/json"
	        }
	    })
            alert("Processing Successed! Please login again.");
            history.push("/login");
        } else {
            alert(errorText);
        }
    }
    
    return (
	<BlockUi blocking={isLoading} loader={<CircularProgress />}>
            <Paper className={classes.root}>
                <Typography className={classes.typography}>
                    Please enter your information to make account.
                </Typography>
                <TextField
                    label="Evaluator's name"
                    variant="outlined"
                    fullWidth={true}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
	        <FormControl
                    classes={classes.formControl}
                    fullWidth={true}
                    margin="normal"
                >
		    <InputLabel>Gender</InputLabel>
		    <Select
		        value={gender}
		        onChange={e => setGender(e.target.value)}
		    >
		        <MenuItem value="M">Male</MenuItem>
		        <MenuItem value="F">Female</MenuItem>
		    </Select>
		</FormControl>
		<FormControl
                    classes={classes.formControl}
                    fullWidth={true}
                    margin="normal"
                >
		    <InputLabel>Job Type</InputLabel>
		    <Select
		        value={type}
		        onChange={e => setType(e.target.value)}
		    >
		        <MenuItem value="esl">ESL Teacher(Native Speaker of English)</MenuItem>
		        <MenuItem value="efl">EFL Teacher(Korean English Teacher)</MenuItem>
		        <MenuItem value="student">Students(Peer Evalutor)</MenuItem>
		    </Select>
		</FormControl>
                { ( type == "esl" || type == "efl" ) &&  
		  <FormControl
                      className={classes.formControl}
                      fullWidth={true}
                      margin="normal"
                  >
		      <InputLabel>Number of years teaching(If more than 30 years, just check 30 please)</InputLabel>
		      <Select
		          value={years}
		          onChange={e => setYears(e.target.value)}
		      >
		          {yearsTemplate.map(num => <MenuItem key={num} value={num + 1}>{num + 1}</MenuItem>)}
                      </Select>
	          </FormControl>
                }
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={Register}
                    className={classes.button}
                >
                    Submit
                </Button>
            </Paper>
        </BlockUi>
    );
}

module.exports = SignUp;
