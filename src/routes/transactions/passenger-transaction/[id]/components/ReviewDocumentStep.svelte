<script lang="ts">
	import documentIcon from '$lib/assets/document.svg?raw';
	import userIcon from '$lib/assets/user.svg?raw';
	import mapPinIcon from '$lib/assets/map-pin.svg?raw';
	import calendarIcon from '$lib/assets/calendar.svg?raw';
	import uploadIcon from '$lib/assets/upload.svg?raw';
	import Label from '$lib/components/ui/Label.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	interface Props {
		currentStep: number;
		formData: {
			docNumber: string;
			issuingCountry: string;
			nationality: string;
			expiryDate: string;
			firstName: string;
			lastName: string;
			gender: string;
			dob: string;
		};
	}
	let { currentStep = $bindable(), formData = $bindable() }: Props = $props();
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
					<Label>Document Number <span class="text-red-500">*</span></Label>
					<Input type="text" placeholder="Enter document number" bind:value={formData.docNumber} />
				</div>

				<div>
					<Label>Issuing Country</Label>
					<Select bind:value={formData.issuingCountry} icon={mapPinIcon}>
						<option value="" disabled selected>Select issuing country</option>
						<option value="Lithuania">Lithuania</option>
						<option value="Jordan">Jordan</option>
						<option value="Angola">Angola</option>
						<option value="Portugal">Portugal</option>
						<option value="Germany">Germany</option>
						<option value="Brazil">Brazil</option>
					</Select>
				</div>

				<div>
					<Label>Nationality <span class="text-red-500">*</span></Label>
					<Select bind:value={formData.nationality} icon={mapPinIcon}>
						<option value="" disabled selected>Select nationality</option>
						<option value="Lithuania">Lithuania</option>
						<option value="Jordan">Jordanian</option>
						<option value="Angola">Angola</option>
						<option value="Portugal">Portugal</option>
						<option value="Germany">Germany</option>
						<option value="Brazil">Brazil</option>
					</Select>
				</div>

				<div>
					<Label>Date of Expiry</Label>
					<Input type="date" bind:value={formData.expiryDate} icon={calendarIcon} />
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
							<Label>First Name <span class="text-red-500">*</span></Label>
							<Input type="text" placeholder="Enter first name" bind:value={formData.firstName} />
						</div>
						<div>
							<Label>Last Name <span class="text-red-500">*</span></Label>
							<Input type="text" placeholder="Enter last name" bind:value={formData.lastName} />
						</div>
					</div>

					<div>
						<Label>Gender</Label>
						<Select bind:value={formData.gender} icon={userIcon}>
							<option value="" disabled selected>Select gender</option>
							<option value="Female">Female</option>
							<option value="Male">Male</option>
						</Select>
					</div>

					<div>
						<Label>Date of Birth <span class="text-red-500">*</span></Label>
						<Input type="date" bind:value={formData.dob} icon={calendarIcon} />
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
