<script lang="ts">
	import type { Snippet } from 'svelte';
	import defaultUserIcon from '$lib/assets/user.svg?raw';

	interface Props {
		label: string;
		value: string;
		icon?: Snippet | string;
		class?: string;
		border?: boolean;
	}

	let { label, value, icon, class: className = '', border = true }: Props = $props();
</script>

<div
	class="flex-1 min-w-[120px] min-h-[20px] flex items-center gap-3 {border
		? 'border-l border-slate-200 pl-4'
		: ''} {className}"
>
	<div class="w-8 h-8 bg-[#D4EBFF] rounded-lg flex items-center justify-center">
		{#if icon}
			{#if typeof icon === 'string'}
				{@html icon}
			{:else}
				{@render icon()}
			{/if}
		{:else}
			{@html defaultUserIcon}
		{/if}
	</div>

	<div class="flex flex-col">
		<span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
		<span class="text-sm font-medium text-slate-900 leading-tight mt-0.5">{value}</span>
	</div>
</div>
