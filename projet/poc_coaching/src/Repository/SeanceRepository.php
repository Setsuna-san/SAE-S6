<?php

namespace App\Repository;

use App\Entity\Seance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Seance>
 */
class SeanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Seance::class);
    }

    public function findAllOrdered(): array
    {
        return $this->getEntityManager()
            ->createQuery('SELECT s FROM App\Entity\Seance s ORDER BY s.date_heure ASC')
            ->getResult();
    }

    public function findAllOrderedBySportif(): array
    {
        return $this->getEntityManager()
            ->createQuery('SELECT s FROM App\Entity\Seance s ORDER BY s.date_heure ASC')
            ->getResult();
    }

    public function findSeancesBySportifAndPeriod(int $sportifId, \DateTime $dateMin, \DateTime $dateMax)
    {
        return $this->createQueryBuilder('s')
            ->join('s.sportifs', 'sp')
            ->where('sp.id = :sportifId')
            ->andWhere('s.dateHeure BETWEEN :dateMin AND :dateMax')
            ->setParameter('sportifId', $sportifId)
            ->setParameter('dateMin', $dateMin->format('Y-m-d 00:00:00'))
            ->setParameter('dateMax', $dateMax->format('Y-m-d 23:59:59'))
            ->getQuery()
            ->getResult();
    }


    //    /**
    //     * @return Seance[] Returns an array of Seance objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Seance
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
