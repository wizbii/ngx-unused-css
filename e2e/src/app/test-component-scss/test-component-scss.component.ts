/* eslint-disable @typescript-eslint/no-explicit-any */
function Component(_arg0: {
  template: string;
  stylesUrl: string[];
}): (
  target: typeof TestComponent,
  context: any
) => void | typeof TestComponent {
  return () => {};
}

@Component({
  template: '<p class="global-class-used">test-component works!</p>',
  stylesUrl: ['./test-component-html.component.scss']
})
export class TestComponent {}
