import { SetMetadata } from "@nestjs/common";
import { USER_ROLE } from "src/user/user.model";
import { ALLOWED_ROLES } from "../constants";

export const Roles = (roles: USER_ROLE[]) => SetMetadata(ALLOWED_ROLES, roles);