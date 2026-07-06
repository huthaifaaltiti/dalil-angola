<script lang="ts">
	import scannerIcon from '$lib/assets/scanner.svg?raw';
	import documentLinesIcon from '$lib/assets/document-lines.svg?raw';
	import cameraIcon from '$lib/assets/camera.svg?raw';

	interface Props {
		currentStep: number;
	}
	
	let { currentStep = $bindable() }: Props = $props();
</script>

<div class="flex items-center justify-between mb-6 flex-wrap gap-4 text-[#383D63]">
	<div>
		<h3 class="text-lg font-bold text-[#030519]">Scan Passport</h3>
		<p class="text-sm text-[#8C8FA5]">Place the passport on the scanner to begin</p>
	</div>

	<div class="flex items-center p-1 bg-white border border-[#E6E7EC] rounded-xl">
		<button
			type="button"
			onclick={() => (currentStep = 2)}
			class="bg-[#0B1E51] hover:bg-[#142963] active:bg-[#030D29] text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer [&>svg]:w-4 [&>svg]:h-4"
		>
			{@html scannerIcon}
			Scanner
		</button>

		<button
			type="button"
			onclick={() => (currentStep = 2)}
			class="bg-transparent hover:bg-slate-50 text-[#585C7C] hover:text-[#030519] flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer [&>svg]:w-4 [&>svg]:h-4"
		>
			{@html documentLinesIcon}
			Manual Input
		</button>
	</div>
</div>

<!-- Center Scanner Dropzone -->
<div
	class="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-12 text-center relative overflow-hidden"
>
	<div
		class="w-16 h-16 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm [&>svg]:w-8 [&>svg]:h-8"
	>
		{@html cameraIcon}
	</div>

	<h4 class="text-lg font-bold text-[#030519] mt-6">Waiting for Document Scan</h4>
	<p class="text-sm text-[#8C8FA5] text-center max-w-md mt-2 leading-relaxed">
		Please place the passport on the scanner. The system will automatically detect and process
		the document.
	</p>
</div>
