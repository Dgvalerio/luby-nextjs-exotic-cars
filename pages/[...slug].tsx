/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useCallback, useEffect, useState } from 'react';

import fs from 'fs/promises';
import path from 'path';

import Icon from '../components/icon';
import { Wrapper, CarOption } from '../styles/details';
import { ICar, IJsonCar } from '../types/interface';
import { slugify } from '../utils';

interface ICarWithID extends ICar {
  id: number;
}

type DetailsPageProps = { cars: ICarWithID[]; activeCar: ICarWithID };
type DetailsPagePath = { slug: string[] };

const DetailsPage: NextPage<DetailsPageProps> = ({ cars: crs, activeCar }) => {
  const router = useRouter();

  const formatCarsArray = useCallback(
    (cars: ICarWithID[], car: ICarWithID): ICarWithID[] => {
      const { length } = cars;
      const newCars = cars;
      const middlePosition = Math.ceil(length / 2) - 1;

      let carPosition = newCars.findIndex(({ slug }) => slug === car.slug);

      const isMajor = carPosition > middlePosition;
      const isMinor = carPosition < middlePosition;

      while (carPosition !== middlePosition) {
        if (isMajor) {
          const last = newCars.pop();
          if (last) newCars.unshift(last);
        } else if (isMinor) {
          const first = newCars.shift();
          if (first) newCars.push(first);
        }

        carPosition = newCars.findIndex(({ slug }) => slug === car.slug);
      }

      return newCars;
    },
    []
  );

  const [cars, setCars] = useState<ICarWithID[]>([]);
  const [car, setCar] = useState<ICarWithID>();

  useEffect(() => {
    setCars(formatCarsArray(crs, activeCar));
    setCar(activeCar);
  }, [activeCar, crs, formatCarsArray]);

  const colorHandler = useCallback(
    (color: string) => {
      if (!car) return;

      const selectedCar = cars.find((c) => c.color === color);

      if (!selectedCar) return;

      router
        .push(
          `/${slugify(car.brand)}/${slugify(car.model)}/${slugify(color)}`,
          undefined,
          { shallow: true }
        )
        .then(() => {
          setCars((prev) => formatCarsArray(prev, selectedCar));
          setCar(selectedCar);
        });
    },
    [car, cars, formatCarsArray, router]
  );

  if (!car) return <p>Loading...</p>;

  const goBackHandler = () => router.push('/');

  const carPos = cars.findIndex(({ slug }) => slug === car.slug) + 1;

  const formatId = `0${car.id}`.slice(-2);

  return (
    <Wrapper>
      <div className="content">
        <div className="top">
          <div>
            <div>
              <Image
                src={`/images/brands/${slugify(car.brand)}${
                  car.brand === 'Ferrari' ? '.png' : '.svg'
                }`}
                alt={car.brand}
                height={123}
                width={91}
              />
            </div>
            <div>
              <h1>
                {car.brand} {car.model}
              </h1>
              <h2>${car.pricePerDay}/day</h2>
            </div>
          </div>
          <div>
            <h3>{formatId}</h3>
            <h4>{car.color}</h4>
          </div>
        </div>
        <div className="middle">
          <button type="button" onClick={goBackHandler}>
            <Icon name="arrow left" height={16} width={24} /> Back to catalog
          </button>
          <div>
            <Image
              src={`/images/cars/side/${car.slug}.png`}
              alt="Ferrari"
              height={256}
              width={640}
              objectFit="contain"
            />
            <button type="button">
              Book now <Icon name="arrow right" height={16} width={24} />
            </button>
          </div>
        </div>
        <div className="bottom">
          <button
            type="button"
            onClick={() => colorHandler(cars[carPos - 2].color)}
          >
            <Icon name="arrow left" height={16} width={24} />
          </button>
          {cars.map((c) => (
            <CarOption
              key={c.slug}
              active={c.color === car.color}
              onClick={() => colorHandler(c.color)}
            >
              <div>
                <Image
                  src={`/images/cars/side/${c.slug}.png`}
                  alt={`${c.brand} ${c.model} ${c.color}`}
                  width={c.color === car.color ? 384 : 256}
                  height={c.color === car.color ? 172 : 128}
                  objectFit="contain"
                />
              </div>
            </CarOption>
          ))}
          <button
            type="button"
            onClick={() => colorHandler(cars[carPos].color)}
          >
            <Icon name="arrow right" height={16} width={24} />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export const getStaticProps: GetStaticProps<DetailsPageProps, DetailsPagePath> =
  async ({ params }) => {
    if (!params || !params.slug) return { notFound: true };
    const [brand, model, color] = params.slug;

    const filePath = path.join(process.cwd(), 'data', 'cars.json');
    const jsonData = await fs.readFile(filePath);
    const data: { cars: IJsonCar[] } = await JSON.parse(jsonData.toString());

    if (data.cars.length === 0) return { notFound: true };

    const slug = `${brand}-${model}`;

    const cars: ICarWithID[] = data.cars
      .filter((aCar: IJsonCar) => aCar.slug.includes(slug))
      .map((car: IJsonCar, i: number) => ({
        id: i + 1,
        slug: car.slug,
        brand: car.brand,
        model: car.model,
        pricePerDay: car.price_per_day,
        color: car.color,
      }));
    const activeCar = cars.find(
      (car: ICar) => car.color.toLowerCase() === color
    );

    if (!activeCar) return { notFound: true };

    return { props: { cars, activeCar } };
  };

export const getStaticPaths: GetStaticPaths<DetailsPagePath> = async () => {
  const filePath = path.join(process.cwd(), 'data', 'cars.json');
  const jsonData = await fs.readFile(filePath);
  const { cars }: { cars: ICar[] } = await JSON.parse(jsonData.toString());

  const paths = cars.map(({ brand, model, color }) => ({
    params: { slug: [slugify(brand), slugify(model), slugify(color)] },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default DetailsPage;
