import { lighten } from 'polished';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.header`
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
