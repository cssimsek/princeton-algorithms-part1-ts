/**
 * A somewhat hacky solution that allows to move Jest global extensions to be moved
 * to their own file. Ref: [stackoverflow answer](https://stackoverflow.com/a/59499895/2668568)
 */

import { IllegalArgumentException } from './IllegalArgumentException';
import { DeprecatedException } from './DeprecationException';

export class JestGlobalsExtender {}

declare global {
    namespace jest {
      // tslint:disable-next-line:interface-name
        interface Matchers<R> {
            throwsIllegalArgumentException(): CustomMatcherResult
            isIllegalArgumentExceptionMessage(): CustomMatcherResult
            throwsDeprecatedException(): CustomMatcherResult
        }
    }
}

expect.extend({
  isIllegalArgumentExceptionMessage: (actualString: string) => ({
    message: () => `expected that ${actualString} matches IllegalArgumentException message signature`,
    pass: (/Index '(?:-)?\d+' is not between \d+ and \d+/i).test(actualString),
  }),
});

expect.extend({
  throwsIllegalArgumentException<T>(received: IllegalArgumentException): jest.CustomMatcherResult {
    const expectedType = IllegalArgumentException;
    return {
      message: () => `expected that ${received} is of type ${expectedType}`,
      pass: received instanceof expectedType
    }
  },
  throwsDeprecatedException<T>(received: DeprecatedException): jest.CustomMatcherResult {
    const expectedType = DeprecatedException;
    return {
      message: () => `expected that ${received} is of type ${expectedType}`,
      pass: received instanceof expectedType
    }
  },
});