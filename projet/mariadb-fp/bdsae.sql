
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
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role VARCHAR(20) CHECK (role IN ('coach', 'sportif', 'responsable')) NOT NULL
);

-- Table Sportif (hérite de Utilisateur)
CREATE TABLE Sportif (
    id UUID PRIMARY KEY REFERENCES Utilisateur(id) ON DELETE CASCADE,
    date_inscription DATE NOT NULL DEFAULT CURRENT_DATE,
    niveau_sportif VARCHAR(20) CHECK (niveau_sportif IN ('débutant', 'intermédiaire', 'avancé')) NOT NULL
);

-- Table Coach (hérite de Utilisateur)
CREATE TABLE Coach (
    id UUID PRIMARY KEY REFERENCES Utilisateur(id) ON DELETE CASCADE,
    specialites TEXT[],
    tarif_horaire DECIMAL(10,2) NOT NULL
);

-- Table Exercice
CREATE TABLE Exercice (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    duree_estimee INT NOT NULL CHECK (duree_estimee > 0),
    difficulte VARCHAR(20) CHECK (difficulte IN ('facile', 'moyen', 'difficile')) NOT NULL
);

-- Table Séance
CREATE TABLE Seance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date_heure TIMESTAMP NOT NULL,
    type_seance VARCHAR(10) CHECK (type_seance IN ('solo', 'duo', 'trio')) NOT NULL,
    theme_seance VARCHAR(50) NOT NULL,
    coach_id UUID NOT NULL REFERENCES Coach(id) ON DELETE CASCADE,
    statut VARCHAR(20) CHECK (statut IN ('prévue', 'validée', 'annulée')) NOT NULL,
    niveau_seance VARCHAR(20) CHECK (niveau_seance IN ('débutant', 'intermédiaire', 'avancé')) NOT NULL
);

-- Table de liaison Séance - Sportif (ManyToMany)
CREATE TABLE Seance_Sportif (
    seance_id UUID REFERENCES Seance(id) ON DELETE CASCADE,
    sportif_id UUID REFERENCES Sportif(id) ON DELETE CASCADE,
    PRIMARY KEY (seance_id, sportif_id)
);

-- Table de liaison Séance - Exercice (ManyToMany)
CREATE TABLE Seance_Exercice (
    seance_id UUID REFERENCES Seance(id) ON DELETE CASCADE,
    exercice_id UUID REFERENCES Exercice(id) ON DELETE CASCADE,
    PRIMARY KEY (seance_id, exercice_id)
);

-- Table Fiche de paie
CREATE TABLE Fiche_de_paie (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_id UUID NOT NULL REFERENCES Coach(id) ON DELETE CASCADE,
    periode VARCHAR(20) NOT NULL,
    total_heures INT NOT NULL CHECK (total_heures >= 0),
    montant_total DECIMAL(10,2) NOT NULL CHECK (montant_total >= 0)
);
