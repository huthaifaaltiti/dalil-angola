<script lang="ts">
	import { DetailField, ProcessSelector, ActiveSessionRow } from '$lib';
	import type { Session } from '$lib/components/ActiveSessionRow.svelte';
	import clockIcon from '$lib/assets/clock.svg?raw';
	import shieldCheckIcon from '$lib/assets/shield-check.svg?raw';
	import mapPinIcon from '$lib/assets/map-pin.svg?raw';
	import exchangeIcon from '$lib/assets/exchange.svg?raw';
	import monitorIcon from '$lib/assets/monitor.svg?raw';
	import entryBadgeIcon from '$lib/assets/arrow-down.svg?raw';
	import entrySingleIcon from '$lib/assets/single-green.svg?raw';
	import entryGroupIcon from '$lib/assets/group-green.svg?raw';
	import exitBadgeIcon from '$lib/assets/arrow-up.svg?raw';
	import exitSingleIcon from '$lib/assets/single-purple.svg?raw';
	import exitGroupIcon from '$lib/assets/group-purple.svg?raw';

	const details = [
		{ label: 'OFFICER', value: 'Ali Hasan' },
		{ label: 'TIME', value: '10:30 AM', icon: clockIcon },
		{ label: 'SHIFT', value: 'Morning Shift', icon: shieldCheckIcon },
		{ label: 'ROLE', value: 'Supervisor', icon: mapPinIcon },
		{ label: 'ZONE', value: 'Arrival ', icon: exchangeIcon },
		{ label: 'ACTIVE SESSIONS', value: '1 ' },
		{ label: 'DESK', value: 'Arrival Desk 1', icon: monitorIcon }
	];

	const entrySelectorOptions = [
		{ title: 'Single', description: 'Individual passenger', icon: entrySingleIcon },
		{ title: 'Group', description: 'Multiple passengers', icon: entryGroupIcon }
	];

	const exitSelectorOptions = [
		{ title: 'Single', description: 'Individual passenger', icon: exitSingleIcon },
		{ title: 'Group', description: 'Multiple passengers', icon: exitGroupIcon }
	];

	const dropdownOptions = ['Desk Entry', 'Terminal Entry', 'VIP Entry'];

	let selectedEntryOption = $state('Single');
	let selectedExitOption = $state('Single');

	let activeSessions = $state<Session[]>([
		{
			id: '1',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Awaiting Document Scan',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '2',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Under Review',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '3',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Awaiting Document Scan',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '4',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Under Review',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '5',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Awaiting Document Scan',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '6',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Under Review',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '7',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Awaiting Document Scan',
			risk: 'Medium',
			started: '02:55 PM'
		},
		{
			id: '8',
			txnNumber: 'TXN-20260608-D4ADD5C7',
			passenger: 'B. Jonaityte',
			nationality: 'Lithuania',
			type: 'Entry',
			status: 'Awaiting Document Scan',
			risk: 'Medium',
			started: '02:55 PM'
		}
	]);

	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	function handleContinue(session: Session) {
		goto(resolve(`/transactions/passenger-transaction/${session.txnNumber}`));
	}

	function handleTerminate(session: Session) {
		activeSessions = activeSessions.filter((s) => s.id !== session.id);
	}

	function handleTerminateAll() {
		activeSessions = [];
	}
</script>

<div class="p-6">
	<div class="py-3 px-4 flex gap-4 flex-wrap bg-white rounded-md items-center shadow-sm border border-[#E6E7EC]">
		{#each details as detail, i (detail.label)}
			<DetailField label={detail.label} value={detail.value} icon={detail.icon} border={i !== 0} />
		{/each}
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
		<ProcessSelector
			title="Entry"
			subtitle="Process incoming passenger"
			icon={entryBadgeIcon}
			options={entrySelectorOptions}
			{dropdownOptions}
			bind:selectedOption={selectedEntryOption}
			variant="green"
		/>

		<ProcessSelector
			title="Exit"
			subtitle="Process outgoing passenger"
			icon={exitBadgeIcon}
			options={exitSelectorOptions}
			{dropdownOptions}
			bind:selectedOption={selectedExitOption}
			variant="purple"
		/>
	</div>

	<!-- Active Sessions -->
	<div class="mt-8 bg-white border border-[#E6E7EC] rounded-2xl p-6 shadow-sm">
		<div class="flex items-center justify-between mb-6 flex-wrap gap-4">
			<div>
				<h2 class="text-xl font-bold text-[#030519] tracking-wide leading-tight">Active Sessions</h2>
				<p class="text-sm text-[#8C8FA5] mt-1">View and manage ongoing transactions</p>
			</div>
			
			{#if activeSessions.length > 0}
				<button
					type="button"
					onclick={handleTerminateAll}
					class="bg-[#FEE2E2] hover:bg-[#FCA5A5] active:bg-[#F87171] text-[#DC2626] text-xs font-semibold px-4 py-2 rounded-xl transition duration-150 cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
				>
					Terminate All ({activeSessions.length})
				</button>
			{/if}
		</div>

		<div class="overflow-x-auto w-full text-[#383D63]">
			<table class="w-full text-left border-collapse min-w-[900px]">
				<thead>
					<tr class="border-b border-[#E6E7EC] text-xs font-bold text-[#8C8FA5] uppercase tracking-wider">
						<th class="pb-3 px-6">Transaction #</th>
						<th class="pb-3 px-6">Passenger</th>
						<th class="pb-3 px-6">Nationality</th>
						<th class="pb-3 px-6">Type</th>
						<th class="pb-3 px-6">Status</th>
						<th class="pb-3 px-6">Risk</th>
						<th class="pb-3 px-6">Started</th>
						<th class="pb-3 px-6 text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{#each activeSessions as session (session.id)}
						<ActiveSessionRow
							{session}
							oncontinue={handleContinue}
							onterminate={handleTerminate}
						/>
					{:else}
						<tr>
							<td colspan="8" class="py-12 text-center text-sm text-[#8C8FA5]">
								No active sessions found.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
