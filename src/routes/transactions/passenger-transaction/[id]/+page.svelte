<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import monitorIcon from '$lib/assets/monitor.svg?raw';
	import arrowDownIcon from '$lib/assets/arrow-down.svg?raw';
	import clockIcon from '$lib/assets/clock.svg?raw';
	import scannerIcon from '$lib/assets/scanner.svg?raw';
	import documentIcon from '$lib/assets/document.svg?raw';
	import smileyIcon from '$lib/assets/smiley.svg?raw';
	import fingerprintIcon from '$lib/assets/fingerprint.svg?raw';
	import similarityIcon from '$lib/assets/similarity.svg?raw';
	import decisionIcon from '$lib/assets/decision.svg?raw';
	import checkIcon from '$lib/assets/check.svg?raw';
	import closeIcon from '$lib/assets/close.svg?raw';
	import ScanPassportStep from './components/ScanPassportStep.svelte';
	import ReviewDocumentStep from './components/ReviewDocumentStep.svelte';
	import FaceVerificationStep from './components/FaceVerificationStep.svelte';
	import FingerprintAnalysisStep from './components/FingerprintAnalysisStep.svelte';
	import ResolutionSimilarityStep from './components/ResolutionSimilarityStep.svelte';
	import FinalDecisionStep from './components/FinalDecisionStep.svelte';
	import ManualEntryFooter from './components/ManualEntryFooter.svelte';

	const txnId = $derived(page.params.id);

	let currentStep = $state(1);
	let decisionRecorded = $state<'Approve' | 'Reject' | 'Escalate' | null>(null);

	let formData = $state({
		docNumber: '',
		issuingCountry: '',
		nationality: '',
		expiryDate: '',
		firstName: '',
		lastName: '',
		gender: '',
		dob: ''
	});

	const steps = [
		{ id: 1, name: 'Scan Passport', label: 'STEP 1' },
		{ id: 2, name: 'Review Document', label: 'STEP 2' },
		{ id: 3, name: 'Review Captured Face and Iris', label: 'STEP 3' },
		{ id: 4, name: 'Review Captured Fingerprint', label: 'STEP 4' },
		{ id: 5, name: 'Resolution Similarity', label: 'STEP 5' },
		{ id: 6, name: 'Final Decision', label: 'STEP 6' }
	];
</script>

