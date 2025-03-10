<?php

namespace App\Controller\Api;

use App\Entity\Seance;
use App\Repository\SeanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SeanceController extends AbstractController
{
    #[Route('/api/seances', methods: ['GET'])]
    public function index(SeanceRepository $seanceRepository): JsonResponse
    {
        $seances = $seanceRepository->findAll();
        return $this->json($seances, 200, [], ['groups' => 'seance:read']);
    }

    #[Route('/api/seance/{id}', methods: ['GET'])]
    public function show(Seance $seance): JsonResponse
    {
        return $this->json($seance, 200, [], ['groups' => 'seance:read']);
    }

    #[Route('/api/seance/{id}/exercices', methods: ['GET'])]
    public function getExercices(Seance $seance): JsonResponse
    {
        $exercices = $seance->getExercices();
        return $this->json($exercices, 200, [], ['groups' => 'exercice:read']);
    }
}
