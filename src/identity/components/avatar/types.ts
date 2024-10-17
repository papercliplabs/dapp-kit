"use server";
import { HTMLAttributes } from "react";
import { GetIdentityParams } from "../../api";

export interface AvatarProps extends GetIdentityParams, HTMLAttributes<HTMLDivElement> {
  size: number;
}
