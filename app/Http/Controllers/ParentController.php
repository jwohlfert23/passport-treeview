<?php namespace App\Http\Controllers;

use App\Events\ParentCreated;
use App\Events\ParentDeleted;
use App\Events\ParentUpdated;
use App\ParentNode;

class ParentController extends Controller
{

    public function index()
    {
        return ParentNode::with('children')->get();
    }

    public function update($id)
    {
        $data = $this->validateWith([
            'n' => 'required|integer'
        ]);
        $parent = ParentNode::findOrFail($id)->generate($data['n']);

        event(new ParentUpdated($parent));
        return $parent;
    }

    public function store()
    {
        $data = $this->validateWith([
            'name' => 'required',
            'min' => 'required|integer',
            'max' => 'required'
        ]);
        $parent = ParentNode::create($data);

        event(new ParentCreated($parent));
        return $parent;
    }

    public function destroy($id)
    {
        $parent = ParentNode::findOrFail($id);
        $parent->delete();

        event(new ParentDeleted($parent));
        return response(null, 204);
    }
}