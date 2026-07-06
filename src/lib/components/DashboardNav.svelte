<script lang="ts">
	import { navigationData } from '$lib/navData';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let collapsed = $state(false);
	let innerWidth = $state(1024);
	let wasSmall = $state(false);

	let expandedSections = $state<Record<string, boolean>>({
		dashboard: false,
		transactions: false,
		control_room: false,
		workloads: false
	});

	$effect(() => {
		const isSmall = innerWidth < 1024;
		if (isSmall && !wasSmall) {
			collapsed = true;
			
			for (const key in expandedSections) {
				expandedSections[key] = false;
			}
		}
		wasSmall = isSmall;
	});

	function toggleSection(sectionId: string, href: string, hasItems: boolean) {
		// Navigate to the section route
		goto(resolve(href));
		// Also toggle expansion if section has sub-items
		if (hasItems && !collapsed) {
			expandedSections[sectionId] = !expandedSections[sectionId];
		}
	}

	function toggleCollapse() {
		collapsed = !collapsed;
		// Close all expanded sections when collapsing
		if (collapsed) {
			for (const key in expandedSections) {
				expandedSections[key] = false;
			}
		}
	}
</script>

<svelte:window bind:innerWidth />

<aside
	class="bg-white border-r border-slate-200/80 text-slate-700 flex flex-col min-h-screen sticky top-0 font-sans transition-all duration-300 overflow-hidden {collapsed
		? 'w-20'
		: 'w-64'}"
