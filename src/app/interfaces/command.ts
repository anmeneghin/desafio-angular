import { Parameter } from "./parameter";

export interface Command {
  command: string;
  description: string;
  parameters: Parameter[];
}
