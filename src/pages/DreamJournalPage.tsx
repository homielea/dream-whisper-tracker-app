
import React, { useState, useMemo } from 'react';
import { useEntries } from '@/context/EntriesContext';
import PageContainer from '@/components/layout/PageContainer';
import DreamEntryForm from '@/components/dream-journal/DreamEntryForm';
import DreamEntryCard from '@/components/dream-journal/DreamEntryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

const DreamJournalPage: React.FC = () => {
  const { dreamEntries, loading } = useEntries();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from dreams
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    dreamEntries.forEach(dream => {
      dream.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [dreamEntries]);

  // Filter dreams based on search and tags
  const filteredDreams = useMemo(() => {
    return dreamEntries.filter(dream => {
      const matchesSearch = searchQuery === '' || 
        dream.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dream.ai_summary?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => dream.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [dreamEntries, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <PageContainer 
      title="Dream Journal"
      description="Capture and explore your dreams with AI-powered insights"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <DreamEntryForm />
        </div>
        <div className="md:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Your Dreams</h2>
              {(searchQuery || selectedTags.length > 0) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear filters
                </Button>
              )}
            </div>

            {/* Search and Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search your dreams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {allTags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter by tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer capitalize ${
                          selectedTags.includes(tag) 
                            ? 'bg-dream text-white' 
                            : 'hover:bg-dream/10'
                        }`}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {loading ? (
              <div className="text-center p-8">
                <p className="text-muted-foreground">Loading dreams...</p>
              </div>
            ) : filteredDreams.length === 0 ? (
              <div className="text-center bg-muted/20 rounded-lg p-8">
                {dreamEntries.length === 0 ? (
                  <>
                    <p className="text-muted-foreground">No dreams recorded yet</p>
                    <p className="text-sm mt-2">Record your first dream to get started</p>
                  </>
                ) : (
                  <>
                    <p className="text-muted-foreground">No dreams match your search</p>
                    <p className="text-sm mt-2">Try adjusting your search terms or tags</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredDreams.length} of {dreamEntries.length} dreams
                </p>
                {filteredDreams.map((dream) => (
                  <DreamEntryCard key={dream.id} dream={dream} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DreamJournalPage;
