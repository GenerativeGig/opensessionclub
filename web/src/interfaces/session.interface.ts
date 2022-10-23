import { Actor } from "./actor.interface";

export interface Session {
  id: string;
  titel: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participantLimit: number;
  participants: Actor[];
  creator: Actor;
  chat: SessionChat;
  notes: SessionNote[];
}

export interface SessionChat {}
export interface SessionNote {}
