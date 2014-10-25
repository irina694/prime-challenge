/** Prime Challenge
 *
 * October 24, 2014
 * Irina Patrikeeva
 * patrikeeva.irina@gmail.com
 */
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]; // first 10 primes

function createTable() {
    var col = '<td>prime</td>';
    for (var i = 0; i < primes.length; i++) {
        col += '<td>' + primes[i] + '</td>';
    }
    $('.multiplication-table').append($(col));

    for (var i = 0; i < primes.length; i++) {
        var row = '<tr><td>' + primes[i] + '</td></tr>';
        $('.multiplication-table').append($(row));
    }

    // the table is symmetrical with respect to the main diagonal where row = column
    // fill the top half of the table
    var topHalfTable = [];
    for (var row = 0; row < primes.length; row++) {
        var rowArray = [];
        for (var col = row; col < primes.length; col++) {
            var p = primes[row];
            rowArray.push(p * primes[col]);
        }
        topHalfTable[row] = rowArray;
    }

    // pivot columns in the top half table to fill the rows in bottom half table
    var bottomHalfTable = [];
    for (var row = 1; row < primes.length; row++) {
        var rowArray = [];
        for (var i = 0; i < row; i++) {
            var p = topHalfTable[i][row-i];
            rowArray.push(p);
        }
        bottomHalfTable[row] = rowArray;
    }

    // join top and bottom tables
    var fullTable = [];
    fullTable[0] = topHalfTable[0];
    for (var i = 1; i < primes.length; i++) {
        fullTable[i] = bottomHalfTable[i].concat(topHalfTable[i]);
    }

    for (var i = 0; i < primes.length; i++) {
        var matrixRow = fullTable[i];
        var p = primes[i];
        for (var j = 0; j < matrixRow.length; j++) {
            var cell = '<td>' + matrixRow[j] + '</td>';
            var row = $('tr')[i];
            $(row).append($(cell));
        }
    }

    // run tests
    testTable(fullTable);
}


function testTable(table) {
    // check that answers are increasing in each row/column
    var isTableSorted = isSorted(table);
    if (isTableSorted) {
        console.log('Correct! Each row in the table is in ascending order, as expected.')
    }
    else {
        console.log('Error! Values in the table are not sorted correctly.');
    }

    // check that each cell with prime 2 is even in row 0
    var evenRow = table[0];
    var isEvenRow = isEven(evenRow);
    if (isEvenRow) {
        console.log('Correct! The row 0 is even, as expected.')
    }
    else {
        console.log('Error! The row 0 contains odd numbers.');
    }

    // check that each cell with prime 2 is even in column 0
    var evenColumn = [];
    for (var i = 0; i < primes.length; i++) {
        var row = table[i];
        evenColumn.push(row[0]);
    }
    var isEvenColumn = isEven(evenColumn);
    if (isEvenColumn) {
        console.log('Correct! The column 0 is even, as expected.')
    }
    else {
        console.log('Error! The row 0 contains odd numbers.');
    }

    // check if each cell in a row is divisible by the two primes
    for (var i = 1; i < primes.length; i++) {
        var prime = primes[i];
        var row = table[i];
        var isDivisibleRow = isDivisibleByPrime(row, prime);
        if (isDivisibleRow) {
            console.log('Correct! Each cell in row ' + i + ' is divisible by the primes that make it.')
        }
        else {
            console.log('Error! The row ' + i + ' contains incorrect values.');
        }
    }

    // check if each cell in a row is divisible by any non prime number less than the largest prime
    for (var i = 1; i < primes.length; i++) {
        var prime = primes[i];
        var row = table[i];
        var isDivisibleNonPrimeRow = isDivisibleByNonPrime(row);
        if (isDivisibleNonPrimeRow) {
            console.log('Correct! Each cell in row ' + i + ' is not divisible by non prime numbers.')
        }
        else {
            console.log('Error! The row ' + i + ' is divisible by a non prime number.');
        }
    }

}

function isSorted(table) {
    for (var i = 0; i < primes.length; i++) {
        var row = table[i];
        for (var j = 0; j < primes.length - 1; j++) {
            if (row[j] > row[j+1]) {
                return false;
            }
        }
    }
    return true;
}

function isEven(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] % 2 != 0) {
            return false;
        }
    }
    return true;
}

function isDivisibleByPrime(row, prime) {
    for (var i = 0; i < primes.length; i++) {
        var cell = row[i];
        var otherPrime = primes[i];
        if ((cell % prime != 0 || cell % otherPrime != 0) && (cell == prime * otherPrime)) {
            return false;
        }
    }
    return true;
}

function isDivisibleByNonPrime(row) {
    var lastPrime = primes[primes.length-1];
    for (var i = 0; i < primes.length; i++) {
        var cell = row[i];
        for (var j = 1; j < lastPrime; j++) {
            // test against every non prime integer smaller than the largest prime in the table
            if (primes.indexOf(j) == -1) {
                if (cell % j != 0) {
                    return true;
                }
            }
        }
    }
    return false;
}