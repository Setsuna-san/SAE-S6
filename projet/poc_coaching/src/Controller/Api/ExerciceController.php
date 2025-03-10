<?php

namespace App\Controller\Api;

use App\Entity\Exercice;
use App\Repository\ExerciceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/exercices')]
class ExerciceController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SerializerInterface $serializer;

    public function __construct(EntityManagerInterface $entityManager, SerializerInterface $serializer)
    {
        $this->entityManager = $entityManager;
        $this->serializer = $serializer;
    }

    #[Route('/', methods: ['GET'])]
    public function index(ExerciceRepository $exerciceRepository): JsonResponse
    {
        $exercices = $exerciceRepository->findAll();
        return $this->json($exercices, 200, [], ['groups' => 'exercice:read']);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Exercice $exercice): JsonResponse
    {
        return $this->json($exercice, 200, [], ['groups' => 'exercice:read']);
    }
}
