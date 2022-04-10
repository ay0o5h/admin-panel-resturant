// function solution(A, B) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   var i = 0;
//   var result = A * B;
//   while (result != 0) {
//     i++;
//     result &= result - 1;
//   }
//   return i;
// }
function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)
    let sumResult = [];
    let resultSort=[]
  A.forEach(element => {
      if (typeof element == "number") {
          if (element % 9 == 0 && element != 0) {
              sumResult.push(9); 
          } else {
              sumResult.push(element%9); 
          }
      }
  });
    let sortArr = sumResult.slice().sort();
    
    for (let i = 0; i < sortArr.length - 1; i++){
        if (sortArr[i + 1] == sortArr[i]) {
           resultSort.push(sortArr.indexOf(sortArr[i])); 
        }
            
    }
        return resultSort;
}
solution([51,71,42,17])
// function solution(S, C) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   let result = 0,
//     x = C[0],
//     y = C[0];
//   for (let i = 1; i < S.length; i++) {
//     if (S[i] != S[i - 1]) {
//       result += x - y;
//       x = y = 0;
//     }
//     x += C[i];
//     y = Math.max(y, C[i]);
//   }
//   return result + (x - y);
// }
