const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(
                `[server]: Server is running at https://localhost:${port}`
            );
        });
    } catch (e) {
        console.log(e);
    }
};

start();
