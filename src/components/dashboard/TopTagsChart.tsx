
import React from 'react';
import { useEntries } from '@/context/EntriesContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TopTagsChart: React.FC = () => {
  const { getTopTags } = useEntries();
  const tags = getTopTags();
  
  // Convert tags to chart data
  const chartData = tags.map((tag, index) => ({
    name: tag,
    count: 10 - index, // Dummy count for visualization, decreases by position
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Top Dream Themes</CardTitle>
      </CardHeader>
      <CardContent>
        {tags.length === 0 ? (
          <div className="text-center text-muted-foreground h-[200px] flex items-center justify-center">
            <p>No dream data available yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  border: '1px solid #E5DEFF',
                  borderRadius: '4px'
                }}
              />
              <Bar dataKey="count" fill="#9b87f5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TopTagsChart;
