<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model {
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'name',
        'description',
        'image_path',
        'status',
        'priority',
        'due_date' ,
        'assigned_user_id',
        'created_by',
        'updated_by',
        'project_id',
    ];

    public function project():BelongsTo {
        return $this->belongsTo( Project::class );
    }

    public function assignedUser():BelongsTo {
        return $this->belongsTo( User::class, 'assigned_user_id' );
    }

    public function createdBy():BelongsTo {
        return $this->belongsTo( User::class, 'created_by' );
    }

    public function updatedBy():BelongsTo {
        return $this->belongsTo( User::class, 'updated_by' );
    }
}
