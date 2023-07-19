/* eslint-disable @typescript-eslint/ban-ts-comment */
import mock from 'mock-fs';
import { Config } from '../config';
import findHtmlOrTs from './../helpers/findHtmlOrTs';
import findUnusedCss from './findUnusedCss';
import UnusedClasses from './getUnusedClasses';

jest.mock('./../helpers/findHtmlOrTs', () => jest.fn());
jest.mock('./findUnusedCss', () => jest.fn());
jest.mock('../..', () => jest.fn());

const mockFindUnusedCss = (returnValue: string[]) => {
  // @ts-ignore
  findUnusedCss.mockImplementationOnce(() => {
    return Promise.resolve(returnValue);
  });
};

describe('GetUnusedClasses', () => {
  beforeAll(() => {
    mock({
      'file.html': 'file.html',
      'file.scss': 'file.scss'
    });

    // @ts-ignore
    findHtmlOrTs.mockImplementation(() => {
      return ['file.html'];
    });
  });

  afterAll(() => {
    mock.restore();
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
});
