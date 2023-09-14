const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const outputFolder = './filesystem';

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const PORT = 3000;

app.get('/createFile', (req, res) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear().toString();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const date = currentTime.getDate().toString().padStart(2, '0');
    const hrs = currentTime.getHours().toString().padStart(2, '0');
    const mins = currentTime.getMinutes().toString().padStart(2, '0');
    const secs = currentTime.getSeconds().toString().padStart(2, '0');

    const dateTimeForFileName = `${year}-${month}-${date}-${hrs}-${mins}-${secs}.txt`;

    const filePath = path.join(outputFolder, dateTimeForFileName);

    fs.writeFile(filePath, currentTime.toISOString(), (err) => {
        if (err) {
            res.status(500).send(`Error Creating File : ${err}`);
            return;
        }

        res.send(`File Created Successfully at : ${filePath}`);
    });
});

app.get("/listFiles", (req, res) => {
    fs.readdir(outputFolder, (err, files) => {
        if (err) {
            res.status(500).send(`Error Reading Files: ${err}`);
            return;
        }
        console.log("List of Files", files);
        const textFiles = files.filter((file) => path.extname(file) === ".txt");

        res.json(textFiles);
    });
});

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
});
