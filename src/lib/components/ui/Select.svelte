<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import chevronDownIcon from '$lib/assets/chevron-down.svg?raw';

	interface Props extends HTMLSelectAttributes {
		value?: string;
		icon?: string;
		children?: import('svelte').Snippet;
	}

	let { value = $bindable(), icon, children, class: className = '', ...rest }: Props = $props();
</script>

<div class="relative flex items-center w-full">
	{#if icon}
		<div
			class="absolute left-4 text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 pointer-events-none select-none"
		>
			{@html icon}
		</div>
	{/if}
	<select
		bind:value
		class="w-full bg-[#F9FAFC] border border-[#E6E7EC] text-sm text-[#030519] rounded-xl py-3 focus:outline-none focus:border-[#2563EB]/40 focus:ring-1 focus:ring-[#2563EB]/40 transition duration-150 appearance-none cursor-pointer pr-10
		{icon ? 'pl-10' : 'px-4'} {className}"
		{...rest}
	>
		{@render children?.()}
	</select>
</div>
