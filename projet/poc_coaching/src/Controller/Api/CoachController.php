<?php

namespace App\Controller\Api;

use App\Entity\Coach;
use App\Repository\CoachRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class CoachController extends AbstractController
{
    #[Route('/api/coachs', methods: ['GET'])]
    public function index(CoachRepository $coachRepository): JsonResponse
    {
        $coaches = $coachRepository->findAll();
        return $this->json($coaches, 200, [], ['groups' => 'Utilisateur:read']);
    }

    #[Route('/api/coach/new', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email'], $data['password'], $data['nom'], $data['prenom'], $data['specialites'], $data['tarif_horaire'])) {
            return $this->json(['error' => 'donnees invalide'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $coach = new Coach();
        $coach->setNom($data['nom']);
        $coach->setPrenom($data['prenom']);
        $coach->setEmail($data['email']);
        // $coach->setRole('coach'); a voir avec utilisateur
        $coach->setSpecialites($data['specialites']);
        $coach->setTarifHoraire($data['tarif_horaire']);

        $entityManager->persist($coach);
        $entityManager->flush();

        return $this->json($coach, JsonResponse::HTTP_CREATED, [], ['groups' => 'Utilisateur:read']);
    }
}