const delay = require("delay");

const dataStore = [];

module.exports = {
    fetchStudentCount: async () => {
        await delay(1000);
        return 5;
    },
    fetchQuestions: async () => {
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
    },
    pushResponses: async data => {
        await delay(1000);
        console.log("Pushed mock data");
        console.log(data);
        dataStore[data.student] = data.response;
        return {
            success: true
        };
    },
    fetchResponses: async () => {
        await delay(1000);
        return [
            [
                [2, 3],
                [3, 1],
                ["A", "B"]
            ],
            [
                [2, 3],
                [3, 1],
                ["A", "B"]
            ],
            [
                [2, 3],
                [3, 1],
                ["A", "B"]
            ],
            [
                [2, 3],
                [3, 1],
                ["A", "B"]
            ],
            [
                [2, 3],
                [3, 1],
                ["A", "B"]
            ]
        ].map(response => response.map(([left, right]) => ({ left, right })));
    }
};
