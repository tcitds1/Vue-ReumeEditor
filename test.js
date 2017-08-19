function jiushiN(array) {
    for(var row = 0; row<array.length; row++)
        for(var col = 0; col<array[row].length;col++)
            array[3-1-col][row]

    // var a = array[(array[row].length)-1-col][row];

    console.log(array)
}
var array = [[1,2,3],[4,5,6],[7,8,9]];
jiushiN(array);