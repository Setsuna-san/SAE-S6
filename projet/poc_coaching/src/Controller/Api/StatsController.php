<?php

namespace App\Controller\Api;

use App\Repository\SeanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/stats', name: 'api_stats_')]
class StatsController extends AbstractController
{
    private SeanceRepository $seanceRepository;

    public function __construct(SeanceRepository $seanceRepository)
    {
        $this->seanceRepository = $seanceRepository;
    }

    #[Route('/populaires', name: 'populaires', methods: ['GET'])]
    public function getTopSeances(Request $request): JsonResponse
    {
        $limit = $request->query->get('limit', 3);

        $seances = $this->seanceRepository->findTopSeances((int) $limit);

        return $this->json($seances);
    }
}
