<?php

namespace App\Jobs;

use App\Http\Services\NewsService;
use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchArticlesJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(NewsService $newsService): void
    {
        $params = ['sort' => 'relevance', 'pageSize' => 50];
        $articles = $newsService->fetchArticles($params);
        foreach ($articles as $article) {

            Article::updateOrCreate(
                ['url' => $article['url']],
                $article
            );
        }
    }
}
