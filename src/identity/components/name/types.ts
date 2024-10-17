import { HTMLAttributes } from "react";
import { GetIdentityParams } from "../../api";

export interface NameProps extends GetIdentityParams, HTMLAttributes<HTMLDivElement> {}
