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
                        You will hear Korean second language learners of English speaking on a narrative description task. Students were asked to narrate nine-frame pictures making a single coherent story. The task was administered and audiotaped at Time 1 and again 13 weeks later at Time 2. The two excerpts were randomly paired across time (T1/T2 or T2/T1) in a single aural stimulus, separated by a tone.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        All of the speech samples are about one minute long. I would like you to make a fluency judgment about each paired sample.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Speaking fluency is commonly associated with temporal fluency: 1. speech rate, 2. hesitation phenomena (① numbers and length of unfilled or non-lexical filled pauses such as ah-, uhm-, uh-, ② repetitions, ③ self-corrections), and 3. formulaic sequences or ‘chunks.’
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Speaking fluency is the flow of the language – does the speaker have problems finding words, hesitating and pausing often, or do the words come quickly? So a speaker who is very fluent – that is, the words just flow with no struggle, would be at the top of the scale, while someone who has a hard time expressing him or herself would be closer to the right end of the scale. Please do not worry about grammar mistakes – that does not matter.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        As you listened to the paired stimuli, please first write in words, in the space provided below the scale, your general impressions of the temporal fluency of each speech sample in the pair.
                    </Typography> 
                    <Typography variant="body1" gutterBottom>
                        Then, using the 7-point scale, give each speaker a rating based on their speaking fluency. Please assign a different rating to each member of a paired speech sample; in other words, you are asked to rate one member of each pair of stimuli as more fluent than the other.
                    </Typography>
                    <Typography variant="body1">
                        Please listen to the whole sample before making your decision.
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
