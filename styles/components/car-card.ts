import { darken } from 'polished';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Car = styled.article`
  background: #f8f8fa;
  border-radius: 20px;
  width: 287px;
  height: 223px;
  padding: 22px 16px;
  transition: 0.4s all;

  display: flex;
  flex-direction: column;

  div {
    background: transparent;
  }

  .header {
    display: flex;
    justify-content: space-between;

    div:first-child {
      display: flex;
      flex-direction: column;

      b:first-child {
        font: normal normal bold 17px/22px Segoe UI;
      }

      span {
        text-transform: uppercase;
        font: normal normal 300 17px/22px Segoe UI;
        margin-bottom: auto;
      }
    }

    div:last-child {
      display: flex;
      gap: 2px;

      .circle {
        width: 6px;
        height: 6px;
        background: #c8c8ca;
        border-radius: 50%;
        opacity: 0.64;
      }
    }
  }

  img {
    object-fit: none;
    object-position: bottom;
    background: transparent;
  }

  .footer {
    display: flex;
    align-items: baseline;

    b:first-child {
      color: #f8f8fa;
      opacity: 0;
      transition: 0.2s all;
    }

    b:last-child {
      display: flex;
      align-items: baseline;
      font: normal normal bold 24px/32px Segoe UI;
      margin-left: auto;

      small:first-child {
        font: normal normal bold 14px/19px Segoe UI;
        margin-bottom: auto;
      }

      small:last-child {
        font: normal normal 400 14px/19px Segoe UI;
      }
    }
  }

  &:hover {
    background: #e6d3f1 linear-gradient(52deg, #a1a7f4, #e6d3f1);
    background-size: 200% 100%;

    animation: active 2s linear infinite;

    cursor: pointer;

    .header {
      div:last-child {
        .circle {
          background: #313136;
        }
      }
    }

    .footer {
      b:first-child {
        opacity: 1;
      }
    }
  }

  &:active {
    background: ${() => darken(0.1, '#a1a7f4')};
    color: #f8f8fa;
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
`;
