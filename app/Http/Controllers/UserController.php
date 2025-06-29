<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index(Request $request) {
        $query = User::query();

        if($request->filled('search')){
            $search = $request->input('search');
            $query-> where(function($q) use ($search) {
                $q->where('name','like', '%' . $search . "%")
                ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        $users = $query->latest()->paginate( 10 );
        return Inertia::render( 'User/Index', [
            'users' => UserResource::collection( $users ),
        ] );
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( StoreUserRequest $request ) {

    }

    /**
    * Display the specified resource.
    */

public function show(User $user, Request $request)
{
    $tasksQuery = $user->tasks()->latest();

    if ($request->filled('taskSearch')) {
        $taskSearch = $request->input('taskSearch');
        $tasksQuery->where(function ($q) use ($taskSearch) {
            $q->where('name', 'like', '%' . $taskSearch . '%')
              ->orWhere('id', $taskSearch);
        });
    }
    if ($request->filled('taskStatus')) {
        $taskStatus = $request->input('taskStatus');
        $tasksQuery->where('status', $taskStatus);
    }

    $tasks = $tasksQuery->paginate(10);

    // Status counts
    $completed = $user->tasks()->where('status', 'completed')->count();
    $pending = $user->tasks()->where('status', 'pending')->count();
    $in_progress = $user->tasks()->where('status', 'in_progress')->count();

    // Projects (unchanged)
    $projectQuery = $user->projects()->latest();

    if($request->filled('projectSearch')){
        $projectSearch = $request->input('projectSearch');
        $projectQuery->where(function($q) use ($projectSearch){
            $q->where('name','like','%' . $projectSearch . '$')
            ->orWhere('id','like', '%' . $projectSearch . '%');
        });
    }
    if($request->filled('projectStatus')){
        $projectStatus = $request->input('projectStatus');
        $projectQuery->where('status', $projectStatus);
    }

    $projects = $projectQuery->paginate(10);

    return Inertia::render('User/Show', [
        'user' => new UserResource($user),
        'tasks' => TaskResource::collection($tasks),
        'projects' => ProjectResource::collection($projects),
        'completed' => $completed,
        'pending' => $pending,
        'in_progress' => $in_progress,
    ]);
}

    /**
    * Show the form for editing the specified resource.
    */

    public function edit( User $user ) {
        //
    }

    /**
    * Update the specified resource in storage.
    */

    public function update( UpdateUserRequest $request, User $user ) {
        //
    }

    /**
    * Remove the specified resource from storage.
    */

    public function destroy( User $user ) {
        //
    }

public function members() {
        $users = User::latest()->get();

        return response()->json( $users );
    }
}
