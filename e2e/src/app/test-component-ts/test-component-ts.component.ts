/* eslint-disable @typescript-eslint/no-explicit-any */
function Component(_arg0: {
  template: string;
  styles: string[];
}): (
  target: typeof TestComponent,
  context: any
) => void | typeof TestComponent {
  return () => {};
}

@Component({
  template: '<p class="global-class-used">test-component works!</p>',
  styles: [
    `
      .test-component-ts-class {
        color: red;
      }
    `
  ]
})
export class TestComponent {}
