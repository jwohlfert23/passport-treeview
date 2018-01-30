<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParentNode extends Model
{
    protected $fillable = ['name', 'min', 'max'];


    public function children()
    {
        return $this->hasMany(ChildNode::class, 'parent_id');
    }

    public function generate($n)
    {
        $this->children()->delete();

        for ($i = 0; $i < $n; $i++) {
            $this->children()->create([
                'num' => $this->getNumber()
            ]);
        }
        $this->load('children');
        return $this;
    }

    protected function getNumber()
    {
        return rand($this->min, $this->max);
    }
}
