<?php

namespace App\Http\Services;

use App\Helpers\JsonResponse;
use App\Http\Services\Contracts\NewsProviderInterface;
use App\Models\Article;
use App\Transformers\ArticleTransformer;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class NewsService implements NewsProviderInterface
{
    protected $nytApiKey;
    protected $newsApiKey;
    protected $guardianApiKey;
    protected $nytBaseUrl;
    protected $newsApiBaseUrl;
    protected $guardianBaseUrl;

    public function __construct()
    {
        $this->nytApiKey = config('services.news_api_keys.nytimes.key');
        $this->newsApiKey = config('services.news_api_keys.newsapi.key');
        $this->guardianApiKey = config('services.news_api_keys.guardian.key');
        $this->nytBaseUrl = NEW_YORK_TIMES_BASE_URL;
        $this->newsApiBaseUrl = NEWS_API_BASE_URL;
        $this->guardianBaseUrl = GUARDIAN_BASE_URL;
    }


    /**
     * Fetch articles from Database with Cursor-Based Pagination.
     *
     * @param array $params
     * @return array
     */
    public function fetchArticlesFromDb($request)
    {
        // try {
        $query = Article::query();

        if ($request->get('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->input('search') . '%')
                    ->orWhere('description', 'like', '%' . $request->input('search') . '%');
            });
        }

        if ($request->get('category')) {
            $query->whereIn('category', explode(',', $request->query('category', '')));
        }

        if ($request->get('author')) {
            $query->whereIn('author', explode(',', $request->query('author', '')));
        }

        if ($request->get('source')) {
            $query->whereIn('source', explode(',', $request->query('source', '')));
        }

        if ($request->get('date')) {
            $date = Carbon::parse($request->get('date'))->toDateString();
            $query->whereDate('published_at', $date);
        }

        $articles = $query->orderBy('published_at', 'desc')
            ->cursorPaginate(20);

        return JsonResponse::response('Successfully fetched records', [
            'articles' => $articles->items(),
            'next_cursor' => $articles->nextCursor()?->encode(),
            'prev_cursor' => $articles->previousCursor()?->encode(),
        ]);
        // } catch (\Throwable $th) {
        //     return JsonResponse::response('Error fetching articles', [], STATUS_CODE_BADREQUEST, 'error');
        // }
    }



    /**
     * Fetch articles from multiple news APIs.
     *
     * @param array $params
     * @return array
     */
    public function fetchArticles(array $params = [])
    {
        $articles = [];
        try {
            $nytResponse = $this->fetchFromNyt($params);
            if ($nytResponse['status'] === 'OK') {
                $articles = array_merge($articles, ArticleTransformer::transformNytArticles($nytResponse['response']['docs']));
            }

            $newsApiResponse = $this->fetchFromNewsApi($params);
            if ($newsApiResponse['status'] === 'ok') {
                $articles = array_merge($articles, ArticleTransformer::transformNewsApiArticles($newsApiResponse['articles']));
            }

            $guardianResponse = $this->fetchFromGuardian($params);
            if ($guardianResponse['response']['status'] === 'ok') {
                $articles = array_merge($articles, ArticleTransformer::transformGuardianArticles($guardianResponse['response']['results']));
            }


            return $articles;
        } catch (\Exception $e) {
            return JsonResponse::response('Error fetching articles', [], STATUS_CODE_BADREQUEST, 'error');
        }
    }

    protected function fetchFromNyt(array $params)
    {
        $queryParams = [
            'api-key' => $this->nytApiKey,
            'q' => $params['query'] ?? null,
            'begin_date' => $params['from'] ?? null,
            'end_date' => $params['to'] ?? null,
            'sort' => $params['sort'] ?? 'relevance',
            'page' => $params['page'] ?? 0,
        ];


        $response = Http::get($this->nytBaseUrl, array_filter($queryParams));


        return $response->json();
    }

    protected function fetchFromNewsApi(array $params)
    {
        $queryParams = [
            'apiKey' => $this->newsApiKey,
            'q' => $params['query'] ?? 'Germany',
            'from' => $params['from'] ?? '',
            'to' => $params['to'] ?? '',
            'language' => $params['language'] ?? 'en',
            'sortBy' => $params['sort'] ?? 'publishedAt',
            'pageSize' => $params['pageSize'] ?? 20,
            'page' => $params['page'] ?? 1,
        ];

        $response = Http::get($this->newsApiBaseUrl, array_filter($queryParams));

        return $response->json();
    }

    protected function fetchFromGuardian(array $params)
    {
        $queryParams = [
            'api-key' => $this->guardianApiKey,
            'q' => $params['query'] ?? null,
            'from-date' => $params['from'] ?? null,
            'to-date' => $params['to'] ?? null,
            'order-by' => $params['sort'] ?? 'relevance',
            'page-size' => $params['pageSize'] ?? 20,
            'page' => $params['page'] ?? 1,
        ];

        $response = Http::get($this->guardianBaseUrl, array_filter($queryParams));

        return $response->json();
    }
}
