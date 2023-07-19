/* eslint-disable @typescript-eslint/no-explicit-any */
function Component(_arg0: {
  templateUrl: string;
  stylesUrl: string[];
}): (
  target: typeof TestComponent,
  context: any
) => void | typeof TestComponent {
  return () => {};
}

@Component({
  templateUrl: './test-component.component.html',
  stylesUrl: ['./test-component.component.scss']
})
export class TestComponent {}
