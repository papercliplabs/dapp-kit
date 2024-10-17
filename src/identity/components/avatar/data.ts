"use server";
import { unstable_cache } from "next/cache";
import { getAvatar } from "../../api";
import { SECONDS_PER_DAY } from "../../../constants";

export const getAvatarCached = unstable_cache(getAvatar, ["avatar"], { revalidate: SECONDS_PER_DAY });
