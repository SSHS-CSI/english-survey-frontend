const React = require("react");
const { makeStyles } = require("@material-ui/core/styles");
const { useHistory } = require("react-router-dom");

const Container = require("@material-ui/core/Container").default;
const Button = require("@material-ui/core/Button").default;
const Card = require("@material-ui/core/Card").default;
const CardContent = require("@material-ui/core/CardContent").default;
const CardActions = require("@material-ui/core/CardActions").default;
const Typography = require("@material-ui/core/Typography").default;

const useStyles = makeStyles(theme => ({
    explanationContainer: {
        marginTop: theme.spacing(2)
    },
    box: {
        border: "1px solid black",
        margin: "10px",
        padding: "15px",
        width: "70%",
        fontSize: "15px",
    }
}));

const Explanation = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <Container className={classes.explanationContainer}>
            <Card>
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        - You will hear 30 male Korean second language learners of English speaking on a narrative description task. Students were asked to narrate nine-frame pictures making a single story. The task was administered and recorded at Time 1 and again 13 weeks later at Time 2. The two excerpts were <span style={{ color: "rgb(255,0,0)" }}>randomly</span> paired.
                    </Typography>
                    <img src="/static/ex.jpg" style={{
                        float: "right",
                        width: "100%",
                        maxWidth: 320,
                        margin: "20px",
                    }}></img>
                    <Typography variant="body1" gutterBottom>
                        - All of the speech samples are about one minute long. I would like you to <span style={{ color: "rgb(255,0,0)"}}>judge overall speaking proficiency and fluency</span> about each paired sample.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        - <span style={{ color: "rgb(255,0,0)"}}>Overall speaking proficiency:</span> You are asked to rate overall speaking proficiency using the same rubric employed by ETS raters in scoring TOEFL iBT. The rating rubric allowed for scores from 1(limited proficient) to 7(highly proficient)
                    </Typography>
                    <div className={classes.box}>
                        <div style={{ textAlign: "center"}}>How to Judge Overall Speaking Proficiency?</div>
                        <p>The rating reflects judgments about the following: </p>
                        <p>1. <span style={{ color: "rgb(255,0,0)"}}>Topic development</span></p>
                        <p>2. <span style={{ color: "rgb(255,0,0)"}}>Delivery</span>, which includes pronunciation, intonation, pacing, and general intelligibility</p>
                        <p>3. <span style={{ color: "rgb(255,0,0)"}}>Language use</span>, which includes pronunciation, intonation, pacing, and general intelligibility</p>                       
                    </div>
                    <Typography variant="body1" gutterBottom>
                        - <span style={{ color: "rgb(255,0,0)"}}>Speaking fluency</span>: the flow of the language – does the speaker have problems finding words, hesitating and pausing often, or do the words come quickly? So a speaker who is very fluent – that is, the words just flow with no struggle, would be at the top of the scale(7), while someone who has a hard time expressing him or herself would be closer to the right end of the scale(1). 
                    </Typography>
                    <div className={classes.box}>
                        <div style={{ textAlign: "center"}}>How to Judge Fluency?</div>
                        <p>1. <span style={{ color: "rgb(255,0,0)"}}>speech rate</span></p>
                        <p>2. <span style={{ color: "rgb(255,0,0)"}}>hesitation</span> (① numbers and length of unfilled or non-lexical filled pauses such as ah-, uhm-, uh-, ② repetitions, ③ self-corrections)</p>
                        <p>3. <span style={{ color: "rgb(255,0,0)"}}>formulaic sequences or ‘chunks.’</span></p>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        - Using the 7-point scale, give each speaker a rating based on their speaking proficiency or fluency. <span style={{ color: "rgb(255,0,0)"}}>Please assign a different rating to each member of a paired speech sample</span>; in other words, you are asked to rate one member of each pair of stimuli as more proficient or fluent than the other.
                    </Typography> 
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" onClick={() => history.push("/")}>I understood.</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

module.exports = Explanation;
