<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\TaskStatus;
use Illuminate\Http\Request;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\Response;

class TaskStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taskStatuses = TaskStatus::all();
        $response = ApiResponse::Success('Task Statuses retrieved successfully', $taskStatuses);
        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);
        $taskStatus = TaskStatus::create([
            'Name' => $request->input('name'),
            'Description' => $request->input('description', null),
        ]);
        $response = ApiResponse::Created('Task Status created successfully', $taskStatus);
        return response()->json($response, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskStatus $taskStatus)
    {
        if (!$taskStatus) {
            $response = ApiResponse::NotFound('Task Status not found');
            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
        $response = ApiResponse::Success('Task Status retrieved successfully', $taskStatus);
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskStatus $taskStatus)
    {
        if (!$taskStatus) {
            $response = ApiResponse::NotFound('Task Status not found');
            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:255',
        ]);
        $taskStatus->update([
            'Name' => $request->input('name', $taskStatus->Name),
            'Description' => $request->input('description', $taskStatus->Description),
        ]);
        $response = ApiResponse::Success('Task Status updated successfully', $taskStatus);
        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskStatus $taskStatus)
    {
        if (!$taskStatus) {
            $response = ApiResponse::NotFound('Task Status not found');
            return response()->json($response, Response::HTTP_NOT_FOUND);
        }
        $taskStatus->delete();
        return response(status: Response::HTTP_NO_CONTENT);
    }
}
