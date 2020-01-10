import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CockpitImageSchema } from '../../../schema/CockpitImageSchema';
import { SponsorLevel, SponsorLevelType } from '../../../types/Sponsor';

@Component({
	selector: 'rk-teaser-sponsor',
	templateUrl: './teaser-sponsor.component.html',
	styleUrls: ['./teaser-sponsor.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class TeaserSponsorComponent {
	@Input() public slug: string;
	@Input() public name: string;
	@Input() public url: string;
	@Input() public logo: CockpitImageSchema;
	@Input() public description?: string;
	@Input() public level: SponsorLevelType;
	@Input() public lastActiveYear: string;
	@Input() public joinedYear: string;


	public get yearInformation() {
		if (this.lastActiveYear) {
			if (this.joinedYear === this.lastActiveYear) {
				return this.lastActiveYear;
			}

			return `${this.joinedYear} – ${this.lastActiveYear}`;
		}
	}

	public get icon() {
		return {
			color: this.iconLevelColor,
			select: 'award'
		};
	}

	public get iconLevelColor() {
		switch (this.level) {
			case SponsorLevel.BRONZE:
				return '#8a7942';
			case SponsorLevel.SILVER:
				return '#adadad';
			case SponsorLevel.GOLD:
				return '#d1b760';
			default:
				return null;
		}
	}
}
