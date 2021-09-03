import { darken, transparentize } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.main`
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

        &:not(:disabled):hover {
          background-color: ${({ theme }) =>
            transparentize(0.3, theme.colors.text)};
        }

        &:not(:disabled):active {
          background-color: ${({ theme }) => theme.colors.text};
        }

        &:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const CarOption = styled.div<{ active: boolean }>`
  &,
  > div {
    display: flex;
  }

  z-index: ${({ active }) => (active ? '10' : '9')};
  padding: 0 ${({ active }) => (active ? '32px' : '64px')} 0
    ${({ active }) => (active ? '32px' : '0')};
  align-items: center;
  transform: translateY(${({ active }) => (active ? '-48px' : '0')});

  > div {
    align-items: center;
    box-shadow: 0 0 16px #00000016;
    width: ${({ active }) => (active ? '300px' : '224px')};
    height: ${({ active }) => (active ? '240px' : '179px')};
    border-radius: 20px;

    > div {
      transform: translateX(${({ active }) => (active ? '-32px' : '32px')});
      min-width: ${({ active }) => (active ? '384px' : '256px')};
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
