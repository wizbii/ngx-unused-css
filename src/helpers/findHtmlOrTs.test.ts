import mock from 'mock-fs';
import findHtmlOrTs from './findHtmlOrTs';

describe('findHtmlOrTs', () => {
  beforeEach(() => {
    mock({
      base: {
        'somefile.component.html': 'file content here',
        'somefilets.component.ts': 'file content here',
        subdir: {
          'somefilefromsubdir.component.html': 'file content here',
          'somefilefromsubdirts.component.ts': 'file content here'
        }
      }
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('should return array of html files', () => {
    const results = findHtmlOrTs('base');
    expect(results).toEqual([
      'base/somefilets.component.ts',
      'base/subdir/somefilefromsubdirts.component.ts',
      'base/somefile.component.html',
      'base/subdir/somefilefromsubdir.component.html'
    ]);
  });
});
