import type { FC } from 'react';
import type { IDetailBoxProps, IOneKPI, TState, TWidgetUrl } from '../typings';

import React from 'react';
import { Paper, Text, SimpleGrid, Stack } from '@mantine/core';
import { generatePath, useSearchParams } from 'react-router-dom';
import { kebabCase } from 'lodash';

import { endpoints } from '~/utils/endpoints';
import { getMatchingWidgetUrl, threshold } from '~/utils';

export const DetailBox: FC<{ excomm: IDetailBoxProps['data'][number] }> = ({ excomm }) => {
	const [, setSearchParams] = useSearchParams();
	const handleClick = React.useCallback(
		(xAxis: string, title: string, serviceAreaLead: string) => {
			setSearchParams({
				insights: 'true',
				url: `${generatePath(endpoints?.drKpis, { kpiUrl: 'applications-in-dr-scope' })}/listing`,
				xAxis,
				title,
				serviceAreaLead
			});
		},
		[setSearchParams]
	);

	const handleKpiClick = React.useCallback(
		(index: IOneKPI, widgetUrl: TWidgetUrl, state: TState) => {
			setSearchParams({
				insights: 'true',
				url: `${generatePath(endpoints?.drWidgets, { widgetUrl })}/listing`,
				xAxis: `${state}`,
				title: `${index?.replica_category} - ${state} - ${excomm?.application_owner}`,
				serviceAreaLead: `${excomm?.application_owner}`
			});
		},
		[setSearchParams, excomm]
	);

	return (
		<React.Fragment>
			<Paper
				bg="var(--excomm-bg-color)"
				style={{
					border: '1px solid var(--excomm-card-border)'
				}}
				data-testid={`dr-excomm-owner-paper`}
			>
				<SimpleGrid cols={3} spacing={3} h={'100%'} w={'100%'}>
					<Stack bg="var(--owner-bg-color)" gap={3} ta="center" justify="center">
						<Text
							size="sm"
							title={excomm?.application_owner}
							c={'var(--owner-title-color)'}
							data-testid={kebabCase(`dr-owner-text-${excomm?.application_owner}`)}
							children={excomm?.application_owner}
						/>
						<Text
							size="sm"
							title={excomm?.sector}
							c={'var(--owner-title-color)'}
							data-testid={kebabCase(`dr-sector-text-${excomm?.sector}`)}
							children={excomm?.sector}
						/>
					</Stack>
					<Stack ta="center" c="var(--text-color)" gap={3} fz="md" justify="center">
						<Text
							w="100%"
							c="var(--excomm-category-color)"
							truncate="end"
							title={excomm?.dr_apps?.category}
							data-testid={kebabCase(`dr-category-text-${excomm?.dr_apps?.category}`)}
							children={excomm?.dr_apps?.category}
						/>
						<Text
							fw="bold"
							fz="xl"
							c={'var(--header-text)'}
							style={{ lineHeight: '2rem', cursor: 'pointer' }}
							onClick={() =>
								handleClick(
									`${excomm?.dr_apps.category} - ${excomm?.application_owner}`,
									`${excomm?.dr_apps.category} - ${excomm?.application_owner}`,
									`${excomm?.application_owner}`
								)
							}
							data-testid={kebabCase(`dr-count-text-${excomm?.dr_apps?.count}`)}
							children={excomm?.dr_apps?.count}
						/>
					</Stack>
					<Stack
						ta="center"
						gap={3}
						justify="center"
						c="var(--text-color)"
						style={{
							alignContent: 'center',
							borderLeft: '1px solid var(--right-border-color)'
						}}
					>
						<Text
							fz="sm"
							w="100%"
							c="var(--excomm-category-color)"
							truncate="end"
							title={excomm?.dr_index?.category}
							data-testid={kebabCase(`dr-index-text-${excomm?.dr_index?.category}`)}
							children={excomm?.dr_index?.category}
						/>
						<Text
							c={threshold(excomm?.dr_index?.percentage)}
							fw="normal"
							fz="xl"
							style={{
								lineHeight: '2rem',
								cursor: 'pointer'
							}}
							onClick={() =>
								handleClick(
									`${excomm?.dr_apps.category} - ${excomm?.application_owner}`,
									`${excomm?.dr_apps.category} - ${excomm?.application_owner}`,
									`${excomm?.application_owner}`
								)
							}
							data-testid={`dr-index-value-${excomm?.dr_index?.percentage}%`}
							children={`${excomm?.dr_index?.percentage}%`}
						/>
					</Stack>
				</SimpleGrid>
			</Paper>

			{excomm?.onekpi?.map(index => {
				const widgetUrl = getMatchingWidgetUrl(index?.replica_category);
				return (
					<Paper key={index?.replica_category} bg="var(--excomm-header-footer)" data-testid={`dr-excomm-category-paper`}>
						<Text
							ta="center"
							fz="sm"
							py={5}
							c="var(--dr-label-color)"
							style={{ cursor: 'pointer' }}
							title={index?.replica_category}
							data-testid={kebabCase(`dr-replica-category-text-${index?.replica_category}`)}
							children={index?.replica_category}
						/>
						<SimpleGrid cols={3} spacing={3}>
							<Stack ta="center" gap={3} bg={'var(--excomm-middle)'}>
								<Text
									fz="lg"
									c="var(--completed-dr)"
									style={{ cursor: 'pointer' }}
									onClick={() => handleKpiClick(index, widgetUrl, index?.stateone)}
									children={index?.stateone_count}
									data-testid={`dr-complete-count-${index?.stateone_count}`}
								/>
								<Text
									w="100%"
									c="var(--excomm-category-color)"
									fz="sm"
									truncate="end"
									title={index?.stateone}
									data-testid={kebabCase(`dr-complete-text-${index?.stateone}`)}
									children={index?.stateone}
								/>
							</Stack>
							<Stack ta="center" gap={3} bg={'var(--excomm-middle)'}>
								<Text
									fz="lg"
									c="var(--partial-dr)"
									style={{ cursor: 'pointer' }}
									onClick={() => handleKpiClick(index, widgetUrl, index?.statetwo)}
									data-testid={`dr-partial-count-${index?.statetwo_count}`}
									children={index?.statetwo_count}
								/>
								<Text
									w="100%"
									c="var(--excomm-category-color)"
									fz="sm"
									truncate="end"
									title={index?.statetwo}
									data-testid={kebabCase(`dr-partial-text-${index?.statetwo}`)}
									children={index?.statetwo}
								/>
							</Stack>
							<Stack ta="center" gap={3} bg={'var(--excomm-middle)'}>
								<Text
									fz="lg"
									c={'var(--no-dr)'}
									style={{ cursor: 'pointer' }}
									onClick={() => handleKpiClick(index, widgetUrl, index?.statethree)}
									data-testid={`dr-no-count-${index?.statethree_count}`}
									children={index?.statethree_count}
								/>
								<Text
									w="100%"
									c="var(--excomm-category-color)"
									fz="sm"
									truncate="end"
									title={index?.statethree}
									data-testid={kebabCase(`no-dr-text-${index?.statethree}`)}
									children={index?.statethree}
								/>
							</Stack>
						</SimpleGrid>
						<Text
							ta="center"
							fz="lg"
							style={{ cursor: 'pointer' }}
							c={threshold(index?.percentage)}
							onClick={() =>
								handleClick(
									`${index?.replica_category} - ${excomm?.application_owner}`,
									`${index?.replica_category} - ${excomm?.application_owner}`,
									`${excomm?.application_owner}`
								)
							}
							data-testid={`dr-index-percentage-${index?.percentage}`}
							children={`${index?.percentage}%`}
						/>
					</Paper>
				);
			})}
		</React.Fragment>
	);
};
