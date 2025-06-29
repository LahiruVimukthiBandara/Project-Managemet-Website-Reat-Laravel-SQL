<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller {

    public function count() {

        $user = auth()->id();

        $myPendingTasks = Task::query()->where( 'assigned_user_id', $user )->orWhere( 'status', 'pending' )->count();
        $myCompletedTasks = Task::query()->where( 'assigned_user_id', $user )->orWhere( 'status', 'completed' )->count();
        $myInprogressTasks = Task::query()->where( 'assigned_user_id', $user )->orWhere( 'status', 'completed' )->count();

        // my active tasks
        $query = Task::query()->with( 'project' );
        if ($user) {
            $query->where('assigned_user_id', $user)
                ->where(function($q) {
                    $q->where('status', 'pending')
                        ->orWhere('status', 'in_progress');
          });
}

        $tasks = $query->latest()->paginate( 10 );
        $taskResource = TaskResource::collection( $tasks );

        return Inertia::render( 'Dashboard', [
            'myCompletedTasks' => $myCompletedTasks,
            'myPendingTasks' => $myPendingTasks,
            'myInprogressTasks' => $myInprogressTasks,
            'tasks'=> $taskResource,
        ] );
    }

}
