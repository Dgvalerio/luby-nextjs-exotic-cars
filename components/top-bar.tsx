import { NextPage } from 'next';
import Link from 'next/link';

import { useRef } from 'react';

import { lighten } from 'polished';
import styled from 'styled-components';

import Icon from './icon';

const Wrapper = styled.header`
  &,
  .content,
  form,
  label,
  .actions {
    display: flex;
  }

  padding-top: 25px;
  padding-bottom: 22px;

  justify-content: center;
  box-shadow: 0 10px 30px #0000001a;
  background-color: #ffffff;

  position: fixed;
  z-index: 9998;
  width: 100%;

  .content {
    z-index: 9999;

    flex: 1;
    max-width: ${({ theme }) => theme.sizes.contentWidth};

    align-items: center;
    justify-content: space-between;

    a {
      text-transform: uppercase;
      font: normal normal 600 24px/32px Segoe UI;
      letter-spacing: 0.96px;
      text-decoration: none;
      color: ${({ theme }) => theme.colors.text};

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
        display: flex;
        align-items: center;

        svg path {
          fill: #c4c4c4;
        }

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
          margin: -3px 0;
        }
      }

      button {
        display: flex;
        align-items: center;
        justify-content: center;

        border: none;
        background-color: #fff;
        box-shadow: 0 3px 15px #00000014;
        border-radius: 100%;
        padding: 2px 4px 4px 2px;
        width: 30px;
        height: 30px;

        svg > path {
          fill: ${({ theme }) => theme.colors.primary};
        }

        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
          svg > path {
            fill: ${({ theme }) => theme.colors.background};
          }
        }

        &:active {
          background-color: ${({ theme }) =>
            lighten(0.1, theme.colors.primary)};
          svg > path {
            fill: ${({ theme }) => theme.colors.background};
          }
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
          border: 2px solid ${({ theme }) => theme.colors.primary};
        }

        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.background};
        }

        &:active {
          background-color: ${({ theme }) =>
            lighten(0.1, theme.colors.primary)};
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
