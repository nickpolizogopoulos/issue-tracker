'use client';

import { Card } from "@radix-ui/themes";
import {
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar
} from 'recharts';

type Props = {
    open: number;
    inProgress: number;
    closed: number;
};

type DataProps = {
    label: string;
    value: number
};

const IssueChart = ( {open, inProgress, closed}: Props ) => {

    const data: DataProps[] = [
        {
            label: 'Open',
            value: open
        },
        {
            label: 'In Progress',
            value: inProgress
        },
        {
            label: 'Closed',
            value: closed
        }
    ];

    const chartShape = (props: any) => {
        const { x, y, width, height } = props;
        return (
          <g className="group">
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              className="fill-[var(--accent-9)]
                group-hover:fill-[var(--accent-11)]
                transition duration-250 ease-in-out
                hover:drop-shadow-lg"
            />
          </g>
        );
    };

    return (
        <Card className='hover:shadow-lg transition duration-250 ease-in-out'>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis
                        dataKey='label'
                        style={{fontStyle: 'italic'}}
                    />
                    <YAxis />
                    <Bar
                        dataKey='value'
                        barSize={50}
                        style={{ fill: 'var(--accent-9)' }}
                        className=''
                        shape={chartShape}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Card>    
    );
};

export default IssueChart;