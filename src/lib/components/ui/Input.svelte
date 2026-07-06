<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		value?: string | number;
		icon?: string;
	}

	let { value = $bindable(), icon, class: className = '', ...rest }: Props = $props();
</script>

<div class="relative flex items-center">
	{#if icon}
		<div class="absolute left-4 text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 pointer-events-none select-none">
			{@html icon}
		</div>
	{/if}
	<input
		bind:value
		class="w-full bg-secondary border border-[#E6E7EC] text-sm text-[#030519] placeholder-[#8C8FA5] rounded-xl py-3 focus:outline-none focus:border-[#2563EB]/40 focus:ring-1 focus:ring-[#2563EB]/40 transition duration-150
		{icon ? 'pl-10 pr-4' : 'px-4'} {className}"
		{...rest}
	/>
</div>
