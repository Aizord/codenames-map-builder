
export default function buildMap(startingTeam: string = "red") {
    const numRows: number = 5;
    const numColumns: number = 5;

    const model: number[][] = Array.from({ length: numRows }, () => Array(numColumns).fill(0));

    // Generating 7 white, blue, and red cards
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            // Generate the white cards
            let randomRow: number;
            let randomColumn: number;

            do {
                randomRow = Math.floor(Math.random() * numRows);
                randomColumn = Math.floor(Math.random() * numColumns);
            } while (model[randomRow][randomColumn] !== 0);

            model[randomRow][randomColumn] = i + 1;
        }
    }

    // Generating last red & blue cards
    // Generate the last blue cards
    let randomRow: number;
    let randomColumn: number;

    do {
        randomRow = Math.floor(Math.random() * numRows);
        randomColumn = Math.floor(Math.random() * numColumns);
    } while (model[randomRow][randomColumn] !== 0);

    if (startingTeam === "red") {
        model[randomRow][randomColumn] = 3;
    } else {
        model[randomRow][randomColumn] = 2;
    }

    for (let k = 0; k < 2; k++) {
        // Generate the last two red cards
        do {
            randomRow = Math.floor(Math.random() * numRows);
            randomColumn = Math.floor(Math.random() * numColumns);
        } while (model[randomRow][randomColumn] !== 0);

        if (startingTeam === "red") {
            model[randomRow][randomColumn] = 2;
        } else {
            model[randomRow][randomColumn] = 3;
        }
    }

    return model;
}