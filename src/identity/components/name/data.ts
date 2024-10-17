"use server";
import { unstable_cache } from "next/cache";
import { getName } from "../../api";
import { SECONDS_PER_DAY } from "../../../constants";

export const getNameCached = unstable_cache(getName, ["name"], { revalidate: SECONDS_PER_DAY });
