import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Car } from '../styles/components/car-card';
import { ICar } from '../types/interface';
import { slugify } from '../utils';

const CarCard: NextPage<{ car: ICar }> = ({ car }) => {
  const router = useRouter();

  const clickHandler = () =>
    router.push(
      `/${slugify(car.brand)}/${slugify(car.model)}/${slugify(car.color)}`
    );

  return (
    <Car onClick={clickHandler} onKeyPress={clickHandler} role="presentation">
      <div className="header">
        <div>
          <b>{car.brand}</b>
          <span>{car.model}</span>
        </div>
        <div>
          <div className="circle" />
          <div className="circle" />
          <div className="circle" />
        </div>
      </div>

      <Image
        src={`/images/cars/side/${car.slug}.png`}
        alt={`${car.brand} ${car.model} ${car.color}`}
        width={244}
        height={107}
      />

      <div className="footer">
        <b>Book Now</b>
        <b>
          <small>$</small>
          {car.pricePerDay}
          <small>/day</small>
        </b>
      </div>
    </Car>
  );
};

export default CarCard;
