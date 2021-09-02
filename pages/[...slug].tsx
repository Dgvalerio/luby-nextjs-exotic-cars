/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import fs from 'fs/promises';
import path from 'path';

import Icon from '../components/icon';
import { Wrapper, CarOption } from '../styles/details';
import { ICar, IJsonCar } from '../types/interface';
import { slugify } from '../utils';

type DetailsPageProps = { cars: ICar[]; activeCar: ICar };
type DetailsPagePath = { slug: string[] };

const DetailsPage: NextPage<DetailsPageProps> = ({ cars, activeCar }) => {
  const router = useRouter();

  const colorHandler = (color: string) =>
    router.push(
      `/${slugify(activeCar.brand)}/${slugify(activeCar.model)}/${slugify(
        color
      )}`
    );

  return (
    <Wrapper>
      <div className="content">
        <div className="top">
          <div>
            <div>
              <Image
                src="/images/brands/ferrari.png"
                alt="Ferrari"
                height={123}
                width={91}
              />
            </div>
            <div>
              <h1>
                {activeCar.brand} {activeCar.model}
              </h1>
              <h2>${activeCar.pricePerDay}/day</h2>
            </div>
          </div>
          <div>
            <h3>01</h3>
            <h4>{activeCar.color}</h4>
          </div>
        </div>
        <div className="middle">
          <button type="button">
            <Icon name="arrow left" height={16} width={24} /> Back to catalog
          </button>
          <div>
            <Image
              src={`/images/cars/side/${activeCar.slug}.png`}
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
          <button type="button">
            <Icon name="arrow left" height={16} width={24} />
          </button>
          {cars.map((car) => (
            <CarOption
              key={car.slug}
              active={car.color === activeCar.color}
              onClick={() => colorHandler(car.color)}
            >
              <div>
                <Image
                  src={`/images/cars/side/${car.slug}.png`}
                  alt={`${car.brand} ${car.model} ${car.color}`}
                  width={car.color === activeCar.color ? 343 : 256}
                  height={car.color === activeCar.color ? 172 : 128}
                  objectFit="contain"
                />
              </div>
            </CarOption>
          ))}
          <button type="button">
            <Icon name="arrow right" height={16} width={24} />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export const getStaticProps: GetStaticProps<DetailsPageProps, DetailsPagePath> =
  async ({ params }) => {
    const [brand, model, color] = params!.slug;

    const filePath = path.join(process.cwd(), 'data', 'cars.json');
    const jsonData = await fs.readFile(filePath);
    const data = await JSON.parse(jsonData.toString());

    if (data.cars.length === 0) return { notFound: true };

    const cars = data.cars
      .filter((aCar: IJsonCar) => aCar.slug.includes(`${brand}-${model}`))
      .map((car: IJsonCar) => ({
        slug: car.slug,
        brand: car.brand,
        model: car.model,
        pricePerDay: car.price_per_day,
        color: car.color,
      }));

    return {
      props: {
        cars,
        activeCar: cars.find((car: ICar) => car.color.toLowerCase() === color),
      },
    };
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
