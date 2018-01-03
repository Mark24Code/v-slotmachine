export function unorderArr(arr){
  let carr = arr.concat();
  carr.sort(function(x,y){
    return 0.5-Math.random()
  })
  return carr
}