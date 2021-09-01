export interface ICar {
  slug: string;
  brand: string;
  model: string;
  pricePerDay: number;
  color: string;
}

export interface IJsonCar {
  slug: string;
  brand: string;
  model: string;
  // eslint-disable-next-line camelcase
  price_per_day: number;
  color: string;
}
