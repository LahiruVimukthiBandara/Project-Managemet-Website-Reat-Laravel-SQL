<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource {
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */

    public function toArray( Request $request ): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'due_date' => ( new Carbon( $this->due_date ) )->format( 'Y, M, d' ),
            'status' => $this->status,
            'image_path' => $this->image_path,
            'createdBy' => new UserResource( $this->createdBy ),
            'updatedBy' => new UserResource( $this->updatedBy ),
            'created_at' => Carbon::parse( $this->created_at )->diffForHumans(),
            'updated_at' => ( new Carbon( $this->updated_at ) )->diffForHumans(),
        ];
    }
}
