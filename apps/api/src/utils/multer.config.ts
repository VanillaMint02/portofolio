import { MulterModuleOptions } from '@nestjs/platform-express';

export function MulterConfiguration(destination: string): MulterModuleOptions {
  return {
    dest: destination,
  };
}
