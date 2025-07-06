<?php

namespace App\Transformers;

class ArticleTransformer
{
    public static function transformNytArticles(array $articles): array
    {
        return array_map(function ($article) {
            return [
                'id' => $article['_id'] ?? '',
                'source' => 'New York Times',
                'title' => $article['headline']['main'] ?? '',
                'author' => $article['byline']['original'] ?? '',
                'description' => $article['abstract'] ?? '',
                'url' => $article['web_url'] ?? '',
                'published_at' => $article['pub_date'] ?? '',
                'category' => $article['news_desk'] ?? $article['section_name'] ?? 'Uncategorized',
            ];
        }, $articles);
    }

    public static function transformNewsApiArticles(array $articles): array
    {
        return array_map(function ($article) {
            return [
                'id' => $article['url'] ?? '',
                'source' => $article['source']['name'] ?? 'NewsAPI',
                'title' => $article['title'] ?? '',
                'author' => $article['author'] ?? '',
                'description' => $article['description'] ?? '',
                'url' => $article['url'] ?? '',
                'published_at' => $article['publishedAt'] ?? '',
                'category' => $article['source']['name'] ?? 'General',
            ];
        }, $articles);
    }

    public static function transformGuardianArticles(array $articles): array
    {
        return array_map(function ($article) {
            return [
                'id' => $article['id'] ?? '',
                'source' => 'The Guardian',
                'title' => $article['webTitle'] ?? '',
                'author' => $article['fields']['byline'] ?? '',
                'description' => $article['fields']['trailText'] ?? '',
                'url' => $article['webUrl'] ?? '',
                'published_at' => $article['webPublicationDate'] ?? '',
                'category' => $article['sectionName'] ?? 'Uncategorized',
            ];
        }, $articles);
    }
}
