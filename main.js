import express from 'express';
import https from 'https';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const API_KEY = process.env.OPEN_WEATHER_KEY;

app.use(express.static('public'));

app.get('/weather', (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => (data += chunk));
        response.on('end', () => {
            const weather = JSON.parse(data);
            res.json(weather);
        });
    })
});

app.get('/catfact', (req, res) => {
    https.get('https://catfact.ninja/fact', (response) => {
        let data = '';
        response.on('data', (chunk) => (data += chunk));
        response.on('end', () => {
            const fact = JSON.parse(data);
            res.json({ fact: fact.fact });
        });
    })
});

app.get('/joke', (req, res) => {
    https.get('https://v2.jokeapi.dev/joke/Any?type=single', (response) => {
        let data = '';
        response.on('data', (chunk) => (data += chunk));
        response.on('end', () => {
            const joke = JSON.parse(data);
            res.json({ joke: joke.joke });
        });
    })
});

app.get('/joke', (req, res) => {
    https.get("https://v2.jokeapi.dev/joke/Any?type=single", (response) => {
        let data = '';
        response.on('data', (chunk) => (data += chunk));
        response.on('end', () => {
            const joke = JSON.parse(data);
            res.json({joke: joke.joke})
        })
    })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
