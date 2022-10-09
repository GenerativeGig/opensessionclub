import { Language } from "./Language";
import { User } from "./User";

export interface Session {
  id: string;
  titel: string;
  description: string;
  startTime: Date;
  endTime: Date;
  languages: Language[];
  communicationModes: SessionCommunicationMode[];
  formats: SessionFormat[];
  participantLimit: number;
  participants: User[];
  creator: User;
  chat: SessionChat;
  notes: SessionNote[];
}

export enum SessionCommunicationMode {
  Text = "Text",
  Speech = "Speech",
  Video = "Video",
  SignLanguage = "Sign language",
  Music = "Music",
  Whispering = "Whispering",
  MorseCode = "Morse code",
  Charades = "Charades",
  MicroExpressions = "Micro expressions",
  Other = "Other",
}

export enum SessionFormat {
  Dialog = "Dialog",
  Discussion = "Discussion",
  Presentation = "Presentation",
  Debate = "Debate",
  Interview = "Interview",
  QuestionsAndAnswers = "Q&A",
  Feedback = "Feedback",
  DeepDive = "Deep dive",
  Other = "Other",
}

// Bonus Features
export interface SessionChat {}
export interface SessionNote {}
