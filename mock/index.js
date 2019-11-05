const delay = require("delay");

module.exports = async () => {
    await delay(1000);
    return [
        {
            type: "objective",
            content: "text for problem 1",
            selectCount: 5
        },
        {
            type: "objective",
            content: "text for problem 2",
            selectCount: 4
        },
        {
            type: "descriptive",
            content: "text for problem 3"
        }
    ];
};
