import type { IconDefinition } from '@fortawesome/free-brands-svg-icons';

export type Platform = {
	id: string;
	name: string;
	color: string;
	icon: IconDefinition;
	linkIncludes: string;
};
