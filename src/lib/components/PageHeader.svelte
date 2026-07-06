<script lang="ts">
	import { page } from '$app/stores';
	import { navigationData } from '$lib/navData';

	// Derive the current page info from navData + route
	let pageInfo = $derived.by(() => {
		const pathname = $page.url.pathname;

		for (const group of navigationData) {
			for (const section of group.sections) {
				// Check sub-items first (more specific match)
				for (const item of section.items) {
					if (pathname === item.href) {
						return {
							title: item.name,
							description: item.description || '',
							iconSvg: section.iconPath
						};
					}
				}
				// Then check section itself
				if (pathname === section.href) {
					return {
						title: section.name,
						description: section.description || '',
						iconSvg: section.iconPath
					};
				}
			}
		}

		return null;
	});
</script>

{#if pageInfo}
	<div class="w-full pl-4 pt-4">
		<div class="flex items-center">
			<div class="p-2 bg-[#f8f9fc] rounded page-header-icon">
				{@html pageInfo.iconSvg}
			</div>
			<div class="pl-3">
				<h1 class="text-slate-800 text-xl font-bold">{pageInfo.title}</h1>
				{#if pageInfo.description}
					<p class="text-slate-500 text-sm mt-1">{pageInfo.description}</p>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Force the icon to render at 24x24 with #033069 color */
	.page-header-icon :global(svg) {
		width: 24px !important;
		height: 24px !important;
	}
	.page-header-icon :global(svg path) {
		stroke: #033069 !important;
	}
</style>
