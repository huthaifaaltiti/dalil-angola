<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends HTMLLabelAttributes {
		children?: import('svelte').Snippet;
	}

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<label
	class="text-xs font-semibold text-[#585C7C] uppercase tracking-wide mb-2 block {className}"
	{...rest}
>
	{@render children?.()}
</label>
