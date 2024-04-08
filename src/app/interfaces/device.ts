import { CommandDescription } from "./commandDescription";

export interface Device {
  id: string;
  identifier: string;
  description: string;
  manufacturer: string;
  url: string;
  commands: { commandDescriptionId: string }[];
  owner: string;
}
