<?php

namespace App\Controller\Api;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UtilisateurController extends AbstractController
{
    #[Route('/api/utilisateurs', methods: ['GET'])]
    public function index(UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $utilisateurs = $utilisateurRepository->findAll();
        return $this->json($utilisateurs, 200, [], ['groups' => 'Utilisateur:read']);
    }

}
