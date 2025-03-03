-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS Seance_Exercice;
DROP TABLE IF EXISTS Seance_Sportif;
DROP TABLE IF EXISTS Seance;
DROP TABLE IF EXISTS Exercice;
DROP TABLE IF EXISTS Fiche_de_paie;
DROP TABLE IF EXISTS Coach;
DROP TABLE IF EXISTS Sportif;
DROP TABLE IF EXISTS Utilisateur;

-- Table Utilisateur
CREATE TABLE Utilisateur (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role VARCHAR(20) NOT NULL
);

-- Table Sportif (hérite de Utilisateur)
CREATE TABLE Sportif (
    id CHAR(36) PRIMARY KEY REFERENCES Utilisateur(id) ON DELETE CASCADE,
    date_inscription DATE NOT NULL DEFAULT CURRENT_DATE,
    niveau_sportif VARCHAR(20) NOT NULL
);

-- Table Coach (hérite de Utilisateur)
CREATE TABLE Coach (
    id CHAR(36) PRIMARY KEY REFERENCES Utilisateur(id) ON DELETE CASCADE,
    specialites TEXT NOT NULL,
    tarif_horaire DECIMAL(10,2) NOT NULL
);

-- Table Exercice
CREATE TABLE Exercice (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duree_estimee INT NOT NULL,
    difficulte VARCHAR(20) NOT NULL
);

-- Table Séance
CREATE TABLE Seance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_heure TIMESTAMP NOT NULL,
    type_seance VARCHAR(10) NOT NULL,
    theme_seance VARCHAR(50) NOT NULL,
    coach_id CHAR(36) NOT NULL REFERENCES Coach(id) ON DELETE CASCADE,
    statut VARCHAR(20) NOT NULL,
    niveau_seance VARCHAR(20) NOT NULL
);

-- Table de liaison Séance - Sportif (ManyToMany)
CREATE TABLE Seance_Sportif (
    seance_id INT NOT NULL REFERENCES Seance(id) ON DELETE CASCADE,
    sportif_id CHAR(36) NOT NULL REFERENCES Sportif(id) ON DELETE CASCADE,
    PRIMARY KEY (seance_id, sportif_id)
);

-- Table de liaison Séance - Exercice (ManyToMany)
CREATE TABLE Seance_Exercice (
    seance_id INT NOT NULL REFERENCES Seance(id) ON DELETE CASCADE,
    exercice_id INT NOT NULL REFERENCES Exercice(id) ON DELETE CASCADE,
    PRIMARY KEY (seance_id, exercice_id)
);

-- Table Fiche de paie
CREATE TABLE Fiche_de_paie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coach_id CHAR(36) NOT NULL REFERENCES Coach(id) ON DELETE CASCADE,
    periode VARCHAR(20) NOT NULL,
    total_heures INT NOT NULL,
    montant_total DECIMAL(10,2) NOT NULL
);
