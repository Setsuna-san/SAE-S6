<?php

namespace App\Controller\Admin;

use App\Entity\Exercice;
use App\Entity\FicheDePaie;
use App\Entity\Seance;
use App\Entity\Utilisateur;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Poc Coaching');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        // yield MenuItem::linkToCrud('The Label', 'fas fa-list', EntityClass::class);
        yield MenuItem::section('Gestion');
        yield MenuItem::linkToCrud('Utilisateur', 'fa fa-user', Utilisateur::class);
        yield MenuItem::linkToCrud('Seance', 'fa fa-pen', Seance::class);
        yield MenuItem::linkToCrud('Exercice', 'fa fa-dumbbell', Exercice::class);

        yield MenuItem::section('Paie');
        yield MenuItem::linkToCrud('Fiches de paie', 'fa fa-file-text', FicheDePaie::class);
    }
}
