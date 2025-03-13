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

    #[Route('/seances', name: 'seances', methods: ['GET'])]
    public function getSeancesRemplissage(SeanceRepository $seanceRepository): JsonResponse
    {
        $seances = $seanceRepository->findAll();
        $stats = [];

        foreach ($seances as $seance) {
            $capaciteMax = match ($seance->getTypeSeance()) {
                'solo' => 1,
                'duo' => 2,
                'trio' => 3,
                default => 0
            };

            $placesOccupees = count($seance->getSportifs());
            $remplissage = $capaciteMax > 0 ? round(($placesOccupees / $capaciteMax) * 100, 2) . '%' : '0%';

            $stats[] = [
                'id' => $seance->getId(),
                'theme_seance' => $seance->getThemeSeance(),
                'type_seance' => $seance->getTypeSeance(),
                'places_max' => $capaciteMax,
                'places_occupees' => $placesOccupees,
                'remplissage' => $remplissage,
            ];
        }

        return $this->json($stats);
    }

}


