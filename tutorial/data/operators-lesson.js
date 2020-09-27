export default `/*ts
    stringCat           "hello "+"world"
    arrayCat            (1 2)+(3 4)
    negative            ~5                              unary operators always take their operand to the right
    leftAssoc           2+3*4                           this is evaluated as (2+3)*4
    mathematical        2+(3*4)                         brackets can always be used to override the default evaluation order
    requiredBrackets    5+(~2)
*/`;
