"use server";
import { getAvatar } from "../../api";
import { SECONDS_PER_DAY } from "../../../constants";
import { safeUnstableCache } from "../../../utils";

export const getAvatarCached = safeUnstableCache(getAvatar, ["avatar"], { revalidate: SECONDS_PER_DAY });
