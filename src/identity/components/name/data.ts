"use server";
import { getName } from "../../api";
import { SECONDS_PER_DAY } from "../../../constants";
import { safeUnstableCache } from "../../../utils";

export const getNameCached = safeUnstableCache(getName, ["name"], { revalidate: SECONDS_PER_DAY });