<div class="p-6">
	<!-- Top Transaction Card Header -->
	<div
		class="bg-primary border border-[#E6E7EC] rounded-2xl p-6 shadow-sm flex flex-col items-start sm:flex-row sm:items-center justify-between gap-6 mb-6"
	>
		<div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-[#383D63]">
			<!-- Monitor Icon -->
			<div
				class="w-12 h-12 bg-[#EFF6FF] text-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0 [&>svg]:w-6 [&>svg]:h-6"
			>
				{@html monitorIcon}
			</div>

			<!-- Details -->
			<div class="flex flex-wrap items-center gap-x-6 gap-y-4">
				<div>
					<span class="text-xs font-semibold text-[#8C8FA5] uppercase tracking-wider block"
						>Transaction Type</span
					>
					<div
						class="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1 rounded-full text-xs font-semibold bg-[#E8F8EE] text-[#14873B] border border-[#14873B]/20"
					>
						<div
							class="w-3.5 h-3.5 rounded-full flex items-center justify-center text-white bg-[#14873B] [&>svg]:w-2 [&>svg]:h-2"
						>
							{@html arrowDownIcon}
						</div>
						Entry
					</div>
				</div>

				<div class="hidden sm:block h-8 w-px bg-slate-200"></div>

				<div>
					<span class="text-xs font-semibold text-[#8C8FA5] uppercase tracking-wider block"
						>Number</span
					>
					<span class="text-sm font-bold text-[#030519] block mt-1 font-mono">{txnId}</span>
				</div>

				<div class="hidden sm:block h-8 w-px bg-slate-200"></div>

				<div>
					<span class="text-xs font-semibold text-[#8C8FA5] uppercase tracking-wider block"
						>Status</span
					>
					<span
						class="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-medium border bg-[#FFF7ED] text-[#D97706] border-[#FED7AA]"
					>
						Awaiting Document Pending
					</span>
				</div>

				<div class="hidden sm:block h-8 w-px bg-slate-200"></div>

				<div>
					<span class="text-xs font-semibold text-[#8C8FA5] uppercase tracking-wider block"
						>Workflow</span
					>
					<span
						class="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#F2EFFD] text-[#585C7C]"
					>
						DESK_ENTRY
					</span>
				</div>
			</div>
		</div>

		<!-- Timer -->
		<div
			class="bg-[#EFF6FF] border border-[#2563EB]/10 rounded-xl px-4 py-2.5 flex items-center gap-3"
		>
			<div class="text-[#2563EB] [&>svg]:w-5 [&>svg]:h-5">
				{@html clockIcon}
			</div>
			<span class="font-mono text-lg font-bold text-[#030519] tracking-wider">00:00</span>
		</div>
	</div>

	<!-- Workflow Stepper Container -->
	<div class="bg-primary border border-[#E6E7EC] rounded-2xl p-6 shadow-sm mb-6 relative">
		<!-- Connecting line behind steps (desktop only) -->
		<div class="hidden md:block absolute top-[44px] left-0 right-0 h-0.5 -z-0">
			<!-- Segment 1 (Step 1 to 2) -->
			<div
				class="absolute left-[8.33%] w-[16.67%] h-full transition-colors duration-300 {currentStep >
				1
					? 'bg-[#4F46E5]'
					: 'bg-slate-100'}"
			></div>
			<!-- Segment 2 (Step 2 to 3) -->
			<div
				class="absolute left-[25%] w-[16.67%] h-full transition-colors duration-300 {currentStep > 2
					? 'bg-[#4F46E5]'
					: 'bg-slate-100'}"
			></div>
			<!-- Segment 3 (Step 3 to 4) -->
			<div
				class="absolute left-[41.67%] w-[16.67%] h-full transition-colors duration-300 {currentStep >
				3
					? 'bg-[#4F46E5]'
					: 'bg-slate-100'}"
			></div>
			<!-- Segment 4 (Step 4 to 5) -->
			<div
				class="absolute left-[58.33%] w-[16.67%] h-full transition-colors duration-300 {currentStep >
				4
					? 'bg-[#4F46E5]'
					: 'bg-slate-100'}"
			></div>
			<!-- Segment 5 (Step 5 to 6) -->
			<div
				class="absolute left-[75%] w-[16.67%] h-full transition-colors duration-300 {currentStep > 5
					? 'bg-[#4F46E5]'
					: 'bg-slate-100'}"
			></div>
		</div>

		<div class="flex flex-col md:grid md:grid-cols-6 relative z-10 gap-6 md:gap-0">
			{#each steps as step (step.id)}
				<button
					type="button"
					onclick={() => !decisionRecorded && (currentStep = step.id)}
					class="flex flex-row md:flex-col items-center md:items-center text-left md:text-center group cursor-pointer focus:outline-none w-full"
					disabled={!!decisionRecorded}
				>
					<!-- Circle Icon Container -->
					<div class="relative flex flex-col items-center flex-shrink-0">
						<!-- Circle Icon -->
						<div
							class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border-2 [&>svg]:w-5 [&>svg]:h-5
							{currentStep === step.id
								? 'bg-[#0B1E51] border-[#0B1E51] text-white ring-[6px] ring-[#0B1E51]/15 scale-110'
								: currentStep > step.id
									? 'bg-[#4F46E5] border-[#4F46E5] text-white'
									: 'bg-primary border-slate-200 text-slate-400 group-hover:border-slate-300'}"
						>
							{#if currentStep > step.id}
								{@html checkIcon}
							{:else if step.id === 1}
								{@html scannerIcon}
							{:else if step.id === 2}
								{@html documentIcon}
							{:else if step.id === 3}
								{@html smileyIcon}
							{:else if step.id === 4}
								{@html fingerprintIcon}
							{:else if step.id === 5}
								{@html similarityIcon}
							{:else}
								{@html decisionIcon}
							{/if}
						</div>
						<!-- Vertical line for mobile -->
						{#if step.id < 6}
							<div
								class="block md:hidden absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-6 transition-colors duration-300 {currentStep > step.id ? 'bg-[#4F46E5]' : 'bg-slate-100'}"
							></div>
						{/if}
					</div>

					<!-- Details -->
					<div class="flex flex-col items-start md:items-center text-left md:text-center mt-0 md:mt-2.5 ml-4 md:ml-0">
						<span class="text-[10px] font-bold text-[#8C8FA5] uppercase tracking-wider"
							>{step.label}</span
						>
						<span
							class="text-xs font-bold mt-1 max-w-[120px] transition-colors
							{currentStep === step.id
								? 'text-[#030519]'
								: currentStep > step.id
									? 'text-[#030519]'
									: 'text-[#8C8FA5]'}"
						>
							{step.name}
						</span>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Main Detail Step Workspace Area -->
	<div class="relative bg-primary rounded-2xl p-8 shadow-sm flex flex-col min-h-[460px]">
		<!-- Step Content Router -->
		{#if decisionRecorded}
			<!-- Decision Complete View -->
			<div
				class="flex-grow flex flex-col items-center justify-center text-center py-12 text-[#383D63]"
			>
				<div
					class="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-md
					{decisionRecorded === 'Approve'
						? 'bg-[#E8F8EE] text-[#14873B]'
						: decisionRecorded === 'Reject'
							? 'bg-[#FEE2E2] text-[#DC2626]'
							: 'bg-[#FFF7ED] text-[#D97706]'}"
				>
					{#if decisionRecorded === 'Approve'}
						<div class="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
							{@html checkIcon}
						</div>
					{:else}
						<div class="w-8 h-8 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
							{@html closeIcon}
						</div>
					{/if}
				</div>

				<h2 class="text-2xl font-bold text-[#030519] mb-2">
					Decision Recorded: {decisionRecorded}
				</h2>
				<p class="text-[#8C8FA5] max-w-md mb-8">
					The passenger transaction has been marked as <strong>{decisionRecorded}d</strong>. All
					system records and log files have been synchronized.
				</p>

				<button
					type="button"
					onclick={() => goto(resolve('/transactions/passenger-transaction'))}
					class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
				>
					Return to Transactions
				</button>
			</div>
		{:else if currentStep === 1}
			<ScanPassportStep bind:currentStep />
		{:else if currentStep === 2}
			<ReviewDocumentStep bind:currentStep bind:formData />
		{:else if currentStep === 3}
			<FaceVerificationStep />
		{:else if currentStep === 4}
			<FingerprintAnalysisStep />
		{:else if currentStep === 5}
			<ResolutionSimilarityStep />
		{:else}
			<FinalDecisionStep />
		{/if}

		<ManualEntryFooter
			bind:currentStep
			onClear={() => {
				formData = {
					docNumber: '',
					issuingCountry: '',
					nationality: '',
					expiryDate: '',
					firstName: '',
					lastName: '',
					gender: '',
					dob: ''
				};
			}}
		/>
	</div>
</div>
