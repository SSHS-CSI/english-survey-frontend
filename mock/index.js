const delay = require("delay");

const dataStore = [];

module.exports = {
    fetchFromAPI: async () => {
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
    pushToAPI: async data => {
        await delay(1000);
        console.log("Pushed mock data");
        console.log(data);
        dataStore[data.student] = data.response;
        return {
            success: true
        };
    },
    getFromAPI: async student => {
        await delay(1000);
        return {
            student,
            response: dataStore[student]
                ? dataStore[student]
                : [
                      { left: 0, right: 0 },
                      { left: 0, right: 0 },
                      { left: "", right: "" }
                  ]
        };
    }
};
