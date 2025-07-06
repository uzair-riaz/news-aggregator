<?php

namespace App\Helpers;

class JsonResponse
{
    public static function response($message = '', $data = [], $code = STATUS_CODE_OK, $status = 'success')
    {
        return response()->json([
            'code' => $code,
            'status' => $status,
            'data' => $data,
            'message' => $message,
        ], $code);
    }
}
