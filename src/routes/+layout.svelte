<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import DashboardNav from '$lib/components/DashboardNav.svelte';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div
	class="min-h-screen text-slate-700 flex font-sans selection:bg-amber-500 selection:text-black bg-text-tertiary"
>
	<DashboardNav />

	<main class="flex-1 min-w-0 flex flex-col min-h-screen overflow-x-hidden">
		<!-- Breadcrumb bar -->
		<div class="w-full bg-primary px-6 border-b border-slate-100 flex items-center justify-between h-14">
			<Breadcrumb />

			<!-- Right-side header controls (Search, Help, Notifications, User) -->
			<div class="flex items-center gap-4 text-[#8C8FA5]">
				<!-- Search -->
				<button type="button" class="hover:text-slate-800 transition cursor-pointer">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</button>
				<!-- Help/Info -->
				<button type="button" class="hover:text-slate-800 transition cursor-pointer">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</button>
				<!-- Notifications -->
				<button type="button" class="hover:text-slate-800 transition cursor-pointer relative">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
					</svg>
				</button>
				
				<!-- Profile Avatar -->
				<div class="w-8 h-8 rounded-md bg-[#D4EBFF] text-[#033069] font-bold text-xs flex items-center justify-center select-none">
					MH
				</div>
			</div>
		</div>

		<!-- Page header (icon + title + description) -->
		<PageHeader />

		{@render children()}
	</main>
</div>
