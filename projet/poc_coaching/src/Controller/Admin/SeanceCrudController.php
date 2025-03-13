<?php

namespace App\Controller\Admin;

use App\Entity\Coach;
use App\Entity\Seance;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;

class SeanceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Seance::class;
    }
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function configureFields(string $pageName): iterable
    {
        $fields = [
            IdField::new('id')->hideOnForm(),
            DateTimeField::new('date_heure', 'Date et Heure'),
            ChoiceField::new('type_seance', 'Type de Séance')
                ->setChoices([
                    'Solo' => 'solo',
                    'Duo' => 'duo',
                    'Trio' => 'trio',
                ]),
            TextField::new('theme_seance', 'Thème de la Séance'),
            ChoiceField::new('statut', 'Statut')
                ->setChoices([
                    'Prévue' => 'prévue',
                    'Validée' => 'validée',
                    'Annulée' => 'annulée',
                ]),
            ChoiceField::new('niveau_seance', 'Niveau de la Séance')
                ->setChoices([
                    'Débutant' => 'débutant',
                    'Intermédiaire' => 'intermédiaire',
                    'Avancé' => 'avancé',
                ]),
            AssociationField::new('Coach', 'Coach')
                ->setRequired(true)            

        ];

        $fields[] = AssociationField::new('exercices', 'Exercices de la Séance')
        ->setFormTypeOptions([
            'by_reference' => false,
        ])
        ->setRequired(true);
        return $fields;
    }
}
