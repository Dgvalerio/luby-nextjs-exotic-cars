import { NextPage } from 'next';
import Link from 'next/link';

import { useRef } from 'react';

import { Wrapper } from '../styles/components/top-bar';
import Icon from './icon';

const TopBar: NextPage = () => {
  const locationInputRef = useRef<HTMLInputElement>(null);
  const initialDateInputRef = useRef<HTMLInputElement>(null);
  const finalDateInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = () => {
    const location = locationInputRef.current?.value;
    const initialDate = initialDateInputRef.current?.value;
    const finalDate = finalDateInputRef.current?.value;

    // eslint-disable-next-line no-alert
    alert(
      'Você buscou por:\n' +
        `Location: ${location} \n` +
        `Initial Date: ${initialDate} \n` +
        `Final Date: ${finalDate} \n`
    );
  };

  return (
    <Wrapper>
      <div className="content">
        <Link href="/" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            Exotic<small>cars</small>
          </a>
        </Link>
        <form onSubmit={submitHandler}>
          <label htmlFor="location">
            <Icon name="map pin" width={13} height={17} />
            <input
              id="location"
              defaultValue="North Carolina, NC 90025"
              ref={locationInputRef}
            />
          </label>
          <label htmlFor="initialDate">
            <Icon name="calendar" size={18} />
            <input
              id="initialDate"
              type="date"
              defaultValue="2021-03-11"
              ref={initialDateInputRef}
            />
          </label>
          <label htmlFor="finalDate">
            <Icon name="calendar" size={18} />
            <input
              id="finalDate"
              type="date"
              defaultValue="2021-12-12"
              ref={finalDateInputRef}
            />
          </label>
          <button
            type="submit"
            aria-label="Search button"
            title="Search button"
          >
            <Icon name="search" size={16} />
          </button>
        </form>
        <div className="actions">
          <button type="button">Sign up</button>
          <button type="button">Sign in</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default TopBar;
