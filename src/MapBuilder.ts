import { Card } from "./Map";

export default function buildMap(startingTeam: string = "red") {
    const numRows: number = 5;
    const numColumns: number = 5;

    const model: Card[][] = Array.from({ length: 5 }, () =>
        Array.from({ length: 5 }, () => ({ value: 0, text: "" }))
    );;

    // Generating 7 white, blue, and red cards
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            // Generate the white cards
            let randomRow: number;
            let randomColumn: number;

            do {
                randomRow = Math.floor(Math.random() * numRows);
                randomColumn = Math.floor(Math.random() * numColumns);
            } while (model[randomRow][randomColumn].value !== 0);

            model[randomRow][randomColumn].value = i + 1;
        }
    }

    // Generating last red & blue cards
    // Generate the last blue cards
    let randomRow: number;
    let randomColumn: number;

    do {
        randomRow = Math.floor(Math.random() * numRows);
        randomColumn = Math.floor(Math.random() * numColumns);
    } while (model[randomRow][randomColumn].value !== 0);

    if (startingTeam === "red") {
        model[randomRow][randomColumn].value = 3;
    } else {
        model[randomRow][randomColumn].value = 2;
    }

    for (let k = 0; k < 2; k++) {
        // Generate the last two red cards
        do {
            randomRow = Math.floor(Math.random() * numRows);
            randomColumn = Math.floor(Math.random() * numColumns);
        } while (model[randomRow][randomColumn].value !== 0);

        if (startingTeam === "red") {
            model[randomRow][randomColumn].value = 2;
        } else {
            model[randomRow][randomColumn].value = 3;
        }
    }

    return model;
}