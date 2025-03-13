<?php

namespace App\Controller\Api;

use App\Entity\Sportif;
use App\Repository\SeanceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/bilan', name: 'api_bilan_')]
class BilanController extends AbstractController
{
    private SeanceRepository $seanceRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(SeanceRepository $seanceRepository, EntityManagerInterface $entityManager)
    {
        $this->seanceRepository = $seanceRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/{id_sportif}', name: 'sportif', methods: ['GET'])]
    public function getBilan(Request $request, int $id_sportif): JsonResponse
    {
        $sportif = $this->entityManager->getRepository(Sportif::class)->find($id_sportif);

        if (!$sportif) {
            return $this->json(['message' => 'Sportif non trouvé.'], 404);
        }

        $dateMin = new \DateTime($request->query->get('date_min', 'first day of this month'));
        $dateMax = new \DateTime($request->query->get('date_max', 'last day of this month'));

        $seances = $sportif->getSeances()->filter(function ($seance) use ($dateMin, $dateMax) {
            return $seance->getDateHeure() >= $dateMin && $seance->getDateHeure() <= $dateMax;
        })->toArray();

        if (empty($seances)) {
            return $this->json(['message' => 'Aucune séance trouvée pour cette période.'], 404);
        }

        return $this->json($this->calculateBilan($seances));
    }

    private function calculateBilan(array $seances): array
    {
        $totalSeances = count($seances);
        $totalDuree = 0;
        $typeSeanceCount = ['solo' => 0, 'duo' => 0, 'trio' => 0];
        $exerciceCount = [];

        foreach ($seances as $seance) {
            $typeSeanceCount[$seance->getTypeSeance()]++;

            foreach ($seance->getExercices() as $exercice) {
                $totalDuree += $exercice->getDureeEstimee(); 

                $nomExercice = $exercice->getNom();
                $exerciceCount[$nomExercice] = ($exerciceCount[$nomExercice] ?? 0) + 1;
            }
        }

        arsort($exerciceCount);
        $topExercices = array_slice($exerciceCount, 0, 3, true);

        return [
            'total_seances' => $totalSeances,
            'repartition_types' => $typeSeanceCount,
            'top_exercices' => $topExercices,
            'duree_totale' => $totalDuree
        ];
    }

}
