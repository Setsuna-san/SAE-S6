DROP TABLE IF EXISTS utilisateur;

CREATE TABLE utilisateur (
  id int(11) NOT NULL auto_increment,
  nom varchar(20) default NULL,
  prenom varchar(20) default NULL,
  email varchar(50) default NULL,
  mot_de_passe varchar(50) default NULL,
  role varchar(50) default NULL,
  PRIMARY KEY  (id)
)

CREATE TABLE sportif (
  date_inscription date,
  niveau_sportif varchar(50)
)

CREATE TABLE coach (
  tarif_horaire double(11)
)

CREATE TABLE seance (
  id int(11) NOT NULL auto_increment,
  date_heure date,
  type_seance varchar(50),
  theme_seance varchar(50),
  niveau_seance varchar(20),
  statut varchar(20),
  PRIMARY KEY  (id),
  CONSTRAINT `fbcoach` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`),
)

CREATE TABLE fichedepaie (
  id int(11) NOT NULL auto_increment,
  periode varchar(50),
  total_heures int(11),
  montant_total double(11),
  PRIMARY KEY  (id),
  CONSTRAINT `fbcoach` FOREIGN KEY (`coach_id`) REFERENCES `coach` (`id`),
)

CREATE TABLE seance (
  id int(11) NOT NULL auto_increment,
  nom varchar(20),
  description varchar(50),
  duree_estimee int(11),
  difficulte varchar(20),
  PRIMARY KEY  (id)
)


