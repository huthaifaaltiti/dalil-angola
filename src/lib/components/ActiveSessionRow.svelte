<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import arrowDownIcon from '$lib/assets/arrow-down.svg?raw';
	import arrowUpIcon from '$lib/assets/arrow-up.svg?raw';

	export interface Session {
		id: string;
		txnNumber: string;
		passenger: string;
		nationality: string;
		type: 'Entry' | 'Exit';
		status: 'Awaiting Document Scan' | 'Under Review' | 'Completed' | 'Pending';
		risk: 'Low' | 'Medium' | 'High';
		started: string;
	}

	interface Props {
		session: Session;
		oncontinue?: (session: Session) => void;
		onterminate?: (session: Session) => void;
	}

	let { session, oncontinue, onterminate }: Props = $props();

	// Style derivations based on Type, Status, Risk
	const typeConfig = $derived(
		session.type === 'Entry'
			? {
					bg: 'bg-[#E8F8EE]',
					text: 'text-[#14873B]',
					border: 'border-[#14873B]/20',
					iconBg: 'bg-[#14873B]',
					icon: arrowDownIcon
				}
			: {
					bg: 'bg-[#F5F3FF]',
					text: 'text-[#6366F1]',
					border: 'border-[#6366F1]/20',
					iconBg: 'bg-[#6366F1]',
					icon: arrowUpIcon
				}
	);

	const statusConfig = $derived(
		session.status === 'Awaiting Document Scan'
			? {
					bg: 'bg-[#FFF7ED]',
					text: 'text-[#D97706]',
					border: 'border-[#FED7AA]'
				}
			: session.status === 'Under Review'
			? {
					bg: 'bg-[#EFF6FF]',
					text: 'text-[#2563EB]',
					border: 'border-[#BFDBFE]'
				}
			: {
					bg: 'bg-[#F3F4F6]',
					text: 'text-[#374151]',
					border: 'border-[#D1D5DB]'
				}
	);

	const riskConfig = $derived(
		session.risk === 'High'
			? 'text-[#DC2626] font-semibold'
			: session.risk === 'Medium'
			? 'text-[#383D63] font-medium'
			: 'text-[#16A34A] font-medium'
	);

	function handleRowClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		// Do not navigate if clicking 'Terminate' button
		if (target.closest('.btn-terminate')) {
			return;
		}
		
		if (oncontinue) {
			oncontinue(session);
		} else {
			goto(resolve(`/transactions/passenger-transaction/${session.txnNumber}`));
		}
	}
</script>

<tr 
	onclick={handleRowClick}
	class="border-b border-[#E6E7EC]/70 hover:bg-[#F9FAFC]/75 transition-colors duration-150 cursor-pointer"
>
	<!-- Transaction # -->
	<td class="py-3 px-6 text-sm text-[#8C8FA5] font-mono whitespace-nowrap">
		{session.txnNumber}
	</td>

	<!-- Passenger -->
	<td class="py-3 px-6 text-sm text-[#030519] font-medium whitespace-nowrap">
		{session.passenger}
	</td>

	<!-- Nationality -->
	<td class="py-3 px-6 text-sm text-[#383D63] whitespace-nowrap">
		{session.nationality}
	</td>

	<!-- Type -->
	<td class="py-3 px-6 whitespace-nowrap">
		<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border {typeConfig.bg} {typeConfig.text} {typeConfig.border}">
			<div class="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white {typeConfig.iconBg} [&>svg]:w-2.5 [&>svg]:h-2.5">
				{@html typeConfig.icon}
			</div>
			{session.type}
		</div>
	</td>

	<!-- Status -->
	<td class="py-3 px-6 whitespace-nowrap">
		<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border {statusConfig.bg} {statusConfig.text} {statusConfig.border}">
			{session.status}
		</span>
	</td>

	<!-- Risk -->
	<td class="py-3 px-6 text-sm {riskConfig} whitespace-nowrap">
		{session.risk}
	</td>

	<!-- Started -->
	<td class="py-3 px-6 text-sm text-[#383D63] whitespace-nowrap">
		{session.started}
	</td>

	<!-- Actions -->
	<td class="py-3 px-6 text-right whitespace-nowrap">
		<div class="flex items-center gap-2 justify-end">
			<button
				type="button"
				class="bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white text-xs font-semibold py-1.5 px-4 rounded-lg shadow-sm transition duration-150 cursor-pointer"
			>
				Continue
			</button>
			<button
				type="button"
				onclick={(e) => {
					e.stopPropagation();
					onterminate?.(session);
				}}
				class="btn-terminate bg-white hover:bg-[#EFF6FF] active:bg-[#DBEAFE] border border-[#2563EB] text-[#2563EB] text-xs font-semibold py-1.5 px-4 rounded-lg transition duration-150 cursor-pointer"
			>
				Terminate
			</button>
		</div>
	</td>
</tr>
