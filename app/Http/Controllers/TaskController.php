<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TaskController extends Controller {
    public function index(Request $request) {
        $query = Task::query();

        if($request->filled('search')){
            $search = $request->input('search');
            $query->where(function($q) use ($search){
                $q->where('name', 'like','%'. $search .'%' )
                ->orWhere('id', 'like', '%' . $search . '%');
            });
        }
        if($request->filled('status')){
            $status = $request->input('status');
            $query->where('status', '=', $status);
        }
        if($request->filled('priority')){
            $priority = $request->input('priority');
            $query->where('priority', '=', $priority);
        }
        if($request->filled('sort')){
            $sort = $request->input('sort') === 'asc' ? 'asc' : 'desc';
            $query->orderBy('due_date', $sort);
        }

        $tasks = $query->latest()->paginate( 10 );
        return Inertia::render( 'Task/Index', [
            'tasks' => TaskResource::collection( $tasks ),
        ] );
    }

    public function create(){
        return Inertia::render('Task/Create');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => "required|string|max:255",
            'description' => "required|string",
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => "required|string",
            'priority' => "required|string",
            'due_date' => "required|string",
            'assigned_user_id' => "required",
            'project_id' => "required",
        ]);
        if ($request->hasFile('image_path')) {
        $validated['image_path'] = $request->file('image_path')->store('tasks', 'public');
    }

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $task = Task::create($validated);
    }

    public function edit(Task $task){
        return Inertia::render('Task/Create',[
            'task' => $task
        ]);
    }

    public function update(Task $task, Request $request){
          $validated = $request->validate([
            'name' => "required|string|max:255",
            'description' => "required|string",
            'image_path' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'status' => "required|string",
            'priority' => "required|string",
            'due_date' => "required|string",
            'assigned_user_id' => "required",
            'project_id' => "required",
        ]);
        if ($request->hasFile('image_path')) {
        if ($task->image_path && Storage::disk('public')->exists($task->image_path)) {
            Storage::disk('public')->delete($task->image_path);
        }
        $validated['image_path'] = $request->file('image_path')->store('tasks', 'public');
        } else {
            unset($validated['image_path']);
        }

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $task->update($validated);
    }

    public function destroy(Task $task) {
        if ($task->image_path && Storage::disk('public')->exists($task->image_path)) {
        Storage::disk('public')->delete($task->image_path);
    }

    $task->delete();
    }

    public function show(Task $task, Request $request)
    {
        return Inertia::render('Task/Show',[
            'task'=> new TaskResource($task),
        ]);
    }

}
