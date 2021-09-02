import { transparentize } from 'polished';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.main`
  &,
  .content {
    display: flex;
  }

  justify-content: center;
  padding-top: 7rem;
  padding-bottom: 2.8rem;

  .content {
    flex: 1;
    max-width: ${({ theme }) => theme.sizes.contentWidth};
    flex-direction: column;
    gap: 1rem;

    .cars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, 287px);
      justify-content: space-between;
      gap: 24px;
    }
  }

  button.back-to-top {
    background-color: ${({ theme }) =>
      transparentize(0.3, theme.colors.primary)};
    border-radius: 50%;
    height: 73px;
    width: 73px;
    border: none;

    position: fixed;
    align-self: flex-end;
    bottom: 42px;

    svg path {
      fill: ${({ theme }) => theme.colors.background};
    }

    &:hover {
      background-color: ${({ theme }) =>
        transparentize(0.1, theme.colors.primary)};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.background};

      svg path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
