import Glide from '@glidejs/glide';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesGQLEntry } from '../../queries/Articles.query';
import { HomeService } from '../../services/home.service';
import { HomeSingletonGQLResponse, HomeSingletonGQLSlideItem } from '../../queries/Home.singleton';

@Component({
	selector: 'rk-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public articles: ArticlesGQLEntry[] = [];
	public slides: (HomeSingletonGQLSlideItem & { index: number })[] = [];

	constructor(private articlesService: ArticlesService, private homeService: HomeService) { }

	public ngOnInit() {
		this.articlesService.getArticles().subscribe(articles => {
			this.articles = articles;
		});

		this.homeService.getSlides().subscribe(slides => {
			this.slides = slides;

			if (slides.length > 0) {
				const tid = setTimeout(() => {
					this.initSlider();
					clearTimeout(tid);
				}, 5);
			}
		});
	}

	public get tags() {
		return this.articles.reduce((allTags, article) => [...allTags, ...article.tags], [] as string[]);
	}

	public preloadArticle(id: string) {
		this.articlesService.preloadArticleById(id);
	}

	private initSlider() {
		new Glide('.js-v-about__header-slider', {
			focusAt: 'center',
			gap: 0,
			autoplay: 8000, // ms
			hoverpause: true,
			swipeThreshold: 100, // px
			animationDuration: 500
		}).mount();
	}
}
