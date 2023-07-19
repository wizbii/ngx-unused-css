/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
function Component(_arg0: {
  templateUrl: string;
  styles: string[];
}): (
  target: typeof TestComponent,
  context: any
) => void | typeof TestComponent {
  return () => {};
}

@Component({
  templateUrl: './test-component-html.component.html',
  styles: [
    `
      .test-component-html-class {
        color: red;
      }
    `
  ]
})
export class TestComponent {}
