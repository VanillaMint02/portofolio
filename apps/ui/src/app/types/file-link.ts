import { PortfolioEntry } from './portfolio-entry';
import { FileLinkMode } from '../utils/file-link.mode';

export interface FileLink {
  objectKey: string;
  filename: string;
  portfolioId?: string;
  parentId?: string;
  mode?: FileLinkMode;
}
