
export default function Loading({label='Loading...'}){
  return (
    <div style={{display:'grid', placeItems:'center', padding:24}}>
      <div style={{width:44,height:44,borderRadius:'50%',border:'3px solid #273041',borderTopColor:'#7c5cff',animation:'spin 1s linear infinite'}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{marginTop:8,color:'#9fb2d6'}}>{label}</div>
    </div>
  )
}
