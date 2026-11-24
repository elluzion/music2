import type { Icon } from '@tabler/icons-svelte';

export type Platform = {
	id: string;
	name: string;
	color: string;
	icon: Icon;
	linkIncludes: string;
};
