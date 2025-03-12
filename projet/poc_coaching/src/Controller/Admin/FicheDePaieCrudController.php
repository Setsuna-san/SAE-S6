<?php

namespace App\Controller\Admin;

use App\Entity\FicheDePaie;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;

class FicheDePaieCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return FicheDePaie::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('periode', 'Période'),
            IntegerField::new('total_heures', 'Total d’heures'),
            MoneyField::new('montant_total', 'Montant total')
                ->setCurrency('EUR')
                ->setStoredAsCents(false),
            AssociationField::new('coach', 'Coach')
                ->setRequired(true),
        ];
    }
}
