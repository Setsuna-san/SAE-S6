<?php

namespace App\Controller\Api;

use App\Entity\Coach;
use App\Repository\CoachRepository;
use App\Repository\UtilisateurRepository;
use Doctrine\ORM\Mapping\Id;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class CoachController extends AbstractController
{
    #[Route('/api/coachs', methods: ['GET'])]
    public function index(CoachRepository $coachRepository, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $coachs = $utilisateurRepository->findAllByRole("ROLE_COACH");
        // $coachs = $coachRepository->findAll();
        return $this->json($coachs, 200, [], ['groups' => 'coach:read']);
    }

    #[Route('/api/coach/{id}', methods: ['GET'])]
    public function show(Coach $coach): JsonResponse
    {
        return $this->json($coach, 200, [], ['groups' => 'coach:read']);
    }

    #[Route('/api/coach/{id}/seances', methods: ['GET'])]
    public function getSeances(Coach $coach): JsonResponse
    {
        $seances = $coach->getSeances();
        return $this->json($seances, 200, [], ['groups' => 'seance:read']);
    }
}
