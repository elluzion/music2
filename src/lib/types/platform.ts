import type { Icon } from '@tabler/icons-svelte';

export type Platform = {
	id: string;
	name: string;
	color: string;
	foregroundColor: 'light' | 'dark';
	icon: Icon;
	linkIncludes: string;
};
