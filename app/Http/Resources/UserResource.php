<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
    * Transform the resource into an array.
    *
    * @return array<string, mixed>
    */

    public function toArray( Request $request ): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'is_admin' => $this->is_admin,
            'created_at' => ( new Carbon( $this->created_at ) )->format( 'Y, M, d' ),
            'updated_at' => ( new Carbon( $this->updated_at ) )->format( 'Y, M, d' )
        ];
    }
}
