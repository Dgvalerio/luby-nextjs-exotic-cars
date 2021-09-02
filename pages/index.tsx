import type { GetStaticProps, NextPage } from 'next';

import { useEffect, useState } from 'react';

import fs from 'fs/promises';
import path from 'path';

import CarCard from '../components/car-card';
import Icon from '../components/icon';
import { Wrapper } from '../styles/catalog';
import { ICar, IJsonCar } from '../types/interface';

type CatalogPageProps = { cars: ICar[] };

const CatalogPage: NextPage<CatalogPageProps> = ({ cars }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => setScrollPosition(window.scrollY);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backTopTopHandler = () =>
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return (
    <Wrapper>
      <div className="content">
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car.slug} car={car} />
          ))}
        </div>
        {scrollPosition !== 0 && (
          <button
            type="button"
            className="back-to-top"
            onClick={backTopTopHandler}
          >
            <Icon name="chevron top" height={19} width={38} />
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export const getStaticProps: GetStaticProps<CatalogPageProps> = async () => {
  const filePath = path.join(process.cwd(), 'data', 'cars.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  if (!data) return { props: { cars: [] } };

  if (data.cars.length === 0) return { notFound: true };

  const cars: ICar[] = data.cars.map((car: IJsonCar) => ({
    slug: car.slug,
    brand: car.brand,
    model: car.model,
    pricePerDay: car.price_per_day,
    color: car.color,
  }));

  return {
    props: { cars },
    revalidate: 10,
  };
};

export default CatalogPage;
