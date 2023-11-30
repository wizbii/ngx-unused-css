/* eslint-disable @typescript-eslint/ban-ts-comment */
import { vol } from 'memfs';
import { Config } from '../config';
import findUnusedCss from './findUnusedCss';
import UnusedClasses from './getUnusedClasses';

jest.mock('fs');
jest.mock('./../helpers/findHtmlOrTs', () =>
  jest.fn().mockReturnValue(['file.html'])
);
jest.mock('./findUnusedCss', () => jest.fn());
jest.mock('../..', () => jest.fn());

const mockFindUnusedCss = (returnValue: string[]) => {
  // @ts-ignore
  findUnusedCss.mockImplementationOnce(() => {
    return Promise.resolve(returnValue);
  });
};

describe('GetUnusedClasses', () => {
  beforeEach(() => {
    vol.fromNestedJSON({
      'file.html': 'content file html',
      'file.scss': 'content file scss'
    });
  });

  it('should return empty array if no unused css files', async () => {
    mockFindUnusedCss([]);

    const result = await new UnusedClasses({
      styleExt: 'scss'
    } as unknown as Config).getUnusedClasses('');
    expect(result).toEqual([]);
  });

  it('should return only unused classes from the results', async () => {
    mockFindUnusedCss(['class1']);

    const result = await new UnusedClasses({
      styleExt: 'scss'
    } as unknown as Config).getUnusedClasses('');
    expect(result).toEqual([[['class1'], 'file.html']]);
  });

  afterEach(() => {
    vol.reset();
  });
});
