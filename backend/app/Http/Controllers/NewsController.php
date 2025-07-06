<?php

namespace App\Http\Controllers;

use App\Http\Services\NewsService;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    /**
     * Fetch articles from multiple news sources.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchArticles(Request $request)
    {
        return $this->newsService->fetchArticles($request->all());
    }

    /**
     * Fetch articles from Database.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function fetchArticlesFromDb(Request $request)
    {
        return $this->newsService->fetchArticlesFromDb($request);
    }
}
