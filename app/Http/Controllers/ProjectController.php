<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller {
    public function index(Request $request) {
        $query = Project::query();

        if($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%')
                    ->orWhere('id', 'like', '%' . $search . '%');
            });
        }
        if($request->filled('status')){
            $status = $request->input('status');
            $query->where('status', '=', $status);
        }
        if($request->filled('sort')){
            $sort = $request->input('sort') === 'asc' ? 'asc' : 'desc';
            $query->orderBy('due_date', $sort);
        }

        $projects = $query->latest()->paginate( 10 );
        return Inertia::render( 'Project/Index', [
            'projects' => ProjectResource::collection( $projects ),
        ] );
    }

 public function show(Project $project, Request $request)
{

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

        $tasks = $query->where('project_id', '=', $project->id)->latest()->paginate( 10 );

    return Inertia::render('Project/Show', [
        'project' => new ProjectResource($project),
        'tasks' => TaskResource::collection( $tasks ),
    ]);
}

public function create(){
    return Inertia::render('Project/Create');
}

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => "required|string|max:255",
        'description' => "required|string",
        'image_path' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        'status' => 'required|string|in:pending,in_progress,completed',
        'due_date' => 'nullable|string',
    ]);

    if ($request->hasFile('image_path')) {
        $validated['image_path'] = $request->file('image_path')->store('projects', 'public');
    }

    $validated['created_by'] = auth()->id();
    $validated['updated_by'] = auth()->id();

    $project = Project::create($validated);

}

public function edit(Project $project){
    return Inertia::render('Project/Create', [
        'project' => $project
    ]);
}

public function update(Project $project, Request $request)
{
    $validated = $request->validate([
        'name' => "required|string|max:255",
        'description' => "required|string",
        'image_path' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        'status' => 'required|string|in:pending,in_progress,completed',
        'due_date' => 'nullable|date',
    ]);

    if ($request->hasFile('image_path')) {
        if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
            Storage::disk('public')->delete($project->image_path);
        }
        $validated['image_path'] = $request->file('image_path')->store('projects', 'public');
    } else {
        unset($validated['image_path']);
    }

    $validated['updated_by'] = auth()->id();

    $project->update($validated);
}

public function destroy(Project $project)
{
    $project->tasks()->delete();

    if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
        Storage::disk('public')->delete($project->image_path);
    }


    $project->delete();
}

public function projects(){
    $projects = Project::latest()->get();

    return response()->json($projects);
}

}
