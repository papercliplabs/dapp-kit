import { Address } from "viem";
import IdentityContainer from "./IdentityContainer";
import { ComponentProps } from "react";

export interface IdentityProps extends ComponentProps<typeof IdentityContainer> {
  address: Address;
  avatarSize: number;

  hideName?: boolean;
  hideAvatar?: boolean;
}
