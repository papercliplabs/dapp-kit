"use server";
import { HTMLAttributes } from "react";
import { GetIdentityParams } from "../../api";
import { CacheWrapper } from "../../../types";

export interface AvatarProps extends GetIdentityParams, HTMLAttributes<HTMLDivElement> {
  size: number;
}
