<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\TaskStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class TaskStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taskStatuses = TaskStatus::all();
        return response()->json([
            'message' => 'Task Statuses retrieved successfully',
            'data' => $taskStatuses,
            'status' => 200,
        ]);
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
        $taskStatus = TaskStatus::create($request->all());
        return response()->json([
            'message' => 'Task Status created successfully',
            'data' => $taskStatus,
            'status' => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskStatus $taskStatus)
    {
        return response()->json([
            'message' => 'Task Status retrieved successfully',
            'data' => $taskStatus,
            'status' => 200,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TaskStatus $taskStatus)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);
        $taskStatus->update($request->all());
        return response()->json([
            'message' => 'Task Status updated successfully',
            'data' => $taskStatus,
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskStatus $taskStatus)
    {
        $taskStatus->delete();
        return response()->json([
            'message' => 'Task Status deleted successfully',
            'status' => 200,
        ]);
    }
}
