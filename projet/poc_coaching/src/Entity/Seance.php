<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SeanceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use phpDocumentor\Reflection\Types\Integer;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SeanceRepository::class)]
class Seance
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('seance:read', 'coach:read')]
    private ?int $id = null;


    #[ORM\Column]
    #[Groups('seance:read', 'coach:read', 'sportif:read')]
    private ?\DateTimeImmutable $date_heure = null;

    #[ORM\Column(length: 10)]
    #[Groups('seance:read', 'coach:read')]
    private ?string $type_seance = null;

    #[ORM\Column(length: 50)]
    #[Groups('seance:read', 'coach:read')]
    private ?string $theme_seance = null;

    #[ORM\Column(length: 20)]
    #[Groups('seance:read', 'coach:read')]
    private ?string $statut = null;

    #[ORM\Column(length: 20)]
    #[Groups('seance:read', 'coach:read', 'sportif:read')]
    private ?string $niveau_seance = null;



    /**
     * @var Collection<int, Sportif>
     */
    #[ORM\ManyToMany(targetEntity: Sportif::class, inversedBy: 'seances')]
    private Collection $sportifs;

    /**
     * @var Collection<int, Exercice>
     */
    #[ORM\ManyToMany(targetEntity: Exercice::class, inversedBy: 'seances')]
    #[Groups('seance:read')]
    private Collection $exercices;

    #[ORM\ManyToOne(inversedBy: 'seances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $Coach = null;

    public function __construct()
    {
        $this->sportifs = new ArrayCollection();
        $this->exercices = new ArrayCollection();
    }


    #[Groups('sportif:read')]

    public function getId(): ?int
    {
        return $this->id;
    }

    #[Groups('sportif:read')]

    public function getDateHeure(): ?\DateTimeImmutable
    {
        return $this->date_heure;
    }

    public function setDateHeure(\DateTimeImmutable $date_heure): static
    {
        $this->date_heure = $date_heure;

        return $this;
    }

    #[Groups('sportif:read')]

    public function getTypeSeance(): ?string
    {
        return $this->type_seance;
    }

    public function setTypeSeance(string $type_seance): static
    {
        $this->type_seance = $type_seance;

        return $this;
    }

    #[Groups('sportif:read')]

    public function getThemeSeance(): ?string
    {
        return $this->theme_seance;
    }

    public function setThemeSeance(string $theme_seance): static
    {
        $this->theme_seance = $theme_seance;

        return $this;
    }

    #[Groups('sportif:read')]

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    #[Groups('sportif:read')]

    public function getNiveauSeance(): ?string
    {
        return $this->niveau_seance;
    }

    public function setNiveauSeance(string $niveau_seance): static
    {
        $this->niveau_seance = $niveau_seance;

        return $this;
    }

    /**
     * @return Collection<int, Sportif>
     */
    #[Groups('seance:read')]
    public function getSportifs(): Collection
    {
        return $this->sportifs;
    }

    public function addSportif(Sportif $sportif): static
    {
        if (!$this->sportifs->contains($sportif)) {
            $this->sportifs->add($sportif);
        }

        return $this;
    }

    public function removeSportif(Sportif $sportif): static
    {
        $this->sportifs->removeElement($sportif);

        return $this;
    }

    /**
     * @return Collection<int, Exercice>
     */
    #[Groups('sportif:read')]
    public function getExercices(): Collection
    {
        return $this->exercices;
    }

    public function addExercice(Exercice $exercice): static
    {
        if (!$this->exercices->contains($exercice)) {
            $this->exercices->add($exercice);
        }

        return $this;
    }

    public function removeExercice(Exercice $exercice): static
    {
        $this->exercices->removeElement($exercice);

        return $this;
    }

    #[Groups('sportif:read')]
    public function getCoach(): ?Coach
    {
        return $this->Coach;
    }

    public function setCoach(?Coach $Coach): static
    {
        $this->Coach = $Coach;

        return $this;
    }

    #[Groups('seance:read')]
    public function getCoachId(): ?int
    {
        return $this->Coach ? $this->Coach->getId() : null;
    }

}
