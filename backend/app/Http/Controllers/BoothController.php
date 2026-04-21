<?php

namespace App\Http\Controllers;

use App\Models\Booth;
use Illuminate\Http\Request;

class BoothController extends Controller
{
    public function index()
    {
        return Booth::all();
    }

    public function update(Request $req,$id)
    {
        $booth = Booth::findOrFail($id);

        $booth->update($req->all());

        return response()->json([
            'message'=>'updated'
        ]);
    }
}