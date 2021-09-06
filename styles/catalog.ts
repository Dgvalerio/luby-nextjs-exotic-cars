import { transparentize } from 'polished';
import styled from 'styled-components';

const Wrapper = styled.main`
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
      justify-content: center;
      gap: 24px;
    }
  }

  button.back-to-top {
    box-shadow: 0 5px 15px #00000064;
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

  @media (max-width: 1024px) {
    padding-top: 5.8rem;

    button.back-to-top {
      bottom: 8px;
      right: 8px;

      height: 64px;
      width: 64px;

      svg {
        width: 32px;
      }
    }
  }
`;

export default Wrapper;
