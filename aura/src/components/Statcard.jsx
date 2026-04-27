export default function StatCard({title,value}){
return(
<div className='bg-slate-900 p-6 rounded-3xl shadow-lg'>
<h3 className='text-slate-400'>{title}</h3>
<h2 className='text-4xl font-bold mt-3'>{value}</h2>
</div>
)
}