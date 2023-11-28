import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum USER_ROLE {
	ADMIN = 'ADMIN',
	MODERATOR = 'MODERATOR',
	USER = 'USER',
}

@Schema({ timestamps: true })
export class User {
	@Prop({
		required: true,
		unique: true,
	})
	username: string;

	@Prop({
		required: true,
	})
	role: USER_ROLE;

	@Prop({
		required: true,
	})
	password: string;

	@Prop({
		required: true,
		default: 0,
	})
	balance: 0;
}

export const UserSchema = SchemaFactory.createForClass(User);
