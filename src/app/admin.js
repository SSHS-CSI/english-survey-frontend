const React = require("react");
const { useState, useEffect, useRef } = require("react");
const { makeStyles, useTheme } = require("@material-ui/core/styles");
const nanoid = require("nanoid");

const Paper = require("@material-ui/core/Paper").default;
const TextField = require("@material-ui/core/TextField").default;
const Typography = require("@material-ui/core/Typography").default;
const Button = require("@material-ui/core/Button").default;
const AppBar = require("@material-ui/core/AppBar").default;
const Toolbar = require("@material-ui/core/Toolbar").default;
const CssBaseline = require("@material-ui/core/CssBaseline").default;
const List = require("@material-ui/core/List").default;
const ListItem = require("@material-ui/core/ListItem").default;

const useStyles = makeStyles(theme => ({
    typography: {
        marginBottom: theme.spacing(3),
    },
    idList: {
        width: "25%",
    }
}));

function Admin() {
    const classes = useStyles();

    const [idGenerationCount, setIdGenerationCount] = useState(0);
    const [isInvalid, setIsInvalid] = useState(false);
    const [helpertext, setHelpertext] = useState("");
    const [idList, setIdList] = useState([""]);
    const [neededtoUpdate, setNeededtoUpdate] = useState(false);

    const IdGenerate = count => {
        let numcount = parseInt(count);
        if (count <= 0) {
            setIsInvalid(true);
            setHelpertext("Invalid number... Please enter positive number");
        } else {
            for (let i = 0; i < count; i++) {
                let temp = nanoid(10);
                fetch("/auth/register", {
                    method: "POST",
                    body: JSON.stringify({
                        username: temp,
                        password: temp,
                        type: "1"
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
            setNeededtoUpdate(!neededtoUpdate);
        }
    }

    useEffect(() => {
        async function getIdList() {
            const response = await fetch("/master/active");
            const result = await response.json();
            console.log(result.status);
            if (result.status != "success") {
                console.log("Something Wrong...");
            } else {
                setIdList(result.data.map(el => el.username));
            }
        }
        getIdList();
    }, [neededtoUpdate]);

    const copyToClipBoard = e => {
        idRef.current.select();
        document.execCommand('copy');
        e.target.focus();
    }

    return (
        <Paper>
            <Typography className={classes.typography}>
                Please enter your ID
            </Typography>
            <TextField
                id="outlined-id-generator"
                label="ID 생성 개수(숫자)"
                type="id-generator"
                variant="outlined"
                type="number"
                value={idGenerationCount}
                onChange={e => setIdGenerationCount(e.target.value)}
                error={isInvalid}
                helperText={helpertext}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => IdGenerate(idGenerationCount)}
                className={classes.button}
            >
                Id Generate
            </Button>
            <List className={classes.idList}>
                {idList.map((id, index) => (
                    <ListItem button key={id}>
                        {index + 1}. {id}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

module.exports = Admin;
