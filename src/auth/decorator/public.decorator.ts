import { SetMetadata } from "@nestjs/common";
import { IS_PUBLIC } from "../constants";

export const Public = (isPublic: boolean = true) => SetMetadata(IS_PUBLIC, isPublic);