/**
 * Created by dcl on 2017/8/31.
 */

let Q = require("./queue").instance();

function factorial (num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        return (num * factorial(num - 1));
    }
};

let worker = function( work ){
    let val = factorial( work );
    console.log(`工作< ${work}:${val} >完成！`);
    return true;
};


Q.setHandler( worker );

let works = [];
for( let i = 0; i < 50; i ++ ){
    works.push( i );
}

Q.addMore( works );

for( let i = 0; i < 30; i ++ ){
    Q.add( i );
}
