/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Config } from '../config';
import parseNgClass from './../helpers/parseNgClass';
import whitelist from './../helpers/whitelist';
import compileSCSS from './compileSCSS';
import findUnusedCss from './findUnusedCss';

jest.mock('./compileSCSS', () => jest.fn());
jest.mock('./../helpers/parseNgClass', () => jest.fn());
jest.mock('./../helpers/whitelist', () => jest.fn());

describe('FindUnusedCss', () => {
  it('should return unused css classes and attributes', async () => {
    // @ts-ignore
    compileSCSS.mockImplementation(() => {
      return '.test-class {} a {} span {}';
    });

    // @ts-ignore
    parseNgClass.mockImplementation(() => {
      return '<div class="test-class1"><a></a></div>';
    });

    // @ts-ignore
    whitelist.mockImplementation((classes: string[]) => {
      return classes; // proxy classes to the result, whitelist has separate unit test
    });

    const result = await findUnusedCss(
      'content',
      'cssPath',
      {} as unknown as Config
    );

    expect(result).toEqual(['.test-class', 'span']);
  });
});
