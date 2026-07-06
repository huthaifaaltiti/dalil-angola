<script lang="ts">
	import documentIcon from '$lib/assets/document.svg?raw';
	import userIcon from '$lib/assets/user.svg?raw';
	import mapPinIcon from '$lib/assets/map-pin.svg?raw';
	import calendarIcon from '$lib/assets/calendar.svg?raw';
	import chevronDownIcon from '$lib/assets/chevron-down.svg?raw';
	import uploadIcon from '$lib/assets/upload.svg?raw';

	interface Props {
		currentStep: number;
	}
	let { currentStep = $bindable() }: Props = $props();

	let docNumber = $state('');
	let issuingCountry = $state('');
	let nationality = $state('');
	let expiryDate = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let gender = $state('');
	let dob = $state('');
</script>

<div class="flex-grow flex flex-col justify-between">
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[#383D63]">
		<!-- Document Information Card -->
		<div class="bg-white border border-[#E6E7EC]/80 rounded-2xl p-6 shadow-sm flex flex-col">
			<div class="flex items-center gap-3 mb-6">
				<div
					class="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 shrink-0"
				>
					{@html documentIcon}
				</div>
				<div>
					<h4 class="text-base font-bold text-[#030519]">Document Information</h4>
					<p class="text-xs text-[#8C8FA5]">Enter passport document details</p>
				</div>
			</div>

			<div class="space-y-4 flex-grow">
				<div>
					<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
						>Document Number <span class="text-red-500">*</span></label
					>
					<input
						type="text"
						placeholder="Enter document number"
						bind:value={docNumber}
						class="w-full bg-[#F9FAFC] border border-[#E6E7EC] text-sm text-[#030519] placeholder-[#8C8FA5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563EB]/40 focus:ring-1 focus:ring-[#2563EB]/40 transition duration-150"
					/>
				</div>

				<div>
					<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
						>Issuing Country</label
					>
					<div
						class="relative flex items-center bg-[#F9FAFC] border border-[#E6E7EC] rounded-xl px-4 py-3 focus-within:border-[#2563EB]/40 focus-within:ring-1 focus-within:ring-[#2563EB]/40 transition duration-150"
					>
						<div class="text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 mr-2 shrink-0">
							{@html mapPinIcon}
						</div>
						<select
							class="w-full bg-transparent text-sm text-[#030519] focus:outline-none appearance-none cursor-pointer pr-8"
							bind:value={issuingCountry}
						>
							<option value="Lithuania">Lithuania</option>
							<option value="Angola">Angola</option>
							<option value="Portugal">Portugal</option>
							<option value="Germany">Germany</option>
							<option value="Brazil">Brazil</option>
						</select>
						<div
							class="absolute right-4 pointer-events-none text-[#8C8FA5] [&>svg]:w-3.5 [&>svg]:h-3.5"
						>
							{@html chevronDownIcon}
						</div>
					</div>
				</div>

				<div>
					<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
						>Nationality <span class="text-red-500">*</span></label
					>
					<div
						class="relative flex items-center bg-[#F9FAFC] border border-[#E6E7EC] rounded-xl px-4 py-3 focus-within:border-[#2563EB]/40 focus-within:ring-1 focus-within:ring-[#2563EB]/40 transition duration-150"
					>
						<div class="text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 mr-2 shrink-0">
							{@html mapPinIcon}
						</div>
						<select
							class="w-full bg-transparent text-sm text-[#030519] focus:outline-none appearance-none cursor-pointer pr-8"
							bind:value={nationality}
						>
							<option value="Lithuania">Lithuania</option>
							<option value="Angola">Angola</option>
							<option value="Portugal">Portugal</option>
							<option value="Germany">Germany</option>
							<option value="Brazil">Brazil</option>
						</select>
						<div
							class="absolute right-4 pointer-events-none text-[#8C8FA5] [&>svg]:w-3.5 [&>svg]:h-3.5"
						>
							{@html chevronDownIcon}
						</div>
					</div>
				</div>

				<div>
					<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
						>Date of Expiry</label
					>
					<div
						class="relative flex items-center bg-[#F9FAFC] border border-[#E6E7EC] rounded-xl px-4 py-3 focus-within:border-[#2563EB]/40 focus-within:ring-1 focus-within:ring-[#2563EB]/40 transition duration-150"
					>
						<div class="text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 mr-2 shrink-0">
							{@html calendarIcon}
						</div>
						<input
							type="date"
							class="w-full bg-transparent text-sm text-[#030519] focus:outline-none cursor-pointer"
							bind:value={expiryDate}
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Personal Information Card -->
		<div
			class="bg-white border border-[#E6E7EC]/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
		>
			<div>
				<div class="flex items-center gap-3 mb-6">
					<div
						class="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 shrink-0"
					>
						{@html userIcon}
					</div>
					<div>
						<h4 class="text-base font-bold text-[#030519]">Personal Information</h4>
						<p class="text-xs text-[#8C8FA5]">Enter personal details from passport</p>
					</div>
				</div>

				<div class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div>
							<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
								>First Name <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								placeholder="Enter first name"
								bind:value={firstName}
								class="w-full bg-[#F9FAFC] border border-[#E6E7EC] text-sm text-[#030519] placeholder-[#8C8FA5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563EB]/40 focus:ring-1 focus:ring-[#2563EB]/40 transition duration-150"
							/>
						</div>
						<div>
							<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
								>Last Name <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								placeholder="Enter last name"
								bind:value={lastName}
								class="w-full bg-[#F9FAFC] border border-[#E6E7EC] text-sm text-[#030519] placeholder-[#8C8FA5] rounded-xl px-4 py-3 focus:outline-none focus:border-[#2563EB]/40 focus:ring-1 focus:ring-[#2563EB]/40 transition duration-150"
							/>
						</div>
					</div>

					<div>
						<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
							>Gender</label
						>
						<div
							class="relative flex items-center bg-[#F9FAFC] border border-[#E6E7EC] rounded-xl px-4 py-3 focus-within:border-[#2563EB]/40 focus-within:ring-1 focus-within:ring-[#2563EB]/40 transition duration-150"
						>
							<div class="text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 mr-2 shrink-0">
								{@html userIcon}
							</div>
							<select
								class="w-full bg-transparent text-sm text-[#030519] focus:outline-none appearance-none cursor-pointer pr-8"
								bind:value={gender}
							>
								<option value="Female">Female</option>
								<option value="Male">Male</option>
							</select>
							<div
								class="absolute right-4 pointer-events-none text-[#8C8FA5] [&>svg]:w-3.5 [&>svg]:h-3.5"
							>
								{@html chevronDownIcon}
							</div>
						</div>
					</div>

					<div>
						<label class="block text-xs font-semibold text-[#585C7C] mb-2 uppercase tracking-wide"
							>Date of Birth <span class="text-red-500">*</span></label
						>
						<div
							class="relative flex items-center bg-[#F9FAFC] border border-[#E6E7EC] rounded-xl px-4 py-3 focus-within:border-[#2563EB]/40 focus-within:ring-1 focus-within:ring-[#2563EB]/40 transition duration-150"
						>
							<div class="text-[#8C8FA5] [&>svg]:w-4 [&>svg]:h-4 mr-2 shrink-0">
								{@html calendarIcon}
							</div>
							<input
								type="date"
								class="w-full bg-transparent text-sm text-[#030519] focus:outline-none cursor-pointer"
								bind:value={dob}
							/>
						</div>
					</div>

					<!-- Upload dropzone -->
					<div
						class="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100/40 transition duration-150"
					>
						<div class="text-[#2563EB] [&>svg]:w-5 [&>svg]:h-5">
							{@html uploadIcon}
						</div>
						<span class="text-xs text-[#8C8FA5] mt-2 mb-3">Upload Passport Image (optional)</span>
						<button
							type="button"
							class="bg-white border border-[#E6E7EC] hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
						>
							<div class="text-slate-500 [&>svg]:w-3.5 [&>svg]:h-3.5">
								{@html uploadIcon}
							</div>
							Browse Files
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
