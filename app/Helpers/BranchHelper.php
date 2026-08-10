<?php

namespace App\Helpers;

use App\Models\Branch;

class BranchHelper
{

    public static function current()
    {
        $branchId = session('branch_id');

        if(!$branchId){
            return null;
        }

        return Branch::find($branchId);
    }


    public static function id()
    {
        return session('branch_id');
    }

}