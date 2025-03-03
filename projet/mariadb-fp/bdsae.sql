-- --------------------------------------------------------

-- 
-- Structure de la table 'utilisateur'
-- 

DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
  id int(11) NOT NULL auto_increment,
  nom varchar(50) default NULL,
  prenom varchar(50) default NULL,
  email varchar(50) default NULL,
  mot_de_passe varchar(50) default NULL,
  role varchar(50) default NULL,
  PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 
-- Contenu de la table 'utilisateur'
-- 

INSERT INTO utilisateur VALUES (1, 'Dupond', 'Jean', 'test@gmail.com');

