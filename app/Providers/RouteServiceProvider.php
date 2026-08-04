public function toResponse($request)
{

    $user = auth()->user();


    $branches = $user->branches()->count();


    if($branches > 1)
    {
        return redirect('/choose-branch');
    }


    if($branches == 1)
    {

        session([
            'branch_id'=>$user->branches()
                ->first()
                ->id
        ]);

    }


    return redirect('/dashboard');

}