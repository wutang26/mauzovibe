import { router } from '@inertiajs/react';


export default function ChooseBranch({branches}) {


const selectBranch=(id)=>{

    router.post('/choose-branch',{
        branch_id:id
    });

}



return (

<div className="container">

<h2>
Select Working Branch
</h2>


<div className="row">


{
branches.map(branch=>(

<div 
key={branch.id}
className="card"
onClick={()=>selectBranch(branch.id)}
>


<h3>
{branch.name}
</h3>


<p>
{branch.location}
</p>


<button>
Open Branch
</button>


</div>


))
}


</div>


</div>


)

}