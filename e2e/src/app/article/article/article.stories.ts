import { ArticleComponent } from '@commons/article/article/article.component';
import { ARTICLE_MOCK } from '@commons/article/article/article.mock';
import { Meta, StoryFn } from '@storybook/angular';

export default {
  title: 'Commons/Article',
  component: ArticleComponent,
} as Meta;

const article = ARTICLE_MOCK;

const Template: StoryFn = (props) => ({
  props,
  template: `<app-article [article]="article"></app-article>`,
});

export const Default = Template.bind({});
Default.args = { article };
