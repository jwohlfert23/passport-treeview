<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChildNode extends Model
{
    protected $fillable = ['num'];

    public function parent()
    {
        return $this->belongsTo(ParentNode::class, 'parent_id');
    }
}
