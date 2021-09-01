import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';

import { useState } from 'react';

import fs from 'fs/promises';
import path from 'path';
import { transparentize } from 'polished';
import styled from 'styled-components';

import Icon from '../../components/icon';
import { ICar, IJsonCar } from '../../types/interface';

const Wrapper = styled.main`
  &,
  .content,
  .top,
  .middle,
  .bottom,
  .carOption,
  .carOption > div {
    display: flex;
  }

  justify-content: center;
  padding-top: 1.4rem;
  padding-bottom: 2.8rem;
  background: transparent linear-gradient(125deg, #ffffff 0, #d8d7d7 100%);

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

      .carOption {
        padding-right: 64px;
        align-items: center;

        > div {
          align-items: center;

          background: #d8d7d7;
          width: 224px;
          height: 179px;
          border-radius: 20px;

          > div {
            transform: translateX(32px);
            min-width: 256px;
            height: 179px;
          }
        }
      }
    }
  }
`;

type CarPageProps = { cars: ICar[] };
type CarPagePath = { slug: string };

const CarPage: NextPage<CarPageProps> = ({ cars: crs }) => {
  const [cars] = useState(crs);
  // const [colors, setColors] = useState<string[]>();
  // const [selectedColor, setSelectedColor] = useState<string>();

  // useEffect(() => {
  //   if (cars.length > 0) {
  //     setSelectedColor(cars[0].color);
  //   }
  // }, [cars]);

  if (!cars || cars.length === 0) return <p>Loading...</p>;

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
                {cars[0].brand} {cars[0].model}
              </h1>
              <h2>${cars[0].pricePerDay}/day</h2>
            </div>
          </div>
          <div>
            <h3>01</h3>
            <h4>{cars[0].color}</h4>
          </div>
        </div>
        <div className="middle">
          <button type="button">
            <Icon name="arrow left" height={16} width={24} /> Back to catalog
          </button>
          <div>
            <Image
              src={`/images/cars/side/${cars[0].slug}.png`}
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
            <div key={car.slug} className="carOption">
              <div>
                <Image
                  src={`/images/cars/side/${car.slug}.png`}
                  alt={`${car.brand} ${car.model} ${car.color}`}
                  width={256}
                  height={128}
                  objectFit="contain"
                />
              </div>
            </div>
          ))}
          <button type="button">
            <Icon name="arrow right" height={16} width={24} />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export const getStaticProps: GetStaticProps<CarPageProps, CarPagePath> = async (
  context
) => {
  let slug: string | string[];
  slug = context.params?.slug || '';
  slug = slug.split('-');
  slug.pop();
  slug = slug.join('-');

  const filePath = path.join(process.cwd(), 'data', 'cars.json');
  const jsonData = await fs.readFile(filePath);
  const data = await JSON.parse(jsonData.toString());

  if (data.cars.length === 0) return { notFound: true };

  const cars = data.cars.filter((aCar: IJsonCar) =>
    aCar.slug.includes(`${slug}`)
  );

  return {
    props: {
      cars: cars.map((car: IJsonCar) => ({
        slug: car.slug,
        brand: car.brand,
        model: car.model,
        pricePerDay: car.price_per_day,
        color: car.color,
      })),
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths<CarPagePath> = async () => ({
  paths: [
    { params: { slug: '' } },
    { params: { slug: '' } },
    { params: { slug: '' } },
  ],
  fallback: true,
});

export default CarPage;
