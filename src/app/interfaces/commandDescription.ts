import { Command } from "./command";

export interface CommandDescription {
  id: string;
  operation: string;
  description: string;
  command: Command;
  result: string;
  format: string;
}
