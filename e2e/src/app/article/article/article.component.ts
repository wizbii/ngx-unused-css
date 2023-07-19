/* eslint-disable @typescript-eslint/no-explicit-any */
function Component(_arg0: {
  selector: string;
  templateUrl: string;
  styleUrls: string[];
  standalone: boolean;
  changeDetection: any;
  imports: any;
}): (
  target: typeof ArticleComponent,
  context: any
) => void | typeof ArticleComponent {
  return () => {};
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: '',
  standalone: true,
  imports: []
})
export class ArticleComponent {}
