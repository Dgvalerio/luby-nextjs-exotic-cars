/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import fs from 'fs/promises';
import path from 'path';
import { darken, transparentize } from 'polished';
import styled from 'styled-components';

import Icon from '../components/icon';
import { ICar, IJsonCar } from '../types/interface';
import { slugify } from '../utils';

const Wrapper = styled.main`
  &,
  .content,
  .top,
  .middle,
  .bottom {
    display: flex;
  }

  justify-content: center;
  padding-top: 7rem;
  padding-bottom: 2.8rem;
  background: transparent linear-gradient(125deg, #ffffff 0, #d8d7d7 100%);
  flex: 1;

  .content {
    flex: 1;
    max-width: ${({ theme }) => theme.sizes.contentWidth};
    flex-direction: column;
    gap: 1rem;

    .top {
      justify-content: space-between;

      div:first-child {
        display: flex;
        gap: 39px;

        h1 {
          font: normal normal bold 50px/67px Segoe UI;
        }

        h2 {
          font: normal normal 300 40px/53px Segoe UI;
        }
      }

      div:last-child {
        h3 {
          text-align: right;
          font: normal normal bold 50px/67px Segoe UI;
        }

        h4 {
          text-align: right;
          font: normal normal 300 30px/40px Segoe UI;
        }
      }
    }

    .middle {
      align-items: center;
      justify-content: center;
      gap: 64px;
      margin-right: 168.19px;

      button {
        display: flex;
        align-items: center;
        border: 1px solid ${({ theme }) => theme.colors.text};
        border-radius: 25px;
        padding: 16px;
        gap: 8px;
        transition: 0.4s all;
        font: normal normal 300 16px/21px Segoe UI;
        box-shadow: 0 5px 20px #0000001a;

        svg path {
          stroke: ${({ theme }) => theme.colors.text};
        }

        &:hover {
          background-color: ${({ theme }) =>
            transparentize(0.3, theme.colors.text)};
        }

        &:active {
          background-color: ${({ theme }) => theme.colors.text};
          color: ${({ theme }) => theme.colors.background};

          svg path {
            stroke: ${({ theme }) => theme.colors.background};
          }
        }
      }

      div {
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
          color: ${({ theme }) => theme.colors.background};
          background-color: ${({ theme }) => theme.colors.text};
          padding: 16px 32px;
          margin-top: 16px;
          margin-bottom: 16px;

          svg path {
            stroke: ${({ theme }) => theme.colors.background};
          }

          &:hover {
            background-color: ${({ theme }) =>
              transparentize(0.3, theme.colors.text)};
          }

          &:active {
            background-color: ${({ theme }) => theme.colors.text};
            color: ${({ theme }) => theme.colors.background};

            svg path {
              stroke: ${({ theme }) => theme.colors.background};
            }
          }
        }
      }
    }

    .bottom {
      align-items: center;
      justify-content: space-between;
      padding-top: 64px;

      button {
        border-radius: 50%;
        height: 42px;
        width: 42px;
        background-color: ${({ theme }) => theme.colors.text};
        border: none;

        display: flex;
        align-items: center;
        justify-content: center;

        svg path {
          stroke: ${({ theme }) => theme.colors.background};
        }

        &:hover {
          background-color: ${({ theme }) =>
            transparentize(0.3, theme.colors.text)};
        }

        &:active {
          background-color: ${({ theme }) => theme.colors.text};
        }
      }
    }
  }
`;

const CarOption = styled.div<{ active: boolean }>`
  &,
  > div {
    display: flex;
  }
  padding-right: 64px;
  align-items: center;
  transform: translateY(${({ active }) => (active ? '-48px' : '0')});

  > div {
    align-items: center;
    width: ${({ active }) => (active ? '300px' : '224px')};
    height: ${({ active }) => (active ? '240px' : '179px')};
    border-radius: 20px;

    > div {
      transform: translateX(${({ active }) => (active ? '64px' : '32px')});
      min-width: 256px;
      min-height: 179px;
    }

    background: ${({ active }) =>
      active ? '#e6d3f1 linear-gradient(52deg, #a1a7f4, #e6d3f1)' : '#d8d7d7'};
    background-size: 200% 100%;

    animation: ${({ active }) =>
      active ? 'active 2s linear infinite' : 'none'};

    cursor: pointer;

    &:active {
      background: ${() => darken(0.1, '#a1a7f4')};
    }

    @keyframes active {
      0% {
        background-position: 0 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0 50%;
      }
    }
  }
`;

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
