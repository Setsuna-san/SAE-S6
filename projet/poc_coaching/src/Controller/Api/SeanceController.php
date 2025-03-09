<?php

namespace App\Controller;

use App\Entity\Seance;
use App\Repository\SeanceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/seance', name: 'seance_')]
class SeanceController extends AbstractController
{
    #[Route('/', name: 'list', methods: ['GET'])]
    public function list(SeanceRepository $seanceRepository): JsonResponse
    {
        $seances = $seanceRepository->findAll();
        return $this->json($seances, 200, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Seance $seance): JsonResponse
    {
        return $this->json($seance, 200, [], ['groups' => 'seance:read']);
    }

    #[Route('/create', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $seance = $serializer->deserialize($request->getContent(), Seance::class, 'json');
        $entityManager->persist($seance);
        $entityManager->flush();
        return $this->json($seance, 201, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}/edit', name: 'edit', methods: ['PUT'])]
    public function edit(Request $request, Seance $seance, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $serializer->deserialize($request->getContent(), Seance::class, 'json', ['object_to_populate' => $seance]);
        $entityManager->flush();
        return $this->json($seance, 200, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Seance $seance, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($seance);
        $entityManager->flush();
        return $this->json(null, 204);
    }
}