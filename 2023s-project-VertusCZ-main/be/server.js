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

// vytvoření tabulek, pokud neexistují
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL
    )`);


    db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    position TEXT NOT NULL,
    team_id INTEGER NOT NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id)
  )`);

    // Naplnění tabulky teams daty
    db.run(`INSERT INTO teams (name,city,country) VALUES ('Manchester United','Manchester','England')`);
    db.run(`INSERT INTO teams (name,city,country) VALUES ('Real Madrid','Madrid','Spain')`);
    db.run(`INSERT INTO teams (name,city,country) VALUES ('FC Barcelona','Barcelona','Spain')`);
    db.run(`INSERT INTO teams (name,city,country) VALUES ('Bayern Munich','Munich','Germany')`);
    db.run(`INSERT INTO teams (name,city,country) VALUES ('Paris Saint-Germain','Paris','France')`);
    db.run(`INSERT INTO teams (name,city,country) VALUES ('Juventus','Turin','Italy')`);
    db.run(`INSERT INTO teams (name, city, country) VALUES ('Arsenal', 'London', 'England')`);


    // Naplnění tabulky players daty
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Cristiano Ronaldo', 36, 'Forward', 2)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Lionel Messi', 34, 'Forward', 3)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('David de Gea', 30, 'Goalkeeper', 1)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Neymar Jr.', 30, 'Forward', 5)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Robert Lewandowski', 33, 'Forward', 4)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Kylian Mbappé', 23, 'Forward', 5)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Manuel Neuer', 35, 'Goalkeeper', 4)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Giorgio Chiellini', 37, 'Defender', 6)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Leonardo Bonucci', 34, 'Defender', 6)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Alvaro Morata', 28, 'Forward', 6)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Pierre-Emerick Aubameyang', 31, 'Forward', 7)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Bernd Leno', 29, 'Goalkeeper', 7)`);
    db.run(`INSERT INTO players (name, age, position, team_id) VALUES ('Bukayo Saka', 20, 'Midfielder', 7)`);

});