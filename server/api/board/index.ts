import type { UserId } from '$/commonTypesWithClient/branded';

export type Methods = {
  get: {
    resBody: number[][];
  };
  post: {
    reqBody: { x: number; y: number; id: UserId };
    resBody: number[][];
  };
};
