<?php namespace App\Http\Controllers;

use App\Events\ChildCreated;
use App\Events\ChildDeleted;
use App\ParentNode;

class ChildController extends Controller
{

    public function store($parent)
    {
        $data = $this->validateWith([
            'num' => 'required'
        ]);
        $parent = ParentNode::findOrFail($parent);
        $child = $parent->children()->create($data);

        event(new ChildCreated($child));
        return $child;
    }

    public function destroy($parent, $child)
    {
        $parent = ParentNode::findOrFail($parent);
        $child = $parent->children()->findOrFail($child);
        $child->delete();

        event(new ChildDeleted($child));
        return response(null, 204);
    }

}