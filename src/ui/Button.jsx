import { defaultShouldDehydrateMutation } from "@tanstack/react-query";
import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};


function Button({onClick, type="medium", variation="primary"}) {

  let typeDist = {
    "small":"px-[0.4rem] py-[0.8rem] uppercase text-[1.2rem] font-semibold text-center",
    "medium":"px-[1.2rem] py-[1.6rem] uppercase text-[1.4rem] font-semibold text-center",
    "large":"px-[1.2rem] py-[2.4rem] uppercase text-[1.6rem] font-semibold text-center",
  }
  let variationDist = {
    "primary":"text-[#eef2ff] bg-[#6366f1] border-[#e5e7eb] hover:bg-[#4338ca]",
    "secondary":"text-[#6b7280] bg-[#fff] border-[#e5e7eb] border-2 hover:bg-[#f9fafb]",
    "danger":"text-[#fee2e2] bg-[#b91c1c] border-[#e5e7eb] hover:bg-[#991b1b]"
  }

  return(
    <button onClick={onClick} className={` ${typeDist[type]} ${variationDist[variation]}`}></button>
  )
};

export default Button;
