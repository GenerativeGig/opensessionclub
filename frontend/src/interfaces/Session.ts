import { Language } from "./Language";
import { User } from "./User";

export interface Session {
  id: string;
  titel: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participantLimit: number;
  participants: User[];
  creator: User;
  chat: SessionChat;
  notes: SessionNote[];
}

export interface SessionChat {}
export interface SessionNote {}
