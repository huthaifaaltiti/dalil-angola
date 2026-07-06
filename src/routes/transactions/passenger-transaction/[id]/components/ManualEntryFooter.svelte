<script lang="ts">
	import closeIcon from '$lib/assets/close.svg?raw';
	import pauseIcon from '$lib/assets/pause.svg?raw';
	import checkIcon from '$lib/assets/check.svg?raw';

	interface Props {
		currentStep: number;
		onClear: () => void;
	}

	let { currentStep = $bindable(), onClear }: Props = $props();
</script>

<div class="flex justify-between items-center mt-8 pt-4 flex-wrap gap-4 w-full">
	<!-- Left side actions -->
	<div class="flex items-center gap-3">
		<button
			type="button"
			onclick={onClear}
			class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-md text-xs transition shadow-sm flex items-center gap-2 cursor-pointer focus:outline-none"
		>
			<div class="text-slate-400 [&>svg]:w-3.5 [&>svg]:h-3.5">
				{@html closeIcon}
			</div>
			Clear form
		</button>

		<button
			type="button"
			class="bg-[#EFF2F6] hover:bg-[#E2E8F0] text-slate-700 font-semibold px-4 py-2.5 rounded-md text-xs transition flex items-center gap-2 cursor-pointer focus:outline-none"
		>
			<div class="text-slate-500 [&>svg]:w-3.5 [&>svg]:h-3.5">
				{@html pauseIcon}
			</div>
			Pause
		</button>
	</div>

	<!-- Right side action -->
	<button
		type="button"
		onclick={() => (currentStep = 3)}
		class="bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-5 py-2.5 rounded-md text-xs transition shadow-sm flex items-center gap-2 cursor-pointer focus:outline-none"
	>
		<div class="text-white [&>svg]:w-3.5 [&>svg]:h-3.5">
			{@html checkIcon}
		</div>
		Submit Manual Entry
	</button>
</div>
