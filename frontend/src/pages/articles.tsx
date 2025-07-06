"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { authorOptions, categoryOptions, sourceOptions } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/format-date";
import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

export default function Articles() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const loading = useSelector(
    (state: any) => state.loading.effects.articles.getArticles
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [authorFilter, setAuthorFilter] = useState<any>(
    user?.preferences?.preferences?.authors ?? []
  );
  const [categoryFilter, setCategoryFilter] = useState<any>(
    user?.preferences?.preferences?.categories ?? []
  );
  const [sourceFilter, setSourceFilter] = useState<any>(
    user?.preferences?.preferences?.sources ?? []
  );
  const [dateFilter, setDateFilter] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchArticles = async (filters: any, isLoadMore = false) => {
    const response = await dispatch.articles.getArticles({
      ...filters,
      cursor: isLoadMore ? nextCursor : null,
    });

    if (response) {
      if (isLoadMore) {
        setFilteredArticles((prev) => [...prev, ...response.articles]);
      } else {
        setFilteredArticles(response.articles);
      }

      setNextCursor(response.next_cursor);
      setHasMore(!!response.next_cursor);
    }
  };

  useEffect(() => {
    fetchArticles({
      search: searchTerm,
      author: authorFilter,
      category: categoryFilter,
      source: sourceFilter,
      date: dateFilter,
    });
  }, [searchTerm, authorFilter, categoryFilter, sourceFilter, dateFilter]);

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "author":
        setAuthorFilter(authorFilter.filter((a: string) => a !== value));
        break;
      case "category":
        setCategoryFilter(categoryFilter.filter((c: string) => c !== value));
        break;
      case "source":
        setSourceFilter(sourceFilter.filter((s: string) => s !== value));
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search news..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Refine your news feed
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="author">Author</Label>
                    <MultiSelect
                      options={authorOptions?.map((author) => ({
                        label: author,
                        value: author,
                      }))}
                      onValueChange={setAuthorFilter}
                      defaultValue={authorFilter}
                      placeholder="Select Authors"
                      variant="inverted"
                      animation={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="category">Category</Label>
                    <MultiSelect
                      options={categoryOptions?.map((author) => ({
                        label: author,
                        value: author,
                      }))}
                      onValueChange={setCategoryFilter}
                      defaultValue={categoryFilter}
                      placeholder="Select Category"
                      variant="inverted"
                      animation={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="source">Source</Label>
                    <MultiSelect
                      options={sourceOptions?.map((author) => ({
                        label: author,
                        value: author,
                      }))}
                      onValueChange={setSourceFilter}
                      defaultValue={sourceFilter}
                      placeholder="Select Source"
                      variant="inverted"
                      animation={2}
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-[180px]"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* New section for filter pills */}
        {authorFilter.length > 0 ? (
          <h4 className="mb-3">Searching with your preferences</h4>
        ) : (
          "Save your preferences in settings in top right corner to get your desired results everytime"
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {searchTerm && (
            <Badge variant="secondary" className="text-sm py-1 px-2">
              Search: {searchTerm}
              <button
                onClick={() => setSearchTerm("")}
                className="ml-2 hover:text-destructive focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {authorFilter?.length > 0 && (
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Authors:</span>
              {authorFilter?.map((author: string) => (
                <Badge
                  key={author}
                  variant="outline"
                  className="text-sm py-1 px-2 mr-1"
                >
                  {author}
                  <button
                    onClick={() => removeFilter("author", author)}
                    className="ml-2 hover:text-destructive focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          {categoryFilter?.length > 0 && (
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Categories:</span>
              {categoryFilter?.map((category: string) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="text-sm py-1 px-2 mr-1"
                >
                  {category}
                  <button
                    onClick={() => removeFilter("category", category)}
                    className="ml-2 hover:text-destructive focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          {sourceFilter?.length > 0 && (
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Sources:</span>
              {sourceFilter.map((source: string) => (
                <Badge
                  key={source}
                  variant="outline"
                  className="text-sm py-1 px-2 mr-1"
                >
                  {source}
                  <button
                    onClick={() => removeFilter("source", source)}
                    className="ml-2 hover:text-destructive focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          {dateFilter && (
            <Badge variant="secondary" className="text-sm py-1 px-2">
              Date: {dateFilter}
              <button
                onClick={() => setDateFilter("")}
                className="ml-2 hover:text-destructive focus:outline-none"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>

        <InfiniteScroll
          dataLength={filteredArticles.length}
          next={() =>
            fetchArticles(
              {
                search: searchTerm,
                author: authorFilter,
                category: categoryFilter,
                source: sourceFilter,
                date: dateFilter,
              },
              true
            )
          }
          hasMore={hasMore}
          loader={<p className="text-center py-4">Loading more articles...</p>}
          endMessage={
            <p className="text-center py-4">You have seen all articles!</p>
          }
        >
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article: any) => (
                <Card
                  key={article.id}
                  className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="flex-grow p-4">
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3 mt-2">
                      <span className="text-sm text-primary">
                        {article.author}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(article.published_at)}
                    </span>
                    <a
                      target="_blank"
                      href={article?.url}
                      className="inline-flex items-center justify-center
                      px-4 py-2 text-sm font-medium text-white
                      bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                      rounded-md shadow-md
                      transition-all duration-300 ease-in-out
                      hover:from-purple-600 hover:via-pink-600 hover:to-red-600
                      hover:shadow-lg hover:-translate-y-0.5
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                      active:shadow-inner active:translate-y-0.5"
                    >
                      Read more
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No articles found</h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
