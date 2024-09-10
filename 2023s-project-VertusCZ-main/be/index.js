const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// umožníme komunikaci mezi různými doménami
app.use(cors());

// nastavení body parseru pro zpracování JSON dat
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Vytvoření připojení k databázi
const dbPath = path.resolve(__dirname, 'footballTeams.db');
const db = new sqlite3.Database(dbPath);

// testovací endpoint
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// endpoint pro získání všech týmů
app.get('/api/teams', (req, res) => {
    db.all('SELECT * FROM teams', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

// endpoint pro získání konkretniho týmu
app.get('/api/teams/:id', (req, res) => {
    const {id} = req.params;
    db.all(`SELECT * FROM teams WHERE id = ${id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});


// endpoint pro získání hráčů
app.get('/api/players', (req, res) => {
    db.all('SELECT * FROM players', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});
// endpoint pro konkretniho hrace
app.get('/api/players/:id', (req, res) => {
    const {id} = req.params;
    db.all(`SELECT * FROM players WHERE id = ${id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

// endpoint pro získání hráčů daného týmu
app.get('/api/teams/:id/players', (req, res) => {
    const {id} = req.params;
    db.all(`SELECT * FROM players WHERE team_id = ${id}`, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(rows);
        }
    });
});

//update uživatele
app.put('/api/players/:id', (req, res) => {
    const {id} = req.params;
    const {name, age, position, team_id} = req.body;

    db.run(`UPDATE players SET name=?, age=?, position=?, team_id=? WHERE id=?`,
        [name, age, position, team_id, id],
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(`Player with id ${id} was updated successfully`);
            }
        });
});
//update týmu
app.put('/api/teams/:id', (req, res) => {
    const {id} = req.params;
    const {name, city, country} = req.body;

    db.run(
        `UPDATE teams SET name = ?, city = ?, country = ? WHERE id = ?`,
        [name, city, country, id],
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(`Team with ID ${id} has been updated`);
            }
        }
    );
});
app.delete('/api/players/:id', (req, res) => {
    const {id} = req.params;
    db.run(`DELETE FROM players WHERE id = ${id}`, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
});
app.delete('/api/teams/:id', (req, res) => {
    const {id} = req.params;
    db.run(`DELETE FROM teams WHERE id = ${id}`, err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(204);
        }
    });
});

app.post('/api/teams', (req, res) => {
    const {name, city, country} = req.body;
    db.run(`INSERT INTO teams (name, city, country) VALUES (?, ?, ?)`, [name, city, country], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send('Team created successfully');
        }
    });
});
app.post('/api/players', (req, res) => {
    const {name, age, position, team_id} = req.body;
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES (?, ?, ?, ?)`, [name, age, position, team_id],
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send(`Player added with ID: ${this.lastID}`);
            }
        });
});


// spuštění serveru
app.listen(port, () => {
    console.log(`Server běží na portu ${port}.`);
});
