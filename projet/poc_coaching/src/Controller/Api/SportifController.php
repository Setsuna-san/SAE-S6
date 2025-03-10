<?php

namespace App\Controller\Api;

use App\Entity\Sportif;
use App\Repository\SportifRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SportifController extends AbstractController
{
    #[Route('/api/sportif/{id}', methods: ['GET'])]
    public function show(Sportif $sportif): JsonResponse
    {
        return $this->json($sportif, 200, [], ['groups' => 'sportif:read']);
    }

    #[Route('/api/sportif/{id}/seances', methods: ['GET'])]
    public function getSeances(Sportif $sportif): JsonResponse
    {
        $seances = $sportif->getSeances();
        return $this->json($seances, 200, [], ['groups' => 'seance:read']);
    }
}
