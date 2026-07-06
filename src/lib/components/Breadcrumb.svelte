<script lang="ts">
	import { page } from '$app/stores';
	import { navigationData } from '$lib/navData';
	import homeIcon from '$lib/assets/home.svg?raw';
	import chevronRightIcon from '$lib/assets/chevron-right.svg?raw';

	// Derive breadcrumb segments from current pathname + navData
	let crumbs = $derived.by(() => {
		const pathname = $page.url.pathname;
		const segments: { label: string; href: string }[] = [];

		for (const group of navigationData) {
			for (const section of group.sections) {
				// Check if current path starts with or matches the section href
				if (pathname === section.href || pathname.startsWith(section.href + '/')) {
					segments.push({ label: section.name, href: section.href });

					// Check sub-items
					for (const item of section.items) {
						if (pathname === item.href || pathname.startsWith(item.href + '/')) {
							segments.push({ label: item.name, href: item.href });
							if (pathname !== item.href) {
								const dynamicSegment = pathname.substring(item.href.length + 1);
								if (dynamicSegment) {
									segments.push({ label: dynamicSegment, href: pathname });
								}
							}
							break;
						}
					}
					break;
				}
			}
		}

		return segments;
	});

	// Derive the parent crumb for the mobile Back button
	let parentCrumb = $derived.by(() => {
		if (crumbs.length >= 2) {
			return crumbs[crumbs.length - 2];
		} else if (crumbs.length === 1) {
			return { label: 'Home', href: '/' };
		}
		return null;
	});
</script>

{#if parentCrumb}
	<a
		href={parentCrumb.href}
		class="inline-flex sm:hidden items-center gap-1.5 text-xs text-[#8C8FA5] hover:text-[#033069] transition-colors font-medium"
	>
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5">
			<path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" stroke-width="1.58333" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		Back to {parentCrumb.label}
	</a>
{/if}

<nav aria-label="Breadcrumb" class="hidden sm:flex items-center gap-2 text-sm">
	<!-- Home icon -->
	<a href="/" class="flex items-center text-[#8C8FA5] hover:text-[#033069] transition-colors">
		{@html homeIcon}
	</a>

	{#each crumbs as crumb, i}
		<!-- Arrow separator -->
		<span class="flex-shrink-0 text-[#8C8FA5] flex items-center justify-center">
			{@html chevronRightIcon}
		</span>

		{#if i === crumbs.length - 1}
			<!-- Last crumb — active, not a link -->
			<span class="font-semibold text-[#030519]">{crumb.label}</span>
		{:else}
			<!-- Intermediate crumb — clickable link -->
			<a
				href={crumb.href}
				class="text-[#8C8FA5] hover:text-[#033069] transition-colors font-medium"
			>
				{crumb.label}
			</a>
		{/if}
	{/each}
</nav>

