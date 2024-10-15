import type { FC } from 'react';
import type { IOneKPI, TState, TWidgetUrl } from '../typings';
import React from 'react';
import { Paper, Text, SimpleGrid, Stack } from '@mantine/core';
import { kebabCase } from 'lodash';
import { getMatchingWidgetUrl, threshold } from '~/utils';

interface IKpiBoxProps {
	index: IOneKPI;
	excommOwner: string;
	handleKpiClick: (index: IOneKPI, widgetUrl: TWidgetUrl, state: TState) => void;
	handleNavigation: (xAxis: string, title: string, serviceAreaLead: string) => void;
}

export const KpiBox: FC<IKpiBoxProps> = ({ index, excommOwner, handleKpiClick, handleNavigation }) => {
	const widgetUrl = getMatchingWidgetUrl(index?.replica_category || '');

	return (
		<Paper bg="var(--excomm-header-footer)" data-testid={`dr-excomm-category-paper`}>
			<Text
				ta="center"
				fz="sm"
				py={5}
				c="var(--dr-label-color)"
				style={{ cursor: 'pointer' }}
				title={index?.replica_category || 'N/A'}
				data-testid={kebabCase(`dr-replica-category-text-${index?.replica_category || 'unknown'}`)}
			>
				{index?.replica_category || 'N/A'}
			</Text>

			<SimpleGrid cols={3} spacing={3}>
				{['stateone', 'statetwo', 'statethree'].map((stateKey, idx) => {
					const count = index[`${stateKey}_count`] || 0;
					const state = index[stateKey] || 'Unknown';
					const colorClass = idx === 0 ? 'var(--completed-dr)' : idx === 1 ? 'var(--partial-dr)' : 'var(--no-dr)';

					return (
						<Stack key={stateKey} ta="center" gap={3} bg="var(--excomm-middle)">
							<Text
								fz="lg"
								c={colorClass}
								style={{ cursor: 'pointer' }}
								onClick={() => handleKpiClick(index, widgetUrl, state)}
								data-testid={`dr-${stateKey}-count-${count}`}
							>
								{count}
							</Text>
							<Text
								w="100%"
								c="var(--excomm-category-color)"
								fz="sm"
								truncate
								title={state}
								data-testid={kebabCase(`dr-${stateKey}-text-${state}`)}
							>
								{state}
							</Text>
						</Stack>
					);
				})}
			</SimpleGrid>

			<Text
				ta="center"
				fz="lg"
				style={{ cursor: 'pointer' }}
				c={threshold(index?.percentage || 0)}
				onClick={() =>
					handleNavigation(
						`${index?.replica_category || 'N/A'} - ${excommOwner}`,
						`${index?.replica_category || 'N/A'} - ${excommOwner}`,
						excommOwner
					)
				}
				data-testid={`dr-index-percentage-${index?.percentage || 0}`}
			>
				{`${index?.percentage || 0}%`}
			</Text>
		</Paper>
	);
};