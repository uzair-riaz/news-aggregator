<?php

namespace App\Http\Services\Contracts;

use Illuminate\Support\Facades\Request;

interface NewsProviderInterface
{
    /**
     * Fetch articles from the provider.
     *
     * @param array $params
     * @return array
     */
    public function fetchArticles(array $params);

    /**
     * Fetch articles from the database.
     *
     * @param array $params
     * @return array
     */
    public function fetchArticlesFromDb(Request $request);
}
