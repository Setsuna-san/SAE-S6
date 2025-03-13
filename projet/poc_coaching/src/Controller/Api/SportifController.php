<?php

namespace App\Controller\Api;

use App\Entity\Seance;
use App\Entity\Sportif;
use App\Repository\SeanceRepository;
use App\Repository\SportifRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Tools\Debug;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SportifController extends AbstractController
{
    #[Route('/api/sportifs', methods: ['GET'])]
    public function index(SportifRepository $sportifRepository): JsonResponse
    {
        $sportifs = $sportifRepository->findAll();
        return $this->json($sportifs, 200, [], ['groups' => 'sportif:read']);
    }

    #[Route('/api/sportif/{email}', methods: ['GET'])]
    public function show(SportifRepository $sportifRepository, string $email): JsonResponse
    {
        $sportif = $sportifRepository->findOneBy(['email' => $email]);

        if (!$sportif) {
            return $this->json(['message' => 'Sportif non trouvé'], 404);
        }

        return $this->json($sportif, 200, [], ['groups' => 'sportif:read', 'seance:read']);
    }


    #[Route('/api/sportif/{id}/seance', methods: ['POST'])]
    public function addSeance(SportifRepository $sportifRepository, SeanceRepository $seanceRepository, EntityManagerInterface $entityManager, Request $request, int $id): JsonResponse
    {
        $sportif = $sportifRepository->find($id);

        if (!$sportif) {
            return $this->json(['message' => 'Sportif non trouvé'], 404);
        }
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['message' => 'Données invalides'], 400);
        }
        $seance = $seanceRepository->findOneBy(["id"=> $data]);

        // $seance->addSportif($sportif);
        // // Ajouter la séance au sportif
        $sportif->addSeance($seance);


        $entityManager->persist($seance);
        $entityManager->flush();

        return $this->json($sportif, 200, [], ['groups' => 'sportif:read']);
    }

    #[Route('/api/sportif/{id}/seance/{idSeance}', methods: ['DELETE'])]
    public function deleteSeance(SportifRepository $sportifRepository, SeanceRepository $seanceRepository, EntityManagerInterface $entityManager, int $id, int $idSeance): JsonResponse
    {
        $sportif = $sportifRepository->find($id);

        if (!$sportif) {
            return $this->json(['message' => 'Sportif non trouvé'], 404);
        }
        
        $seance = $seanceRepository->find($idSeance);

        if (!$seance) {
            return $this->json(['message' => 'Séance non trouvée'], 404);
        }

        if (!$sportif->getSeances()->contains($seance)) {
            return $this->json(['message' => 'Séance non associée à ce sportif'], 400);
        }

        $sportif->removeSeance($seance);

        $entityManager->persist($sportif);
        $entityManager->flush();

        return $this->json(['message' => 'Séance supprimée avec succès'], 200);
    }
}
