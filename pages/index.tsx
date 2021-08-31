import type { GetStaticProps, NextPage } from 'next';

import fs from 'fs/promises';
import path from 'path';
import styled from 'styled-components';

import CarCard from '../components/car-card';
import { ICar } from '../types/interface';

const Wrapper = styled.main`
  &,
  .content {
    display: flex;
  }

  justify-content: center;
  padding-top: 1.4rem;
  padding-bottom: 2.8rem;

  .content {
    flex: 1;
    max-width: ${({ theme }) => theme.sizes.contentWidth};
    flex-direction: column;
    gap: 1rem;

    .cars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, 287px);
      justify-content: space-between;
      gap: 24px;
    }
  }
`;

type HomeProps = { cars: ICar[] };

const Home: NextPage<HomeProps> = ({ cars }) => (
  <Wrapper>
    <div className="content">
      <h1>Home Page</h1>
      <div className="cars-grid">
        {cars.map((car) => (
          <CarCard key={car.slug} car={car} />
        ))}
      </div>
    </div>
  </Wrapper>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const filePath = path.join(process.cwd(), 'data', 'cars.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  if (!data) return { props: { cars: [] } };

  if (data.cars.length === 0) return { notFound: true };

  const cars: ICar[] = data.cars.map(
    (car: {
      slug: string;
      brand: string;
      model: string;
      // eslint-disable-next-line camelcase
      price_per_day: number;
      color: string;
    }) => ({
      slug: car.slug,
      brand: car.brand,
      model: car.model,
      pricePerDay: car.price_per_day,
      color: car.color,
    })
  );

  return {
    props: { cars },
    revalidate: 10,
  };
};

export default Home;
