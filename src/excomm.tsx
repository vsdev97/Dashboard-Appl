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

const KpiBox: FC<IKpiBoxProps> = ({ index, excommOwner, handleKpiClick, handleNavigation }) => {
  const widgetUrl = getMatchingWidgetUrl(index?.replica_category);

  return (
    <Paper bg="var(--excomm-header-footer)" data-testid={`dr-excomm-category-paper`}>
      <Text
        ta="center"
        fz="sm"
        py={5}
        c="var(--dr-label-color)"
        style={{ cursor: 'pointer' }}
        title={index?.replica_category}
        data-testid={kebabCase(`dr-replica-category-text-${index?.replica_category}`)}
      >
        {index?.replica_category}
      </Text>

      <SimpleGrid cols={3} spacing={3}>
        {['stateone', 'statetwo', 'statethree'].map((stateKey, idx) => {
          const count = index[`${stateKey}_count`];
          const state = index[stateKey];
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
                truncate="end"
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
        c={threshold(index?.percentage)}
        onClick={() =>
          handleNavigation(
            `${index?.replica_category} - ${excommOwner}`,
            `${index?.replica_category} - ${excommOwner}`,
            excommOwner
          )
        }
        data-testid={`dr-index-percentage-${index?.percentage}`}
      >
        {`${index?.percentage}%`}
      </Text>
    </Paper>
  );
};

export default KpiBox;


import type { FC } from 'react';
import type { IDetailBoxProps } from '../typings';

import React, { useCallback } from 'react';
import { Paper, Text, SimpleGrid, Stack } from '@mantine/core';
import { generatePath, useSearchParams } from 'react-router-dom';
import { kebabCase } from 'lodash';

import { endpoints } from '~/utils/endpoints';
import KpiBox from './KpiBox';

export const DetailBox: FC<{ excomm: IDetailBoxProps['data'][number] }> = ({ excomm }) => {
  const [, setSearchParams] = useSearchParams();

  const handleNavigation = useCallback(
    (xAxis: string, title: string, serviceAreaLead: string) => {
      setSearchParams({
        insights: 'true',
        url: `${generatePath(endpoints?.drKpis, { kpiUrl: 'applications-in-dr-scope' })}/listing`,
        xAxis,
        title,
        serviceAreaLead,
      });
    },
    [setSearchParams]
  );

  const handleKpiClick = useCallback(
    (index, widgetUrl, state) => {
      setSearchParams({
        insights: 'true',
        url: `${generatePath(endpoints?.drWidgets, { widgetUrl })}/listing`,
        xAxis: `${state}`,
        title: `${index?.replica_category} - ${state} - ${excomm?.application_owner}`,
        serviceAreaLead: `${excomm?.application_owner}`,
      });
    },
    [setSearchParams, excomm?.application_owner]
  );

  const appOwner = excomm?.application_owner;
  const drApps = excomm?.dr_apps;
  const drIndex = excomm?.dr_index;

  return (
    <Paper
      bg="var(--excomm-bg-color)"
      style={{ border: '1px solid var(--excomm-card-border)' }}
      data-testid={`dr-excomm-owner-paper`}
    >
      <SimpleGrid cols={3} spacing={3} h="100%" w="100%">
        <Stack bg="var(--owner-bg-color)" gap={3} ta="center" justify="center">
          <Text
            size="sm"
            title={appOwner}
            c="var(--owner-title-color)"
            data-testid={kebabCase(`dr-owner-text-${appOwner}`)}
          >
            {appOwner}
          </Text>
          <Text
            size="sm"
            title={excomm?.sector}
            c="var(--owner-title-color)"
            data-testid={kebabCase(`dr-sector-text-${excomm?.sector}`)}
          >
            {excomm?.sector}
          </Text>
        </Stack>

        <Stack ta="center" c="var(--text-color)" gap={3} fz="md" justify="center">
          <Text
            w="100%"
            c="var(--excomm-category-color)"
            truncate="end"
            title={drApps?.category}
            data-testid={kebabCase(`dr-category-text-${drApps?.category}`)}
          >
            {drApps?.category}
          </Text>
          <Text
            fw="bold"
            fz="xl"
            c="var(--header-text)"
            style={{ lineHeight: '2rem', cursor: 'pointer' }}
            onClick={() =>
              handleNavigation(
                `${drApps?.category} - ${appOwner}`,
                `${drApps?.category} - ${appOwner}`,
                appOwner
              )
            }
            data-testid={kebabCase(`dr-count-text-${drApps?.count}`)}
          >
            {drApps?.count}
          </Text>
        </Stack>

        <Stack
          ta="center"
          gap={3}
          justify="center"
          c="var(--text-color)"
          style={{ borderLeft: '1px solid var(--right-border-color)' }}
        >
          <Text
            fz="sm"
            w="100%"
            c="var(--excomm-category-color)"
            truncate="end"
            title={drIndex?.category}
            data-testid={kebabCase(`dr-index-text-${drIndex?.category}`)}
          >
            {drIndex?.category}
          </Text>
          <Text
            c={threshold(drIndex?.percentage)}
            fw="normal"
            fz="xl"
            style={{ lineHeight: '2rem', cursor: 'pointer' }}
            onClick={() =>
              handleNavigation(
                `${drApps?.category} - ${appOwner}`,
                `${drApps?.category} - ${appOwner}`,
                appOwner
              )
            }
            data-testid={`dr-index-value-${drIndex?.percentage}%`}
          >
            {`${drIndex?.percentage}%`}
          </Text>
        </Stack>
      </SimpleGrid>

      {excomm?.onekpi?.map((index) => (
        <KpiBox
          key={index?.replica_category}
          index={index}
          excommOwner={appOwner}
          handleKpiClick={handleKpiClick}
          handleNavigation={handleNavigation}
        />
      ))}
    </Paper>
  );
};