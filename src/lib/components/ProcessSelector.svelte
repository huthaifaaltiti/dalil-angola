<script lang="ts">
	import type { Snippet } from 'svelte';
	import chevronDownIcon from '$lib/assets/chevron-down.svg?raw';
	import defaultArrowDownIcon from '$lib/assets/arrow-down.svg?raw';

	interface Option {
		title: string;
		description: string;
		icon?: Snippet | string;
	}

	interface Props {
		title: string;
		subtitle: string;
		icon?: Snippet | string;
		options?: Option[];
		dropdownOptions?: string[];
		selectedOption?: string;
		onselect?: (optionTitle: string) => void;
		variant?: 'green' | 'purple';
	}

	let {
		title,
		subtitle,
		icon,
		options = [],
		dropdownOptions = [],
		selectedOption = $bindable(''),
		onselect,
		variant = 'green'
	}: Props = $props();

	let selectedDropdown = $state(dropdownOptions[0] || '');

	// Define variant styles dynamically
	const theme = $derived(
		variant === 'purple'
			? {
					bg: 'bg-[#1E0094]',
					text: 'text-[#1E0094]',
					borderActive: 'border-[#1E0094] ring-[#1E0094]',
					focusRing: 'focus:ring-indigo-600'
				}
			: {
					bg: 'bg-[#16A34A]',
					text: 'text-[#16A34A]',
					borderActive: 'border-[#16A34A] ring-[#16A34A]',
					focusRing: 'focus:ring-emerald-500'
				}
	);
</script>

<div class="w-full bg-white border border-[#E6E7EC] rounded-2xl p-6 shadow-sm">
	<!-- Top Section -->
	<div class="flex items-center justify-between mb-6 flex-wrap gap-4">
		<div class="flex items-center gap-4">
			<!-- Colored Badge Icon -->
			<div class="w-12 h-12 {theme.bg} rounded-xl flex items-center justify-center flex-shrink-0">
				{#if icon}
					{#if typeof icon === 'string'}
						{@html icon}
					{:else}
						{@render icon()}
					{/if}
				{:else}
					{@html defaultArrowDownIcon}
				{/if}
			</div>

			<!-- Title and Subtitle -->
			<div>
				<h2 class="text-lg font-bold {theme.text} tracking-wide leading-tight">{title}</h2>
				<p class="text-sm text-[#8C8FA5] mt-0.5">{subtitle}</p>
			</div>
		</div>

		<!-- Dropdown Selection -->
		{#if dropdownOptions.length > 0}
			<div class="relative min-w-[200px]">
				<select
					bind:value={selectedDropdown}
					class="w-full bg-[#F9FAFC] border border-[#E6E7EC] rounded-lg px-4 py-2.5 text-sm text-[#383D63] font-medium appearance-none focus:outline-none focus:ring-2 {theme.focusRing} cursor-pointer"
				>
					{#each dropdownOptions as opt}
						<option value={opt}>{opt}</option>
					{/each}
				</select>
				<!-- Chevron Down -->
				<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#383D63]">
					{@html chevronDownIcon}
				</div>
			</div>
		{/if}
	</div>

	<!-- Bottom Section (Cards Grid) -->
	<div class="flex gap-4 flex-col sm:flex-row">
		{#each options as option}
			<button
				type="button"
				onclick={() => {
					selectedOption = option.title;
					if (onselect) onselect(option.title);
				}}
				class="flex-1 flex flex-col items-center justify-center py-8 px-6 bg-[#F6F6F9] hover:bg-[#EEF1F6] border rounded-2xl transition-all duration-200 cursor-pointer text-center group {selectedOption ===
				option.title
					? `${theme.borderActive} ring-1`
					: 'border-[#E6E7EC]'}"
			>
				<!-- White circle container for icon -->
				<div
					class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-105 transition-transform duration-200"
				>
					{#if option.icon}
						{#if typeof option.icon === 'string'}
							{@html option.icon}
						{:else}
							{@render option.icon()}
						{/if}
					{/if}
				</div>

				<!-- Title -->
				<h3 class="text-base font-bold text-[#030519] mb-1">{option.title}</h3>

				<!-- Description -->
				<p class="text-xs text-[#8C8FA5]">{option.description}</p>
			</button>
		{/each}
	</div>
</div>
