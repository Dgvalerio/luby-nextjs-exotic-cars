import { NextPage } from 'next';
import Image from 'next/image';

import { useRef } from 'react';

import { darken } from 'polished';
import styled from 'styled-components';

const Wrapper = styled.header`
  &,
  .content,
  form,
  label,
  .actions {
    display: flex;
  }

  height: 83px;

  justify-content: center;
  box-shadow: 0 10px 30px #0000001a;

  .content {
    flex: 1;
    max-width: ${({ theme }) => theme.sizes.contentWidth};

    align-items: center;
    justify-content: space-between;

    h1 {
      text-transform: uppercase;
      font: normal normal 600 24px/32px Segoe UI;
      letter-spacing: 0.96px;

      small {
        padding: 0 5px;
        font: normal normal normal 16px/21px Segoe UI;
        letter-spacing: 0.64px;
      }
    }

    form {
      align-items: center;
      background-color: #f3f1fc;
      border-radius: 18px;
      padding: 3px 3px 3px 27px;
      gap: 16px;

      label {
        flex: 1;

        &:first-child {
          flex: 2;
        }

        align-content: stretch;
        gap: 1px;

        input {
          background-color: transparent;
          color: #656469;
          border: none;
          font: normal normal 600 12px/16px Segoe UI;
          letter-spacing: 0.48px;
          padding: 7px;
        }
      }

      button {
        border: none;
        background-color: #fff;
        box-shadow: 0 3px 15px #00000014;
        border-radius: 100%;
        padding: 8px 7px 7px 8px;
        width: 30px;
        height: 30px;

        &:hover {
          background-color: ${({ theme }) => darken(0.1, theme.colors.primary)};
        }

        &:active {
          background-color: ${({ theme }) => darken(0.3, theme.colors.primary)};
        }
      }
    }

    .actions {
      gap: 8px;

      button {
        font: normal normal bold 16px/21px Segoe UI;
        padding: 7px 16px;
        color: ${({ theme }) => theme.colors.primary};
        background: none;
        border: none;
        border-radius: 13px;

        &:last-child {
          border: 2px solid #7b89f4;
        }

        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.background};
        }

        &:active {
          background-color: ${({ theme }) => theme.colors.primary}aa;
          color: ${({ theme }) => theme.colors.background};
        }
      }
    }
  }
`;

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
        <h1>
          Exotic<small>cars</small>
        </h1>
        <form onSubmit={submitHandler}>
          <label htmlFor="location">
            <Image
              src="/icons/map-pin.svg"
              width={13}
              height={17}
              alt="Search button"
            />
            <input
              id="location"
              defaultValue="North Carolina, NC 90025"
              ref={locationInputRef}
            />
          </label>
          <label htmlFor="initialDate">
            <Image
              src="/icons/calendar.svg"
              width={18}
              height={18}
              alt="Search button"
            />
            <input
              id="initialDate"
              type="date"
              defaultValue="2021-03-11"
              ref={initialDateInputRef}
            />
          </label>
          <label htmlFor="finalDate">
            <Image
              src="/icons/calendar.svg"
              width={18}
              height={18}
              alt="Search button"
            />
            <input
              id="finalDate"
              type="date"
              defaultValue="2021-12-12"
              ref={finalDateInputRef}
            />
          </label>
          <button type="submit">
            <Image
              src="/icons/search.svg"
              width={15}
              height={15}
              alt="Search button"
            />
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
