export default `const jsVariable = 4;

/*ts
    number                3                               // this is a number
    decimal               3.5                             also a number. NB: terminating line comments need not be prefixed with //
    string                "strings may continue
over several lines"                                       strings are delimited by double-quotes <i>only</i>
    falsey                ()                              there is only one falsey value, <strong>undefined</strong>, denoted ()
    array                 (1 "hello"
                          () number)                      arrays are bounded by brackets and delimited by any kind of whitespace
    expression            2*jsVariable                    js variables in scope may be directly referenced within ts block
    pitfall               4 + number                      NB: tokens <i>cannot</i> be freely separated by whitespace
*/

const inline = /*ts (1 2 3) */;

const calculation = jsVariable + array[3];`