const React = require("react");
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Objective = require('./objective.js');
const Survey = require('./survey.js');

const Sizing = require('@material-ui/system').default;
const Box = require('@material-ui/core/Box').default;

const template = [
    {
        type: 'objective',
        content: 'hmmmm...?',
        selectCount: 6
    },{
        type: 'objective',
        content: 'hmmmm...?',
        selectCount: 6
    },{
        type: 'objective',
        content: 'hmmmm...?',
        selectCount: 6
    },
    {
        type: 'descriptive',
        content: 'How do you do?'
    }
];

const useStyles = makeStyles(theme => ({
    app: {
        display: 'flex', 
    },
    box: {
        margin: theme.spacing(1),
    },
}))

function App() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.app}>
            <Box className={classes.box} width={0.5}>
                <Objective questionIndex={1} content="I am tired" selectCount={7} />
            </Box>
            <Box className={classes.box} width={0.5}>
                <Survey template={template} />
            </Box>
        </div>
    );
}

module.exports = App;