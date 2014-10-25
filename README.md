prime-challenge
===============

Write a program that prints out a multiplication table of the first 10 prime numbers.

The program prints out the table to the screen in index.html and is being called when the window loads.
The tests are run automatically at the end of the function createTable and the test output is printed to the console. 
Complexity
The multiplication is done for the top half of the table since the table is symmetrical with the respect to the main diagonal (where row # = column #). The bottom half is copied from the columns of the top half. 
To calculate answers for row 0 we need to multiply 2 by 10 primes. To calculate answsers for row 1, we need to multiply 3 by 9 primes. That is, to calculate answers for row i, we need to multiply the ith prime by N-i, where N is the number of primes, which gives us N! multiplications (N*(N-1)*(N-2)*(N-3)*...*1). 