>
	<!-- Logo Area -->
	<div class="h-16 flex items-center border-slate-100 bg-slate-50/30 flex-shrink-0 {collapsed ? 'px-2 justify-between gap-1' : 'px-3 gap-3'}">
		<!-- Logo icon -->
		<div
			class="w-8 h-8 flex-shrink-0 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center shadow-md shadow-amber-500/10"
		>
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="32" height="32" rx="8" fill="#033069" />
				<path
					d="M10.5547 22L14.5547 10.7266H16.2266V12.8203H15.625L12.6641 22H10.5547ZM12.5703 19.0859L13.0938 17.5312H18.2656L18.7891 19.0859H12.5703ZM18.7188 22L15.7578 12.8203V10.7266H16.8203L20.8281 22H18.7188Z"
					fill="white"
				/>
			</svg>
		</div>

		<!-- Logo text (hidden when collapsed) -->
		{#if !collapsed}
			<div class="flex gap-1 relative flex-1 min-w-0">
				<h1 class="text-sm font-extrabold tracking-tight text-slate-900 leading-none">Angola</h1>
				<span class="absolute bottom-0 right-22">
					<svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="2.17742" cy="2.17742" r="2.17742" fill="#033069" />
					</svg>
				</span>
			</div>
		{/if}

		<!-- Toggle collapse button -->
		<button
			onclick={toggleCollapse}
			class="flex-shrink-0 p-1 rounded-md text-slate-400 hover:text-[#033069] hover:bg-slate-100 transition-all duration-200"
			aria-label={collapsed ? 'Expand menu' : 'Collapse menu'}
			title={collapsed ? 'Expand menu' : 'Collapse menu'}
		>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2 12C2 8.25027 2 6.3754 2.95491 5.06107C3.26331 4.6366 3.6366 4.26331 4.06107 3.95491C5.3754 3 7.25027 3 11 3H13C16.7497 3 18.6246 3 19.9389 3.95491C20.3634 4.26331 20.7367 4.6366 21.0451 5.06107C22 6.3754 22 8.25027 22 12C22 15.7497 22 17.6246 21.0451 18.9389C20.7367 19.3634 20.3634 19.7367 19.9389 20.0451C18.6246 21 16.7497 21 13 21H11C7.25027 21 5.3754 21 4.06107 20.0451C3.6366 19.7367 3.26331 19.3634 2.95491 18.9389C2 17.6246 2 15.7497 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
				<path d="M9.5 3.5L9.5 20.5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
				<path d="M5 7C5 7 5.91421 7 6.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M5 11H6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M17 10L15.7735 11.0572C15.2578 11.5016 15 11.7239 15 12C15 12.2761 15.2578 12.4984 15.7735 12.9428L17 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<!-- Navigation Groups & Sections -->
	<nav class="flex-1 overflow-y-auto py-6 space-y-6 {collapsed ? 'px-2' : 'px-4'}">
		{#each navigationData as group (group.label)}
			<div class="space-y-2">
				<!-- Group Header Label (hidden when collapsed) -->
				{#if group.label && !collapsed}
					<h3 class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
						{group.label}
					</h3>
				{:else if collapsed}
					<!-- Thin divider as group separator in collapsed mode -->
					<div class="h-px bg-slate-100 mx-1 my-1"></div>
				{/if}

				<div class="space-y-1">
					{#each group.sections as section (section.id)}
						<div class="space-y-1">
							<!-- Section Header -->
							<button
								onclick={() => toggleSection(section.id, section.href, section.items?.length > 0)}
								title={collapsed ? section.name : ''}
								class="w-full flex items-center py-2 px-2 rounded-lg transition-all duration-200 group text-left {collapsed
									? 'justify-center'
									: 'justify-between px-3'} {expandedSections[section.id]
									? 'text-[#033069]'
									: 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}"
								aria-expanded={expandedSections[section.id]}
							>
								<div class="flex items-center {collapsed ? '' : 'gap-3'}">
									<!-- Icon -->
									<div
										class="icon-container w-5 h-5 flex-shrink-0 flex items-center justify-center transition-colors {expandedSections[
											section.id
										]
											? 'text-[#033069]'
											: 'text-slate-400'}"
									>
										{@html section.iconPath}
									</div>

									<!-- Label (hidden when collapsed) -->
									{#if !collapsed}
										<span class="font-semibold text-xs tracking-wide">{section.name}</span>
									{/if}
								</div>

								<!-- Chevron (hidden when collapsed) -->
								{#if !collapsed && section?.items?.length}
									<svg
										class="w-3.5 h-3.5 transition-transform duration-200 {expandedSections[
											section.id
										]
											? 'rotate-0 text-[#033069]'
											: '-rotate-90 text-slate-400'}"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
									</svg>
								{/if}
							</button>

							<!-- Section Items (hidden when collapsed) -->
							{#if expandedSections[section.id] && !collapsed}
								<div
									transition:slide={{ duration: 200 }}
									class="pl-3 py-2 space-y-0.5 border-l-2 border-slate-100 ml-5"
								>
									{#each section.items as item (item.href)}
										{@const isActive =
											$page.url.pathname === item.href || $page.url.hash === item.href}
										<a
										href={item.href}
										class="relative flex items-center gap-2 py-1.5 px-3 text-xs rounded-md transition-all duration-200 -ml-[2px] border-l-2 {isActive
											? 'bg-[#E6F0FF] text-black font-bold border-transparent'
											: 'border-transparent text-slate-500 hover:text-slate-950 hover:translate-x-1'}"
									>
										{#if isActive}
											<svg class="absolute left-0 top-1/2 -translate-y-1/2" width="3" height="24" viewBox="0 0 3 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M0 0C1.65685 0 3 1.34315 3 3V21C3 22.6569 1.65685 24 0 24V0Z" fill="#033069"/>
											</svg>
										{/if}
										{item.name}
									</a>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</nav>

	<!-- Bottom: Logout + User profile -->
	<div class="p-4 flex flex-col gap-8">
		<!-- Logout button -->
		<button
			class="flex items-center gap-3 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 group py-1.5 px-2 {collapsed
				? 'justify-center'
				: ''}"
			title={collapsed ? 'Logout' : ''}
		>
			<svg
				class="w-5 h-5 flex-shrink-0 transition-colors"
				fill="none"
				stroke="currentColor"
				stroke-width="1.75"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
				/>
			</svg>
			{#if !collapsed}
				<span class="text-xs font-semibold">Logout</span>
			{/if}
		</button>

		<!-- User profile -->
		<div class="flex items-center {collapsed ? 'justify-center' : 'gap-3'}">
			<div
				class="w-9 h-9 flex-shrink-0 rounded-full bg-[#033069] text-white flex items-center justify-center text-sm font-bold shadow-sm"
				title={collapsed ? 'Ali Hassan — Supervisor' : ''}
			>
				AH
			</div>
			{#if !collapsed}
				<div class="flex-1 min-w-0">
					<p class="text-xs font-bold text-slate-800 truncate">Ali Hassan</p>
					<p class="text-[10px] text-slate-400 truncate">Supervisor</p>
				</div>
			{/if}
		</div>
	</div>
</aside>

<style>
	/* Ensure SVG vectors inside icon-container dynamically inherit colors on hover */
	.icon-container :global(svg) {
		width: 100% !important;
		height: 100% !important;
	}
	.icon-container :global(svg path) {
		stroke: currentColor !important;
	}
</style>
