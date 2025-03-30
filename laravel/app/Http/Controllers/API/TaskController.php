<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            'message' => 'Tasks retrieved successfully',
            'data' => $tasks,
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
            'status_id' => 'required|exists:task_statuses,id',
        ]);
        $task = Task::create($request->all());
        return response()->json([
            'message' => 'Task created successfully',
            'data' => $task,
            'status' => 201,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json([
            'message' => 'Task retrieved successfully',
            'data' => $task,
            'status' => 200,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:255',
            'status_id' => 'sometimes|required|exists:task_statuses,id',
        ]);
        $task->update($request->all());
        return response()->json([
            'message' => 'Task updated successfully',
            'data' => $task,
            'status' => 200,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully',
            'status' => 200,
        ]);
    }

    /**
     * Assign a task to a project.
     */
    public function assignTaskToProject(Request $request, Task $task)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
        ]);
        $task->project_id = $request->project_id;
        $task->save();
        return response()->json([
            'message' => 'Task assigned to project successfully',
            'data' => $task,
            'status' => 200,
        ]);
    }
}
